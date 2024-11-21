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
import useRoomStore from "../../store";
import axiosInstance from "../../api/axiosInstance";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { validateRoomId, validatePassword } from "../../utils/validation";

interface JoinRoomModalProps {
  isOpen: boolean;
  closeModel: () => void;
}

function JoinRoomModal({ isOpen, closeModel }: JoinRoomModalProps) {
  const [credentials, setCredentials] = useState({ roomId: "", password: "" });
  const [passwordIsSecure, setPasswordIsSecure] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ roomId?: string; password?: string }>({});

  const { setInRoom, setSecure, setRoomId ,setPassword} = useRoomStore();

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, roomId: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  const validateInputs = () => {
    const roomIdError = validateRoomId(credentials.roomId);
    const passwordError = validatePassword(credentials.password, passwordIsSecure);

    setErrors({ roomId: roomIdError, password: passwordError });
    return !roomIdError && !passwordError;
  };

  const handleJoinRoom = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axiosInstance.post("/rooms/join", {
        roomId: credentials.roomId,
        password: credentials.password,
        passwordIsSecure,
      });

      if (response.status === 200) {
        console.log("Room joined successfully", response.data);
        setRoomId(response.data.roomId);
        setPassword(response.data.password)
        setInRoom(true);
        setSecure(response.data.secure);
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSecureChange = () => {
    setPasswordIsSecure(!passwordIsSecure);
    setCredentials((prev) => ({ ...prev, password: "" }));
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
                  If you are joining a secured room, enter the password, or
                  check "No password" if the room is unsecured.
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
                  isDisabled={!passwordIsSecure}
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

                <Checkbox isSelected={!passwordIsSecure} onChange={handleSecureChange}>
                  No password
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleJoinRoom}>
                  {`Join ${passwordIsSecure ? "Secure" : "Unsecure"} Room`}
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
