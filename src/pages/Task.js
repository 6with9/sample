import React, { useState, useEffect, useRef } from 'react';
import TaskAddPopup from './TaskAddPopup';
import { addTask, getAllTasks, deleteTask } from '../components/DataBase/indexedDB';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useSwipeable } from 'react-swipeable';
import './Task.css';

const FILTERS = [
  { key: 'scheduled', label: 'やること' },
  { key: 'unscheduled', label: 'あとでやること' }
];

function isScheduled(task) {
  return task.date && task.startTime;
}

function TaskItem({ task, onDelete }) {
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const threshold = 100; // スワイプで削除する距離(px)
  const ref = useRef();

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left' || eventData.dir === 'Right') {
        setIsSwiping(true);
        setTranslateX(Math.min(0, eventData.deltaX)); // 左方向のみ
      }
    },
    onSwipedLeft: (eventData) => {
      if (Math.abs(eventData.deltaX) > threshold) {
        onDelete(task.id);
      } else {
        setTranslateX(0);
      }
      setIsSwiping(false);
    },
    onSwipedRight: () => {
      setTranslateX(0);
      setIsSwiping(false);
    },
    onSwiped: () => {
      setIsSwiping(false);
      setTranslateX(0);
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true, // ← この行を追加
  });

  return (
    <div
      className="TaskItem"
      {...swipeHandlers}
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        transform: `translateX(${translateX}px)`,
        transition: isSwiping ? 'none' : 'transform 0.2s',
        background: '#fff',
      }}
    >
      <div style={{ flex: 1 }}>
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
      <button
        className="TaskDeleteBtn"
        onClick={() => onDelete(task.id)}
        style={{ marginLeft: '12px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="削除"
      >
        <DeleteSweepIcon />
      </button>
    </div>
  );
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

  const handleDelete = async (id) => {
    await deleteTask(id);
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
          <TaskItem key={idx} task={task} onDelete={handleDelete} />
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