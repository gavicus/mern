import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onChangeUsername = event => { setUsername(event.target.value); };

  const onSubmit = event => {
    event.preventDefault();
    const user = { username };
    console.log('user', user);

    axios.post('http://localhost:4001/users/add', user)
    .then(res => {
      console.log('data',res.data);
    });
    setUsername('');
  };

  return (
    <div>
    <p>create user</p>
    <form onSubmit={onSubmit}>
    
    <div className="form-group">
    <label>Username: </label>
    <input
      type="text"
      required
      className="form-control"
      value={username}
      onChange={onChangeUsername}
    />
    </div>

    <div className="form-group">
      <input type="submit" value="Create" className="btn btn-primary" />
    </div>

    </form>
    </div>
  );
};

export default CreateUser;
