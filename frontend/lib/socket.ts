import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true, // 👈 Send cookies (including jwt)
  transports: ["websocket"], // optional, forces WebSocket only
});

export default socket;
