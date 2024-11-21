import { useEffect, useState } from 'react';
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

    const [loading, setLoading] = useState( true );
    const [error, setError] = useState<string | null>( null );

    useEffect( () => {
        const joinRoom = async () => {
            const params = new URLSearchParams( location.search );
            const roomId = params.get( 'roomId' );
            const password = params.get( 'password' );

            if ( roomId ) {
                try {
                    setLoading( true );
                    setError( null );

                    const response = await axiosInstance.post( '/rooms/join', { roomId, password } );

                    if ( response.data.message === 'Joined room successfully' ) {
                        setRoomId( roomId );
                        setPassword( password || '' );
                        setInRoom( true );
                        setSecure( response.data.secure );
                        socket.emit( 'joinRoom', { roomId, password } );
                        navigate( '/' );
                    } else {
                        console.error( 'Invalid room ID or password:', response.data.message );
                        navigate( '/error' );
                    }
                } catch ( error ) {
                    const axiosError = error as AxiosError;
                    console.error( 'Failed to join room:', axiosError.response?.data || axiosError.message );
                    setError( 'Failed to join room. Please try again.' );
                    navigate( '/error' );
                } finally {
                    setLoading( false );
                }
            }
        };

        joinRoom();
    }, [location, navigate, setRoomId, setPassword, setInRoom, socket] );

    if ( loading ) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Spinner />
                <p className='ml-2'>Joining the room...</p>
            </div>

        );
    }

    if ( error ) {
        return <div>{error}</div>;
    }

    return null;
};

export default JoinRoomViaLink;
