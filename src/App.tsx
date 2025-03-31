import styles from './App.module.css';
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
      </div>
    </TaskProvider>
  );
}

export default App;
