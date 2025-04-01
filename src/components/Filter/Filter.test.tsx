import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../../components/Filter/Filter';
import { TaskProvider } from '../../context/TaskContext';

// Mock useTaskContext with default values
const mockSetFilter = jest.fn();
const mockClearCompleted = jest.fn();

jest.mock('../../context/TaskContext', () => {
  const originalModule = jest.requireActual('../../context/TaskContext');
  return {
    ...originalModule,
    useTaskContext: () => ({
      filter: 'all',
      setFilter: mockSetFilter,
      clearCompleted: mockClearCompleted,
      hasCompletedTasks: true,
    }),
  };
});

describe('Filter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all filter buttons', () => {
    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-active')).toBeInTheDocument();
    expect(screen.getByTestId('filter-completed')).toBeInTheDocument();
  });

  test('calls setFilter with correct value when filter buttons are clicked', () => {
    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    fireEvent.click(screen.getByTestId('filter-all'));
    expect(mockSetFilter).toHaveBeenCalledWith('all');

    fireEvent.click(screen.getByTestId('filter-active'));
    expect(mockSetFilter).toHaveBeenCalledWith('active');

    fireEvent.click(screen.getByTestId('filter-completed'));
    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });

  test('renders "Clear completed" button when hasCompletedTasks is true', () => {
    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    expect(screen.getByTestId('clear-completed')).toBeInTheDocument();
  });

  test('does not render "Clear completed" button when hasCompletedTasks is false', () => {
    // Override mock for this test
    jest
      .spyOn(require('../../context/TaskContext'), 'useTaskContext')
      .mockReturnValue({
        filter: 'all',
        setFilter: mockSetFilter,
        clearCompleted: mockClearCompleted,
        hasCompletedTasks: false,
      });

    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    expect(screen.queryByTestId('clear-completed')).not.toBeInTheDocument();
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

  test('active filter button has active class', () => {
    // Test with 'all' filter active
    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    expect(screen.getByTestId('filter-all')).toHaveClass('active');
    expect(screen.getByTestId('filter-active')).not.toHaveClass('active');
    expect(screen.getByTestId('filter-completed')).not.toHaveClass('active');

    // Change to 'active' filter
    jest
      .spyOn(require('../../context/TaskContext'), 'useTaskContext')
      .mockReturnValue({
        filter: 'active',
        setFilter: mockSetFilter,
        clearCompleted: mockClearCompleted,
        hasCompletedTasks: true,
      });

    render(
      <TaskProvider>
        <Filter />
      </TaskProvider>
    );

    expect(screen.getByTestId('filter-all')).not.toHaveClass('active');
    expect(screen.getByTestId('filter-active')).toHaveClass('active');
    expect(screen.getByTestId('filter-completed')).not.toHaveClass('active');
  });
});
