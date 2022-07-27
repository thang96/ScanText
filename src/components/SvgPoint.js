import React from 'react';
import Svg, {Polyline, Line, Path} from 'react-native-svg';

const SvgPoint = props => {
  const {heightImage, widthImage, point1, point2, point3, point4} = props;
  return (
    <Svg height={`${heightImage}`} width={`${widthImage}`}>
      <Line
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        stroke="rgb(24,119,242)"
        strokeWidth="1.5"
      />
      <Line
        x1={point2.x}
        y1={point2.y}
        x2={point3.x}
        y2={point3.y}
        stroke="rgb(24,119,242)"
        strokeWidth="1.5"
      />
      <Line
        x1={point3.x}
        y1={point3.y}
        x2={point4.x}
        y2={point4.y}
        stroke="rgb(24,119,242)"
        strokeWidth="1.5"
      />
      <Line
        x1={point4.x}
        y1={point4.y}
        x2={point1.x}
        y2={point1.y}
        stroke="rgb(24,119,242)"
        strokeWidth="1.5"
      />
    </Svg>
  );
};
export default SvgPoint;
