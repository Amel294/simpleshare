import { Button } from "@nextui-org/react";

interface CreateRoomButtonProps {
  openCreateRoomModal: () => void;
}

const CreateRoomButton = ({ openCreateRoomModal }: CreateRoomButtonProps) => {
  return (
    <Button
      className="min-w-32 max-w-xl md:min-w-56 w-[70%]"
      color="primary"
      variant="bordered"
      onClick={openCreateRoomModal}
    >
      Create Room
    </Button>
  );
};

export default CreateRoomButton;
