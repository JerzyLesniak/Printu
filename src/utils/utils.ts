import { AxiosError } from "axios";
import { hex } from "wcag-contrast";
import { ElementType, State } from "../store/store";

export function chooseFillColor(backgroundColor: string): string {
  const contrast = hex(backgroundColor, "#000000");

  const fillColor = contrast >= 6 ? "#000000" : "#FFFFFF";

  return fillColor;
}

export function calculateBorderBox(
  width: number,
  height: number,
  rotate: number
) {
  const ellipseWidth = 2 * (width / 2);
  const ellipseHeight = 2 * (height / 2);

  const rotateRadians = (rotate * Math.PI) / 180;

  const rotatedWidth =
    Math.abs(ellipseWidth * Math.cos(rotateRadians)) +
    Math.abs(ellipseHeight * Math.sin(rotateRadians));
  const rotatedHeight =
    Math.abs(ellipseWidth * Math.sin(rotateRadians)) +
    Math.abs(ellipseHeight * Math.cos(rotateRadians));

  return {
    width: rotatedWidth,
    height: rotatedHeight,
  };
}

export function getApiErrorMessage(error: AxiosError): string {
  const defaultMessage = "Ups... Coś poszło nie tak - Blad - ";

  switch (error.response?.status) {
    case 500:
      return defaultMessage + 500;
    case 404:
      return defaultMessage + 404;
    default:
      return defaultMessage + error.message;
  }
}

export function isState(state: State): boolean {
  return (
    typeof state.project.height === "number" &&
    typeof state.project.width === "number" &&
    state.project.items.every((element) => {
      return (
        (typeof element.height === "number" &&
          typeof element.width === "number" &&
          typeof element.rotation === "number" &&
          typeof element.x === "number" &&
          typeof element.y === "number" &&
          element.type === ElementType.ELLIPSE) ||
        element.type === ElementType.RECT
      );
    })
  );
}
