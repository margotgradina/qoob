import {css} from "@emotion/css";

interface SBlockCircleQuarterProps {
  size: number;
  sizeUnit: string;
  colour: string;
  rotate: "0deg" | "90deg" | "180deg" | "270deg" | null;
}
const SBlockCircleQuarter = (props: SBlockCircleQuarterProps) => {
  return (
    <>
      <div
        className={css`
          height: ${props.size + props.sizeUnit};
          width: ${props.size + props.sizeUnit};
          transform: rotate(${props.rotate});
          background-color: ${props.colour};
          border-radius: 100% 0px 0px 0px;
        `}
      ></div>
    </>
  );
};

export default SBlockCircleQuarter;
