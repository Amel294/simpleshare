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

interface ShowQrModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ShowQrModal: FC<ShowQrModalProps> = ( { isOpen, closeModal } ) => {
  const { roomId, password, secure, setPassword } = useRoomStore();
  const [roomUrl, setRoomUrl] = useState( "" );

  useEffect( () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const initialUrl = `${ baseUrl }/join-room?roomId=${ roomId }`;
    setRoomUrl( initialUrl ); // Set initial room URL

    if ( secure && password ) {
      setRoomUrl( `${ baseUrl }/join-room?roomId=${ roomId }${ password ? `&password=${ password }` : "" }` );
    }
    else {
      setRoomUrl( `${ baseUrl }/join-room?roomId=${ roomId }` )
    }
  }, [roomId, password, secure, setPassword] );

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
