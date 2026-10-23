import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {SketchPicker, Color} from "react-color";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import IconButton from "./IconButton";

const ColourPicker = () => {
  const {currentColour, setCurrentColour, setShowColourPicker} = useSBlocks();

  //FIXME Click outside of colourpicker to go out of it

  return (
    <>
      <div className="fixed left-[2%] top-[2%] z-[1000] flex h-max w-max max-w-[96vw] flex-row gap-[5px] md:left-[232px] md:top-4">
        <SketchPicker
          color={currentColour as unknown as Color}
          onChange={(colour: any) => {
            setCurrentColour(colour);
          }}
        />
        <IconButton icon={faCircleXmark} label="Close colour picker" size="lg" className="text-[#2f7d5b]" onClick={() => setShowColourPicker(false)} />
      </div>
    </>
  );
};

export default ColourPicker;
