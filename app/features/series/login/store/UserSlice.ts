import type { StateCreator } from "zustand";
import type { User } from "~/models/user.model";

export interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const UserSlice: StateCreator<UserState> = (set, get) => ({
  user: {} as User,
  setUser: (user) => {
    set({ user });
  },
});
