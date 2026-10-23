import React, {useEffect, useRef, useState} from "react";
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
    paintCells,
  } = useSBlocks();
  const stickyBg = darkTheme ? "bg-[#353535]" : "bg-[#dfdfdf]";

  //dragging over the grid paints every cell the pointer passes over, as one undo step
  const stroke = useRef<{last: [number, number]; visited: Set<string>} | null>(null);
  const lastPointerType = useRef<string>("mouse");

  useEffect(() => {
    const endStroke = () => {
      stroke.current = null;
    };
    window.addEventListener("pointerup", endStroke);
    window.addEventListener("pointercancel", endStroke);
    return () => {
      window.removeEventListener("pointerup", endStroke);
      window.removeEventListener("pointercancel", endStroke);
    };
  }, []);

  const cellFromPoint = (clientX: number, clientY: number): [number, number] | null => {
    const el = document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>("td[data-x]");
    return el ? [Number(el.dataset.x), Number(el.dataset.y)] : null;
  };

  //all cells on the straight line between two cells, so a fast drag does not skip any
  const cellsBetween = (a: [number, number], b: [number, number]): [number, number][] => {
    const cells: [number, number][] = [];
    let [x, y] = a;
    const dx = Math.abs(b[0] - x);
    const dy = Math.abs(b[1] - y);
    const sx = x < b[0] ? 1 : -1;
    const sy = y < b[1] ? 1 : -1;
    let err = dx - dy;
    for (;;) {
      cells.push([x, y]);
      if (x === b[0] && y === b[1]) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
    }
    return cells;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    lastPointerType.current = e.pointerType;
    //touch keeps scrolling the grid and paints with a tap (see the cell's onClick)
    if (e.pointerType === "touch" || e.button !== 0) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell) return;
    e.preventDefault(); //no text selection while dragging
    stroke.current = {last: cell, visited: new Set([cell.join("_")])};
    paintCells([cell], true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const current = stroke.current;
    if (!current) return;
    const cell = cellFromPoint(e.clientX, e.clientY);
    if (!cell || (cell[0] === current.last[0] && cell[1] === current.last[1])) return;
    const fresh = cellsBetween(current.last, cell).filter((c) => !current.visited.has(c.join("_")));
    fresh.forEach((c) => current.visited.add(c.join("_")));
    current.last = cell;
    paintCells(fresh, false);
  };

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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          className="m-4 select-none border-collapse p-0"
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
                        data-x={x}
                        data-y={y}
                        onClick={() => lastPointerType.current === "touch" && handleCellClick(x, y)}
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
