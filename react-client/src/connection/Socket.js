import io from 'socket.io-client';

const socket = io('https://tic-tac-toe-v2z1.onrender.com');
// const socket=io('http://localhost:5000');

export default socket;