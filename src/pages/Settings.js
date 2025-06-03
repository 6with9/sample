import React, { useEffect, useState } from 'react';
import './Settings.css';

// IndexedDBユーティリティ
const DB_NAME = 'studyAppSettings';
const STORE_NAME = 'settings';
const DB_VERSION = 1;

// IndexedDBに接続
function openDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// 設定の取得
async function getSetting(key, defaultValue) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result ? req.result.value : defaultValue);
    req.onerror = () => resolve(defaultValue);
  });
}

// 設定の保存
async function setSetting(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ key, value });
    tx.oncomplete = resolve;
    tx.onerror = reject;
  });
}

// デフォルト値
const DEFAULT_TASK_TYPES = [
  { name: '勉強', color: '#4caf50' },
  { name: '運動', color: '#2196f3' },
  { name: '休憩', color: '#ff9800' },
];

function Setting() {
  const [taskTypes, setTaskTypes] = useState(DEFAULT_TASK_TYPES);
  const [newType, setNewType] = useState('');
  const [newColor, setNewColor] = useState('#000000');
  const [loading, setLoading] = useState(true);

  // 初回ロード時にIndexedDBから設定を取得
  useEffect(() => {
    (async () => {
      const types = await getSetting('taskTypes', DEFAULT_TASK_TYPES);
      setTaskTypes(types);
      setLoading(false);
    })();
  }, []);

  // 設定が変わったらIndexedDBに保存
  useEffect(() => {
    if (!loading) setSetting('taskTypes', taskTypes);
  }, [taskTypes, loading]);

  const handleAddType = () => {
    if (!newType.trim()) return;
    setTaskTypes([...taskTypes, { name: newType, color: newColor }]);
    setNewType('');
    setNewColor('#000000');
  };

  const handleTypeChange = (index, key, value) => {
    const updated = [...taskTypes];
    updated[index][key] = value;
    setTaskTypes(updated);
  };

  const handleDelete = (index) => {
    setTaskTypes(taskTypes.filter((_, i) => i !== index));
  };

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="SettingPage">
      <h2>タスクの種類と色の設定</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {taskTypes.map((type, idx) => (
          <li key={idx} style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={type.name}
              onChange={e => handleTypeChange(idx, 'name', e.target.value)}
              style={{ marginRight: 8 }}
            />
            <input
              type="color"
              value={type.color}
              onChange={e => handleTypeChange(idx, 'color', e.target.value)}
              style={{ marginRight: 8 }}
            />
            <span style={{
              display: 'inline-block',
              width: 24,
              height: 24,
              background: type.color,
              borderRadius: '50%',
              marginRight: 8,
              border: '1px solid #ccc'
            }} />
            <button onClick={() => handleDelete(idx)}>削除</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 24 }}>
        <input
          type="text"
          placeholder="新しい種類"
          value={newType}
          onChange={e => setNewType(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="color"
          value={newColor}
          onChange={e => setNewColor(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={handleAddType}>追加</button>
      </div>
    </div>
  );
}

export default Setting;