import { Button, Input, Textarea } from "@nextui-org/react";
import Nav from "../Navbar/Nav";
import React, { useState } from "react";
import CopyIcon from "../../assets/CopyIcon";
import useRoomStore from "../../store";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import axios from "axios";

function Home() {
  const [data, setData] = useState( [] );
  const [text, setText] = useState( "" );
  const { roomId, password, setPassword } = useRoomStore(); // Added password from the store
  const [isVisible, setIsVisible] = useState( false );

  const handleTextSubmit = () => {
    setData( [text.trim(), ...data] );
    setText( "" );
  };

  const toggleVisibility = () => setIsVisible( !isVisible );

  // Copy the room ID to the clipboard
  const handleRoomCodeCopy = () => {
    navigator.clipboard.writeText( roomId ).then( () => {
      alert( "Room ID copied to clipboard" );
    } );
  };
  // Copy the password to the clipboard
  const handlePasswordCopy = () => {
    if ( isVisible ) {
      navigator.clipboard.writeText( password ).then( () => {
        alert( "Password copied to clipboard" );
      } );
    }
  };
  const handleRequestPassword = async () => {
    try {
      alert( "clicked" )
      // Send roomId and password to the backend
      const response = await axios.get( `http://localhost:3000/api/rooms/${ roomId }/password` );

      if ( response.status === 200 ) {
        setPassword( response.data.password )
      }
    } catch ( error ) {
      console.error( "Error creating room:", error );
      // Handle error actions here
    }
  };
  return (
    <>
      <Nav />

      <div className="pt-10 py-60 mx-auto max-w-screen-lg px-6">
        <div className="sticky top-10 bg-white z-10">
          <div className="flex flex-col pb-2">
            <div className="flex flex-row gap-4 justify-end ">
              <div className="md:max-w-[40%] ">
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
                      Copy
                    </button>
                  }
                  isReadOnly
                />
              </div>
              <div className="md:max-w-[40%]">
                <Input
                  type="text"
                  label="Password"
                  placeholder={isVisible ? password : "******"}
                  labelPlacement="outside"
                  endContent={
                    <>
                      <button
                        className="focus:outline-none flex gap-3"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible && (
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={handlePasswordCopy}
                          >
                            Copy
                          </button>
                        )}
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 " />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 " onClick={handleRequestPassword} />
                        )}
                      </button>
                    </>
                  }
                  isReadOnly
                />
              </div>
            </div>
          </div>

          <Textarea
            label="Add text"
            placeholder="Enter your description"
            size="lg"
            value={text}
            onValueChange={( value ) => setText( value )}
          />
          <Button
            color="primary"
            className="mt-4 w-full"
            onPress={handleTextSubmit}
          >
            Send
          </Button>
        </div>

        <div className="flex flex-col gap-3 pt-10">
          {data.map( ( item, index ) => (
            <div key={index} className="flex flex-row gap-2 items-center">
              <Textarea
                variant="bordered"
                value={item}
                className="max-h-24 overflow-auto"
                minRows={1}
              />
              <Button
                className="bg-transparent"
                variant="bordered"
                endContent={<CopyIcon className="w-4" />}
                onClick={() => navigator.clipboard.writeText( item )}
              >
                Copy
              </Button>
            </div>
          ) )}
        </div>
      </div>
    </>
  );
}

export default Home;
