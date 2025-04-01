import styles from './App.module.css';
import Counter from './components/Counter/Counter';
import Filter from './components/Filter/Filter';
import Input from './components/Input/Input';
import List from './components/List/List';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className={styles.App}>
        <h1 className={styles.title}>todos</h1>

        <Input />
        <List />
        <Filter />
        <Counter />
      </div>
    </TaskProvider>
  );
}

export default App;
