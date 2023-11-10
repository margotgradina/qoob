import {useEffect, useState} from "react";
import SBlockUnit from "./sBlockUnit";
// import {css} from "@emotion/css";
import SBlockRectangle from "./shapes/sBlockRectangle";
import SBlockTriangle from "./shapes/sBlockTriangle";
import SBlockRoundCorner from "./shapes/sBlockRoundCorner";
import SBlockHalfCircleOutwards from "./shapes/sBlockHalfCircleOutwards";
import SBlockHalfTriangle from "./shapes/sBlockHalfTriangle";
import SBlockCircleQuarter from "./shapes/sBlockCircleQuarter";
import SBlockHalfCircleInwards from "./shapes/sBlockHalfCircleInwards";

interface Props {
  type: string;
  rotate: 0 | 90 | 180 | 270;
  colour: string;
  size: number;
  sizeUnit: string;
  onClick?: Function;
}

const SBlock = (props: Props) => {
  const [rotate, setRotate] = useState<"0deg" | "90deg" | "180deg" | "270deg" | null | undefined>(null);
  const [bR, setBR] = useState<string>(props?.size && props?.sizeUnit ? props.size * 0.75 + props.sizeUnit : "7.5em"); //the size of the border radius

  useEffect(() => {
    switch (props.rotate) {
      case 0:
        setRotate("0deg");
        break;
      case 90:
        setRotate("90deg");
        break;
      case 180:
        setRotate("180deg");
        break;
      case 270:
        setRotate("270deg");
        break;
      default:
        setRotate(null);
    }
  }, [props.rotate]);

  //handles the given function for Onclick
  const handleClick = () => {
    if (props?.onClick) {
      props.onClick();
    }
  };

  //adjusts the borderRadius based on its shape. The borderRadius is calculated based on the given size *0.75
  const calculateBorderRadius = (): string => {
    switch (props.type) {
      case "FULL":
        return `0px 0px 0px 0px`;
      case "QUARTERCIRCLE":
        return `${bR} 0px 0px 0px`;
      case "HALFSTADIUM":
        return `${bR} ${bR} 0px 0px`;
      case "ELLIPS":
        return `${bR} 0px ${bR} 0px`;
      case "DROP":
        return `0px ${bR} ${bR} ${bR}`;
      case "CIRCLE":
        return `${bR} ${bR} ${bR} ${bR}`;
      case "RECTANGLE":
        return `0px 0px 0px 0px`;
      case "TRIANGLE":
        return `0px 0px 0px 0px`;
      case "ROUNDCORNER":
        return `0px 0px 0px 0px`;
      case "HALFCIRCLEOUTWARDS":
        return `0px 0px 0px 0px`;
      case "HALFTRIANGLE":
        return `0px 0px 0px 0px`;
      case "SBLOCKCIRCLEQUARTER":
        return `0px 0px 0px 0px`;
      default:
        return "0px 0px 0px 0px";
    }
  };

  return (
    <div onClick={() => handleClick()}>
      {props.type == "FULL" && (
        <SBlockUnit
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          borderRadius={calculateBorderRadius()}
        />
      )}
      {props.type == "QUARTERCIRCLE" && (
        <SBlockUnit
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          borderRadius={calculateBorderRadius()}
        />
      )}
      {props.type == "HALFSTADIUM" && (
        <SBlockUnit
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          borderRadius={calculateBorderRadius()}
        />
      )}
      {props.type == "ELLIPS" && (
        <SBlockUnit
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          borderRadius={calculateBorderRadius()}
        />
      )}
      {props.type == "DROP" && (
        <SBlockUnit
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          borderRadius={calculateBorderRadius()}
        />
      )}
      {props.type == "CIRCLE" && (
        <SBlockUnit
          colour={props?.colour || "#000"}
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          borderRadius={calculateBorderRadius()}
          rotate={rotate || "0deg"}
        />
      )}
      {props.type == "RECTANGLE" && (
        <SBlockRectangle size={props.size || 10} sizeUnit={props.sizeUnit || "em"} colour={props?.colour || "#000"} rotate={rotate || "0deg"} />
      )}
      {props.type == "TRIANGLE" && (
        <SBlockTriangle size={props.size || 10} sizeUnit={props.sizeUnit || "em"} colour={props?.colour || "#000"} rotate={rotate || "0deg"} />
      )}
      {props.type == "HALFTRIANGLE" && (
        <SBlockHalfTriangle size={props.size || 10} sizeUnit={props.sizeUnit || "em"} colour={props?.colour || "#000"} rotate={rotate || "0deg"} />
      )}
      {props.type == "ROUNDCORNER" && (
        <SBlockRoundCorner
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          bR={bR}
        />
      )}
      {props.type == "HALFCIRCLEOUTWARDS" && (
        <SBlockHalfCircleOutwards
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          bR={bR}
        />
      )}
      {props.type == "HALFCIRCLEINWARDS" && (
        <SBlockHalfCircleInwards
          size={props.size || 10}
          sizeUnit={props.sizeUnit || "em"}
          colour={props?.colour || "#000"}
          rotate={rotate || "0deg"}
          bR={bR}
        />
      )}
      {props.type == "SBLOCKCIRCLEQUARTER" && (
        <SBlockCircleQuarter size={props.size || 10} sizeUnit={props.sizeUnit || "em"} colour={props?.colour || "#000"} rotate={rotate || "0deg"} />
      )}
    </div>
  );
};

export default SBlock;
