import React from 'react';
import { useTaskContext } from '../../context/TaskContext';
import styles from './Counter.module.css';

const Counter: React.FC = () => {
  const { remainingCount } = useTaskContext();

  return (
    <div className={styles.counter} data-testid="counter">
      <span>
        {remainingCount} {remainingCount === 1 ? 'item' : 'items'} left
      </span>
    </div>
  );
};

export default Counter;
