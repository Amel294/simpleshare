import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import LoginAndSignup from '../components/LoginAndSignUp/LoginAndSignup';
import useRoomStore from "../store";

import socketIO from 'socket.io-client';
const socketURL = import.meta.env.VITE_SOCKET_URL
const socket = socketIO.connect( socketURL );
const AppRoutes = () => {
    const { inRoom } = useRoomStore();

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={inRoom ? <Home socket={socket} /> : <LoginAndSignup socket={socket} />}></Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;