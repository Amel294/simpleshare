import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import useRoomStore from "../../store";
import ExitRoom from "./ExitRoom";
import QrCodeIcon from "../../assets/QrCodeIcon";
import ShowQrModal from "../QrCode/ShowQrModal";
import { useState } from "react";

export default function Nav() {
  const { inRoom } = useRoomStore();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const openQrModal = () => setIsQrModalOpen(true);
  const closeQrModal = () => setIsQrModalOpen(false);
  return (
    <>
    <Navbar >
      <NavbarBrand>
        <p className="font-bold text-inherit">SimpleShare</p>
      </NavbarBrand>
      {!inRoom ? (
        <NavbarContent justify="end">
          <NavbarItem className=" lg:flex">
            <Link href="#">Create Room</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Join Room
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <div className="flex gap-4">
          <Button as={Link} color="primary" isIconOnly variant="flat">
            <QrCodeIcon className="w-8" onClick={openQrModal}/>
          </Button>
          <ExitRoom />
        </div>
      )}
    </Navbar>
    <ShowQrModal isOpen={isQrModalOpen} closeModal={closeQrModal} />
      </>
  );
}
