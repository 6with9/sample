import React, { useState, useEffect } from 'react';
import TaskAddPopup from './TaskAddPopup';
import { addTask, getAllTasks } from '../components/DataBase/indexedDB';
import './Task.css';

const FILTERS = [
  { key: 'scheduled', label: 'やること' },
  { key: 'unscheduled', label: 'あとでやること' }
];

function isScheduled(task) {
  return task.date && task.startTime;
}

export default function Task() {
  const [showPopup, setShowPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('scheduled');

  useEffect(() => {
    getAllTasks().then(setTasks);
  }, [showPopup]);

  const handleAdd = async (task) => {
    await addTask(task);
    setTasks(await getAllTasks());
  };

  const filteredTasks = tasks.filter(
    t => filter === 'scheduled' ? isScheduled(t) : !isScheduled(t)
  );

  return (
    <div className="TaskPage">
      <div className="TaskHeader">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={filter === f.key ? 'active' : ''}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="TaskList">
        {filteredTasks.length === 0 && <div className="TaskEmpty">タスクがありません</div>}
        {filteredTasks.map((task, idx) => (
          <div className="TaskItem" key={idx}>
            <div className="TaskTitle">{task.name}</div>
            <div className="TaskMeta">
              <span>{task.subject}</span>
              <span>{task.duration}分</span>
              {isScheduled(task) && (
                <span>
                  {task.date} {task.startTime}〜{task.endTime}
                </span>
              )}
            </div>
            {task.subtasks && task.subtasks.length > 0 && (
              <ul className="TaskSubtasks">
                {task.subtasks.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
      <button className="TaskAddFab" onClick={() => setShowPopup(true)}>＋</button>
      {showPopup && (
        <TaskAddPopup
          onClose={() => setShowPopup(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}