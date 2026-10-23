import {useEffect, useState} from "react";
import {useSBlocks} from "./hooks/useSBlocks";
import SBlockMenu from "./sBlockMenu";
import {SBlockType} from "./sBlockTypes";
import SBlock from "./sBlock";
// import Toast from "../general/Toast/Toast";

const SblockGrid = () => {
  const {
    gridData,
    numCols,
    numRows,
    cellSize,
    border,
    handleCellClick,
    initializeGrid,
    showGrid,
    setBorder,
    layers,
    determineZIndexBasedOnLayerId,
    determineVisibilityBasedOnLayerId,
    showSnackBar,
    setShowSnackBar,
  } = useSBlocks();

  // Initialize the grid when the component mounts
  useEffect(() => {
    if (numRows && numCols) {
      initializeGrid();
    }
  }, [numRows, numCols]);

  useEffect(() => {
    if (showGrid) {
      setBorder("0.5px dashed grey");
    } else {
      setBorder("0px dashed transparent");
    }
  }, [showGrid]);

  return (
    <>
      {/* - - - - GRID - - - - TODO MOVE TO SEPARATE COMPONENT -*/}
      <div
        className="scroll-thin flex h-full max-h-[90vh] w-[90%] max-w-[100vw] items-start overflow-auto max-md:w-full"
      >
        <table
          id="savableGrid"
          className="m-0 border-collapse p-0"
        >
          <thead>
            <tr>
              <th
                className="m-0 p-0" style={{width: cellSize}}
              ></th>
              {Array.from({length: numCols}, (_, i) => {
                return (
                  <th
                    key={i}
                    className="m-0 p-0" style={{width: cellSize}}
                  >
                    {i + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {gridData?.map((row, y) => {
              return (
                <tr key={y}>
                  <td
                    className="m-0 p-0 pr-[5px] text-end" style={{height: cellSize}}
                  >
                    {y + 1}
                  </td>
                  {row.map((cell: SBlockType[], x: number) => {
                    return (
                      <td
                        key={x}
                        onClick={() => handleCellClick(x, y)}
                        className="relative m-0 p-0" style={{width: cellSize, height: cellSize, border: border}}
                      >
                        {cell?.length > 0 ? (
                          cell?.map((shape: SBlockType, index) => {
                            return (
                              <div
                                key={"div_shape_" + shape.id}
                                className="absolute left-0 top-0" style={{visibility: determineVisibilityBasedOnLayerId(shape.zPosition) ? "visible" : "hidden", zIndex: determineZIndexBasedOnLayerId(shape?.zPosition)}}
                              >
                                <SBlock
                                  onClick={() => {}}
                                  type={shape.shape}
                                  rotate={shape.rotation as 0 | 90 | 180 | 270}
                                  colour={shape?.colour}
                                  size={40} //TODO replace with cellsize
                                  sizeUnit={"px"} // TODO replace with cellsize
                                />
                              </div>
                            );
                          })
                        ) : (
                          <div
                            style={{width: cellSize}}
                          ></div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SblockGrid;
