import { Button } from "@nextui-org/react";
import { useState } from "react";
import JoinRoomModal from "../JoinAndCreateRoom/JoinRoomModal";

function Buttons() {
    const [joinRoomModel,setJoinRoomModel] = useState(false)
    const closeJoinRoomModel = ()=>{
        setJoinRoomModel(false)
    }
    const OpenJoinRoomModel = ()=>{
        setJoinRoomModel(true)
    }
  return (
    <div>
      <div className=" bg-white ">
        <div className="flex flex-col gap-4 items-center pt-2 ">
          <Button className="min-w-56" color="primary" variant="flat" onClick={OpenJoinRoomModel}>
            Join Room
          </Button>
          <Button className="min-w-56" color="primary" variant="bordered" >
            Create Room
          </Button>
          <JoinRoomModal isOpen= {joinRoomModel} closeModel={closeJoinRoomModel} />
        </div>
      </div>
    </div>
  );
}

export default Buttons;
