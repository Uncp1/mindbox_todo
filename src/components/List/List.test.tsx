import { render, screen } from '@testing-library/react';
import List from './List';
import { TaskProvider } from '../../context/TaskContext';

jest.mock('../Item/Item', () => {
  return {
    __esModule: true,
    default: jest
      .fn()
      .mockImplementation(({ task }) => (
        <div data-testid={`mocked-item-${task.id}`}>{task.text}</div>
      )),
  };
});

jest.mock('../../context/TaskContext', () => ({
  ...jest.requireActual('../../context/TaskContext'),
  useTaskContext: () => ({
    filteredTasks: [
      { id: '1', text: 'Task 1', completed: false },
      { id: '2', text: 'Task 2', completed: true },
    ],
  }),
}));

describe('List Component', () => {
  test('renders list of tasks', () => {
    render(
      <TaskProvider>
        <List />
      </TaskProvider>
    );

    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-item-2')).toBeInTheDocument();
  });
});
