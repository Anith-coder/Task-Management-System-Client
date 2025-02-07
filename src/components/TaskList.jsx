import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, deleteTask, filterTasksByStatus } from '../services/taskService';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

const TaskList = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["tasks", debouncedSearch, status],  
    queryFn: () => (status ? filterTasksByStatus(status) : getTasks(debouncedSearch)),
    keepPreviousData: true,
    staleTime: 5000, 
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching tasks: {error.message}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Task List</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 p-2 w-full max-w-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mb-6 p-2 w-full max-w-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
      </select>

      <Link to="/add-task" className="mb-6 inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Add New Task
      </Link>

      <ul className="w-full max-w-lg space-y-4">
        {data?.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={() => deleteMutation.mutate(task.id)} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
