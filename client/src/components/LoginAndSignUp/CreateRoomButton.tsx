import { Button } from "@nextui-org/react";

interface CreateRoomButtonProps {
  openCreateRoomModal: () => void;
}

const CreateRoomButton = ({ openCreateRoomModal }: CreateRoomButtonProps) => {
  return (
    <Button
      className="min-w-56"
      color="primary"
      variant="bordered"
      onClick={openCreateRoomModal}
    >
      Create Room
    </Button>
  );
};

export default CreateRoomButton;
