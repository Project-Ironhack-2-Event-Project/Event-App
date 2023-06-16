const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const eventRoute = require('../routes/event.routes');
const Chat = require('../models/Chat.model');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Configuration of Express.js & MongoDB

// Configuration of Socket.IO
io.on('connection', socket => {
console.log("New socket connection");
  // We see the commentary 
  socket.on('addComment', async commentData => {
    const { eventId, user, content } = commentData;


    try {
        const event = await Event.findById(eventId);
  
        if (!event) {
          return socket.emit('commentError', { error: 'Événement introuvable.' });
        }

        const newChat = new Chat({ eventId, users, content });
        await newChat.save();

      //All User can see the new Commentary
      io.to(eventId).emit('newChat', newChat);
    } catch (error) {
    console.log(`Some problem with chat utilisation`,error);
    next()
    }
  });
  socket.on('joinEventRoom', eventId => {
    // Rejoindre la salle de l'événement
    socket.join(eventId);
    });
});

app.use('/api', eventRoutes);

module.exports = server;