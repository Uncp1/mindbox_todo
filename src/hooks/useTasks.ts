import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<TaskFilter>('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    //проверка пустых строк
    if (text.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text, completed: false },
      ]);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskText = (id: string, newText: string) => {
    if (newText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task
        )
      );
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const remainingCount = tasks.filter((task) => !task.completed).length;

  return {
    tasks,
    addTask,
    filter,
    setFilter,
    toggleTask,
    updateTaskText,
    deleteTask,
    clearCompleted,
    filteredTasks,
    remainingCount,
  };
};
