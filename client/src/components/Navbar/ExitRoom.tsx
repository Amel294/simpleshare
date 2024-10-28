import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import useRoomStore from "../../store";
function ExitRoom() {
  const { clearRoomData } = useRoomStore();
  const handleExitRoom = () => {
    clearRoomData();
  };
  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <Button
          as={Link}
          color="primary"
          href="#"
          variant="flat"
          onPress={handleExitRoom}
        >
          Exit Room
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}

export default ExitRoom;
