import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, getTaskById, updateTask } from '../services/taskService';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  
  const validationSchema = Yup.object({
    title: Yup.string().required('Task title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().oneOf(['Pending', 'In Progress', 'Completed']).required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: 'Pending',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await updateTask(id, values);
        } else {
          await createTask(values);
        }
        navigate('/');
      } catch (error) {
        console.log('Error:', error);
      }
    },
  });


  useEffect(() => {
    if (isEditMode) {
      const fetchTask = async () => {
        try {
          const task = await getTaskById(id);
          formik.setValues({
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'Pending',
          });
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      fetchTask();
    }
  }, [id, isEditMode]);
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">{isEditMode ? 'Edit Task' : 'Add New Task'}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
          <input
            type="text"
            id="title"
            name="title" 
            className="w-full border border-gray-300 p-2 rounded-lg"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title && <div>{formik.errors.title}</div>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {formik.errors.description && formik.touched.description && <div>{formik.errors.description}</div>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" name="status" className="w-full border border-gray-300 p-2 rounded-lg"  onChange={formik.handleChange} value={formik.values.status}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700" type="submit">{isEditMode ? 'Update Task' : 'Add Task'}</button>
      </form>
    </div>
    </div>
  );
};

export default TaskForm;
