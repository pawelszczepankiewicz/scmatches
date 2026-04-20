import { ref, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client';

export function useSocket() {
  const connected = ref(false);
  const wsUrl = import.meta.env.VITE_WS_URL || (import.meta.env.DEV ? 'http://localhost:3000' : undefined);
  const socket: Socket = io(wsUrl as string, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
  });

  socket.on('connect', () => {
    connected.value = true;
  });

  socket.on('disconnect', () => {
    connected.value = false;
  });

  onUnmounted(() => {
    socket.disconnect();
  });

  return { socket, connected };
}
