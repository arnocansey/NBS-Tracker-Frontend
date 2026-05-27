import { io } from 'socket.io-client';
import { API_HOST } from './axiosConfig';

let socket;

export const getSocket = () => {
  if (typeof window === 'undefined') return null;
  if (!socket) {
    socket = io(API_HOST, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });
  }
  return socket;
};
