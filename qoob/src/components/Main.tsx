import SblockGrid from "./sBlocks/sBlockGrid";
import SBlockMenu from "./sBlocks/sBlockMenu";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {Header} from "./Header";
import {useState} from "react";
import {Unstable_NumberInput as BaseNumberInput, NumberInputProps, numberInputClasses} from "@mui/base/Unstable_NumberInput";
import BasicButton from "./BasicButton";
import FloatingButtons from "./FloatingButtons";

const Main = () => {
  const {darkTheme, setDarkTheme, setNumCols, setNumRows, numCols, numRows} = useSBlocks();
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const onClick = () => {
    setNumCols(width as unknown as number);
    setNumRows(height as unknown as number);
  };

  return (
    <>
      <div
        className={`flex h-full flex-col items-center overflow-hidden font-['Josefin_Sans'] font-semibold max-md:overflow-auto ${
          darkTheme ? "bg-[#353535] text-white" : "bg-[#dfdfdf] text-black"
        }`}
      >
        <Header />
        {
          // numRows > 0 && numCols > 0 ? (
          //   <></>
          // ) : (
          // )
        }
        <div
          className="flex min-h-0 w-full flex-1 items-center justify-center max-md:min-h-fit max-md:flex-col max-md:items-stretch"
        >
          <SBlockMenu />
          <SblockGrid />
        </div>
        {/* <FloatingButtons /> */}
      </div>
    </>
  );
};

export default Main;
