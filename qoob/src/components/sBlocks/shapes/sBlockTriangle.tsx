import {css} from "@emotion/css";

interface sBlockTriangleProps {
  size: number;
  sizeUnit: string;
  colour: string;
  rotate: "0deg" | "90deg" | "180deg" | "270deg" | null;
}
const SBlockTriangle = (props: sBlockTriangleProps) => {
  return (
    <>
      <div
        className={css`
          height: ${props.size + props.sizeUnit};
          width: ${props.size + props.sizeUnit};
          transform: rotate(${props.rotate});
          position: relative;
        `}
      >
        <div
          className={css`
            width: 0;
            height: 0;
            border-left: ${props.size * 0.5 + props.sizeUnit + " solid transparent"};
            border-right: ${props.size * 0.5 + props.sizeUnit + " solid transparent"};
            border-bottom: ${props.size + props.sizeUnit + " solid " + props.colour};
            position: absolute;
            top: 0;
            left: 0;
          `}
        ></div>
      </div>
    </>
  );
};

export default SBlockTriangle;
