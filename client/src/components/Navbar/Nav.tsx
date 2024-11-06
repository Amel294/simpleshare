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
import CreateRoomModal from "../JoinAndCreateRoom/CreateRoomModal";
import JoinRoomModal from "../JoinAndCreateRoom/JoinRoomModal";

export default function Nav() {
  const { inRoom } = useRoomStore();
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);

  // Handle modal states
  const openQrModal = () => setIsQrModalOpen(true);
  const closeQrModal = () => setIsQrModalOpen(false);

  const openCreateRoomModal = () => setIsCreateRoomModalOpen(true);
  const closeCreateRoomModal = () => setIsCreateRoomModalOpen(false);

  const openJoinRoomModal = () => setIsJoinRoomModalOpen(true);
  const closeJoinRoomModal = () => setIsJoinRoomModalOpen(false);

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">SimpleShare</p>
        </NavbarBrand>

        {!inRoom ? (
          <NavbarContent justify="end">
            <NavbarItem className="lg:flex">
              <Link onClick={openCreateRoomModal}>Create Room</Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                variant="flat"
                onClick={openJoinRoomModal}
              >
                Join Room
              </Button>
            </NavbarItem>
          </NavbarContent>
        ) : (
          <div className="flex gap-4">
            <Button
              as={Link}
              color="primary"
              isIconOnly
              variant="flat"
              onClick={openQrModal}
            >
              <QrCodeIcon className="w-8" />
            </Button>
            <ExitRoom />
          </div>
        )}
      </Navbar>

      {/* Modals */}
      <ShowQrModal isOpen={isQrModalOpen} closeModal={closeQrModal} />
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        closeModel={closeCreateRoomModal}
      />
      <JoinRoomModal
        isOpen={isJoinRoomModalOpen}
        closeModel={closeJoinRoomModal}
      />
    </>
  );
}
