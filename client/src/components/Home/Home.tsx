import { Button, Input, Textarea } from "@nextui-org/react";
import Nav from "../Navbar/Nav";
import { useState, useEffect } from "react";
import CopyIcon from "../../assets/CopyIcon";
import useRoomStore from "../../store";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import toast from "react-hot-toast";
import NicknameModal from "../NicknameModal/NicknameModal";
import axiosInstance from "../../api/axiosInstance";

type Message = {
  message: string;
  sender: string;
  self?: boolean;
};

function Home( { socket } ) {
  const [data, setData] = useState<Message[]>( [] );
  const [text, setText] = useState( "" );
  const { roomId, password, setPassword, secure } = useRoomStore();
  const [isVisible, setIsVisible] = useState( false );
  const [nickname, setNickname] = useState( "" );
  const [isNicknameModalOpen, setNicknameModalOpen] = useState( false );

  useEffect( () => {
    socket.emit( "joinRoom", roomId );

    socket.on( "message", ( messageData: Message ) => {
      const isSelf = messageData.sender === nickname; // Check if the sender is the current user

      // Check if the message already exists in state
      if ( !data.some( ( msg ) => msg.message === messageData.message && msg.sender === messageData.sender ) ) {
        setData( ( prevData ) => [
          { ...messageData, self: isSelf }, // Set self property based on the sender
          ...prevData,
        ] );
      }
    } );

    return () => {
      socket.off( "message" );
    };
  }, [roomId, socket, nickname, data] ); // Include data in dependencies to ensure updates are recognized

  const handleTextSubmit = () => {
    if ( !nickname ) {
      setNicknameModalOpen( true );
      return;
    }

    const messageData: Message = {
      roomId,
      message: text.trim(),
      sender: nickname,
      self: true, // Set self to true for your own message
    };

    // Emit the message
    socket.emit( 'message', messageData );
    setData( ( prevData ) => [messageData, ...prevData] ); // Add your message to the local state
    setText( "" ); // Clear the input
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
      toast.success( "Password fetched!" );
      const response = await axiosInstance.get(`/rooms/${roomId}/password`);

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
      <div className="pt-10  py-60 mx-auto max-w-screen-lg  sticky ">
        <div className="sticky top-16  bg-white px-5  z-50 ">
          <div className="flex flex-col pb-2">
            <div className="flex flex-row gap-4 justify-end">
              <div>
                <Input
                  type="text"
                  label="Room Id"
                  placeholder={roomId}
                  labelPlacement="outside"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={handleRoomCodeCopy}
                      aria-label="copy room ID"
                    >
                      <CopyIcon className="w-4" />
                    </button>
                  }
                  isReadOnly
                />
              </div>
              {secure && (
                <div>
                  <Input
                    type="text"
                    label="Password"
                    placeholder={isVisible ? password : "******"}
                    labelPlacement="outside"
                    endContent={
                      <div className="flex gap-3 items-center">
                        {isVisible && (
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={handlePasswordCopy}
                            aria-label="copy password"
                          >
                            <CopyIcon className="w-4 pt-[6px] flex" />
                          </button>
                        )}
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label="toggle password visibility"
                        >
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400" onClick={handleRequestPassword} />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400" />
                          )}
                        </button>
                      </div>
                    }
                    isReadOnly
                  />
                </div>
              )}
            </div>
          </div>
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

        <div className="flex flex-col gap-3 pt-100  p-4" >
          {data.map( ( item, index ) => (
            <div
              key={index}
              className={`flex flex-col ${ item.self ? "items-end " : "items-start" }`}
              onClick={() => handleItemCopy( item.message )}
            >
              <div className="flex flex-col items-end w-full">
                <div className="flex flex-row items-center gap-2 w-full"> {/* Ensures the row stretches full width */}
                  <div className={`flex-grow max-w-full ${ item.self ? "pl-10" : "pr-10" }`} > {/* Allow textarea to grow */}
                    {item.self && <div className="w-2"></div>}
                    <Textarea
                      label={item.self ? "You" : item.sender}
                      value={item.message}
                      className={`max-h-24 overflow-auto resize-none ${ item.self ? "border-blue-300" : "border-blue-600" } border-2 rounded-xl`} // Disable resizing and allow for overflow
                      minRows={1}
                      readOnly // Make it read-only for messages displayed
                    />
                  </div>
                </div>
              </div>
            </div>
          ) )}
        </div >

      </div>
    </>
  );
}

export default Home;
