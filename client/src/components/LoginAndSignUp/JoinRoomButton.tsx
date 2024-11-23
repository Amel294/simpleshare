import { Button } from "@nextui-org/react";

interface JoinRoomButtonProps {
  openJoinRoomModal: () => void;
}

const JoinRoomButton = ({ openJoinRoomModal }: JoinRoomButtonProps) => {
  return (
    <Button
      className="min-w-32 max-w-xl md:min-w-56 w-[70%]"
      color="primary"
      variant="flat"
      onClick={openJoinRoomModal}
    >
      Join Room
    </Button>
  );
};

export default JoinRoomButton;
