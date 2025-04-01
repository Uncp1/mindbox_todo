import { render, screen } from '@testing-library/react';
import Counter from '../../components/Counter/Counter';
import { TaskProvider } from '../../context/TaskContext';

jest.mock('../../context/TaskContext', () => {
  const originalModule = jest.requireActual('../../context/TaskContext');
  return {
    ...originalModule,
    useTaskContext: () => ({
      remainingCount: 3,
    }),
  };
});

describe('Counter Component', () => {
  test('renders with multiple items remaining', () => {
    render(
      <TaskProvider>
        <Counter />
      </TaskProvider>
    );

    expect(screen.getByTestId('counter')).toHaveTextContent('3 items left');
  });

  test('renders with a single item remaining', () => {
    jest
      .spyOn(require('../../context/TaskContext'), 'useTaskContext')
      .mockReturnValue({
        remainingCount: 1,
      });

    render(
      <TaskProvider>
        <Counter />
      </TaskProvider>
    );

    expect(screen.getByTestId('counter')).toHaveTextContent('1 item left');
  });

  test('renders with zero items remaining', () => {
    jest
      .spyOn(require('../../context/TaskContext'), 'useTaskContext')
      .mockReturnValue({
        remainingCount: 0,
      });

    render(
      <TaskProvider>
        <Counter />
      </TaskProvider>
    );

    expect(screen.getByTestId('counter')).toHaveTextContent('0 items left');
  });
});
