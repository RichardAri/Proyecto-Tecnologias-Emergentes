import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('createTask', { title: taskTitle, assignedTo });
    setTaskTitle('');
    setAssignedTo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Título de la tarea"
      />
      <input
        type="text"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        placeholder="Asignar a"
      />
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default CreateTask;
