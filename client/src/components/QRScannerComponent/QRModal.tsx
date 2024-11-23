import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import toast from 'react-hot-toast';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

interface QRModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const QRModal: React.FC<QRModalProps> = ( { isOpen, closeModal } ) => {
    const qrPattern = new RegExp( `${ import.meta.env.VITE_JOINROOM_URL }/join-room\\?roomId=([a-zA-Z0-9]+)&password=([a-zA-Z0-9]+)` );

    if ( !isOpen ) return null;

    const handleScan = ( result: string ) => {
        if ( result ) {
            const match = result.match( qrPattern );
            if ( match ) {
                const roomId = match[1];
                const password = match[2];
                window.location.href = `${ import.meta.env.VITE_JOINROOM_URL }/join-room?roomId=${ roomId }&password=${ password }`;
            } else {
                toast.error( 'Invalid QR Code' );
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={closeModal} placement="center">
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 items-center">
                            Scan QR Code
                        </ModalHeader>
                        <ModalBody className="text-sm">
                            <p>Scan the QR code to join a room.</p>
                            <Scanner
                                onScan={( result ) => {
                                    if ( result.length > 0 ) {
                                        const barcode = result[0];
                                        if ( barcode.rawValue ) {
                                            handleScan( barcode.rawValue );
                                        }
                                    }
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onClick={closeModal}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default QRModal;
