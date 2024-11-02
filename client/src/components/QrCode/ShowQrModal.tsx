import { useState, useEffect } from "react";
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

function ShowQrModal({ isOpen, closeModal }) {
  const { roomId, password, secure, setPassword } = useRoomStore();
  const [roomUrl, setRoomUrl] = useState(`www.simpleshare.amelumesh.com/join-room?roomId=${roomId}`);

  useEffect(() => {
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

      setRoomUrl(`www.simpleshare.amelumesh.com/join-room?roomId=${roomId}${fetchedPassword ? `&password=${fetchedPassword}` : ""}`);
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
