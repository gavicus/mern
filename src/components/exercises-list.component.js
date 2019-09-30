import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Exercise from './exercise.component';

const ExercisesList = () => {
  const [ exercises, setExercises ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/exercises/')
    .then(res => {
      if(res.data.length > 0){
        setExercises(res.data);
      }
    })
    .catch(err => console.log(`Error: ${err}`));
  }, []);

  const deleteExercise = id => {
    axios.delete(`http://localhost:4001/exercises/${id}`)
    .then(res => {
      console.log('deleted:',res.data);
      setExercises(exercises.filter(x => x._id !== id));
    });
  };

  const exerciseList = () => {
    if(exercises && exercises.length > 0){
    return exercises.map(x => 
      <Exercise
        exercise={x}
        deleteExercise={deleteExercise}
        key={x._id}
      />
    );
    } else { return null; }
  };

  return (
    <div>
    <p>exercises list</p>
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th>username</th>
          <th>description</th>
          <th>duration</th>
          <th>date</th>
          <th>actions</th>
        </tr>
      </thead>
      <tbody>
        { exerciseList() }
      </tbody>
    </table>
    </div>
  );
};

export default ExercisesList;
