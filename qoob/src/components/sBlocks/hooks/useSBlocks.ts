import {SBlockLayer, SBlockType} from "../sBlockTypes";
import html2canvas from "html2canvas";
import {useSBlocksData} from "../store/useSblocksData";
// import {layer} from "@fortawesome/fontawesome-svg-core";
// import zIndex from "@material-ui/core/styles/zIndex";

export const useSBlocks = () => {
  const {
    gridData,
    setGridData,
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
  } = useSBlocksData();

  //Array used to map through all shapes in the menu.
  const shapeArray: {shape: string; function: Function}[] = [
    {shape: "FULL", function: () => setCurrentShape("FULL")},
    {shape: "CIRCLE", function: () => setCurrentShape("CIRCLE")},
    {shape: "QUARTERCIRCLE", function: () => setCurrentShape("QUARTERCIRCLE")},
    {shape: "HALFSTADIUM", function: () => setCurrentShape("HALFSTADIUM")},
    {shape: "ELLIPS", function: () => setCurrentShape("ELLIPS")},
    {shape: "DROP", function: () => setCurrentShape("DROP")},
    {shape: "RECTANGLE", function: () => setCurrentShape("RECTANGLE")},
    {shape: "TRIANGLE", function: () => setCurrentShape("TRIANGLE")},
    {shape: "HALFTRIANGLE", function: () => setCurrentShape("HALFTRIANGLE")},
    {shape: "ROUNDCORNER", function: () => setCurrentShape("ROUNDCORNER")},
    {shape: "HALFCIRCLEOUTWARDS", function: () => setCurrentShape("HALFCIRCLEOUTWARDS")},
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
  };

  // Handle cell click
  const handleCellClick = (x: number, y: number) => {
    // console.log(gridData);
    const updatedGrid = [...gridData];

    //CHECK IF THERE IS ALREADY ANYTHING IN THAT CELL, IF NOT, THEN ADD A NEW ARRAY
    if (!gridData[y][x]) {
      if (currentShape === "EMPTY") {
        //DO NOTHING - there is no shapes yet and therfore nothing to delete
      } else {
        // You can create a new sBlock here, for example, using a function to generate a unique ID
        const newBlock: SBlockType = {
          id: x + "_" + y + "_" + currentLayer.id, // Replace with your unique ID generation logic
          xPosition: x,
          yPosition: y,
          zPosition: currentLayer?.id,
          width: 1,
          height: 1,
          layer: currentLayer?.id,
          colour: typeof currentColour == "string" ? currentColour : currentColour?.hex, // Set the desired color //TODO REPLACE WITH HEX WHEN LAYERS ARE BEING IMPLEMENTED
          shape: currentShape as string,
          rotation: currentRotation,
        };
        // Update the gridData with the new sBlock in an array
        updatedGrid[y][x] = [newBlock];
      }

      // Set the updated grid data
      setGridData(updatedGrid);
    } else {
      //THERE IS ALREADY SHAPES IN THE CELL. If there is already a shape with this layer.id, then replace, else, add.
      const newArray: SBlockType[] = [...gridData[y][x]];
      let newBlock: SBlockType;

      //The to add shape
      if (currentShape == "EMPTY") {
        newBlock = {
          id: x + "_" + y + "_" + currentLayer.id, // Replace with your unique ID generation logic
          xPosition: x,
          yPosition: y,
          zPosition: currentLayer.id,
          width: 1,
          height: 1,
          layer: currentLayer.id,
          colour: "transparent", // Set the desired color //TODO REPLACE WITH HEX WHEN LAYERS ARE BEING IMPLEMENTED
          shape: "FULL",
          rotation: 0,
        };
      } else {
        newBlock = {
          id: x + "_" + y + "_" + currentLayer.id, // Replace with your unique ID generation logic
          xPosition: x,
          yPosition: y,
          zPosition: currentLayer?.id,
          width: 1,
          height: 1,
          layer: currentLayer?.id,
          colour: typeof currentColour == "string" ? currentColour : currentColour?.hex, // Set the desired color //TODO REPLACE WITH HEX WHEN LAYERS ARE BEING IMPLEMENTED
          shape: currentShape as string,
          rotation: currentRotation,
        };
      }

      // const existingShapeOnLayer : SBlockType | undefined = newArray?.find((shape: SBlockType) => shape.zPosition == currentLayer.id)
      const index: number = newArray.findIndex((shape: SBlockType) => {
        //TODO DOES NOT YET WORK!!!
        return shape.zPosition == currentLayer.id;
      });
      console.log(index);
      //check if there is already a shape on the current layer, if so: replace. If not, add.
      if (index >= 0) {
        newArray.splice(index, 1, newBlock);
      } else {
        newArray.push(newBlock);
      }
      updatedGrid[y][x] = newArray;
      setGridData(updatedGrid);
    }
  };

  //Download a jpg of the current grid
  const handleDownload = async (type: "PNG" | "JPG") => {
    let data;

    const element = document.getElementById("savableGrid");

    if (!element) {
      return console.log("NO GRID FOUND"); //TODO ADD TOAST FOR ALERTS
    }

    const canvas = await html2canvas(element);

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
  };
};
