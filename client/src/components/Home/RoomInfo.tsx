import { Input } from "@nextui-org/react";
import CopyIcon from "../../assets/CopyIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import useRoomStore from "../../store";

interface RoomInfoProps {
  roomId: string;
  password: string;
  secure: boolean;
  isVisible: boolean;
  toggleVisibility: () => void;
  handleRoomCodeCopy: () => void;
  handlePasswordCopy: () => void;
}

const RoomInfo: React.FC<RoomInfoProps> = ({
  roomId,
  secure,
  isVisible,
  toggleVisibility,
  handleRoomCodeCopy,
  handlePasswordCopy,
}) => {
  const {  password} = useRoomStore();
  
  return (
    <div className="flex flex-col pb-2">
      <div className="flex flex-row gap-4 justify-end">
        <div>
          <Input
            type="text"
            label="Room Id"
            placeholder={roomId}
            labelPlacement="outside"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={handleRoomCodeCopy}
                aria-label="copy room ID"
              >
                <CopyIcon className="w-4" />
              </button>
            }
            isReadOnly
          />
        </div>
        {secure && (
          <div>
            <Input
              type="text"
              label="Password"
              placeholder={isVisible ? password : "******"}
              labelPlacement="outside"
              endContent={
                <div className="flex gap-3 items-center">
                  {isVisible && (
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={handlePasswordCopy}
                      aria-label="copy password"
                    >
                      <CopyIcon className="w-4 pt-[6px] flex" />
                    </button>
                  )}
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {!isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400" />
                    )}
                  </button>
                </div>
              }
              isReadOnly
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomInfo;
