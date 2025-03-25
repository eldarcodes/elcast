export type OnlineUsers = Record<PropertyKey, string>;

export interface OnlineUsersStore {
  onlineUsers: OnlineUsers;

  setOnlineUsers: (onlineUsers: OnlineUsers) => void;
  updateUserLastActive: (userId: string, lastActive: string) => void;
}
