import { Button } from "@nextui-org/react";

interface JoinRoomButtonProps {
  openJoinRoomModal: () => void;
}

const JoinRoomButton = ({ openJoinRoomModal }: JoinRoomButtonProps) => {
  return (
    <Button
      className="min-w-56"
      color="primary"
      variant="flat"
      onClick={openJoinRoomModal}
    >
      Join Room
    </Button>
  );
};

export default JoinRoomButton;
