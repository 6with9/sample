import React from 'react';
import './Home.css';
import PomodoroTimer from '../components/PomodoroTimer/PomodoroTimer';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>ホームページ</h1>
        <p>ようこそ！ここではさまざまな情報を提供します。</p>
        <button className="Home-button">詳しく見る</button>
      </header>
      <section className="Home-content">
        <div className="Home-box">
          <h2>セクション 1</h2>
          <p>ここに何かの説明を入れることができます。</p>
        </div>
        <div className="Home-box">
          <h2>セクション 2</h2>
          <p>さらに詳しい情報はこちらに追加できます。</p>
        </div>
      </section>
      <PomodoroTimer />
    </div>
  );
}

export default Home;