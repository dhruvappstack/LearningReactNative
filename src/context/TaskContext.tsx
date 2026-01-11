import React, { createContext, useState, useCallback, useEffect } from 'react';
import { Task, TaskContextType } from '../types/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const saveTasks = async (tasksToSave: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const getTaskById = useCallback((id: string) => {
    return tasks.find((task) => task.id === id);
  }, [tasks]);

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};
