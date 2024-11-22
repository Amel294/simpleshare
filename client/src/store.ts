import { create } from 'zustand';
import { persist, PersistStorage, devtools } from 'zustand/middleware';

interface RoomState {
  roomId: string;
  password: string;
  secure: boolean;
  inRoom: boolean;
  data: string[];
  nickname: string;
  setRoomId: (roomId: string) => void;
  setPassword: (password: string) => void;
  setSecure: (secure: boolean) => void;
  setInRoom: (inRoom: boolean) => void;
  addData: (text: string) => void;
  setNickName: (nickname: string) => void;
  clearRoomData: () => void;
}

const localStorageProvider: PersistStorage<RoomState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

const useRoomStore = create<RoomState>()(
  devtools(
    persist(
      (set) => ({
        roomId: '',
        password: '',
        secure: false,
        inRoom: false,
        data: [],
        nickname: '',
        setRoomId: (roomId) => set(() => ({ roomId }), false, 'room/setRoomId'),
        setPassword: (password) => set(() => ({ password }), false, 'room/setPassword'),
        setSecure: (secure) => set(() => ({ secure }), false, 'room/setSecure'),
        setInRoom: (inRoom) => set(() => ({ inRoom }), false, 'room/setInRoom'),
        addData: (text) => set((state) => ({ data: [...state.data, text] }), false, 'room/addData'),
        setNickName: (nickname) => set(() => ({ nickname }), false, 'room/setNickName'), // Corrected this
        clearRoomData: () =>
          set(() => ({ roomId: '', password: '', secure: false, inRoom: false, data: [], nickname: '' }), false, 'room/clearRoomData'),
      }),
      {
        name: 'room-store',
        storage: localStorageProvider,
      }
    ),
    { name: 'RoomStore', enabled: process.env.NODE_ENV !== 'production' }
  )
);

export default useRoomStore;
