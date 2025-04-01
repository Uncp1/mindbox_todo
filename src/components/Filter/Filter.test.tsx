import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';
import { TaskProvider } from '../../context/TaskContext';

const mockClearCompleted = jest.fn();
const mockSetFilter = jest.fn();

jest.mock('../../context/TaskContext', () => ({
  ...jest.requireActual('../../context/TaskContext'),
  useTaskContext: () => ({
    filter: 'all',
    setFilter: mockSetFilter,
    clearCompleted: mockClearCompleted,
    hasCompletedTasks: true,
  }),
}));

describe('Filter Component', () => {
  test('renders filter buttons', () => {
    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-active')).toBeInTheDocument();
    expect(screen.getByTestId('filter-completed')).toBeInTheDocument();
  });

  test('calls clearCompleted when Clear completed button is clicked', () => {
    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    fireEvent.click(screen.getByTestId('clear-completed'));
    expect(mockClearCompleted).toHaveBeenCalled();
  });
});
