export type SBlockType = {
  shape: string;
  id: string;
  xPosition: number;
  yPosition: number;
  zPosition: number;
  width: number;
  height: number;
  layer: number;
  colour: any;
  rotation: number;
};

export type Colour = {
  hsl: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  oldHue: number;
  source: string;
};

export type SBlockLayer = {
  id: number;
  name: string;
  index: number;
  visible: boolean;
  deletable: boolean;
};
