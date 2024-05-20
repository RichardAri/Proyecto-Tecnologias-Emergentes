const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define your models, routes, and middleware here

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('createTeam', async (data) => {
    // Logic to create a team in the database
    const team = new Team(data);
    await team.save();
    io.emit('teamCreated', team); // Notify all connected clients
  });

  socket.on('createTask', async (data) => {
    // Logic to create a task in the database
    const task = new Task(data);
    await task.save();
    io.emit('taskCreated', task); // Notify all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
