import {SBlockLayer, SBlockType} from "../sBlockTypes";
import html2canvas from "html2canvas";
import {useSBlocksData} from "../store/useSblocksData";
import {useSBlocksStore} from "../store/sBlocksStore";
// import {layer} from "@fortawesome/fontawesome-svg-core";
// import zIndex from "@material-ui/core/styles/zIndex";

export const useSBlocks = () => {
  const {
    gridData,
    setGridData,
    canUndo,
    canRedo,
    commitGrid,
    undo,
    redo,
    resetHistory,
    numRows,
    setNumRows,
    numCols,
    setNumCols,
    cellSize,
    setCellSize,
    border,
    setBorder,
    currentLayer,
    setCurrentLayer,
    currentColour,
    setCurrentColour,
    currentShape,
    setCurrentShape,
    currentRotation,
    setCurrentRotation,
    showColourPicker,
    setShowColourPicker,
    showGrid,
    setShowGrid,
    showPaletteTemplates,
    setShowPaletteTemplates,
    colourPalette,
    setColourPalette,
    sBlocks,
    // setSBlocks,
    paletteArray,
    setPaletteArray,
    rotationArray,
    layers,
    setLayers,
    showSnackBar,
    setShowSnackBar,
    darkTheme,
    setDarkTheme,
  } = useSBlocksData();

  //Array used to map through all shapes in the menu.
  const shapeArray: {shape: string; function: Function}[] = [
    {shape: "FULL", function: () => setCurrentShape("FULL")},
    {shape: "CIRCLE", function: () => setCurrentShape("CIRCLE")},
    {shape: "QUARTERCIRCLE", function: () => setCurrentShape("QUARTERCIRCLE")},
    {shape: "SBLOCKCIRCLEQUARTER", function: () => setCurrentShape("SBLOCKCIRCLEQUARTER")},
    {shape: "HALFSTADIUM", function: () => setCurrentShape("HALFSTADIUM")},
    {shape: "ELLIPS", function: () => setCurrentShape("ELLIPS")},
    {shape: "DROP", function: () => setCurrentShape("DROP")},
    {shape: "RECTANGLE", function: () => setCurrentShape("RECTANGLE")},
    {shape: "TRIANGLE", function: () => setCurrentShape("TRIANGLE")},
    {shape: "HALFTRIANGLE", function: () => setCurrentShape("HALFTRIANGLE")},
    {shape: "ROUNDCORNER", function: () => setCurrentShape("ROUNDCORNER")},
    {shape: "HALFCIRCLEOUTWARDS", function: () => setCurrentShape("HALFCIRCLEOUTWARDS")},
    {shape: "HALFCIRCLEINWARDS", function: () => setCurrentShape("HALFCIRCLEINWARDS")},
  ];

  // Initialize the grid with empty cells
  const initializeGrid = () => {
    const grid: any[] = [];
    if (numRows == null || numCols == null) {
      console.log("amount of columns and/or rows not defined");
      return;
    }

    for (let y = 1; y <= numRows; y++) {
      const row = [];
      for (let x = 1; x <= numCols; x++) {
        row.push(null); // Initialize with empty cells
      }
      grid.push(row);
    }
    // Set sBlocks on the grid
    sBlocks.forEach((sBlock: any) => {
      const xIndex = sBlock["xPosition"];
      const yIndex = sBlock["yPosition"];
      grid[yIndex][xIndex] = sBlock;
    });
    setGridData(grid);
    resetHistory();
  };

  // Handle cell click
  //puts the current shape (or an eraser block) in each of the given cells in one go.
  //With record = true the grid before the change is kept for undo, so a whole drag is one undo step.
  const paintCells = (cells: [number, number][], record: boolean) => {
    if (cells.length === 0 || !currentLayer || currentShape === null) return;
    const erase = currentShape === "EMPTY";

    //read the latest grid from the store, several cells can be painted before React re-renders
    const next = [...useSBlocksStore.getState().gridData];
    const copiedRows = new Set<number>();

    for (const [x, y] of cells) {
      if (!next[y] || x < 0 || x >= next[y].length) continue;
      const existing: SBlockType[] | null = next[y][x];
      //there is nothing to erase in an empty cell
      if (!existing && erase) continue;

      const newBlock: SBlockType = {
        id: x + "_" + y + "_" + currentLayer.id,
        xPosition: x,
        yPosition: y,
        zPosition: currentLayer.id,
        width: 1,
        height: 1,
        layer: currentLayer.id,
        colour: erase ? "transparent" : typeof currentColour == "string" ? currentColour : currentColour?.hex,
        shape: erase ? "FULL" : (currentShape as string),
        rotation: erase ? 0 : currentRotation,
      };

      //copy rows and cells instead of changing them, so earlier grids stay valid for undo
      if (!copiedRows.has(y)) {
        next[y] = [...next[y]];
        copiedRows.add(y);
      }
      if (!existing) {
        next[y][x] = [newBlock];
      } else {
        //if there is already a shape on this layer, replace it, else add
        const newArray = [...existing];
        const index = newArray.findIndex((shape: SBlockType) => shape.zPosition == currentLayer.id);
        if (index >= 0) {
          newArray.splice(index, 1, newBlock);
        } else {
          newArray.push(newBlock);
        }
        next[y][x] = newArray;
      }
    }
    commitGrid(next, record);
  };

  const handleCellClick = (x: number, y: number) => paintCells([[x, y]], true);

  //Download a jpg of the current grid
  const handleDownload = async (type: "PNG" | "JPG") => {
    let data;

    const element = document.getElementById("savableGrid");

    if (!element) {
      return console.log("NO GRID FOUND"); //TODO ADD TOAST FOR ALERTS
    }

    //always save at the base cell size, whatever the zoom level is
    const cellPx = parseInt(cellSize, 10) || 40;
    const canvas = await html2canvas(element, {
      scale: 40 / cellPx,
      onclone: (doc) => {
        //the sticky number labels should not add a background to the saved image
        doc.querySelectorAll<HTMLElement>("[data-sticky]").forEach((el) => {
          el.style.position = "static";
          el.style.background = "transparent";
        });
      },
    });

    if (type === "JPG") {
      data = canvas.toDataURL("image/jpg");
    } else {
      data = canvas.toDataURL("image/png");
    }

    const link = document.createElement("a");
    link.href = data;

    if (type === "JPG") {
      link.download = "sBlocks.jpg";
    } else {
      link.download = "sBlocks.png";
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddColourPalette = (index: number, colour: any) => {
    if (index >= 0 && index < colourPalette?.length) {
      // Create a copy of the original array
      const newColourPalette = [...colourPalette];

      // Replace the color at the specified index and update the state
      newColourPalette[index] = colour;
      console.log(newColourPalette);
      setColourPalette(newColourPalette);
    } else {
      console.error(`Invalid index: ${index}`);
    }
  };

  //sets the current rotation. Moves through the array of rotations.
  const handleClickRotation = () => {
    const curr = currentRotation;
    const index = rotationArray?.findIndex((obj: any) => obj === curr);
    let newIndex: number;
    //if the last item of the array is currenly chosen, start at the begin again, else get the next rotation
    if (index + 1 === rotationArray?.length) {
      newIndex = 0;
    } else {
      newIndex = index + 1;
    }
    const newRotation: number | undefined = rotationArray?.find((num, index) => index == newIndex);

    setCurrentRotation(newRotation as 0 | 90 | 180 | 270);
  };

  //when clicking a colour palette, it sets it as the new colour palette array.
  const handleSetColourPaletteArray = (newColourPalette?: any[]) => {
    if (newColourPalette) {
      setColourPalette(newColourPalette);
    } else {
      setColourPalette(["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"]); //make empty
    }
  };

  //upon opening the colour palettes menu, it fetches the colour palettes from the json in public folder
  const fetchSBlocksColourTemplates = () => {
    if (paletteArray?.length <= 0) {
      fetch("/data/sBlocksColourTemplates.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          if (data?.ColourPaletteTemplates) {
            const paletteArray: any[] = data?.ColourPaletteTemplates;
            setPaletteArray(paletteArray);
            console.log(paletteArray);
          } else {
            console.log("No colour palettes found;");
          }
        })
        .catch()
        .finally();
    }
  };

  //returns a number for the z-index of a shape based on what layer it is in.
  const determineZIndexBasedOnLayerId = (layerId: number): number => {
    const foundLayer = layers?.find((l) => l.id == layerId);
    if (foundLayer) {
      return foundLayer.index * 5;
    } else {
      return 0;
    }
  };

  //returns true of false based on the layer of the shape. if this has a prop visible = true, then return true. Else return false.
  const determineVisibilityBasedOnLayerId = (layerId: number): boolean => {
    const foundLayer = layers?.find((l: SBlockLayer) => l.id == layerId);
    if (foundLayer) {
      return foundLayer.visible;
    } else {
      return false;
    }
  };

  const handleExport = () => {
    const fileData = {
      cellSize: cellSize,
      numRows: numRows,
      numCols: numCols,
      gridData: gridData,
    };
    const jsonData = JSON.stringify(fileData, null, 2);

    // const jsonData = JSON.stringify(gridData, null, 2);
    const blob = new Blob([jsonData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exportDesign_" + new Date().toDateString() + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: any) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setNumRows(importedData?.numRows);
          setNumCols(importedData?.numCols);
          setTimeout(() => setGridData(importedData?.gridData), 100);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return {
    determineZIndexBasedOnLayerId,
    determineVisibilityBasedOnLayerId,
    gridData,
    setGridData,
    currentLayer,
    setCurrentLayer,
    numRows,
    setNumRows,
    numCols,
    setNumCols,
    cellSize,
    setCellSize,
    border,
    setBorder,
    initializeGrid,
    handleCellClick,
    paintCells,
    canUndo,
    canRedo,
    undo,
    redo,
    currentColour,
    setCurrentColour,
    showColourPicker,
    setShowColourPicker,
    currentShape,
    setCurrentShape,
    shapeArray,
    currentRotation,
    setCurrentRotation,
    handleClickRotation,
    rotationArray,
    showGrid,
    setShowGrid,
    handleDownload,
    handleAddColourPalette,
    colourPalette,
    setColourPalette,
    handleSetColourPaletteArray,
    showPaletteTemplates,
    setShowPaletteTemplates,
    paletteArray,
    setPaletteArray,
    fetchSBlocksColourTemplates,
    layers,
    setLayers,
    showSnackBar,
    setShowSnackBar,
    darkTheme,
    setDarkTheme,
    handleExport,
    handleImport,
  };
};
