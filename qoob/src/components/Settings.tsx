import {css} from "@emotion/css";
import BasicButton from "./BasicButton";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {useState} from "react";

const Settings = () => {
  const {setNumRows, numRows, numCols, setNumCols, initializeGrid, gridData, setGridData} = useSBlocks();
  const [width, setWidth] = useState<string>(numCols as unknown as string);
  const [height, setHeight] = useState<string>(numRows as unknown as string);

  //TODO: adjust so it will straight away update
  const adjustWidthAndHeight = () => {
    setGridData([]);
    setNumCols(width as unknown as number);
    setNumRows(height as unknown as number);
    initializeGrid();
  };

  return (
    <>
      <div
        className={css`
          position: absolute;
          right: 5%;
          top: 2%;
          /* background-color: yellow; */
          width: 100px;
        `}
      >
        <input
          className={css`
            background-color: #ffffff;
            color: #000;
            border: 0px;
            border-radius: 10px;
            padding-left: 5px;
          `}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder={"breedte"}
        />
        <input
          className={css`
            background-color: #ffffff;
            color: #000;
            border: 0px;
            border-radius: 10px;
            padding-left: 5px;
          `}
          placeholder={"hoogte"}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <BasicButton
          onClick={() => {
            adjustWidthAndHeight();
          }}
          label={"start"}
          width={"300px"}
          minWidth={"170px"}
          height={"1.5rem"}
        />
      </div>
    </>
  );
};

export default Settings;
