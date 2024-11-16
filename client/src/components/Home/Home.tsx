import { Button, Textarea } from "@nextui-org/react";
import Nav from "../Navbar/Nav";
import { useState, useEffect } from "react";
import useRoomStore from "../../store";
import toast from "react-hot-toast";
import NicknameModal from "../NicknameModal/NicknameModal";
import axiosInstance from "../../api/axiosInstance";
import { Socket } from "socket.io-client";
import { validateMessage } from "../../utils/validation";
import RoomInfo from "./RoomInfo";

type Message = {
  roomId: string;
  message: string;
  sender: string;
  self?: boolean;
};

interface HomeProps {
  socket: Socket;
}

function Home( { socket }: HomeProps ) {
  const [data, setData] = useState<Message[]>( [] );
  const [text, setText] = useState( "" );
  const [messageError, setMessageError] = useState<string>( "" );
  const { roomId, password, setPassword, secure } = useRoomStore();
  const [isVisible, setIsVisible] = useState( false );
  const [nickname, setNickname] = useState( "" );
  const [isNicknameModalOpen, setNicknameModalOpen] = useState( false );

  useEffect( () => {
    socket.emit( "joinRoom", roomId );

    socket.on( "message", ( messageData: Message ) => {
      const isSelf = messageData.sender === nickname;

      if ( !data.some( msg => msg.message === messageData.message && msg.sender === messageData.sender ) ) {
        setData( prevData => [
          { ...messageData, self: isSelf },
          ...prevData,
        ] );
      }
    } );

    return () => {
      socket.off( "message" );
    };
  }, [roomId, socket, nickname, data] );

  const handleTextSubmit = () => {
    const error = validateMessage( text );
    if ( error ) {
      setMessageError( error );
      return;
    }

    if ( !nickname ) {
      setNicknameModalOpen( true );
      return;
    }

    const messageData: Message = {
      roomId,
      message: text.trim(),
      sender: nickname,
      self: true,
    };

    socket.emit( 'message', messageData );
    setData( prevData => [messageData, ...prevData] );
    setText( "" );
    setMessageError( "" );
  };

  const toggleVisibility = () => setIsVisible( !isVisible );

  const handleRoomCodeCopy = () => {
    navigator.clipboard.writeText( roomId ).then( () => {
      toast.success( "Room ID copied!" );
    } );
  };

  const handlePasswordCopy = () => {
    if ( isVisible ) {
      navigator.clipboard.writeText( password ).then( () => {
        toast.success( "Password copied!" );
      } );
    }
  };

  const handleRequestPassword = async () => {
    try {
      if ( password ) return;
      toast.success( "Password fetched!" );
      const response = await axiosInstance.get( `/rooms/${ roomId }/password` );

      if ( response.status === 200 ) {
        setPassword( response.data.password );
      }
    } catch ( error ) {
      console.error( "Error fetching password:", error );
    }
  };

  const handleItemCopy = ( item: string ) => {
    navigator.clipboard.writeText( item );
    toast.success( "Copied!", { duration: 500 } );
  };

  return (
    <>
      <NicknameModal
        isOpen={isNicknameModalOpen}
        closeModal={() => setNicknameModalOpen( false )}
        setNickname={setNickname}
      />

      <Nav />
      <div className="pt-10 py-60 mx-auto max-w-screen-lg sticky">
        <div className="sticky top-16 bg-white px-5 z-50">
        <RoomInfo
            roomId={roomId}
            password={password}
            secure={secure}
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
            handleRoomCodeCopy={handleRoomCodeCopy}
            handlePasswordCopy={handlePasswordCopy}
          />
          <div className="pb-2 drop-shadow-md">
            <Textarea
              label="Add text"
              placeholder="Enter your message"
              size="lg"
              value={text}
              onValueChange={( value ) => setText( value )}
              onKeyDown={( e ) => {
                if ( e.key === 'Enter' ) {
                  e.preventDefault();
                  handleTextSubmit();
                }
              }}
              isInvalid={!!messageError}
              errorMessage={messageError}
            />
            <Button
              color="primary"
              className="mt-4 w-full"
              onPress={handleTextSubmit}
            >
              Send
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-100 p-4">
          {data.map( ( item, index ) => (
            <div
              key={index}
              className={`flex flex-col ${ item.self ? "items-end " : "items-start" }`}
              onClick={() => handleItemCopy( item.message )}
            >
              <div className="flex flex-col items-end w-full">
                <div className="flex flex-row items-center gap-2 w-full">
                  <div className={`flex-grow max-w-full ${ item.self ? "pl-10" : "pr-10" }`}>
                    {item.self && <div className="w-2"></div>}
                    <Textarea
                      label={item.self ? "You" : item.sender}
                      value={item.message}
                      className={`max-h-24 overflow-auto resize-none ${ item.self ? "border-blue-300" : "border-blue-600" } border-2 rounded-xl`}
                      minRows={1}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          ) )}
        </div>
      </div>
    </>
  );
}

export default Home;
