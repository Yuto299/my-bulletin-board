import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ThreadCreate = ({ addThread }) => {
  const [title, setTitle] = useState('');

  // スレッドを作成する関数
  const handleSubmit = () => {
    if (title.trim() == '') {
      alert('スレッドタイトルを入力してください');
      return;
    }

    const newThreadData = {
      title,
    };

    // API
    fetch('https://railway.bulletinboard.techtrain.dev/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newThreadData),
    })
      .then((response) => {
        if (response.ok === false) {
          throw new Error('スレッドの作成に失敗しました');
        }
        return response.json();
      })
      .then((data) => {
        addThread(data);
        setTitle('');
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  };

  return (
    <>
      <h1>スレッド新規作成</h1>
      <textarea
        name='テキストエリア'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='スレッドタイトル'
      ></textarea>
      <button onClick={handleSubmit}>作成</button>
      <Link to='/' className='back-to-top-link'>
        Topに戻る
      </Link>
    </>
  );
};

// PropTypesを使用して、addThreadの型を指定
ThreadCreate.propTypes = {
  addThread: PropTypes.func.isRequired,
};

// コンポーネント.propTypes = {
//   props名: PropTypes.型定義
//   }

export default ThreadCreate;
