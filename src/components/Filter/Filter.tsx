import React from 'react';
import { useTaskContext } from '../../context/TaskContext';
import styles from './Filter.module.css';

const Filter: React.FC = () => {
  const { filter, setFilter, clearCompleted, hasCompletedTasks } =
    useTaskContext();

  return (
    <div className={styles.filter__container} data-testid="filter-container">
      <button
        className={`${styles.filter__button} ${
          filter === 'all' ? styles.active : ''
        }`}
        onClick={() => setFilter('all')}
        data-testid="filter-all"
      >
        All
      </button>
      <button
        className={`${styles.filter__button} ${
          filter === 'active' ? styles.active : ''
        }`}
        onClick={() => setFilter('active')}
        data-testid="filter-active"
      >
        Active
      </button>
      <button
        className={`${styles.filter__button} ${
          filter === 'completed' ? styles.active : ''
        }`}
        onClick={() => setFilter('completed')}
        data-testid="filter-completed"
      >
        Completed
      </button>

      {hasCompletedTasks && (
        <button
          className={styles.filter__clear}
          onClick={clearCompleted}
          data-testid="clear-completed"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default Filter;
