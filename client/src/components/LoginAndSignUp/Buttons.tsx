import { useState } from "react";
import CreateRoomModal from "../JoinAndCreateRoom/CreateRoomModal";
import JoinRoomModal from "../JoinAndCreateRoom/JoinRoomModal";
import JoinRoomButton from "./JoinRoomButton";
import CreateRoomButton from "./CreateRoomButton";
import QRModal from "../QRScannerComponent/QRModal";
import OpenQrButton from "../QRScannerComponent/OpenQrButton";

function Buttons() {
  const [joinRoomModel, setJoinRoomModel] = useState(false);
  const [createRoomModel, setCreateModel] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const closeJoinRoomModel = () => {
    setJoinRoomModel(false);
  };

  const openJoinRoomModel = () => {
    setJoinRoomModel(true);
  };

  const closeCreateRoomModel = () => {
    setCreateModel(false);
  };

  const openCreateRoomModel = () => {
    setCreateModel(true);
  };

  const openQRModal = () => {
    setIsQRModalOpen(true);
  };

  const closeQRModal = () => {
    setIsQRModalOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="flex  flex-col gap-4 items-center py-2 portrait:py-10">
        <CreateRoomButton openCreateRoomModal={openCreateRoomModel} />
        <OpenQrButton openQRModal={openQRModal}/>
        <JoinRoomButton openJoinRoomModal={openJoinRoomModel} />
        <JoinRoomModal isOpen={joinRoomModel} closeModel={closeJoinRoomModel} />
        <CreateRoomModal isOpen={createRoomModel} closeModel={closeCreateRoomModel} />
        <QRModal isOpen={isQRModalOpen} closeModal={closeQRModal}/>
      </div>
    </div>
  );
}

export default Buttons;
