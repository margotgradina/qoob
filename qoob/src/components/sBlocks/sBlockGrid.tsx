import {useEffect, useState} from "react";
import {useSBlocks} from "./hooks/useSBlocks";
import SBlockMenu from "./sBlockMenu";
import {SBlockType} from "./sBlockTypes";
import SBlock from "./sBlock";
// import Toast from "../general/Toast/Toast";

const SblockGrid = () => {
  const cellPx = parseInt(useSBlocks().cellSize, 10) || 40;
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
    darkTheme,
  } = useSBlocks();
  const stickyBg = darkTheme ? "bg-[#353535]" : "bg-[#dfdfdf]";

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
        id="gridArea"
        className="scroll-thin flex h-full min-w-0 flex-1 items-start overflow-auto max-md:h-auto max-md:max-h-[75vh] max-md:flex-none"
      >
        <table
          id="savableGrid"
          className="m-4 border-collapse p-0"
        >
          <thead>
            <tr>
              <th data-sticky className={`sticky left-0 top-0 z-[120] m-0 p-0 ${stickyBg}`} style={{width: cellSize}}></th>
              {Array.from({length: numCols}, (_, i) => {
                return (
                  <th data-sticky key={i} className={`sticky top-0 z-[110] m-0 p-0 ${stickyBg}`} style={{width: cellSize}}>
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
                  <td data-sticky className={`sticky left-0 z-[110] m-0 p-0 pr-[5px] text-end ${stickyBg}`} style={{height: cellSize}}>
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
                                  key={cellPx}
                                  onClick={() => {}}
                                  type={shape.shape}
                                  rotate={shape.rotation as 0 | 90 | 180 | 270}
                                  colour={shape?.colour}
                                  size={cellPx}
                                  sizeUnit={"px"}
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
