export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark';
