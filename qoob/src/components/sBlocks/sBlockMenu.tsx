import SBlock from "./sBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faDownload, faEraser, faEye, faMoon, faPalette, faRotate, faSave, faSun, faUpload} from "@fortawesome/free-solid-svg-icons";
import SBlocksColourPalettes from "./sBlocksColourPalettes";
import {useSBlocks} from "./hooks/useSBlocks";
import SBlockLayers from "./sBlockLayers";
import BasicButton from "../BasicButton";
import ColourPicker from "../ColourPicker";
import FileUpload from "../FileUpload";
import Settings from "../Settings";
import {useState} from "react";
import {useIsMobile} from "../../helpers/useIsMobile";

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
    handleExport,
    handleImport,
  } = useSBlocks();

  const isMobile = useIsMobile();
  const [showUploadScreen, setShowUploadScreen] = useState<boolean>(false);

  return (
    <>
      <div
        className="scroll-thin flex h-[calc(100%-2rem)] min-w-[150px] w-[10vw] max-w-[200px] flex-col items-center gap-[1.5vh] self-start overflow-y-auto rounded-[10px] border border-solid border-[#808080] m-4 [&>*]:shrink-0 font-['Raleway'] text-[1rem] font-medium shadow-[0px_5px_5px_0px_rgba(0,0,0,0.25)] max-md:h-auto max-md:w-auto max-md:max-w-none max-md:self-stretch"
      >
        <Settings />
        {/* - - - - COLOUR - - - -  */}
        <label
          className="w-[90%] pt-[0.5vw] font-semibold"
        >
          Choose a colour
        </label>
        <div
          className="flex w-[90%] flex-row items-center justify-evenly"
        >
          <div
            onClick={() => {
              setShowColourPicker(true);
            }}
            className="h-[1vw] w-[1vw] rounded-[5px] border-[0.5px] border-solid border-[#808080] max-md:h-5 max-md:w-5" style={{backgroundColor: currentColour?.hex || "transparent"}}
          ></div>
          <label
            className="flex min-w-[2vw]"
          >
            {currentColour?.hex}
          </label>
          <div
            onClick={() => {
              setShowPaletteTemplates(true);
            }}
            className="h-[20px] w-[20px] rounded-[50%] bg-[#7cc0a0] pb-[6px] pl-[4px] pr-[4px] pt-[4px] text-center"
          >
            <FontAwesomeIcon icon={faPalette} color={"white"} />
          </div>
        </div>
        {/* COLOUR PALETTE */}
        <div
          className="flex w-[90%] flex-row items-center justify-evenly"
        >
          {colourPalette?.map((colour, index) => {
            return (
              <div
                key={"colour_" + index}
                className="flex flex-col gap-2"
              >
                <div
                  onClick={() => {
                    if (colourPalette[index] == "transparent") {
                      handleAddColourPalette(index, currentColour);
                    } else {
                      setCurrentColour(colourPalette[index]);
                    }
                  }}
                  className="h-[1vw] max-h-[20px] w-[1vw] max-w-[20px] rounded-[5px] border-[0.5px] border-solid border-[#808080] max-md:h-5 max-md:w-5" style={{backgroundColor: colourPalette[index]?.hex}}
                ></div>
                <FontAwesomeIcon
                  color="grey"
                  icon={faCircleXmark}
                  onClick={() => {
                    handleAddColourPalette(index, "transparent");
                  }}
                />
              </div>
            );
          })}
        </div>
        <div
          id={"LINE_1"}
          className="flex w-[95%] border border-dashed border-[#808080]"
        />
        {/* - - - - SHAPE PICKER - - - -  */}
        <label
          className="w-[90%] font-semibold"
        >
          Choose a shape
        </label>
        <div
          className="scroll-thin-grey flex h-[10vh] flex-row flex-wrap items-center justify-evenly gap-2 overflow-y-auto px-[5px] max-md:h-auto max-md:max-h-[20vh]"
        >
          {shapeArray?.map((obj: {shape: string; function: Function}, index: number) => {
            return (
              <div
                key={"shape_" + index}
                className="p-[1px]" style={{border: currentShape == obj.shape ? "1px dashed #7cc0a0" : undefined}}
              >
                <SBlock
                  key={String(isMobile)}
                  onClick={() => {
                    obj.function();
                  }}
                  //prettier-ignore
                  type={obj.shape}
                  rotate={currentRotation}
                  colour={currentColour?.hex || "grey"}
                  size={isMobile ? 24 : 1.5}
                  sizeUnit={isMobile ? "px" : "vw"}
                />
              </div>
            );
          })}
        </div>
        <div
          id={"LINE_2"}
          className="flex w-[95%] border border-dashed border-[#808080]"
        />
        {/* BUTTONS FOR ADJUSTING */}
        {/* - - - - ROTATE BUTTON - - - -  */}
        <div
          className="flex w-full flex-col items-center justify-start gap-[1vh] pt-[1vh]"
        >
          <BasicButton
            backgroundColor={currentShape === "EMPTY" ? "#349757" : undefined}
            width={"8.5vw"}
            minWidth="90%"
            onClick={() => {
              if (currentShape == "EMPTY") {
                setCurrentShape(null);
              } else {
                setCurrentShape("EMPTY");
              }
            }}
            label={"Delete"}
            iconEnd={faEraser}
          />
          <BasicButton
            width={"8.5vw"}
            minWidth="90%"
            onClick={() => {
              handleClickRotation();
            }}
            label={"Rotate 90°"}
            iconEnd={faRotate}
          />
        </div>

        <SBlockLayers />
        {/* BUTTONS FOR EXPORTING */}
        <div
          className="mt-auto flex w-full flex-col items-center justify-end gap-[1vh] pb-[1vh]"
        >
          <BasicButton
            width={"8.5vw"}
            minWidth="90%"
            onClick={() => {
              setDarkTheme(!darkTheme);
            }}
            label={darkTheme ? "Light mode" : "Dark mode"}
            iconEnd={darkTheme ? faSun : faMoon}
          />
          <BasicButton
            width={"8.5vw"}
            minWidth="90%"
            onClick={() => {
              setShowGrid(!showGrid);
            }}
            label={showGrid ? "Hide Grid" : "Show Grid"}
            iconEnd={showGrid ? faEye : undefined}
          />
          <BasicButton
            width="8.5vw"
            minWidth="90%"
            onClick={() => {
              handleDownload("JPG");
            }}
            label={"Save as JPG"}
            iconEnd={faSave}
          />
          {/* <BasicButton
            width="8.5vw"
            minWidth="90%"
            onClick={() => {
              handleExport();
            }}
            label={"Export"}
            iconEnd={faDownload}
          />
          <BasicButton
            width="8.5vw"
            minWidth="90%"
            onClick={() => {
              setShowUploadScreen(true);
            }}
            label={"Import"}
            iconEnd={faUpload}
          /> */}
        </div>

        {showColourPicker && <ColourPicker />}
        {showPaletteTemplates && <SBlocksColourPalettes />}
        {showUploadScreen && <FileUpload onClose={() => setShowUploadScreen(false)} />}
      </div>
    </>
  );
};

export default SBlockMenu;
