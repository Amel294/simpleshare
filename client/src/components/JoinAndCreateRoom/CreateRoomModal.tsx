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
import useRoomStore from "../../store";
import { validateRoomId, validatePassword } from "../../utils/validation"; 

interface CreateRoomModalProps {
  isOpen: boolean;
  closeModel: () => void;
}

function CreateRoomModal({ isOpen, closeModel }: CreateRoomModalProps) {
  const [credentials, setCredentials] = useState({ roomId: "", password: "" });
  const [isSecured, setIsSecured] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ roomId?: string; password?: string }>({});

  const { setRoomId, setInRoom, setSecure } = useRoomStore();

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, roomId: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  const validateInputs = () => {
    const roomIdError = validateRoomId(credentials.roomId);
    const passwordError = validatePassword(credentials.password, isSecured);
    
    setErrors({ roomId: roomIdError, password: passwordError });
    return !roomIdError && !passwordError;
  };

  const handleCreateRoom = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axiosInstance.post("/rooms/create", {
        roomId: credentials.roomId,
        password: credentials.password,
        isSecured,
      });

      if (response.status === 200) {
        setRoomId(response.data.roomId);
        setInRoom(true);
        setSecure(response.data.isSecured);
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
      const response = await axiosInstance.post("/rooms/createrandom", {
        isSecured,
      });

      if (response.status === 200) {
        const { roomId, password } = response.data;
        setCredentials({ roomId, password });
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
                  isInvalid={!!errors.roomId}
                  errorMessage={errors.roomId}
                />

                <Input
                  type={passwordVisible ? "text" : "password"}
                  label="Password"
                  labelPlacement="inside"
                  value={credentials.password}
                  onChange={handlePasswordChange}
                  isDisabled={!isSecured}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password}
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
                <Button
                  color={isSecured ? "primary" : "warning"}
                  variant="ghost"
                  onPress={handleGenerateRandomRoom}
                >
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
