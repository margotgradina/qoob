import BasicButton from "./BasicButton";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {useState} from "react";

const Settings = () => {
  const {setNumRows, numRows, numCols, setNumCols, initializeGrid, gridData, setGridData} = useSBlocks();
  const [width, setWidth] = useState<string>(numCols as unknown as string);
  const [height, setHeight] = useState<string>(numRows as unknown as string);

  //TODO: adjust so it will straight away update
  const adjustWidthAndHeight = () => {
    setNumCols(width as unknown as number);
    setNumRows(height as unknown as number);
  };

  return (
    <>
      <div
        className="absolute right-[180px] top-[2%] flex w-[100px] flex-row items-center gap-[0.7rem] max-md:static max-md:w-auto max-md:flex-wrap max-md:justify-center max-md:p-2"
      >
        <div
          className="flex w-[90px] flex-row items-center justify-between gap-[0.2rem] font-['Josefin_Sans'] text-[12px] font-normal"
        >
          <label>width</label>
          <input
            min={1}
            max={50}
            type={"number"}
            className="h-[1.2rem] w-[40px] rounded-[10px] border-0 bg-white pl-[5px] text-center font-['Josefin_Sans'] font-normal text-black"
            placeholder={"width"}
            value={width}
            onChange={(e) => {
              if ((e.target.value as unknown as number) <= 0) {
                console.log("no negatives");
              } else {
                setWidth(e.target.value);
              }
            }}
          />
        </div>
        <div
          className="flex w-[90px] flex-row items-center justify-between gap-[0.2rem] font-['Josefin_Sans'] text-[12px] font-normal"
        >
          <label>height</label>
          <input
            min={1}
            max={50}
            type={"number"}
            className="h-[1.2rem] w-[40px] rounded-[10px] border-0 bg-white pl-[5px] text-center font-['Josefin_Sans'] font-normal text-black"
            placeholder={"height"}
            value={height}
            onChange={(e) => {
              if ((e.target.value as unknown as number) <= 0) {
                console.log("no negatives");
              } else {
                setHeight(e.target.value);
              }
            }}
          />
        </div>
        <BasicButton
          onClick={() => {
            adjustWidthAndHeight();
          }}
          label={"start"}
          width={"80px"}
          minWidth={"80px"}
          height={"1.5rem"}
        />
      </div>
    </>
  );
};

export default Settings;
