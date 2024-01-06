import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = "http://localhost:81";

const useSocket = (currentUser) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    // Initialize socket connection
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ["polling"],
      transportOptions: {
        polling: {
          extraHeaders: {
            "authorization": `Bearer ${currentUser?.access_token}`,
          },
        },
      },
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => newSocket.close();
  }, [currentUser]);

  return socket;
};
export default useSocket;
