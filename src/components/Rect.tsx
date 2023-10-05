import React from "react";
import { calculateBorderBox, chooseFillColor } from "../utils/utils";

interface RectProps {
  id: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const Rect: React.FC<RectProps> = (props) => {
  const borderBoxParams = calculateBorderBox(
    props.width,
    props.height,
    props.rotation
  );
  return (
    <g>
      <rect
        fill={props.color}
        data-x={props.x}
        data-y={props.y}
        width={props.width}
        height={props.height}
        transform={`translate(${props.x}, ${props.y}) rotate(${
          props.rotation
        })  translate(-${props.width / 2},-${props.height / 2})`}
      ></rect>
      <circle
        fill={chooseFillColor(props.color)}
        cx={props.x}
        cy={props.y}
        r="4"
      ></circle>
      <text x={props.x + 5} y={props.y} fill={chooseFillColor(props.color)}>
        <tspan>{props.rotation}°</tspan>
      </text>
      <rect
        fill="none"
        strokeWidth="2"
        strokeOpacity="0.4"
        stroke="#FF0000"
        width={borderBoxParams.width}
        height={borderBoxParams.height}
        transform={`translate(${props.x}, ${props.y}) translate(-${
          borderBoxParams.width / 2
        }, -${borderBoxParams.height / 2})`}
      ></rect>
    </g>
  );
};

export default Rect;
