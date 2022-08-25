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
import { getDatasetAtEvent, getElementAtEvent, Line } from 'react-chartjs-2';
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

import GraphAPI from '@/api/GraphAPI';
interface ResTypes {
  targetPolitician: string;
  _id: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: { pro: number; con: number; neu: number };
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: number;
}
import { dateTrans } from '@/utils/DateFormatter';
const labels = [
  '11:30분',
  '11:45분',
  '12:10분',
  '15:50분',
  '17:30분',
  '19:30분',
  '20:30분',
  '20:30분',
  '20:30분',
  '20:30분',
];
const Graph = (): JSX.Element => {
  const chartRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [point, setPoint] = useState<any>();
  const [issueDate, setIssueDate] = useState<any>([]);
  const [poll, setPoll] = useState<any>([]);
  const [content, setContent] = useState<any>([]);
  const [score, setScore] = useState<any>([]);
  const [data, setData] = useState<any>();
  const [isFirst, setIsFirst] = useState(false);
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

  const start = async () => {
    const getData = async () => {
      let target = '6303bed2e9d44f884ed1d640';
      const res = await GraphAPI.getGraph(target);
      res.data.map((res: ResTypes) => {
        setIssueDate((current: Date[] | []) => {
          let date = dateTrans(res.issueDate);
          console.log(date);
          const temp = [...current, date];
          return temp;
        });

        setPoll((current: any) => {
          const temp = [...current, res.poll];
          return temp;
        });
        setContent((current: any) => {
          const temp = [...current, res.content];
          return temp;
        });
        setScore((current: any) => {
          const temp = [...current, res.poll.pro - res.poll.con];
          return temp;
        });
      });
    };
    if (!isFirst) {
      await getData();
    }
    setData({
      labels: issueDate,
      datasets: [
        {
          data: score,
          tension: 0.3,
          fill: {
            target: { value: 0 },
            below: 'rgba(255, 26, 104, 0.2)',
            above: 'rgba(75, 192, 192,0.2)',
          },
        },
      ],
    });

    setIsFirst(true);
    console.log(content);
  };

  useEffect(() => {
    start();
    if (isFirst) {
      setTimeout(() => {
        () => start();
      }, 1);
    } else {
      setTimeout(() => {
        () => start();
      }, 1);
    }
  }, [isFirst]);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,

        external: function (context: any) {
          // Tooltip Element

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
            return poll;
          }
          // Set Text
          if (tooltipModel.body) {
            const bodyLines = tooltipModel.body.map(getBody);
            const result = bodyLines[0].map((body: any) => {
              return Object.values(body);
            });
            const tableHead = document.createElement('div');
            function drow(div: Element, body: Element, index: number) {
              const imgSrc = [
                'img/circle.png',
                'img/triangle.png',
                'img/x.png',
              ];
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
            console.log(bodyLines, '532253');
            result[tooltipModel.dataPoints[0].dataIndex].forEach(
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
          tooltipEl.style.padding = '15px';
          tooltipEl.style.borderRadius = '5px';
          tooltipEl.style.width = '100px';
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        height: '50%',
        width: '60%',
      }}
    >
      {data && (
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
      )}
      <div>
        {open && <Modal setOpen={setOpen} element={point} content={content} />}
      </div>
    </div>
  );
};

export default Graph;
