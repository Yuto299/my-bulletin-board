import { useState, useEffect } from 'react';
import './App.css';

export const App = () => {
  const [thread, setThread] = useState([]);

  useEffect(() => {
    getData(); // getDateではなくgetDataに変更
  }, []);

  const getData = () => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=20')
      .then((response) => {
        if (!response.ok) {
          throw new Error('データは取得できませんでした');
        }
        return response.json();
      })
      .then((data) => {
        // 取得したAPIデータをログに出力して確認
        console.log('APIから取得したデータ:', data);

        // データの構造を確認
        if (data && Array.isArray(data)) {
          setThread(data); // 取得したデータが配列ならそのままセット
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
      <p>新着スレッド</p>
      <ul>
        {thread.map((threadItem) => (
          <li key={threadItem.id}>{threadItem.title}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
