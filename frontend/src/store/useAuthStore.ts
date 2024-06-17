import { create } from "zustand";
import zustymiddleware from 'zustymiddleware';

const useAuthStore = create(zustymiddleware((set: any) => ({
  user: null,
  isAuth: false,
  setIsAuth: (status: any) => set((state: any) => ({ isAuth: status })),
  setUser: (user: any) => set((state: any) => ({ user: user })),
  login: (userData: any) =>
    set((state: any) => ({ user: userData, isAuth: true })),
  logout: () => set((state: any) => ({ user: null, isAuth: false })),
})));

window.authStore = useAuthStore;
export default useAuthStore;