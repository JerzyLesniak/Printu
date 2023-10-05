import rootReducer from "./reducers";

export type RootState = ReturnType<typeof rootReducer>;

export interface State {
  id: string;
  project: {
    id: string;
    name: string;
    width: number;
    height: number;
    items: PrintElement[];
  };
}

export enum ElementType {
  RECT = "rectangle",
  ELLIPSE = "ellipse",
}

export interface PrintElement {
  id: string;
  type: ElementType;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
