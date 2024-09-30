import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ThreadDetail = () => {
  const { thread_id } = useParams(); // スレッドIDを取得
  const [posts, setPosts] = useState([]); // 投稿リストを管理するstate
  const [newPost, setNewPost] = useState(''); // 新しい投稿を管理するstate
  const [loading, setLoading] = useState(true); // ローディング状態を管理するstate
  const [error, setError] = useState(null); // エラーを管理するstate

  // APIから投稿データを取得する関数
  const fetchPosts = () => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/8873f959-2123-46f0-b7d9-4ed6c46f553f/posts?offset=0`)
      .then((response) => {
        if (response.ok === false) {
          throw new Error('投稿データの取得に失敗しました');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts); // サーバーから取得した投稿データをセット
        setLoading(false);
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  // コンポーネントがマウントされた時、投稿データを取得
  useEffect(() => {
    fetchPosts();
  }, [thread_id]);

  // 投稿を追加する関数
  const handleSubmit = () => {
    if (newPost.trim() === '') {
      alert('投稿内容を入力してください');
      return;
    }

    // APIに新しい投稿を送信
    fetch('https://railway.bulletinboard.techtrain.dev/threads/8873f959-2123-46f0-b7d9-4ed6c46f553f/posts?offset=0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        threadId: thread_id,
        post: newPost,
      }),
    })
      .then((response) => {
        if (response.ok === false) {
          throw new Error('投稿の送信に失敗しました');
        }
        return response.json();
      })
      .then(() => {
        setNewPost('');
        fetchPosts();
      })
      .catch((error) => {
        console.error('投稿送信エラー:', error);
        alert('投稿の送信に失敗しました');
      });
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラーが発生しました: {error}</div>;
  }

  return (
    <div>
      <h1>スレッド詳細</h1>
      <ul>
        {posts.length > 0 ? posts.map((post) => <li key={post.id}>{post.post}</li>) : <li>投稿がありません。</li>}
      </ul>

      {/* 新しい投稿の入力エリア */}
      <textarea
        name='テキストエリア'
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder='投稿しよう！'
      ></textarea>

      {/* 投稿ボタン */}
      <button onClick={handleSubmit}>投稿</button>

      {/* Topページに戻るリンク */}
      <Link to='/' className='back-to-top-link'>
        Topに戻る
      </Link>
    </div>
  );
};

export default ThreadDetail;
