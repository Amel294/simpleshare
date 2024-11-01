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
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import useRoomStore from "../../store"; // Importing Zustand store

function CreateRoomModal({ isOpen, closeModel }) {
  const [credentials, setCredentials] = useState({ roomId: "", password: "" });
  const [isSecured, setIsSecured] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Zustand store actions
  const { setRoomId, setInRoom, setSecure } = useRoomStore();

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, roomId: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleCreateRoom = async () => {
    try {
      const response = await axiosInstance.post('/rooms/create', {
        roomId: credentials.roomId,
        password: credentials.password,
        isSecured,
      });

      if (response.status === 200) {
        console.log("Room created successfully", response.data);

        // Update Zustand store with room details
        setRoomId(response.data.roomId);
        setInRoom(true);
        setSecure(response.data.secure);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleSecureChange = () => {
    setIsSecured(!isSecured);
    setCredentials((prev) => ({ ...prev, password: "" }));
  };

  const handleGenerateRandomRoom = async () => {
    try {
      const response = await axiosInstance.post('/rooms/createrandom', {
        isSecured,
      });
  
      if (response.status === 200) {
        console.log("Random Room Generated Successfully", response.data);
        const { roomId, password } = response.data;
        setCredentials({ roomId, password });

        // Update Zustand store with random room details
        setRoomId(roomId);
        setInRoom(true);
        setSecure(response.data.isSecured);
      }
    } catch (error) {
      console.error("Error generating random room:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={closeModel} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Create Room
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
                  type={passwordVisible ? "text" : "password"}
                  label="Password"
                  labelPlacement="inside"
                  value={credentials.password}
                  onChange={handlePasswordChange}
                  isDisabled={!isSecured}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label="toggle password visibility"
                    >
                      {passwordVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                <Checkbox isSelected={!isSecured} onChange={handleSecureChange}>
                  No password
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color={isSecured ? "primary" : "warning"} variant="ghost" onPress={handleGenerateRandomRoom}> 
                  {`Create Random ${isSecured ? "Secured" : "Unsecured"} Room`}
                </Button>
                <Button color="primary" onPress={handleCreateRoom}>
                  Create Room
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CreateRoomModal;
