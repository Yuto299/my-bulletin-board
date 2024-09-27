import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThreadCreate from './ThreadCreate';
import './App.css';

export const App = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=0')
      .then((response) => {
        if (!response.ok) {
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

  return (
    <>
      <header>掲示板</header>
      <h1>新着スレッド</h1>
      <div className='App'>
        <p>
          <Link to='/threads/new' className='create-thread-link'>
            スレッドをたてる
          </Link>
        </p>
        <ul>
          {threads.map((thread) => (
            <li key={thread.id}>{thread.title}</li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route path='/threads/new' element={<ThreadCreate />} />
      </Routes>
    </>
  );
};

export default App;
