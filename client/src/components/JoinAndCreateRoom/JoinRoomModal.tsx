import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import useRoomStore from "../../store";

function JoinRoomModal({ isOpen, closeModel }) {
  const [credentials, setCredentials] = useState({ roomId: "", password: "" });
  const [isSecured, setIsSecured] = useState(true);
  const {setInRoom} = useRoomStore()
  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, roomId: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }));
  };
  const {setRoomId} = useRoomStore()
  const handleCreateRoom = async () => {
    try {
      // Send roomId and password to the backend
      const response = await axios.post("http://localhost:3000/api/rooms/join", {
        roomId: credentials.roomId,
        password: credentials.password,
        isSecured : isSecured
      });

      if (response.status === 200) {
        console.log("Room created successfully", response.data);
        setRoomId(response.data.roomId)
        setInRoom(true)
      }
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error actions here
    }
  };
  const handleSecureChange = () => {
    setIsSecured(!isSecured);
  };
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={closeModel} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Join Room
              </ModalHeader>
              <ModalBody className="text-sm">
                <p>
                  If you are logging into a secured room, add the password or
                  leave the password field empty.
                </p>
                <Input
                  type="text"
                  label="Room Id"
                  labelPlacement="inside"
                  value={credentials.roomId}
                  onChange={handleRoomIdChange}
                />
                <Input
                  type="password"
                  label="Password"
                  labelPlacement="inside"
                  value={credentials.password}
                  onChange={handlePasswordChange}
                  isDisabled={!isSecured}
                />
                <Checkbox onClick={handleSecureChange}>
                  No password
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                
                <Button color="primary" onPress={handleCreateRoom}>
                  {`Join ${!isSecured ? "Secure" : "Unsecure"} Room`}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default JoinRoomModal;
