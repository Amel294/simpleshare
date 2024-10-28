import { Button } from "@nextui-org/react";
import { useState } from "react";
import CreateRoomModal from "../JoinAndCreateRoom/CreateRoomModal";
import JoinRoomModal from "../JoinAndCreateRoom/JoinRoomModal";

function Buttons() {
  const [joinRoomModel, setJoinRoomModel] = useState(false);
  const [createRoomModel, setCreateModel] = useState(false);
  const closeJoinRoomModel = () => {
    setJoinRoomModel(false);
  };
  const OpenJoinRoomModel = () => {
    setJoinRoomModel(true);
  };
  const closeCreateRoomModel = () => {
    setCreateModel(false);
  };
  const OpenCreateRoomModel = () => {
    setCreateModel(true);
  };
  return (
    <div>
      <div className=" bg-white ">
        <div className="flex flex-col gap-4 items-center pt-2 ">
          <Button
            className="min-w-56"
            color="primary"
            variant="flat"
            onClick={OpenJoinRoomModel}
          >
            Join Room
          </Button>
          <Button className="min-w-56" color="primary" variant="bordered" onClick={OpenCreateRoomModel}>
            Create Room
          </Button>
          <JoinRoomModal
            isOpen={joinRoomModel}
            closeModel={closeJoinRoomModel}
          />
          <CreateRoomModal
            isOpen={createRoomModel}
            closeModel={closeCreateRoomModel}
          />
        </div>
      </div>
    </div>
  );
}

export default Buttons;
