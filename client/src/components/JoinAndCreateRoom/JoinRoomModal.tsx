import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

function JoinRoomModal({ isOpen, closeModel }) {
  const [credentials, setCredentials] = useState({ roomId: "", password: "" });

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, roomId: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={closeModel} placement="center" >
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
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeModel}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{console.log({credentials})}}>
                  Join
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
