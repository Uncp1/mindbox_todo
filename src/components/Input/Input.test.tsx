import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import { TaskProvider } from '../../context/TaskContext';

const mockAddTask = jest.fn();
const mockToggleListVisibility = jest.fn();

jest.mock('../../context/TaskContext', () => ({
  ...jest.requireActual('../../context/TaskContext'),
  useTaskContext: () => ({
    addTask: mockAddTask,
  }),
}));

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input field', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={true}
        />
      </TaskProvider>
    );

    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  test('updates input value when typing', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={true}
        />
      </TaskProvider>
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'New Task' } });
    expect(input).toHaveValue('New Task');
  });

  test('calls addTask when add button is clicked with non-empty input', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={true}
        />
      </TaskProvider>
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'New Task' } });

    fireEvent.click(screen.getByTestId('add-button'));
    expect(mockAddTask).toHaveBeenCalledWith('New Task');
    expect(input).toHaveValue('');
  });

  test('does not call addTask when add button is clicked with empty input', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={true}
        />
      </TaskProvider>
    );

    fireEvent.click(screen.getByTestId('add-button'));
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  test('calls addTask when Enter key is pressed with non-empty input', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={true}
        />
      </TaskProvider>
    );

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'New Task' } });

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockAddTask).toHaveBeenCalledWith('New Task');
    expect(input).toHaveValue('');
  });

  test('calls toggleListVisibility when toggle button is clicked', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={true}
        />
      </TaskProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-list-button'));
    expect(mockToggleListVisibility).toHaveBeenCalled();
  });

  test('toggle button has rotated class when list is visible', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={true}
        />
      </TaskProvider>
    );

    const button = screen.getByTestId('toggle-list-button');
    expect(button.className).toContain('rotated');
  });

  test('toggle button does not have rotated class when list is not visible', () => {
    render(
      <TaskProvider>
        <Input
          toggleListVisibility={mockToggleListVisibility}
          isListVisible={false}
        />
      </TaskProvider>
    );

    const button = screen.getByTestId('toggle-list-button');
    expect(button.className).not.toContain('rotated');
  });
});
