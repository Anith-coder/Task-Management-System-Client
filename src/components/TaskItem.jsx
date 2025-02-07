import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  return (
    <li className="flex justify-between items-center p-4 bg-white rounded-lg shadow-lg mb-4 task-item">
      <div className="flex flex-col space-y-2 w-full">
        <span className="text-lg font-semibold text-gray-700"><strong>Title:</strong> {task.title}</span>
        <span className="text-sm text-gray-500"><strong>Description:</strong> {task.description}</span>
        <span className="text-sm text-gray-500"><strong>Status:</strong> {task.status}</span>
      </div>

    
      <div className="flex space-x-2">
        <Link to={`/edit-task/${task.id}`}>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Edit</button>
        </Link>

        
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
