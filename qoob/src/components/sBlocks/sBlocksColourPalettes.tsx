import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../IconButton";
import {useEffect} from "react";
import {useSBlocks} from "./hooks/useSBlocks";

export const SBlocksColourPalettes = () => {
  const {handleSetColourPaletteArray, setShowPaletteTemplates, fetchSBlocksColourTemplates, paletteArray} = useSBlocks();

  useEffect(() => {
    fetchSBlocksColourTemplates();
  }, []);

  return (
    <>
      <div
        className="fixed left-[2%] top-[2%] z-[1000] h-max w-max rounded-[15px] border border-solid border-[#808080] bg-white p-[10px] max-w-[96vw] md:left-[232px] md:top-4"
      >
        <IconButton icon={faCircleXmark} label="Close palettes" className="text-[#2f7d5b]" onClick={() => setShowPaletteTemplates(false)} />
        <div
          className="scroll-thin flex h-[200px] w-[200px] flex-col gap-4 overflow-y-auto p-[10px]"
        >
          {paletteArray?.map((palette) => {
            return (
              <div
                role="button"
                tabIndex={0}
                key={palette.name}
                onClick={() => {
                  handleSetColourPaletteArray(palette.colours);
                  setShowPaletteTemplates(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSetColourPaletteArray(palette.colours);
                    setShowPaletteTemplates(false);
                  }
                }}
                className="flex flex-col gap-2 rounded-[15px] border border-dashed border-[#808080] py-2 pl-2 pr-0"
              >
                <label>{palette.name}</label>
                <div
                  className="flex w-full flex-row items-center justify-evenly"
                >
                  {palette.colours?.map((colour, index) => {
                    return (
                      <div
                        className="h-[1vw] max-h-[20px] w-[1vw] max-w-[20px] rounded-[5px] border-[0.5px] border-solid border-[#808080] max-md:h-5 max-md:w-5" style={{backgroundColor: colour?.hex}}
                      ></div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SBlocksColourPalettes;
