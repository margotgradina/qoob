import {css} from "@emotion/css";

interface sBlockProps {
  size: number;
  sizeUnit: string;
  colour: string;
  rotate: "0deg" | "90deg" | "180deg" | "270deg" | null;
  borderRadius: string;
}
//TODO move the optionals to the SBLock ipv in de JSX hier
const SBlockUnit = (props: sBlockProps) => {
  return (
    <>
      <div
        className={css`
          border-radius: ${props.borderRadius};
          background-color: ${props.colour};
          width: ${props.size + props.sizeUnit};
          height: ${props.size + props.sizeUnit};
          transform: rotate(${props.rotate});
        `}
      ></div>
    </>
  );
};

export default SBlockUnit;
