import { useState } from "react";
import CreateRoomModal from "../JoinAndCreateRoom/CreateRoomModal";
import JoinRoomModal from "../JoinAndCreateRoom/JoinRoomModal";
import JoinRoomButton from "./JoinRoomButton";
import CreateRoomButton from "./CreateRoomButton";

function Buttons() {
  const [joinRoomModel, setJoinRoomModel] = useState(false);
  const [createRoomModel, setCreateModel] = useState(false);

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

  return (
    <div className="bg-white">
      <div className="flex  flex-col gap-4 items-center py-2 portrait:py-10">
        <CreateRoomButton openCreateRoomModal={openCreateRoomModel} />
        <JoinRoomButton openJoinRoomModal={openJoinRoomModel} />
        <JoinRoomModal isOpen={joinRoomModel} closeModel={closeJoinRoomModel} />
        <CreateRoomModal isOpen={createRoomModel} closeModel={closeCreateRoomModel} />
      </div>
    </div>
  );
}

export default Buttons;
