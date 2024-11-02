import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";
interface NicknameModalProps {
  isOpen: boolean;
  closeModal: () => void;
  setNickname: (nickname: string) => void;
}
function NicknameModal({ isOpen, closeModal, setNickname }:NicknameModalProps) {
  const [inputNickname, setInputNickname] = useState("");

  const handleSetNickname = () => {
    setNickname(inputNickname.trim());
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={closeModal} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Enter Nickname
            </ModalHeader>
            <ModalBody className="text-sm">
              <p>Please enter a nickname to identify yourself in the chat room.</p>
              <Input
                type="text"
                label="Nickname"
                labelPlacement="inside"
                placeholder="Enter your nickname"
                value={inputNickname}
                onChange={(e) => setInputNickname(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="ghost"
                onPress={closeModal}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSetNickname}
                isDisabled={!inputNickname.trim()}
              >
                Set Nickname
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NicknameModal;
