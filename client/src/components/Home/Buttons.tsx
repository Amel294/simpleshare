import { Button } from "@nextui-org/react";

function Buttons() {
  return (
    <div>
      <div className=" bg-white ">
        <div className="flex flex-col gap-4 items-center pt-2 ">
          <Button className="min-w-56" color="primary" variant="flat">
            Join Room
          </Button>
          <Button className="min-w-56" color="primary" variant="bordered">
            Create Room
          </Button>
          
        </div>
      </div>
    </div>
  );
}

export default Buttons;
