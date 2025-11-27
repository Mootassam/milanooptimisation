
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import userListActions from 'src/modules/user/list/userListActions';
import withdrawListActions from 'src/modules/withdraw/list/withdrawListActions';
import WithdrawService from 'src/modules/withdraw/withdrawService';

let socket: Socket | null = null;

export default function useNotifications(
  userId: string,
  isAdmin: boolean = true,
) {


  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("https://www.namnooamna.com", {
        transports: ["websocket"],
        // Optional: Add reconnection options
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }

    // Register user/admin on connect
    socket.emit('register', { userId, isAdmin });

    // Debug success message
    socket.on('success', (data) => {

      console.log('✅ Backend says:', data);
    });

    // Listen to new notifications
    socket.on('admin', async (notif) => {
      await dispatch(withdrawListActions.doCountPending())

    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off('success');
        socket.off('newNotification');
      }
    };
  }, [dispatch]);


}
