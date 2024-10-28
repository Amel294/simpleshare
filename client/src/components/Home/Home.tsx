import { Button,  Textarea } from "@nextui-org/react";
import Nav from "../Navbar/Nav";
import { useState } from "react";
import CopyIcon from "../../assets/CopyIcon";

function Home() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const handleTextSubmit = () => {
    setData([text.trim(), ...data]);
    setText("");
  };

  return (
    <>
      <Nav />

      <div className="pt-24 py-60 mx-auto max-w-screen-lg px-6">
        <div className="sticky top-0 bg-white z-10">
          <div className="flex flex-col  pb-2">
            <p className="text-xl flex flex-row-reverse gap-3"><Button size="sm">Show Password</Button><span> Password : Password</span><span> Room Id : Room Id </span>  </p>
            <button/>
          </div>
          <Textarea
            label="Add text"
            placeholder="Enter your description"
            size="lg"
            value={text} // Controlled input
            onValueChange={(value) => setText(value)} // Update text state with new value
          />
          <Button
            color="primary"
            className="mt-4 w-full"
            onPress={handleTextSubmit}
          >
            Send
          </Button>
        </div>

        <div className="flex flex-col gap-3 pt-10">
          {data.map((item, index) => ( 
            <div key={index} className="flex flex-row gap-2 items-center">
              <Textarea
                variant="bordered"
                value={item}
                className="max-h-24 overflow-auto" 
                minRows={1} 
              />
              <Button className="bg-transparent" variant="bordered">
                Copy
                <CopyIcon />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
