import React from 'react';
import { Task } from '../../types';
import styles from './Item.module.css';
import { useTaskContext } from '../../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const Item: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskContext();

  return (
    <div className={styles.item} data-testid="Task-item">
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={() => toggleTask(task.id)}
        data-testid="Task-checkbox"
      >
        {task.completed && '✓'}
      </button>
      <span className={task.completed ? styles.completed : ''}>
        {task.text}
      </span>
      <button
        className={styles.deleteButton}
        onClick={() => deleteTask(task.id)}
        data-testid="delete-button"
        aria-label="Delete Task"
      >
        ×
      </button>
    </div>
  );
};

export default Item;
