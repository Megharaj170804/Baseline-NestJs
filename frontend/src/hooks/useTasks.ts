'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFilters, CreateTaskData, UpdateTaskData, tasksAPI } from '@/lib/api';

export function useTasks(filters?: TaskFilters) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await tasksAPI.getTasks(filters);
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: CreateTaskData) => {
    try {
      const newTask = await tasksAPI.createTask(data);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (id: string, data: UpdateTaskData) => {
    try {
      const updatedTask = await tasksAPI.updateTask(id, data);
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await tasksAPI.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}