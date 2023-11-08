import {css} from "@emotion/css";
import SBlock from "./sBlock";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faEraser, faEye, faPalette, faRotate, faSave} from "@fortawesome/free-solid-svg-icons";
import SBlocksColourPalettes from "./sBlocksColourPalettes";
import {useSBlocks} from "./hooks/useSBlocks";
import SBlockLayers from "./sBlockLayers";
import BasicButton from "../BasicButton";
import ColourPicker from "../ColourPicker";

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
  } = useSBlocks();

  return (
    <>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-self: flex-end;
          align-items: center;
          width: 10vw;
          min-width: 150px;
          max-width: 200px;
          height: 90%;
          border-radius: 10px;
          box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
          border: 1px solid grey;
          font-family: "Raleway";
          font-weight: 500;
          font-size: 1rem;
          gap: 1.5vh;
        `}
      >
        {/* - - - - COLOUR - - - -  */}
        <label
          className={css`
            padding-top: 0.5vw;
            width: 90%;
            font-weight: 600;
          `}
        >
          Choose a colour
        </label>
        <div
          className={css`
            /* padding-left: 1vw;
            padding-right: 1vw; */
            align-items: center;
            justify-content: space-evenly;
            width: 90%;

            display: flex;
            flex-direction: row;
            /* gap: 1vw; */
          `}
        >
          <div
            onClick={() => {
              setShowColourPicker(true);
            }}
            className={css`
              width: 1vw;
              height: 1vw;
              border: 0.5px solid grey;
              border-radius: 5px;
              background-color: ${currentColour?.hex || "transparent"};
            `}
          ></div>
          <label
            className={css`
              display: flex;
              min-width: 2vw;
            `}
          >
            {currentColour?.hex}
          </label>
          <div
            onClick={() => {
              setShowPaletteTemplates(true);
            }}
            className={css`
              background-color: #7cc0a0;
              padding: 4px;
              border-radius: 50%;
              width: max-content;
              height: max-content;
            `}
          >
            <FontAwesomeIcon icon={faPalette} color={"white"} />
          </div>
        </div>
        {/* COLOUR PALETTE */}
        <div
          className={css`
            display: flex;
            flex-direction: row;

            width: 90%;
            align-items: center;
            justify-content: space-evenly;
          `}
        >
          {colourPalette?.map((colour, index) => {
            return (
              <div
                className={css`
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;
                `}
              >
                <div
                  onClick={() => {
                    if (colourPalette[index] == "transparent") {
                      handleAddColourPalette(index, currentColour);
                    } else {
                      setCurrentColour(colourPalette[index]);
                    }
                  }}
                  className={css`
                    width: 1vw;
                    height: 1vw;
                    max-width: 20px;
                    max-height: 20px;

                    border: 0.5px solid grey;
                    border-radius: 5px;
                    background-color: ${colourPalette[index]?.hex};
                  `}
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
          className={css`
            width: 95%;
            display: flex;
            /* margin: 1rem 0px 1rem 0px; */
            border: 1px dashed grey;
          `}
        />
        {/* - - - - SHAPE PICKER - - - -  */}
        <label
          className={css`
            /* padding-top: 0.5vw; */
            width: 90%;
            font-weight: 600;
          `}
        >
          Choose a shape
        </label>
        <div
          className={css`
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            padding: 0px 5px 0px 5px;
            align-items: center;
            justify-content: space-evenly;

            gap: 0.5rem;
          `}
        >
          {shapeArray?.map((obj: {shape: string; function: Function}, index: number) => {
            return (
              <div
                className={css`
                  border: ${currentShape == obj.shape && "1px dashed #7cc0a0"};
                  padding: 1px;
                `}
              >
                <SBlock
                  onClick={() => {
                    obj.function();
                  }}
                  //prettier-ignore
                  type={obj.shape}
                  rotate={currentRotation}
                  colour={currentColour?.hex || "grey"}
                  size={1.5}
                  sizeUnit={"vw"}
                />
              </div>
            );
          })}
        </div>
        <div
          id={"LINE_2"}
          className={css`
            width: 95%;
            display: flex;
            /* margin: 1rem 0px 1rem 0px; */
            border: 1px dashed grey;
          `}
        />
        {/* BUTTONS FOR ADJUSTING */}
        {/* - - - - ROTATE BUTTON - - - -  */}
        <div
          className={css`
            display: flex;
            height: 100%;
            width: 100%;
            flex-direction: column;
            gap: 1vh;
            padding-top: 1vh;
            align-items: center;
            justify-content: flex-start;
          `}
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
          className={css`
            display: flex;
            height: 100%;
            width: 100%;
            padding-bottom: 1vh;
            flex-direction: column;
            gap: 1vh;
            align-items: center;
            justify-content: flex-end;
          `}
        >
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
        </div>

        {showColourPicker && <ColourPicker />}
        {showPaletteTemplates && <SBlocksColourPalettes />}
      </div>
    </>
  );
};

export default SBlockMenu;
