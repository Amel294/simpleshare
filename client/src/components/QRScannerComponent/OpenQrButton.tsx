import { Button } from "@nextui-org/react";
interface OpenQrButtonProps {
    openQRModal: () => void;
}
const OpenQrButton = ( { openQRModal }: OpenQrButtonProps ) => {
    return (
        <Button
            className="min-w-32 max-w-xl md:min-w-56 w-[70%]"
            color="primary"
            variant="flat"
            onClick={openQRModal}
        >
            Scan & Join
        </Button>
    );
};

export default OpenQrButton;
