const express = require('express');
const app = express()
require('dotenv').config()
const http = require('http')
const PORT = process.env.port || 4500;
const cors = require('cors');
const {Server, Socket} = require('socket.io')

app.use(cors())

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'https://harmonious-gaufre-34e64e.netlify.app',
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    // console.log(socket.id);

    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log('user_id: '+ socket.id);
        console.log('room: '+data);
    })


    socket.on('send_message',(data)=>{
        socket.to(data.room).emit('received_msg',data)
        console.log(data);
    })

    socket.on('disconnect',()=>{
        console.log('user Disconnected',socket.id);
    })
})

server.listen(PORT,()=>{
    console.log('server running in port ',PORT);
})