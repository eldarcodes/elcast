import { create } from 'zustand';

import type { OnlineUsersStore } from './online-users.types';

export const onlineUsersStore = create<OnlineUsersStore>((set, get) => ({
  onlineUsers: {},

  setOnlineUsers: (users) => set({ onlineUsers: users }),

  updateUserLastActive: (userId, lastActive) =>
    set((state) => ({
      onlineUsers: { ...state.onlineUsers, [userId]: lastActive },
    })),
}));
