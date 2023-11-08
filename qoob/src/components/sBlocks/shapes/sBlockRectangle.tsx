import {css} from "@emotion/css";
import SBlockUnit from "../sBlockUnit";

interface sBlockRectangleProps {
  size: number;
  sizeUnit: string;
  colour: string;
  rotate: "0deg" | "90deg" | "180deg" | "270deg" | null;
}
//TODO move the optionals to the SBLock ipv in de JSX hier
const SBlockRectangle = (props: sBlockRectangleProps) => {
  return (
    <>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          height: ${props.size + props.sizeUnit};
          width: ${props.size + props.sizeUnit};
          transform: rotate(${props.rotate});
        `}
      >
        {/* FIRST ROW */}
        <div
          className={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <SBlockUnit colour={props.colour} rotate={"0deg"} size={props.size * 0.5} sizeUnit={props.sizeUnit} borderRadius={"0px 0px 0px 0px"} />
          <SBlockUnit colour={props.colour} rotate={"0deg"} size={props.size * 0.5} sizeUnit={props.sizeUnit} borderRadius={"0px 0px 0px 0px"} />
        </div>
        {/* SECOND ROW */}
        <div
          className={css`
            display: flex;
            flex-direction: row;
            width: ${props?.size * 0.5 + props.sizeUnit};
            height: ${props.size + props.sizeUnit};
          `}
        ></div>
      </div>
    </>
  );
};

export default SBlockRectangle;
