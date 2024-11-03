import { useState, useEffect, FC } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import useRoomStore from "../../store";
import axiosInstance from "../../api/axiosInstance";

interface ShowQrModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ShowQrModal: FC<ShowQrModalProps> = ({ isOpen, closeModal }) => {
  const { roomId, password, secure, setPassword } = useRoomStore();
  const [roomUrl, setRoomUrl] = useState("");

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL; 
    const initialUrl = `${baseUrl}/join-room?roomId=${roomId}`;
    setRoomUrl(initialUrl); // Set initial room URL

    if (password !== "") return;
    const fetchPassword = async () => {
      let fetchedPassword = password;

      if (secure && !password) {
        try {
          const response = await axiosInstance.get(`/rooms/${roomId}/password`);
          fetchedPassword = response.data.password;
          setPassword(fetchedPassword); // Update password in Zustand store
        } catch (error) {
          console.error("Error fetching password:", error);
          return;
        }
      }

      setRoomUrl(`${baseUrl}/join-room?roomId=${roomId}${fetchedPassword ? `&password=${fetchedPassword}` : ""}`);
    };

    fetchPassword();
  }, [roomId, password, secure, setPassword]);

  return (
    <Modal isOpen={isOpen} onOpenChange={closeModal} placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Room QR Code
            </ModalHeader>
            <ModalBody className="text-sm flex flex-col items-center">
              <p>Scan the QR code to join the room.</p>
              <QRCodeSVG value={roomUrl} size={128} />
              <p>{roomUrl}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ShowQrModal;
