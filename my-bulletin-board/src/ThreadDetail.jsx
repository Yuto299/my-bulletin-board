import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

const ThreadDetail = () => {
  const { thread_id } = useParams(); // URLパラメータからthread_idを取得
  const [posts, setPosts] = useState([]); // 投稿リストを管理
  const [newPost, setNewPost] = useState(''); // 新しい投稿を管理
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState(null); // エラーはない

  // APIから投稿データを取得する
  const fetchPosts = useCallback(() => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0`)
      .then((response) => {
        if (response.ok === false) {
          throw new Error('投稿データの取得に失敗しました');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [thread_id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 投稿を追加する
  const handleSubmit = () => {
    if (newPost.trim() === '') {
      alert('投稿内容を入力してください');
      return;
    }

    // APIに新しい投稿を送信
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
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
    return <div>エラーが発生しました</div>;
  }

  return (
    <div>
      <h1>スレッド詳細</h1>
      <ul>
        {posts.length > 0 && posts.map((post) => <li key={post.id}>{post.post}</li>)}
        {posts.length === 0 && <li>投稿がありません。</li>}
      </ul>
      <textarea
        name='テキストエリア'
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder='投稿しよう！'
      ></textarea>

      {/* 投稿ボタン */}
      <button onClick={handleSubmit}>投稿</button>

      {/* Topページに戻る */}
      <Link to='/' className='back-to-top-link'>
        Topに戻る
      </Link>
    </div>
  );
};

export default ThreadDetail;
