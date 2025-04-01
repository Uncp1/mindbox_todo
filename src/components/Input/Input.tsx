import React, { useState } from 'react';
import styles from './Input.module.css';
import { useTaskContext } from '../../context/TaskContext';

interface InputProps {
  toggleListVisibility: () => void;
  isListVisible: boolean;
}

const Input: React.FC<InputProps> = ({
  toggleListVisibility,
  isListVisible,
}) => {
  const [value, setValue] = useState('');
  const { addTask } = useTaskContext();

  const handleAddValue = () => {
    if (value.trim()) {
      addTask(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddValue();
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.toggleButton} ${
          isListVisible ? styles.rotated : ''
        }`}
        onClick={toggleListVisibility}
        aria-label={isListVisible ? 'Collapse list' : 'Expand list'}
        data-testid="toggle-list-button"
      >
        ❯
      </button>

      <input
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        data-testid="input"
        className={styles.input}
      />

      <button
        className={styles.input__button}
        onClick={handleAddValue}
        data-testid="add-button"
        aria-label="Add todo"
      >
        +
      </button>
    </div>
  );
};

export default Input;
