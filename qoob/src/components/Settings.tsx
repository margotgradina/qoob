import BasicButton from "./BasicButton";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const inputClass = "h-[1.2rem] w-[40px] rounded-[10px] border-0 bg-white pl-[5px] text-center font-['Josefin_Sans'] font-normal text-black";
const rowClass = "flex w-[90%] flex-row items-center justify-between font-['Josefin_Sans'] text-[12px] font-normal";

//grid size inputs, shown at the top of the left toolbar
const Settings = () => {
  const {setNumRows, numRows, numCols, setNumCols} = useSBlocks();
  const [width, setWidth] = useState<string>(numCols as unknown as string);
  const [height, setHeight] = useState<string>(numRows as unknown as string);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  //TODO: adjust so it will straight away update
  const adjustWidthAndHeight = () => {
    setNumCols(width as unknown as number);
    setNumRows(height as unknown as number);
    setCollapsed(true);
  };

  const handleChange = (value: string, set: (v: string) => void) => {
    if ((value as unknown as number) <= 0) {
      console.log("no negatives");
    } else {
      set(value);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-expanded={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
        className="m-0 flex w-[90%] cursor-pointer flex-row items-center justify-between border-0 bg-transparent p-0 pt-[0.5vw] text-left font-['Raleway'] text-[1rem] font-semibold text-inherit"
      >
        <span>Grid size</span>
        <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronDown} size="xs" />
      </button>
      {!collapsed && (
        <>
          <div className={rowClass}>
            <label>width</label>
            <input min={1} max={50} type={"number"} className={inputClass} placeholder={"width"} value={width} onChange={(e) => handleChange(e.target.value, setWidth)} />
          </div>
          <div className={rowClass}>
            <label>height</label>
            <input min={1} max={50} type={"number"} className={inputClass} placeholder={"height"} value={height} onChange={(e) => handleChange(e.target.value, setHeight)} />
          </div>
          <BasicButton onClick={adjustWidthAndHeight} label={"start"} width={"8.5vw"} minWidth="90%" />
        </>
      )}
      <div className="flex w-[95%] border border-dashed border-[#808080]" />
    </>
  );
};

export default Settings;
