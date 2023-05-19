const express = require('express');
const app=express();

const http=require('http');
const {Server}=require('socket.io');
const cors = require('cors');
app.use(cors());
const server=http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['POST','GET'],
        pingTimeout: 60000,
    },
});
const PORT=process.env.PORT || 5000;
function random_int()
{
    return Math.floor(Math.random()*10000).toString();
}
function generateRoomId()
{
    return random_int()+'-'+random_int()+'-'+random_int();
}
app.get('/api/generateRoom', (req, res) => {
    const roomId = generateRoomId();
    io.on('connection', (socket) => {
        socket.leaveAll();
        socket.join(roomId);
    });
    res.json({ roomId });
});

io.on('connection',(socket)=>{
    socket.on('joinroom',(roomId)=>{
        const rooms = io.sockets.adapter.rooms;
        console.log(rooms.get(roomId).size);
        if (rooms.get(roomId).size <= 2) {
            console.log(io.sockets.adapter.rooms);
            socket.leaveAll();
            socket.join(roomId);
            socket.emit('joinRoomSuccess', roomId);
        } else {
            socket.emit('joinRoomFailure', roomId);
        }
    })
    socket.on('getRoomsData', (roomId) => {
        const rooms = io.sockets.adapter.rooms;
        const roomIds = Array.from(rooms.keys());
        const room=rooms.get(roomId);
        const size = room ? room.size : 0;
        socket.emit('roomsData', roomIds,size);
    });
    
    socket.on('leaveRoom', (roomIds) => {
        if (Array.isArray(roomIds)) {
            roomIds.forEach((roomId) => {
            socket.leave(roomId);
            });
        } else {
            socket.leave(roomIds);
        }
    });
    socket.on("waitingover",(room)=>{
        const roomClients = Array.from(io.sockets.adapter.rooms.get(room)); 
        const randomIndex = Math.floor(Math.random() * 2);
        const player1 = roomClients[randomIndex];
        const player2 = roomClients[1 - randomIndex];
        console.log("player1:"+player1);
        console.log("player2"+player2);
        io.to(room).emit('navigateToWaitingPage',[player1,player2],room);
    });


    socket.on('changes',(gameState,Room,opp)=>{
        socket.to(Room).emit("updates",gameState,Room,opp);
    })


    socket.on('disconnect',()=>{
        console.log("Disconnected");
    })
})

server.listen(PORT,()=>{
    console.log("Server is running");
});
