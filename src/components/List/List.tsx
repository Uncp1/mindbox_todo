import React from 'react';
import styles from './List.module.css';
import Item from '../Item/Item';
import { useTaskContext } from '../../context/TaskContext';

const List: React.FC = () => {
  const { filteredTasks } = useTaskContext();
  return (
    <div className={styles.todoList} data-testid="todo-list">
      {filteredTasks.map((task) => (
        <Item key={task.id} task={task} />
      ))}
    </div>
  );
};

export default List;
