import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

interface RoomState {
  roomId: string;
  password: string;
  inRoom: boolean;
  data: string[];
  setRoomId: (roomId: string) => void;
  setPassword: (password: string) => void;
  setInRoom: (inRoom: boolean) => void;
  addData: (text: string) => void;
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
  persist(
    (set) => ({
      roomId: '',
      password: '',
      inRoom: false,
      data: [],
      setRoomId: (roomId) => set(() => ({ roomId })),
      setPassword: (password) => set(() => ({ password })),
      setInRoom: (inRoom) => set(() => ({ inRoom })),
      addData: (text) =>
        set((state) => ({ data: [...state.data, text] })),
      clearRoomData: () => set(() => ({ roomId: '', password: '', inRoom: false, data: [] })),
    }),
    {
      name: 'room-store',
      storage: localStorageProvider,
    }
  )
);

export default useRoomStore;
