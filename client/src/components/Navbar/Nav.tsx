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

export default function Nav() {
  const { inRoom } = useRoomStore();
  return (
    <Navbar >
      <NavbarBrand>
        <p className="font-bold text-inherit">SimpleShare</p>
      </NavbarBrand>
      {!inRoom ? (
        <NavbarContent justify="end">
          <NavbarItem className=" lg:flex">
            <Link href="#">Create Room</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Join Room
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <div className="flex gap-4">
          <Button as={Link} color="primary" isIconOnly variant="flat">
            <QrCodeIcon className="w-8"/>
          </Button>
          <ExitRoom />
        </div>
      )}
    </Navbar>
  );
}
