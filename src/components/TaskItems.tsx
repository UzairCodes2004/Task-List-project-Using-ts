import React, { useState } from 'react';

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
}

interface TaskItemsProps {
  data: Task[];
  markAsCompleted: (taskId: number) => void;
  completedTask: Task[];
  inCompleteTasks: Task[];
  updatedTask: (updatedList: Task[]) => void;
}

const TaskItems: React.FC<TaskItemsProps> = ({ 
  data, 
  markAsCompleted, 
  completedTask, 
  inCompleteTasks, 
  updatedTask 
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditText] = useState<string>('');

  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [showIncomplete, setShowIncomplete] = useState<boolean>(false);

  const handleClick = (task: Task): void => {
    setEditingId(task.id);
    setEditText(task.description);
  };

  const handleSave = (taskId: number): void => {
    const taskList: Task[] = data.map((item) =>
      item.id === taskId ? { ...item, description: editingText } : item
    );
    updatedTask(taskList);
    setEditText('');
    setEditingId(null);
  };
  

  return (
    <div>
      <ol className="list space-y-2">
        {data.map((item: Task) => (
          <li
            key={item.id}
            className={`listitems flex justify-between items-center overflow-hidden break-all bg-gray-100 px-4 py-2 rounded shadow ${
              item.isCompleted ? 'line-through opacity-50 text-gray-500' : ''
            }`}
          >
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                  className="editInput border px-2 py-1 rounded w-3/4"
                />
                <button
                  className="saveButton text-white px-3 py-1 ml-2 rounded bg-green-700"
                  onClick={() => handleSave(item.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className='block w-75 break-words'>{item.description}</span>
                {!item.isCompleted && (
                  <><div>
                    <button className="absolute left-1/2 transform -translate ml-1"onClick={() => markAsCompleted(item.id)}>✅</button>
                    <button onClick={() => handleClick(item)}>✏️</button></div>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
      <div className="complete-incomplete-wrapper flex flex-col md:flex-row gap-6 mt-6">
        {/* Completed Tasks Toggle */}
        <div className="task-column flex-1">
          <button
            className="completedtasksbutton bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
            onClick={() => setShowCompleted((prev: boolean) => !prev)}
          >
            {showCompleted ? 'Hide' : 'Show'} Completed Tasks
          </button>
          {showCompleted && completedTask.length > 0 && (
            <ol className="mt-2 list-disc pl-5">
              {completedTask.map((item: Task) => (
                <li className=' completedTaskitems block w-75 break-words' key={item.id}>
                  {item.description}
                </li>
              ))}
            </ol>
          )}
        </div>
        {/* Incomplete Tasks Toggle */}
        <div className="task-column flex-1">
          <button
            className="incompletedtasksbutton bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition w-full"
            onClick={() => setShowIncomplete((prev: boolean) => !prev)}
          >
            {showIncomplete ? 'Hide' : 'Show'} Incomplete Tasks
          </button>
          {showIncomplete && inCompleteTasks.length > 0 && (
            <ol className="mt-2 list-disc pl-5">
              {inCompleteTasks.map((item: Task) => (
                <li className="incompletedTaskitems block w-75 break-words" key={item.id}>
                  {item.description}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItems;
