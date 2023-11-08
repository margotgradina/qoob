import {create} from "zustand";
import {Colour, SBlockLayer, SBlockType} from "../sBlockTypes";

const initialColour = {
  hsl: {
    h: 0,
    s: 0,
    l: 0,
    a: 1,
  },
  hex: "#000000",
  rgb: {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  hsv: {
    h: 0,
    s: 0,
    v: 0,
    a: 1,
  },
  oldHue: 0,
  source: "hsv",
};

type State = {
  gridData: any[];
  numRows: number;
  numCols: number;
  cellSize: string;
  border: string;

  currentLayer: SBlockLayer;
  currentColour: Colour;
  currentShape: string | null;
  currentRotation: 0 | 90 | 180 | 270;

  showColourPicker: boolean;
  showGrid: boolean;
  showPaletteTemplates: boolean;

  colourPalette: any[];
  sBlocks: SBlockType[];
  paletteArray: {name: string; colours: Colour[]}[];
  rotationArray: number[];
  layers: SBlockLayer[];
  showSnackBar: boolean;
  //   shapeArray: {shape: string; function: Function}[];
};

const initialState: State = {
  gridData: [],
  numRows: 20,
  numCols: 20,
  cellSize: "40px",
  border: "1px dashed grey",

  currentLayer: {id: 1, name: "layer 1", index: 0, visible: true, deletable: false},
  currentColour: initialColour,
  currentShape: "FULL",
  currentRotation: 0,

  showColourPicker: false,
  showGrid: true,
  showPaletteTemplates: false,

  colourPalette: ["transparent", "transparent", "transparent", "transparent", "transparent", "transparent"],
  sBlocks: [],
  paletteArray: [],
  rotationArray: [0, 90, 180, 270],
  layers: [{id: 1, name: "layer 1", index: 0, visible: true, deletable: false}],
  showSnackBar: false,
};

type Actions = {
  setGridData: (arr: any[]) => void;
  setNumRows: (num: number) => void;
  setNumCols: (num: number) => void;
  setCellsize: (str: string) => void;
  setBorder: (str: string) => void;

  setCurrentLayer: (layer: SBlockLayer) => void;
  setCurrentColour: (colour: Colour) => void;
  setCurrentShape: (str: string | null) => void;
  setCurrentRotation: (num: 0 | 90 | 180 | 270) => void;

  setShowColourPicker: (bool: boolean) => void;
  setShowGrid: (bool: boolean) => void;
  setShowPaletteTemplates: (bool: boolean) => void;
  setShowSnackBar: (bool: boolean) => void;

  setColourPalette: (arr: any[]) => void;
  setSBlocks: (arr: SBlockType[]) => void;
  setPaletteArray: (arr: {name: string; colours: Colour[]}[]) => void;
  setLayers: (arr: SBlockLayer[]) => void;
};

export const useSBlocksStore = create<State & Actions>((set) => ({
  ...initialState,
  clearDataStoreOO: () => set(initialState),
  setGridData: (arr: any[]) => set(() => ({gridData: arr})),
  setNumRows: (num: number) => set(() => ({numRows: num})),
  setNumCols: (num: number) => set(() => ({numCols: num})),
  setCellsize: (str: string) => set(() => ({cellSize: str})),
  setBorder: (str: string) => set(() => ({border: str})),

  setCurrentLayer: (layer: SBlockLayer) => set(() => ({currentLayer: layer})),
  setCurrentColour: (colour: Colour) => set(() => ({currentColour: colour})),
  setCurrentShape: (str: string | null) => set(() => ({currentShape: str})),
  setCurrentRotation: (num: 0 | 90 | 180 | 270) => set(() => ({currentRotation: num})),

  setShowColourPicker: (bool: boolean) => set(() => ({showColourPicker: bool})),
  setShowGrid: (bool: boolean) => set(() => ({showGrid: bool})),
  setShowPaletteTemplates: (bool: boolean) => set(() => ({showPaletteTemplates: bool})),
  setShowSnackBar: (bool: boolean) => set(() => ({showSnackBar: bool})),

  setColourPalette: (arr: any[]) => set(() => ({colourPalette: arr})),
  setSBlocks: (arr: SBlockType[]) => set(() => ({sBlocks: arr})),
  setPaletteArray: (arr: {name: string; colours: Colour[]}[]) => set(() => ({paletteArray: arr})),
  setLayers: (arr: SBlockLayer[]) => set(() => ({layers: arr})),
}));
