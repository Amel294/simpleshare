import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useRoomStore from '../../store';
import { Socket } from 'socket.io-client';
import axiosInstance from '../../api/axiosInstance';
import { Spinner } from '@nextui-org/react';
import { AxiosError } from 'axios';

interface JoinRoomViaLinkProps {
    socket: Socket;
}

const JoinRoomViaLink: React.FC<JoinRoomViaLinkProps> = ( { socket } ) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setRoomId, setPassword, setInRoom, setSecure } = useRoomStore();

    useEffect( () => {
        const joinRoom = async () => {
            const params = new URLSearchParams( location.search );
            const roomId = params.get( 'roomId' );
            const password = params.get( 'password' );

            if ( roomId ) {
                try {
                    const response = await axiosInstance.post( '/rooms/join', { roomId, password } );

                    if ( response.data.message === "Joined room successfully" ) {
                        setRoomId( roomId );
                        setPassword( password || '' );
                        setInRoom( true );
                        setSecure( response.data.secure );
                        socket.emit( 'joinRoom', { roomId, password } );

                        navigate( '/' );
                    } else {
                        console.error( "Invalid room ID or password:", response.data.message );
                        navigate( '/error' );
                    }
                } catch ( error ) {
                    const axiosError = error as AxiosError;
                    console.error( "Failed to join room:", axiosError.response?.data || axiosError.message );
                    navigate( '/error' );
                }
            }
        };

        joinRoom();
    }, [location, navigate, setRoomId, setPassword, setInRoom, socket] );

    return (
        <div>
            <Spinner />

            <p>Joining the room...</p>
        </div>
    );
};

export default JoinRoomViaLink;
