import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ButtonProps {
  onClick: Function;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  backgroundColor?: string;
  width?: string;
  minWidth?: string;
  height?: string;
  labelColour?: string;
  label: string;
  iconEnd?: IconProp;
}
//TODO FIX OVERFLOW WHEN BUTTON IS SMALL
const BasicButton = (props: ButtonProps) => {
  return (
    <div
      onClick={() => props?.onClick()}
      className="relative flex items-center justify-center rounded-[1.6rem] font-['Raleway'] max-w-[90%]"
      style={{
        fontSize: "small",
        fontWeight: props?.fontWeight || "600",
        background: props?.backgroundColor || "#7cc0a0",
        width: props?.width || "10vw",
        minWidth: props?.minWidth || undefined,
        height: props?.height || "2rem",
      }}
    >
      <label
        className="flex flex-col content-center text-center font-['Raleway']"
        style={{color: props.labelColour || "white"}}
      >
        {props?.label}
      </label>
      {props.iconEnd && (
        <FontAwesomeIcon
          icon={props.iconEnd}
          className="absolute right-0 top-1/2 mr-4 -translate-y-1/2"
          style={{color: props.labelColour || "white"}}
        />
      )}
    </div>
  );
};

export default BasicButton;
