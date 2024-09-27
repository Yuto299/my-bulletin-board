import { Link } from 'react-router-dom';

const ThreadCreate = () => {
  return (
    <>
      <header>掲示板</header>
      <h1>スレッド新規作成</h1>
      <Link to='/threads/new' className='create-thread-link'>
        スレッドをたてる
      </Link>
      <textarea name='テキストエリア' id='' placeholder='スレッドタイトル'></textarea>
      <button>作成</button>
      <Link to='/' className='back-to-top-link'>
        Topに戻る
      </Link>
    </>
  );
};

export default ThreadCreate;
