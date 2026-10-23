import SBlock from "./sBlock";
import {faRotateLeft, faRotateRight, faChevronDown, faChevronRight, faCircleXmark, faEraser, faEye, faEyeSlash, faMoon, faPalette, faRotate, faSave, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SBlocksColourPalettes from "./sBlocksColourPalettes";
import {useSBlocks} from "./hooks/useSBlocks";
import SBlockLayers from "./sBlockLayers";
import IconButton from "../IconButton";
import ColourPicker from "../ColourPicker";
import FileUpload from "../FileUpload";
import Settings from "../Settings";
import ZoomControls from "../ZoomControls";
import {Header} from "../Header";
import {useState} from "react";
import {useIsMobile} from "../../helpers/useIsMobile";

const Divider = () => <div className="flex w-[95%] border border-dashed border-[#808080]" />;

const SBlockMenu = () => {
  const {
    showGrid,
    setShowGrid,
    currentColour,
    setCurrentShape,
    currentShape,
    setCurrentColour,
    showColourPicker,
    setShowColourPicker,
    shapeArray,
    currentRotation,
    handleDownload,
    handleAddColourPalette,
    colourPalette,
    handleClickRotation,
    showPaletteTemplates,
    setShowPaletteTemplates,
    darkTheme,
    setDarkTheme,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useSBlocks();

  const isMobile = useIsMobile();
  const [showUploadScreen, setShowUploadScreen] = useState<boolean>(false);
  //only used on small screens, where the tools can be folded away so the grid is visible
  const [toolsOpen, setToolsOpen] = useState<boolean>(!isMobile);
  const hideWhenFolded = toolsOpen ? "" : "max-md:hidden";

  return (
    <>
      <div className="m-4 flex h-[calc(100%-2rem)] w-[10vw] min-w-[168px] max-w-[200px] flex-col self-start overflow-hidden rounded-[10px] border border-solid border-[#808080] font-['Raleway'] text-[13px] font-medium shadow-[0px_5px_5px_0px_rgba(0,0,0,0.25)] max-md:h-auto max-md:w-auto max-md:max-w-none max-md:shrink-0 max-md:self-stretch max-md:overflow-visible">
        {/* - - - - LOGO (and the fold button on small screens) - - - -  */}
        <div className="flex shrink-0 flex-col items-center gap-1 pt-1.5">
          <Header />
          <button
            type="button"
            aria-expanded={toolsOpen}
            onClick={() => setToolsOpen(!toolsOpen)}
            className="m-0 hidden w-[90%] cursor-pointer flex-row items-center justify-between rounded-[6px] border border-solid border-[#808080] bg-transparent px-2 py-[2px] font-['Raleway'] text-[13px] font-semibold text-inherit max-md:flex"
          >
            <span>Tools</span>
            <FontAwesomeIcon icon={toolsOpen ? faChevronDown : faChevronRight} size="xs" />
          </button>
        </div>

        {/* - - - - SCROLLABLE TOOLS - - - -  */}
        <div className={`scroll-thin flex min-h-0 flex-1 flex-col items-center gap-1.5 overflow-y-auto pt-1 max-md:overflow-visible [&>*]:shrink-0 ${hideWhenFolded}`}>
          <Settings onStart={() => setToolsOpen(false)} />
          <ZoomControls />
          <Divider />

          {/* - - - - COLOUR - - - -  */}
          <label className="w-[90%] font-semibold">Colour</label>
          <div className="flex w-[90%] flex-row items-center justify-between">
            <button
              type="button"
              aria-label="Open colour picker"
              title="Open colour picker"
              onClick={() => setShowColourPicker(true)}
              className="m-0 h-6 w-6 cursor-pointer rounded-[5px] border-[0.5px] border-solid border-[#808080] p-0"
              style={{backgroundColor: currentColour?.hex || "transparent"}}
            ></button>
            <label className="flex text-[12px]">{currentColour?.hex}</label>
            <button
              type="button"
              aria-label="Choose a colour palette"
              title="Choose a colour palette"
              onClick={() => setShowPaletteTemplates(true)}
              className="m-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[50%] border-0 bg-[#2f7d5b] text-[12px] p-0"
            >
              <FontAwesomeIcon icon={faPalette} color={"white"} />
            </button>
          </div>
          {/* COLOUR PALETTE */}
          <div className="grid w-[90%] grid-cols-6 gap-[2px]">
            {colourPalette?.map((colour, index) => {
              const empty = colourPalette[index] == "transparent";
              return (
                <div key={"colour_" + index} className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    aria-label={empty ? `Save the current colour in slot ${index + 1}` : `Use saved colour ${colourPalette[index]?.hex}`}
                    title={empty ? "Save the current colour here" : colourPalette[index]?.hex}
                    onClick={() => {
                      if (empty) {
                        handleAddColourPalette(index, currentColour);
                      } else {
                        setCurrentColour(colourPalette[index]);
                      }
                    }}
                    className="m-0 aspect-square w-full max-w-6 cursor-pointer bg-transparent rounded-[5px] border-[0.5px] border-solid border-[#808080] p-0"
                    style={{backgroundColor: colourPalette[index]?.hex}}
                  ></button>
                  <IconButton
                    icon={faCircleXmark}
                    label={`Clear saved colour ${index + 1}`}
                    className="text-[#666]"
                    onClick={() => handleAddColourPalette(index, "transparent")}
                  />
                </div>
              );
            })}
          </div>
          <Divider />

          {/* - - - - SHAPE PICKER - - - -  */}
          <label className="w-[90%] font-semibold">Shape</label>
          <div className="grid w-[90%] grid-cols-5 justify-items-center gap-[2px]">
            {shapeArray?.map((obj: {shape: string; function: Function}, index: number) => {
              const selected = currentShape == obj.shape;
              return (
                <button
                  key={"shape_" + index}
                  type="button"
                  aria-label={`Shape ${obj.shape.toLowerCase()}`}
                  aria-pressed={selected}
                  title={obj.shape.toLowerCase()}
                  onClick={() => obj.function()}
                  className={`m-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-[4px] border-0 p-0 ${
                    selected ? "bg-[rgba(47,125,91,0.2)] outline outline-2 outline-[#2f7d5b]" : "bg-transparent"
                  }`}
                >
                  <SBlock type={obj.shape} rotate={currentRotation} colour={currentColour?.hex || "grey"} size={20} sizeUnit={"px"} />
                </button>
              );
            })}
          </div>
          <Divider />

          {/* - - - - UNDO, REDO, DELETE AND ROTATE - - - -  */}
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <IconButton variant="filled" icon={faRotateLeft} label="Undo (Ctrl+Z)" disabled={!canUndo} onClick={undo} />
            <IconButton variant="filled" icon={faRotateRight} label="Redo (Ctrl+Shift+Z)" disabled={!canRedo} onClick={redo} />
            <IconButton
              variant="filled"
              icon={faEraser}
              label={currentShape === "EMPTY" ? "Stop deleting" : "Delete shapes"}
              active={currentShape === "EMPTY"}
              onClick={() => {
                if (currentShape == "EMPTY") {
                  setCurrentShape(null);
                } else {
                  setCurrentShape("EMPTY");
                }
              }}
            />
            <IconButton variant="filled" icon={faRotate} label="Rotate 90°" onClick={() => handleClickRotation()} />
          </div>

          <SBlockLayers />
        </div>

        {/* - - - - ACTIONS, ALWAYS VISIBLE - - - -  */}
        <div className={`flex shrink-0 flex-col items-center py-1.5 [border-top:1px_dashed_#808080] ${hideWhenFolded}`}>
          <div className="flex flex-row items-center justify-center gap-2">
            <IconButton variant="filled" icon={darkTheme ? faSun : faMoon} label={darkTheme ? "Light mode" : "Dark mode"} onClick={() => setDarkTheme(!darkTheme)} />
            <IconButton variant="filled" icon={showGrid ? faEye : faEyeSlash} label={showGrid ? "Hide grid" : "Show grid"} onClick={() => setShowGrid(!showGrid)} />
            <IconButton variant="filled" icon={faSave} label="Save as JPG" onClick={() => handleDownload("JPG")} />
          </div>
        </div>

        {showColourPicker && <ColourPicker />}
        {showPaletteTemplates && <SBlocksColourPalettes />}
        {showUploadScreen && <FileUpload onClose={() => setShowUploadScreen(false)} />}
      </div>
    </>
  );
};

export default SBlockMenu;
