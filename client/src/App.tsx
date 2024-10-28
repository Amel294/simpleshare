import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
import Home from './components/Home/Home';
import LoginAndSignup from './components/LoginAndSignUp/LoginAndSignup';
const serverPort = import.meta.env.VITE_SERVER_PORT
console.log(serverPort)
const socket = socketIO.connect(`http://localhost:${serverPort}`);
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/login" element={<LoginAndSignup socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;