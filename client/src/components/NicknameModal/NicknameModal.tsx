import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { validateNickname } from "../../utils/validation";

interface NicknameModalProps {
  isOpen: boolean;
  closeModal: () => void;
  setNickname: (nickname: string) => void;
}

function NicknameModal({ isOpen, closeModal, setNickname }: NicknameModalProps) {
  const [inputNickname, setInputNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNickname(value);

    if (errorMessage) {
      const validationError = validateNickname(value);
      setErrorMessage(validationError || ""); 
    }
  };

  const handleSetNickname = () => {
    const validationError = validateNickname(inputNickname);

    if (validationError) {
      setErrorMessage(validationError); 
    } else {
      setNickname(inputNickname.trim());
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={closeModal} placement="center">
      <ModalContent>
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
            onChange={handleInputChange} 
            isInvalid={!!errorMessage} 
            errorMessage={errorMessage} 
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" variant="ghost" onPress={closeModal}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSetNickname}
            isDisabled={!inputNickname.trim() || !!errorMessage} 
          >
            Set Nickname
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NicknameModal;
