import React, { createContext, useContext, ReactNode } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task, TaskFilter } from '../types';

interface TaskContextType {
  tasks: Task[];
  filter: TaskFilter;
  filteredTasks: Task[];
  remainingCount: number;
  hasCompletedTasks: boolean;
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTaskText: (id: string, newText: string) => void;
  setFilter: (filter: TaskFilter) => void;
  clearCompleted: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const taskData = useTasks();

  return (
    <TaskContext.Provider value={taskData}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
