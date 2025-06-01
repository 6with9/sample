import React, { useState } from 'react';
import './TaskAddPopup.css';

const SUBJECTS = ['国語', '算数', '理科', '社会', '英語'];

export default function TaskAddPopup({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [subtasks, setSubtasks] = useState(['']);

  // 必須項目: name, subject, duration
  const isValid = name && subject && duration;

  // サブタスク追加・編集
  const handleSubtaskChange = (idx, value) => {
    const arr = [...subtasks];
    arr[idx] = value;
    setSubtasks(arr);
  };
  const addSubtask = () => setSubtasks([...subtasks, '']);

  // タスク作成
  const handleSubmit = () => {
    if (!isValid) return;
    const now = new Date();
    const taskDate = date || now.toISOString().slice(0, 10);
    const taskStart = startTime || now.toTimeString().slice(0, 5);
    const start = `${taskDate}T${taskStart}`;
    const end = new Date(new Date(start).getTime() + Number(duration) * 60000)
      .toISOString();
    onAdd({
      name,
      subject,
      duration: Number(duration),
      date: date ? taskDate : null,
      startTime: startTime ? taskStart : null,
      endTime: date && startTime ? end.slice(11, 16) : null,
      subtasks: subtasks.filter(s => s.trim()),
      createdAt: now.toISOString(),
    });
    onClose();
  };

  return (
    <>
      <div className="TaskAddPopupOverlay" onClick={onClose} />
      <div className="TaskAddPopup">
        <h2>タスク作成</h2>
        <label>
          タスク名（必須）
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          タスクの種類（必須）
          <select value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="">選択してください</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label>
          所要時間（分, 必須）
          <input type="number" min="1" value={duration} onChange={e => setDuration(e.target.value)} />
        </label>
        <label>
          日付（任意）
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          開始時間（任意）
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
        </label>
        <label>
          サブタスク
          {subtasks.map((sub, idx) => (
            <input
              key={idx}
              value={sub}
              onChange={e => handleSubtaskChange(idx, e.target.value)}
              placeholder={`サブタスク${idx + 1}`}
            />
          ))}
          <button type="button" onClick={addSubtask}>＋サブタスク追加</button>
        </label>
        <button
          className={`TaskAddButton${isValid ? ' active' : ''}`}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          タスク作成
        </button>
      </div>
    </>
  );
}