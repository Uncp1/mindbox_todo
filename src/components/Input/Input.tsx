import React, { useState } from 'react';
import styles from './Input.module.css';

const Input: React.FC = () => {
  const [value, setValue] = useState('');

  const handleAddValue = () => {
    console.log(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddValue();
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.icon}>❯</span>
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
        className={styles.addButton}
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
