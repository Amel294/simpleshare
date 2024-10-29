import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/Home/Home';
import LoginAndSignup from '../components/LoginAndSignUp/LoginAndSignup';
import useRoomStore from "../store";

import socketIO from 'socket.io-client';
const serverPort = import.meta.env.VITE_SERVER_PORT
const socket = socketIO.connect( `http://localhost:${ serverPort }` );
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