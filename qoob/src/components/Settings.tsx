import IconButton from "./IconButton";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronRight, faPlay} from "@fortawesome/free-solid-svg-icons";

const inputClass =
  "h-[1.8rem] w-[56px] rounded-[10px] border-0 bg-white px-[6px] text-center font-['Josefin_Sans'] text-[14px] font-normal text-black";
const rowClass = "flex flex-row items-center justify-between gap-2 font-['Josefin_Sans'] text-[13px] font-normal";
const MIN = 1;
const MAX = 50;

interface Props {
  onStart?: () => void;
}

//grid size inputs, shown at the top of the left toolbar
const Settings = ({onStart}: Props) => {
  const {setNumRows, numRows, numCols, setNumCols} = useSBlocks();
  const [width, setWidth] = useState<string>(numCols ? String(numCols) : "");
  const [height, setHeight] = useState<string>(numRows ? String(numRows) : "");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const start = () => {
    setNumCols(width as unknown as number);
    setNumRows(height as unknown as number);
    setCollapsed(true);
    onStart?.();
  };

  //only whole numbers between 1 and 50, an empty field stays empty so it can be retyped
  const handleChange = (value: string, set: (v: string) => void) => {
    if (value === "") return set("");
    const n = Math.round(Number(value));
    if (!Number.isNaN(n) && n >= MIN) set(String(Math.min(n, MAX)));
  };

  const field = (id: string, label: string, value: string, set: (v: string) => void) => (
    <div className={rowClass}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={MIN}
        max={MAX}
        className={inputClass}
        placeholder="1-50"
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => handleChange(e.target.value, set)}
        onKeyDown={(e) => {
          if (e.key === "Enter") start();
        }}
      />
    </div>
  );

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
        <div className="flex w-[90%] flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            {field("grid-width", "width", width, setWidth)}
            {field("grid-height", "height", height, setHeight)}
          </div>
          <IconButton variant="filled" icon={faPlay} label="Start" onClick={start} />
        </div>
      )}
      <div className="flex w-[95%] border border-dashed border-[#808080]" />
    </>
  );
};

export default Settings;
