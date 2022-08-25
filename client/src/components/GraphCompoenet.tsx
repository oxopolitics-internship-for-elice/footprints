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
import zoomPlugin from 'chartjs-plugin-zoom';

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
  zoomPlugin,
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
import dateFormatter from '@/utils/DateFormatter';
import styled from '@emotion/styled';
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
  const [canvasPoint, setCanvasPoint] = useState<any>([]);
  const [index, setIndex] = useState<number>(1);
  const [NextPageable, isNextPageable] = useState(true);
  function ClickHander(
    element: InteractionItem[],
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    console.log(element, 'egd');
    if (element.length !== 0) {
      const { datasetIndex, index } = element[0];
      let toop = document.getElementsByClassName('css-11oqkmf');
      console.log(toop, 'gs');
      setOpen(!open);

      return element[0].element;
    }
  }
  const handleResize = () => {
    setCanvasPoint([window.innerWidth, window.innerHeight]);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const getData = async (index: number | Number) => {
    let target = '6303bed2e9d44f884ed1d640';
    const res = await GraphAPI.getGraph(target, index);
    console.log(res);

    res.data.data.map((res: ResTypes) => {
      setIssueDate((current: Date[] | []) => {
        if (index >= 2) {
          let date = dateFormatter(res.issueDate);
          const temp = [date, ...current];
          return temp;
        } else {
          let date = dateFormatter(res.issueDate);
          const temp = [...current, date];
          return temp;
        }
      });

      setPoll((current: any) => {
        if (index >= 2) {
          const temp = [res.poll, ...current];
          return temp;
        } else {
          const temp = [...current, res.poll];
          return temp;
        }
      });
      setContent((current: any) => {
        if (index >= 2) {
          const temp = [res.content, ...current];
          return temp;
        } else {
          const temp = [...current, res.content];
          return temp;
        }
      });
      setScore((current: any) => {
        if (index >= 2) {
          const temp = [res.poll.pro - res.poll.con, ...current];
          return temp;
        } else {
          const temp = [...current, res.poll.pro - res.poll.con];
          return temp;
        }
      });
    });
    isNextPageable(res.data.meta.hasNextPage);
  };

  const start = async () => {
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
  };

  const getMoreData = async () => {
    if (NextPageable === true) {
      await getData(index + 1);
      setIndex(index + 1);
    } else {
      alert('마지막페이지입니다.');
    }
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
    console.log(index);
  }, [isFirst, index]);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
        maintainAspectRatio: false,
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
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
          drag: {
            enabled: true,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <GraphButton onClick={e => getMoreData(e)}>+</GraphButton>
      {data && (
        <div style={{ width: '1200px', height: '700px' }}>
          <Line
            ref={chartRef}
            onClick={event => {
              let point = ClickHander(
                getElementAtEvent(chartRef.current, event),
                event,
              );
              console.log(point);
              setPoint(point);
            }}
            options={options}
            data={data}
          />
        </div>
      )}
      <div>
        {open && <Modal setOpen={setOpen} element={point} content={content} />}
      </div>
    </div>
  );
};

export default Graph;

const GraphButton = styled.button`
  height: 3rem;
  width: 3rem;
  font-size: 30px;
  font-weight: bolder;
  position: relative;
  top: 300px;
  border-radius: 30px;
  border-width: 0.5px;
  opacity: 0.9;
`;
