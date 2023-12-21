import io from 'socket.io-client';

let socket = io("//localhost:3004");

export default socket;