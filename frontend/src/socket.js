import { io } from "socket.io-client";

// Use environment variable if available
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

const socket = io(SERVER_URL, {
  withCredentials: true,
  autoConnect: false,       // prevent auto connection
  transports: ["websocket"] // faster & cleaner
});

// Optional: connect manually when needed
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
