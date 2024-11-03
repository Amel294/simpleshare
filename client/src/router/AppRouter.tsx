import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import LoginAndSignup from '../components/LoginAndSignUp/LoginAndSignup';
import useRoomStore from "../store";
import socketIO from 'socket.io-client';
import JoinRoomViaLink from '../components/JoinAndCreateRoom/JoinRoomViaLink';

const socketURL = import.meta.env.VITE_SOCKET_URL;
const socket = socketIO(socketURL);

const AppRoutes = () => {
    const { inRoom } = useRoomStore();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={inRoom ? <Home socket={socket} /> : <LoginAndSignup />} />
                <Route path="/join-room" element={<JoinRoomViaLink socket={socket} />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
