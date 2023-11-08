import {css} from "@emotion/css";
import SBlockUnit from "../sBlockUnit";

interface sBlockHalfCircleProps {
  size: number;
  sizeUnit: string;
  colour: string;
  rotate: "0deg" | "90deg" | "180deg" | "270deg" | null;
  bR: string;
}
const SBlockHalfCircleOutwards = (props: sBlockHalfCircleProps) => {
  return (
    <>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          height: ${props.size + props.sizeUnit};
          width: ${props.size + props.sizeUnit};
          transform: rotate(${props.rotate});
        `}
      >
        {/* FIRST ROW */}
        <div
          className={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <SBlockUnit
            colour={props.colour}
            rotate={"0deg"}
            size={props.size * 0.5}
            sizeUnit={props.sizeUnit}
            borderRadius={`0px ${props.bR} 0px 0px`}
          />
          <SBlockUnit
            colour={props.colour}
            rotate={"0deg"}
            size={props.size * 0.5}
            sizeUnit={props.sizeUnit}
            borderRadius={`0px 0px ${props.bR} 0px`}
          />
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

export default SBlockHalfCircleOutwards;
