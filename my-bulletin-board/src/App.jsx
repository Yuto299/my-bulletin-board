import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThreadCreate from './ThreadCreate';
import './App.css';
import ThreadDetail from './ThreadDetail';

export const App = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate(); // ページ遷移に使用するためのフック

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
      <p>
        <Link to='/threads/:thread_id' className='thread-detail-link'>
          スレッドの詳細情報を取得する
        </Link>
      </p>

      {/* Routesを使ってページごとに表示する部分 */}
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <h1>新着スレッド</h1>
              <div className='App'>
                <ul>
                  {threads.map((thread) => (
                    <li key={thread.id}>{thread.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          }
        />
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
