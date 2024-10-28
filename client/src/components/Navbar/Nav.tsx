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

export default function Nav() {
  const {inRoom} = useRoomStore();
  return (
    <Navbar shouldHideOnScroll>
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
        <ExitRoom/>
      )}
    </Navbar>
  );
}
