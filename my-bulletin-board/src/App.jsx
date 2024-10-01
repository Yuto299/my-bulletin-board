import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThreadCreate from './ThreadCreate';
import './App.css';
import ThreadDetail from './ThreadDetail';
import ThreadList from './ThreadList';

export const App = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate(); // ページ遷移

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=0')
      .then((response) => {
        if (response.ok === false) {
          throw new Error('データは取得できませんでした');
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setThreads(data);
        } else {
          console.error('スレッドデータが見つかりません');
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  };

  // 新しいスレッドを追加するための関数
  const addThread = (newThread) => {
    setThreads((prevThreads) => [newThread, ...prevThreads]); // 先頭に追加
    navigate('/'); // スレッド作成後、トップページに戻る
  };

  return (
    <>
      {/* ここは常に表示 */}
      <header>掲示板</header>
      <p>
        <Link to='/threads/new' className='create-thread-link'>
          スレッドをたてる
        </Link>
      </p>

      {/* Routesを使ってページごとに表示する部分 */}
      <Routes>
        <Route path='/' element={<ThreadList threads={threads} />} />
        <Route path='/threads/new' element={<ThreadCreate addThread={addThread} />} />
        <Route path='/threads/:thread_id' element={<ThreadDetail />} />
      </Routes>
    </>
  );
};

export default App;

// cd my-bulletin-board
// npm install
// npm run dev
