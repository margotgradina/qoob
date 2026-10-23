import {SBlockLayer} from "../components/sBlocks/sBlockTypes";

//the project file: everything needed to continue working on a design later
export type QoobProject = {
  app: "qoob";
  version: 1;
  numCols: number;
  numRows: number;
  layers: SBlockLayer[];
  colourPalette: any[];
  darkTheme: boolean;
  gridData: any[][];
};

export const MAX_GRID_SIZE = 50;

export const buildProject = (p: Omit<QoobProject, "app" | "version">): QoobProject => ({app: "qoob", version: 1, ...p});

export const projectFileName = () => `qoob-project-${new Date().toISOString().slice(0, 10)}.json`;

const isObject = (v: unknown): v is Record<string, any> => typeof v === "object" && v !== null && !Array.isArray(v);
const isSize = (n: unknown): n is number => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= MAX_GRID_SIZE;

//reads and checks the text of a project file. Throws an Error with a message for the user when it is not valid.
export const parseProject = (text: string, fallbackLayers: SBlockLayer[], fallbackPalette: any[]): QoobProject => {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("That file is not valid JSON.");
  }
  if (!isObject(data) || data.app !== "qoob") throw new Error("That file is not a Qoob project.");
  if (data.version !== 1) throw new Error("That project was made with a newer version of Qoob.");

  const {numCols, numRows, gridData} = data;
  if (!isSize(numCols) || !isSize(numRows)) throw new Error(`The grid size must be between 1 and ${MAX_GRID_SIZE}.`);
  if (!Array.isArray(gridData) || gridData.length !== numRows || gridData.some((row) => !Array.isArray(row) || row.length !== numCols)) {
    throw new Error("The grid in this file does not match its size.");
  }
  const badCell = gridData.some((row) =>
    row.some(
      (cell: unknown) =>
        cell !== null &&
        (!Array.isArray(cell) ||
          cell.some((b) => !isObject(b) || typeof b.shape !== "string" || typeof b.colour !== "string" || typeof b.rotation !== "number" || typeof b.zPosition !== "number"))
    )
  );
  if (badCell) throw new Error("Some shapes in this file are damaged.");

  let layers = fallbackLayers;
  if (data.layers !== undefined) {
    const ok =
      Array.isArray(data.layers) &&
      data.layers.length > 0 &&
      data.layers.every((l: unknown) => isObject(l) && typeof l.id === "number" && typeof l.name === "string" && typeof l.index === "number" && typeof l.visible === "boolean" && typeof l.deletable === "boolean");
    if (!ok) throw new Error("The layers in this file are damaged.");
    layers = data.layers;
  }

  let colourPalette = fallbackPalette;
  if (data.colourPalette !== undefined) {
    const ok = Array.isArray(data.colourPalette) && data.colourPalette.every((c: unknown) => c === "transparent" || (isObject(c) && typeof c.hex === "string"));
    if (!ok) throw new Error("The saved colours in this file are damaged.");
    colourPalette = data.colourPalette;
  }

  return {app: "qoob", version: 1, numCols, numRows, layers, colourPalette, darkTheme: data.darkTheme === true, gridData};
};
