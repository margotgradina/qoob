import SblockGrid from "./sBlocks/sBlockGrid";
import SBlockMenu from "./sBlocks/sBlockMenu";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {useEffect, useState} from "react";
import {Unstable_NumberInput as BaseNumberInput, NumberInputProps, numberInputClasses} from "@mui/base/Unstable_NumberInput";
import FloatingButtons from "./FloatingButtons";

const Main = () => {
  const {darkTheme, setDarkTheme, setNumCols, setNumRows, numCols, numRows} = useSBlocks();
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const {undo, redo} = useSBlocks();

  //Ctrl/Cmd+Z to undo, Ctrl/Cmd+Shift+Z or Ctrl+Y to redo (not while typing in a field)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((key === "z" && e.shiftKey) || key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [undo, redo]);

  const onClick = () => {
    setNumCols(width as unknown as number);
    setNumRows(height as unknown as number);
  };

  return (
    <>
      <div
        className={`flex h-full w-full flex-row items-stretch overflow-hidden font-['Josefin_Sans'] font-semibold max-md:flex-col max-md:overflow-auto ${
          darkTheme ? "bg-[#353535] text-white" : "bg-[#dfdfdf] text-black"
        }`}
      >
        <SBlockMenu />
        <SblockGrid />
      </div>
    </>
  );
};

export default Main;
