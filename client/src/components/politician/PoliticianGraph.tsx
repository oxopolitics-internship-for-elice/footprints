import React, { useEffect, useRef, useState } from 'react';
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
import Circle from '@/assets/img/circle.png';
import Triangle from '@/assets/img/triangle.png';
import X from '@/assets/img/x.png';

import dateFormatter from '@/utils/DateFormatter';
import styled from '@emotion/styled';
import { getElementAtEvent, Line } from 'react-chartjs-2';
import GraphAPI from '@/api/GraphAPI';
import Modal from './PoliticianModal';
import { BsArrowRepeat } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { deflateRaw } from 'zlib';
import PoliticianNameState from '@/store/PoliticianNameState';
import { useRecoilValue } from 'recoil';

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
type poll = {
  pro: number;
  neu: number;
  con: number;
};

export interface ResTypes {
  id: string;
  _id: string;
  targetPolitician: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: poll;
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: number;
  title: string;
}

export interface ResDataTypes {
  id: string;
  _id: string;
  targetPolitician: string;
  createdAt: Date;
  regiUser: string;
  regiStatus: string;
  regi: { pro: number; con: number };
  poll: poll[];
  issueDate: Date;
  pollDate: Date;
  content: string;
  isPollActive: boolean;
  updatedAt: Date;
  score: number;
  title: string;
}

const PoliticianGraph = (): JSX.Element => {
  const chartRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [point, setPoint] = useState<any>();
  const [issueDate, setIssueDate] = useState<any>([]);
  const [content, setContent] = useState<any>([]);
  const [data, setData] = useState<any>();
  const [isFirst, setIsFirst] = useState(true);
  const [index, setIndex] = useState<number>(1);
  const [NextPageable, isNextPageable] = useState<boolean>(true);
  const [contentId, setContentId] = useState<any>([]);
  const [resData, setResData] = useState<any>([]);
  const id = useLocation().pathname.split('/')[2];
  const name = useRecoilValue(PoliticianNameState).find(
    (politician: any) => politician[id],
  )[id];
  console.log(name);

  function ClickHandler(
    element: InteractionItem[],
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) {
    if (element.length !== 0) {
      const { datasetIndex, index } = element[0];
      setOpen(!open);
      document.body.style.overflow = 'hidden';

      return element[0].element;
    }
  }

  const getData = async (index: number | Number) => {
    const res = await GraphAPI.getGraph(id, index);

    res.data.data.map(async (res: ResTypes, index: number) => {
      setResData((current: any) => {
        let tempdata = dateFormatter(res.issueDate);

        if (index === 0) {
          const issueDate = [tempdata];
          const poll = [res.poll];
          const content = [res.content];
          const score = [res.poll.pro - res.poll.con];
          const id = [res._id];
          const title = [res.title];

          return { issueDate, poll, content, score, id, title };
        } else {
          const issueDate = [...current.issueDate, tempdata];
          const poll = [...current.poll, res.poll];
          const content = [...current.content, res.content];

          const score = [...current.score, res.poll.pro - res.poll.con];
          const id = [...current.id, res._id];
          const title = [...current.title, res.title];

          return { issueDate, poll, content, score, id, title };
        }
      });
    });

    isNextPageable(res.data.meta.hasNextPage);
  };

  const start = async () => {
    if (isFirst === true) {
      await getData(index);
      setIsFirst(false);
    }
    setData({
      labels: resData.issueDate,
      datasets: [
        {
          data: resData.score,
          tension: 0.3,
          fill: {
            target: { value: 0 },
            below: 'rgba(255, 26, 104, 0.2)',
            above: 'rgba(75, 192, 192,0.2)',
          },
        },
      ],
    });
  };
  const getNextData = async () => {
    await getData(index + 1);
    setIndex(index + 1);
  };
  const getPreData = async () => {
    await getData(index - 1);
    setIndex(index - 1);
  };
  const ClickButton = async () => {
    await start();
  };
  useEffect(() => {
    if (isFirst === false) {
      ClickButton();
    }
  }, [index]);

  useEffect(() => {
    start();
    if (!isFirst) {
      start();
    }
  }, [isFirst]);

  const options = {
    maintainAspectRatio: false,

    plugins: {
      tooltip: {
        enabled: false,
        maintainAspectRatio: true,
        external: function (context: any) {
          darwTooltip(context, resData);
        },
      },

      title: {
        display: true,
        font: {
          size: 30,
        },
        text: `${name}의 그래프`,
      },
      legend: {
        display: false,
      },
      datalabels: {
        font: {
          size: 15,
        },
      },
    },
    elements: {
      point: {
        radius: 15,
        hoverRadius: 15,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  const string1 = '<';
  const string2 = '>';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '700px',
        marginBottom: '50px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '100px 0 30px 0px',
        }}
      >
        {NextPageable === false ? null : (
          <GraphButton
            style={{ float: 'left', marginTop: '350px' }}
            onClick={getNextData}
          >
            {string1}
          </GraphButton>
        )}

        <div
          style={{
            height: '100%',
            width: '80%',
          }}
        >
          {data && (
            <Line
              ref={chartRef}
              onClick={event => {
                let point = ClickHandler(
                  getElementAtEvent(chartRef.current, event),
                  event,
                );
                setPoint(point);
              }}
              options={options}
              data={data}
              plugins={[ChartDataLabels]}
            />
          )}
          {index === 1 ? null : (
            <GraphButton
              style={{ marginTop: '-350px', marginRight: '-10px' }}
              onClick={getPreData}
            >
              {string2}
            </GraphButton>
          )}
          <div>
            {open && (
              <Modal
                setOpen={setOpen}
                element={point}
                content={content}
                contentId={contentId}
                issueDate={issueDate}
                resData={resData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticianGraph;

function darwTooltip(context: any, resData: ResDataTypes) {
  let tooltipEl = document.getElementById('chartjs-tooltip');
  console.log(context);
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
    return resData.poll;
  }
  // Set Text
  if (tooltipModel.body) {
    const bodyLines = tooltipModel.body.map(getBody);
    const result = bodyLines[0].map((body: any) => {
      return Object.values(body);
    });
    const tableHead = document.createElement('div');
    const br = document.createElement('br');

    function drow(div: Element, body: Element, index: number) {
      const imgSrc = [Circle, Triangle, X];
      const imageTh = document.createElement('div');
      const image = document.createElement('img');
      if (index === 0) {
        const Title = document.createElement('div');
        const TitleText = document.createTextNode(
          resData.title[tooltipModel.dataPoints[0].dataIndex],
        );
        Title.style.whiteSpace = 'nowrap';
        Title.style.overflow = 'hidden';
        Title.style.textOverflow = 'ellipsis';
        Title.style.width = '330px';
        Title.style.height = '30px';
        Title.style.textAlign = 'center';
        Title.style.fontWeight = '700';
        Title.style.fontSize = '23px';
        Title.style.backgroundColor = '#f1f1f1';
        Title.style.paddingBottom = '40px';
        Title.appendChild(TitleText);
        tableHead.appendChild(Title);
        tableHead.appendChild(br);
      }

      image.src = imgSrc[index];
      image.height = 20;
      image.width = 20;
      image.style.position = 'relative';
      image.style.top = '3px';
      imageTh.style.padding = '10px';
      image.style.display = 'inline-block';
      imageTh.appendChild(image);

      const num = document.createTextNode(': ' + body);
      imageTh.style.marginLeft = '120px';

      imageTh.appendChild(num);

      div.appendChild(imageTh);
      div.appendChild(br);
    }

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

  tooltipEl.style.pointerEvents = 'none';
  tooltipEl.style.background = '#f5f5dc';
  tooltipEl.style.borderRadius = '5px';
  tooltipEl.style.width = '330px';
  tooltipEl.style.height = '225px';
}

interface Props {}
const GraphButton = styled.button<Props>`
  height: 3rem;
  width: 3rem;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 30px;
  border-width: 0.5px;
  float: right;
  opacity: 0.9;
  transition-duration: 0.4s;
  background-color: #babbbd;
  &:hover {
    color: white;
    background-color: #676168;
  }
`;
