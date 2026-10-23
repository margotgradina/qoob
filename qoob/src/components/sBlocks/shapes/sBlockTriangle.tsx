
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
        className="relative" style={{height: props.size + props.sizeUnit, width: props.size + props.sizeUnit, transform: `rotate(${props.rotate})`}}
      >
        <div
          className="absolute left-0 top-0 h-0 w-0" style={{borderLeft: props.size * 0.5 + props.sizeUnit + " solid transparent", borderRight: props.size * 0.5 + props.sizeUnit + " solid transparent", borderBottom: props.size + props.sizeUnit + " solid " + props.colour}}
        ></div>
      </div>
    </>
  );
};

export default SBlockTriangle;
