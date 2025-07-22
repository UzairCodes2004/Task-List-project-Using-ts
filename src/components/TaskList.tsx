import React, { useState, useCallback } from 'react';
import TaskItems from './TaskItems';

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [task, setTask] = useState<Task[]>([
    { id: 1, description: "I'm first Task", isCompleted: false },
    { id: 2, description: "I'm second Task", isCompleted: false },
    { id: 3, description: "I'm third Task", isCompleted: false }
  ]);

  const [newTask, setNewTask] = useState<string>('');

  const addTask = useCallback((): void => {
    if (newTask.trim() === '') return;
    const id: number = Date.now();
    setTask(prev => [...prev, { id, description: newTask, isCompleted: false }]);
    setNewTask('');
  }, [newTask]);

  const markAsCompleted = (taskId: number): void => {
    setTask(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, isCompleted: true } : t
      )
    );
  };

  const updatedTask = (updatedList: Task[]): void => {
    setTask(updatedList);
  };

  // Showing completed and incompleted tasks
  const completedTasks: Task[] = task.filter(t => t.isCompleted);
  const incompleteTasks: Task[] = task.filter(t => !t.isCompleted);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          addTask();
        }}
        
        className="flex gap-2 items-center mb-6"
      >
        <input
          className="inputTaskList border rounded px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={newTask}
          placeholder="Add a task..."
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
        />
        <button
          className="addBtnTaskList bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Add
        </button>
      </form>
      <TaskItems
        data={task}
        completedTask={completedTasks}
        inCompleteTasks={incompleteTasks}
        markAsCompleted={markAsCompleted}
        updatedTask={updatedTask}
      />
    </div>
  );
};

export default TaskList;