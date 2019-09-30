import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Message from './toast-component';

const EditExercise = ({ match }) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState('');
  const [showSubmitToast, setShowSubmitToast] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4001/exercises/' + match.params.id)
    .then(res => {
      if(res.data){
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      }
    })
    axios.get('http://localhost:4001/users/')
    .then(res => {
      if(res.data.length > 0){
        setUsers(res.data.map(user => user.username));
      }
    })
  }, [match.params.id]);

  const onChangeUsername = event => { setUsername(event.target.value); };
  const onChangeDescription = event => { setDescription(event.target.value); };
  const onChangeDuration = event => { setDuration(event.target.value); };
  const onChangeDate = date => { setDate(date); };

  const onSubmit = event => {
    event.preventDefault();
    const exercise = { username, description, duration, date };
    axios.post('http://localhost:4001/exercises/update/' + match.params.id, exercise)
    .then(res => {
      console.log('data',res.data);
      setShowSubmitToast(true);
    });
    // window.location = '/';
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <label>Username: </label>
        {users && users.length > 0 &&
        <select
          required
          className="form-control"
          value={username}
          onChange={onChangeUsername}>
          {
            users.map(user => {
              return <option key={user} value={user}>{user}</option>;
            })
          }
        </select>
        }
        </div>

        <div className="form-group">
        <label>Description: </label>
        <input
          type="text"
          required
          className="form-control"
          value={description}
          onChange={onChangeDescription}
        />
        </div>

        <div className="form-group">
        <label>Duration: </label>
        <input
          type="text"
          required
          className="form-control"
          value={duration}
          onChange={onChangeDuration}
        />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <DatePicker
            selected={date}
            onChange={onChangeDate}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Update" className="btn btn-primary" />
        </div>

        <Message
          show={showSubmitToast}
          setShow={setShowSubmitToast}
          message="Updated Successfully"
        />

      </form>
    </div>
  );
};

export default EditExercise;
