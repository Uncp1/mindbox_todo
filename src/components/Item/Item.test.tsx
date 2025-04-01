import { render, screen, fireEvent } from '@testing-library/react';
import Item from './Item';
import { TaskProvider } from '../../context/TaskContext';

const mockToggleTask = jest.fn();
const mockDeleteTask = jest.fn();
const mockUpdateTaskText = jest.fn();

jest.mock('../../context/TaskContext', () => ({
  ...jest.requireActual('../../context/TaskContext'),
  useTaskContext: () => ({
    toggleTask: mockToggleTask,
    deleteTask: mockDeleteTask,
    updateTaskText: mockUpdateTaskText,
  }),
}));

describe('Item Component', () => {
  const mockTask = {
    id: '1',
    text: 'Test Task',
    completed: false,
  };

  const mockCompletedTask = {
    id: '2',
    text: 'Completed Task',
    completed: true,
  };

  test('renders task item with text', () => {
    render(
      <TaskProvider>
        <Item task={mockTask} />
      </TaskProvider>
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('calls toggleTask when checkbox is clicked', () => {
    render(
      <TaskProvider>
        <Item task={mockTask} />
      </TaskProvider>
    );

    fireEvent.click(screen.getByTestId('Task-checkbox'));
    expect(mockToggleTask).toHaveBeenCalledWith('1');
  });

  test('calls deleteTask when delete button is clicked', () => {
    render(
      <TaskProvider>
        <Item task={mockTask} />
      </TaskProvider>
    );

    fireEvent.click(screen.getByTestId('delete-button'));
    expect(mockDeleteTask).toHaveBeenCalledWith('1');
  });

  test('renders checkbox with checkmark for completed task', () => {
    render(
      <TaskProvider>
        <Item task={mockCompletedTask} />
      </TaskProvider>
    );

    const checkbox = screen.getByTestId('Task-checkbox');
    expect(checkbox.className).toContain('checked');
    expect(checkbox.textContent).toBe('✓');
  });
});
