import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Nav() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">SimpleShare</p>
      </NavbarBrand>
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
    </Navbar>
  );
}
