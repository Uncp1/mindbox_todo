import { useState } from 'react';
import styles from './App.module.css';
import Input from './components/Input/Input';

function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.title}>todos</h1>

      <Input />
    </div>
  );
}

export default App;
