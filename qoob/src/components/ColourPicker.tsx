import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {SketchPicker, Color} from "react-color";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import IconButton from "./IconButton";

//the same swatches react-color shows by default, without its native hover titles
const PRESET_COLOURS = [
  "#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505", "#BD10E0", "#9013FE",
  "#4A90E2", "#50E3C2", "#B8E986", "#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF",
].map((color) => ({color, title: ""}));

const ColourPicker = () => {
  const {currentColour, setCurrentColour, setShowColourPicker} = useSBlocks();

  //FIXME Click outside of colourpicker to go out of it

  return (
    <>
      <div className="fixed left-[2%] top-[2%] z-[1000] flex h-max w-max max-w-[96vw] flex-row gap-[5px] md:left-[232px] md:top-4">
        <SketchPicker
          presetColors={PRESET_COLOURS}
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
