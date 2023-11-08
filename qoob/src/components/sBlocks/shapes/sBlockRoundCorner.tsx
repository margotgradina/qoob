import {css} from "@emotion/css";
import SBlockUnit from "../sBlockUnit";

interface sBlockRoundCornerProps {
  size: number;
  sizeUnit: string;
  colour: string;
  rotate: "0deg" | "90deg" | "180deg" | "270deg" | null;
  bR: string;
}
const SBlockRoundCorner = (props: sBlockRoundCornerProps) => {
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
          <SBlockUnit
            colour={props.colour}
            rotate={"0deg"}
            size={props.size * 0.5}
            sizeUnit={props.sizeUnit}
            borderRadius={`0px 0px ${props.bR} 0px`}
          />
          <SBlockUnit colour={"transparent"} rotate={"0deg"} size={props.size * 0.5} sizeUnit={props.sizeUnit} borderRadius={`0px 0px 0px 0px`} />
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

export default SBlockRoundCorner;
