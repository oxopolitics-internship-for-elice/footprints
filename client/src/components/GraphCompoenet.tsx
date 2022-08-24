import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  InteractionItem,
} from 'chart.js';
import { getElementAtEvent, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import Modal from './Modal';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const labels = [
  '11:30분',
  '11:45분',
  '12:10분',
  '15:50분',
  '17:30분',
  '19:30분',
  '20:30분',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -100, max: 100 })),
      tension: 0.5,
      fill: {
        target: { value: 0 },
        below: 'rgba(255, 26, 104, 0.2)',
        above: 'rgba(75, 192, 192,0.2)',
      },
    },
  ],
};

const Graph = (): JSX.Element => {
  const chartRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [point, setPoint] = useState<any>();
  function ClickHander(
    element: InteractionItem[],
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    if (element.length !== 0) {
      const { datasetIndex, index } = element[0];
      setOpen(!open);
      return element[0].element;
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        height: '200px',
        width: '800px',
      }}
    >
      <Line
        ref={chartRef}
        onClick={event => {
          let point = ClickHander(
            getElementAtEvent(chartRef.current, event),
            event,
          );

          setPoint(point);
        }}
        options={options}
        data={data}
      />
      <div>{open && <Modal setOpen={setOpen} element={point} />}</div>
    </div>
  );
};

export const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,

      external: function (context: any) {
        // Tooltip Element

        let num: number[][] = [
          [10, 30, 50],
          [20, 60, 30],
          [30, 50, 20],
          [10, 50, 20],
          [70, 50, 20],
          [30, 50, 20],
          [60, 50, 20],
        ];

        let tooltipEl = document.getElementById('chartjs-tooltip');
        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<div></div>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody() {
          return num;
        }
        console.log(tooltipModel);
        // Set Text
        if (tooltipModel.body) {
          const bodyLines = tooltipModel.body.map(getBody);
          const tableHead = document.createElement('div');
          function drow(div: Element, body: Element, index: number) {
            const imgSrc = ['img/circle.png', 'img/triangle.png', 'img/x.png'];
            const imageTh = document.createElement('span');
            const image = document.createElement('img');
            image.src = imgSrc[index];
            image.height = 20;
            image.width = 20;
            image.style.position = 'relative';
            image.style.top = '3px';
            imageTh.style.padding = '10px';
            image.style.display = 'inline-block';
            imageTh.appendChild(image);

            const numSpan = document.createElement('span');
            const num = document.createTextNode(': ' + body);
            numSpan.appendChild(num);

            const br = document.createElement('br');
            div.appendChild(imageTh);
            div.appendChild(numSpan);
            div.appendChild(br);
          }
          bodyLines[0][tooltipModel.dataPoints[0].dataIndex].forEach(
            (body: any, index: number) => {
              const div = document.createElement('div');
              drow(div, body, index);
              tableHead.appendChild(div);
            },
          );

          const tableRoot = tooltipEl.querySelector('div');

          // Remove old children
          if (tableRoot && tableRoot.firstChild) {
            while (tableRoot.firstChild) {
              tableRoot.firstChild.remove();
            }
          }
          // Add new children
          tableRoot?.appendChild(tableHead);
        }

        const position = context.chart.canvas.getBoundingClientRect();
        // const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

        // Display, position, and set styles for font
        tooltipEl.style.opacity = '1';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top =
          position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        // tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding =
          tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.background = '#f5f5dc';
        tooltipEl.style.padding = '1px';
        tooltipEl.style.borderRadius = '5px';
        tooltipEl.style.width = '90px';
        tooltipEl.style.height = '80px';
      },
    },
    title: {
      display: true,
      text: '윤석열 인생 그래프',
    },
    legend: {
      display: false,
    },
  },
};

export default Graph;
