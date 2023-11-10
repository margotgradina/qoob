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
    setNumCols(width as unknown as number);
    setNumRows(height as unknown as number);
  };

  return (
    <>
      <div
        className={css`
          position: absolute;
          right: 180px;
          top: 2%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.7rem;
          /* background-color: yellow; */
          width: 100px;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            width: 90px;
            justify-content: space-between;
            font-family: "Josefin Sans";
            font-weight: 400;
            align-items: center;
            font-size: 12px;
            gap: 0.2rem;
          `}
        >
          <label>width</label>
          <input
            min={1}
            max={50}
            type={"number"}
            className={css`
              background-color: rgb(255, 255, 255);
              color: #000;
              width: 40px;
              text-align: center;
              height: 1.2rem;
              border: 0px;
              border-radius: 10px;
              padding-left: 5px;
              font-family: "Josefin Sans";
              font-weight: 400;
            `}
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
          className={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-family: "Josefin Sans";
            font-weight: 400;
            width: 90px;
            align-items: center;
            font-size: 12px;
            gap: 0.2rem;
          `}
        >
          <label>height</label>
          <input
            min={1}
            max={50}
            type={"number"}
            className={css`
              background-color: rgb(255, 255, 255);
              color: #000;
              width: 40px;
              text-align: center;
              height: 1.2rem;
              border: 0px;
              border-radius: 10px;
              padding-left: 5px;
              font-family: "Josefin Sans";
              font-weight: 400;
            `}
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
