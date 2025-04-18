import { useState } from 'react';
import styles from './App.module.css';
import Counter from './components/Counter/Counter';
import Filter from './components/Filter/Filter';
import Input from './components/Input/Input';
import List from './components/List/List';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { useTaskContext } from './context/TaskContext';

function App() {
  const { filteredTasks } = useTaskContext();
  const [isListVisible, setIsListVisible] = useState(true);

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>todos</h1>
      <ThemeToggle />
      <div className={styles.content}>
        <Input
          toggleListVisibility={toggleListVisibility}
          isListVisible={isListVisible}
        />

        {isListVisible && (
          <>
            {filteredTasks.length > 0 && <List />}
            <div className={styles.filter}>
              <Filter />
              <Counter />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
