import { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const handleChangeInput = (e) => {
    setTitle(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://posts.com/posts', { title });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={handleChangeInput}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
