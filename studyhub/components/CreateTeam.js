import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('createTeam', { name: teamName });
    setTeamName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Nombre del equipo"
      />
      <button type="submit">Crear Equipo</button>
    </form>
  );
};

export default CreateTeam;
