import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import styles from './Item.module.css';
import { useTaskContext } from '../../context/TaskContext';

interface TaskItemProps {
  task: Task;
}

const Item: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask, updateTaskText } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      updateTaskText(task.id, editText.trim());
    } else {
      // If the user tries to save an empty task, revert to the original text
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <div className={styles.item} data-testid="Task-item">
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={() => toggleTask(task.id)}
        data-testid="Task-checkbox"
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && '✓'}
      </button>

      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            ref={inputRef}
            type="text"
            className={styles.editInput}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            data-testid="edit-input"
            maxLength={100}
          />
          <div className={styles.editActions}>
            <button
              className={styles.saveButton}
              onClick={handleEditSave}
              aria-label="Save changes"
            >
              ✓
            </button>
            <button
              className={styles.cancelButton}
              onClick={handleEditCancel}
              aria-label="Cancel editing"
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        <>
          <span
            className={`${task.completed ? styles.completed : ''} ${
              styles.taskText
            }`}
            title={task.text}
          >
            {task.text}
          </span>
          <div className={styles.actions}>
            <button
              className={styles.editButton}
              onClick={handleEditStart}
              data-testid="edit-button"
              aria-label="Edit task"
            >
              ✎
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => deleteTask(task.id)}
              data-testid="delete-button"
              aria-label="Delete task"
            >
              ×
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
