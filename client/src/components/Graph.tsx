import styled from 'styled-components';
import { pointsProps, data, line, lineGraphProps } from '../types/graph';

function LineGraph({ points, data }: lineGraphProps): JSX.Element {
  const lines = points.reduce(
    (result: line[], point: pointsProps, index: number) => {
      if (index === 0) return [];
      const previous = points[index - 1];
      const line = { x1: previous.x, y1: previous.y, x2: point.x, y2: point.y };
      return [...result, line];
    },
    [],
  );

  return (
    <svg viewBox={`0 -40 556 140`} width="100%" height="100%">
      {lines.map(({ x1, x2, y1, y2 }) => (
        <GraphLine x1={x1} x2={x2} y1={y1} y2={y2} />
      ))}

      {points.map(({ x, y }: any, index) => {
        return (
          <>
            <GraphCircle cx={x} cy={y} r="5" />
            <Text
              x={x - 10}
              y={y - 15}
              isLastIndex={points.length === index + 1}
            >
              {data[index].cycle + '일'}
            </Text>
          </>
        );
      })}
    </svg>
  );
}

export default LineGraph;

const GraphLine = styled.line`
  stroke: rgb(34, 34, 34);
  stroke-width: 2;
`;

const GraphCircle = styled.circle`
  fill: rgb(34, 34, 34);
`;

const Text = styled.text<{ isLastIndex: boolean }>`
  fill: ${props => (props.isLastIndex ? '#f00' : 'rgb(112, 112, 112)')};
  font-weight: bold;
  font-size: 12px;
`;
