import {css} from "@emotion/css";
import SblockGrid from "./sBlocks/sBlockGrid";
import SBlockMenu from "./sBlocks/sBlockMenu";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {Header} from "./Header";
import {useState} from "react";
import {Unstable_NumberInput as BaseNumberInput, NumberInputProps, numberInputClasses} from "@mui/base/Unstable_NumberInput";
import BasicButton from "./BasicButton";
import Settings from "./Settings";

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
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 99%;
          background-color: ${darkTheme ? "#353535" : "#dfdfdf"};
          color: ${darkTheme ? "#fff" : "#000"};
          font-family: "Josefin Sans";
          font-weight: 600;
        `}
      >
        <Header />
        {
          // numRows > 0 && numCols > 0 ? (
          //   <></>
          // ) : (
          // )
        }
        <div
          className={css`
            width: 100%;
            /* height: 99%; */
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            /* gap: 1rem; */
          `}
        >
          <SBlockMenu />
          <SblockGrid />
        </div>
      </div>
    </>
  );
};

export default Main;
