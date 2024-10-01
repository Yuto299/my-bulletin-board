import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ThreadList = ({ threads }) => {
  return (
    <>
      <h1>新着スレッド</h1>
      <div className='App'>
        <ul>
          {threads.map((thread) => (
            <li key={thread.id}>
              <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ThreadList;
