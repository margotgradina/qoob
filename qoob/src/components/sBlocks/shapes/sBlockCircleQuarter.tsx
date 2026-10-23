
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
        className="rounded-[100%_0px_0px_0px]" style={{height: props.size + props.sizeUnit, width: props.size + props.sizeUnit, transform: `rotate(${props.rotate})`, backgroundColor: props.colour}}
      ></div>
    </>
  );
};

export default SBlockCircleQuarter;
