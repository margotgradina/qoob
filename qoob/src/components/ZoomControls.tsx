import {faExpand, faMagnifyingGlassMinus, faMagnifyingGlassPlus} from "@fortawesome/free-solid-svg-icons";
import {useSBlocks} from "./sBlocks/hooks/useSBlocks";
import IconButton from "./IconButton";

const STEPS = [12, 16, 20, 24, 32, 40, 48, 56, 64, 80];
export const BASE_CELL_PX = 40;

//lets the user change how large the cells are shown. The saved image always uses the base cell size.
const ZoomControls = () => {
  const {cellSize, setCellSize, numCols, numRows} = useSBlocks();
  const px = parseInt(cellSize, 10) || BASE_CELL_PX;

  const step = (dir: 1 | -1) => {
    const next = dir === 1 ? STEPS.find((s) => s > px) : [...STEPS].reverse().find((s) => s < px);
    if (next) setCellSize(next + "px");
  };

  const fit = () => {
    const area = document.getElementById("gridArea");
    if (!area || !numCols || !numRows) return;
    const margin = 32; // the grid's margin on both sides
    const labelCol = 30; // width of the row numbers
    const labelRow = 24; // height of the column numbers
    const byWidth = (area.clientWidth - margin - labelCol) / numCols;
    const byHeight = (area.clientHeight - margin - labelRow) / numRows;
    const next = Math.floor(Math.max(STEPS[0], Math.min(byWidth, byHeight, STEPS[STEPS.length - 1])));
    setCellSize(next + "px");
  };

  return (
    <div className="flex w-[90%] flex-row items-center justify-between gap-1">
      <IconButton variant="filled" small icon={faMagnifyingGlassMinus} label="Zoom out" onClick={() => step(-1)} />
      <span className="min-w-[2.6rem] text-center font-['Josefin_Sans'] text-[12px] font-normal" aria-live="polite" title="Zoom level">
        {Math.round((px / BASE_CELL_PX) * 100)}%
      </span>
      <IconButton variant="filled" small icon={faMagnifyingGlassPlus} label="Zoom in" onClick={() => step(1)} />
      <IconButton variant="filled" small icon={faExpand} label="Fit grid to the screen" onClick={fit} />
    </div>
  );
};

export default ZoomControls;
