import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
import ColoredCircle from '@/assets/selection/ColoredCircle.svg';
import ColoredTriangle from '@/assets/selection/ColoredTriangle.svg';
import ColoredX from '@/assets/selection/ColoredX.svg';
import { PollFormatter, ScoreFormatter } from '@/utils/Formatter';
import DateFormatter from '@/utils/DateFormatter';
import styled from '@emotion/styled';
import { getElementAtEvent, Line } from 'react-chartjs-2';
import dinosaur from '@/assets/tribe/dinosaur.png';
import elephant from '@/assets/tribe/elephant.png';
import hippo from '@/assets/tribe/hippo.png';
import lion from '@/assets/tribe/lion.png';
import tiger from '@/assets/tribe/tiger.png';
import oxo from '@/assets/tribe/oxo.png';
import GraphAPI from '@/api/GraphAPI';
import Modal from './PoliticianModal';
import { ResTypes, ResDataTypes, pollDeep } from '@/types/GraphTypes';
import { useParams } from 'react-router-dom';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import MinMax from '@/utils/MinMax';
import theme from '@/styles/theme';
import {
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { keyframes } from '@emotion/react';
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
interface Params {
  politicianID: string;
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
  const [resData, setResData] = useState<any>([]);
  const [minmax, setMinmax] = useState<any>([]);
  const [isHovering, setIsHovering] = useState(false);
  const { politicianID } = useParams<keyof Params>() as Params;

  function ClickHandler(element: InteractionItem[]) {
    if (element.length !== 0) {
      setOpen(!open);
      document.body.style.overflow = 'hidden';
      return element[0].element;
    }
  }

  const getData = async (index: number | Number) => {
    const res = await GraphAPI.getGraph(politicianID, index);
    res.data.data.map(async (res: ResTypes, index: number) => {
      setResData((current: any) => {
        let tempData = DateFormatter(res.issueDate, '.');
        let tempPoll = PollFormatter(res);
        let tempScore = ScoreFormatter(res);

        if (index === 0) {
          const issueDate = [tempData];
          const poll = [tempPoll];
          const content = [res.content];
          const score = [tempScore];
          const id = [res._id];
          const title = [res.title];

          return { issueDate, poll, content, score, id, title };
        } else {
          const issueDate = [tempData, ...current.issueDate];
          const poll = [tempPoll, ...current.poll];
          const content = [res.content, ...current.content];
          const score = [tempScore, ...current.score];
          const id = [res._id, ...current.id];
          const title = [res.title, ...current.title];

          return { issueDate, poll, content, score, id, title };
        }
      });
    });

    isNextPageable(res.data.meta.hasNextPage);
  };
  const Img = [tiger, hippo, elephant, dinosaur, lion, oxo];
  const chartPoint = Img.map(img => {
    const chartPoint = new Image();
    chartPoint.src = img;
    chartPoint.width = 30;
    chartPoint.height = 30;
    return chartPoint;
  });

  const start = async () => {
    if (isFirst === true) {
      await getData(index);
      setIsFirst(false);
    } else {
      const temp = MinMax(resData);
      setMinmax(temp);
      setData({
        labels: resData.issueDate,
        datasets: [
          {
            label: '호랑이',

            data: resData.score.map((score: any) => {
              return score.tiger.score;
            }),
            tension: 0.3,
            borderColor: '#E48F05',
            backgroundColor: 'transparent',
            pointStyle: chartPoint[0],
          },
          {
            label: '하마',

            data: resData.score.map((score: any) => {
              return score.hippo.score;
            }),
            tension: 0.3,
            borderColor: '#8D39A8',
            pointStyle: chartPoint[1],
          },
          {
            label: '코끼리',

            data: resData.score.map((score: any) => {
              return score.elephant.score;
            }),
            tension: 0.3,
            borderColor: '#2d8bb2',
            pointStyle: chartPoint[2],
          },
          {
            label: '공룡',
            data: resData.score.map((score: any) => {
              return score.dinosaur.score;
            }),
            tension: 0.3,
            borderColor: '#91A401',
            pointStyle: chartPoint[3],
          },

          {
            label: '사자',

            data: resData.score.map((score: any) => {
              return score.lion.score;
            }),
            tension: 0.3,
            borderColor: '#C2403D',
            pointStyle: chartPoint[4],
          },

          {
            label: '합계',

            data: resData.score.map((score: any) => {
              return score.total.score;
            }),
            pointStyle: chartPoint[5],
            tension: 0.3,
          },
        ],
      });
    }
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

  let count = 1;
  const options = {
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
        maintainAspectRatio: true,
        position: 'customPositioner' as 'customPositioner',
        external: function (context: any) {
          darwTooltip(context, resData);
        },
      },

      title: {
        display: false,
      },
      legend: {
        align: 'center',
        labels: {
          usePointStyle: true,
          font: {
            size: 18,
          },
          padding: 20,
        },
        onHover: function (event: any) {
          event.native.target.style.cursor = 'pointer';
        },
        onClick: (evt: any, legendItem: any, legend: any) => {
          const index = legendItem.datasetIndex;
          const chart = legend.chart;

          if (count === 1) {
            legend.chart.data.datasets.forEach((data: any, index: number) => {
              if (legendItem.text === data.label) {
                chart.show(index);
              } else {
                chart.hide(index);
                data.hidden = true;
              }
            });
          } else {
            if (legendItem.hidden === true) {
              chart.show(index);
              legendItem.hidden = false;
            } else {
              chart.hide(index);
              legendItem.hidden = true;
            }
          }

          count += 1;
        },
      },
      datalabels: {
        font: {
          size: 15,
        },
        anchor: 'end',
        clamp: true,
        align: function ({
          dataIndex,
          dataset,
        }: {
          dataIndex: any;
          dataset: any;
        }) {
          if (dataset.data[dataIndex] > 0) {
            return 'end';
          } else if (dataset.data[dataIndex] < 0) {
            return 'start';
          }
        },
        offset: 0,
        display: 'auto',
        backgroundColor: `${theme.colors.lighterColor}`,
        borderRadius: 20,
        opacity: 0.7,
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 15,
        hoverRadius: 0,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
        min: minmax[1] - 30,
        max: minmax[0] + 30,
        afterFit: (axis: any) => {
          axis.paddingRight = 12;
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    onHover: (event: any, chartElement: any) => {
      const target = event.native ? event.native.target : event.target;
      target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
  };

  Tooltip.positioners.customPositioner = function (
    this,
    elements: any,
    position: any,
  ) {
    if (!elements.length) {
      return false;
    }
    var offset = 0;
    if (((window.innerWidth - 300) / 5) * 3 > position.x) {
      offset = 10;
    } else {
      offset = -340;
    }
    return {
      x: position.x + offset,
      y: position.y,
    };
  };

  return (
    <GraphContainer>
      <ManualContainer>
        <HiQuestionMarkCircle
          size="25"
          color={theme.colors.mainColor}
          onMouseOver={event => {
            (
              event.target as HTMLButtonElement
            ).style.color = `${theme.colors.subColor}`;
            setIsHovering(true);
          }}
          onMouseOut={event => {
            (
              event.target as HTMLButtonElement
            ).style.color = `${theme.colors.mainColor}`;
            setIsHovering(false);
          }}
          overflow="visible"
          cursor="pointer"
        ></HiQuestionMarkCircle>
        {isHovering && (
          <Manual>
            - 부족 이름을 클릭하여 각 그래프를 켜거나 끌 수 있습니다.
            <br />- 스코어에 마우스를 올리면 통계를 볼 수 있으며 클릭하여 투표를
            진행할 수 있습니다.
          </Manual>
        )}
      </ManualContainer>

      <GraphButton
        style={{ float: 'left', top: '50%' }}
        onClick={getNextData}
        disabled={!NextPageable}
        pageable={NextPageable}
      >
        <HiArrowCircleLeft
          size="30"
          color={theme.colors.thirdColor}
          onMouseOver={event => {
            if (NextPageable) {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.subColor}`;
            } else {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.lighterColor}`;
            }
          }}
          onMouseOut={event => {
            if (NextPageable) {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.thirdColor}`;
            } else {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.lighterColor}`;
            }
          }}
        />
      </GraphButton>
      {data && (
        <ChartContainer>
          <Line
            ref={chartRef}
            onClick={event => {
              let point = ClickHandler(
                getElementAtEvent(chartRef.current, event),
              );
              setPoint(point);
            }}
            options={options}
            data={data}
            plugins={[ChartDataLabels]}
          />
        </ChartContainer>
      )}
      <div>
        {open && (
          <Modal
            setOpen={setOpen}
            element={point}
            content={content}
            issueDate={issueDate}
            resData={resData}
          />
        )}
      </div>

      <GraphButton
        style={{ top: '50%', marginRight: '-95px' }}
        onClick={getPreData}
        disabled={index === 1}
        pageable={index !== 1}
      >
        <HiArrowCircleRight
          size="30"
          color={theme.colors.thirdColor}
          onMouseOver={event => {
            if (index !== 1) {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.subColor}`;
            } else {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.lighterColor}`;
            }
          }}
          onMouseOut={event => {
            if (index !== 1) {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.thirdColor}`;
            } else {
              (
                event.target as HTMLButtonElement
              ).style.color = `${theme.colors.lighterColor}`;
            }
          }}
        />
      </GraphButton>
    </GraphContainer>
  );
};

export default PoliticianGraph;

function darwTooltip(context: any, resData: ResDataTypes) {
  const ImgTribe = [tiger, hippo, elephant, dinosaur, lion, oxo];
  const ImgPoll = [ColoredCircle, ColoredTriangle, ColoredX];
  const dataIndex = context.chart.tooltip.dataPoints[0];
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
    return resData.poll;
  }
  // Set Text
  if (tooltipModel.body) {
    const bodyLines = tooltipModel.body.map(getBody);
    const result = bodyLines[0].map((body: any) => {
      return Object.values(body);
    });
    const tableHead = document.createElement('div');

    function drow(div: Element, body: pollDeep, index: number) {
      const Title = CreateTitle();
      tableHead.appendChild(Title);
      if (index === 5) {
        const total = true;
        result[tooltipModel.dataPoints[0].dataIndex].forEach(
          (body: any, index: number) => {
            if (index === 5) {
            } else {
              const imageTh = CreateImg(body, total, index);
              for (let i = 1; i < 4; i++) {
                const elements =
                  imageTh.children as HTMLCollectionOf<HTMLElement>;
                elements[i].style.display = 'inline-block';
                elements[i].style.width = '60px';
              }

              div.appendChild(imageTh);
            }
          },
        );
      } else {
        const total = false;

        const imageTh = CreateImg(body, total);
        div.appendChild(imageTh);
      }
    }

    const div = document.createElement('div');
    dataIndex === 5
      ? null
      : drow(
          div,
          result[tooltipModel.dataPoints[0].dataIndex][dataIndex.datasetIndex],
          dataIndex.datasetIndex,
        );
    tableHead.appendChild(div);

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

  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX + 15 + 'px';
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY + 'px';

  tooltipEl.style.pointerEvents = 'none';
  tooltipEl.style.background = `${theme.colors.lighterColor}`;
  tooltipEl.style.borderRadius = '10px';
  tooltipEl.style.boxShadow = 'rgba(17, 12, 46, 0.75) 0px 48px 100px 0px;';
  tooltipEl.style.opacity = '0.92';
  if (dataIndex.datasetIndex === 5) {
    tooltipEl.style.width = '300px';
    tooltipEl.style.height = 'auto';
  } else {
    tooltipEl.style.width = '300px';
    tooltipEl.style.height = 'auto';
  }

  function CreateTitle() {
    const Title = document.createElement('div');
    const TitleText = document.createTextNode(
      resData.title[tooltipModel.dataPoints[0].dataIndex],
    );
    Title.style.whiteSpace = 'wrap';
    Title.style.width = '300px';
    Title.style.textAlign = 'center';
    Title.style.fontWeight = '700';
    Title.style.fontSize = '20px';
    Title.style.backgroundColor = `${theme.colors.mainColor}`;
    Title.style.padding = '5px';
    Title.style.borderTopLeftRadius = '10px';
    Title.style.borderTopRightRadius = '10px';
    Title.appendChild(TitleText);
    return Title;
  }
  function CreateImg(body: pollDeep, total: boolean, index = 0) {
    const imageTh = document.createElement('div');
    const imageTribe = document.createElement('img');
    const imageCircle = document.createElement('img');
    const imageTriangle = document.createElement('img');
    const imageX = document.createElement('img');
    if (total) {
      imageTribe.src = ImgTribe[index];
    } else {
      imageTribe.src = ImgTribe[dataIndex.datasetIndex];
    }
    imageTribe.height = 40;
    imageTribe.width = 40;
    imageTh.appendChild(imageTribe);
    imageTh.style.fontSize = '17px';
    imageTh.style.padding = '5px';
    imageTh.style.textAlign = 'center';
    const img = [imageCircle, imageTriangle, imageX];
    for (let i = 0; i <= 2; i++) {
      const tempDiv = document.createElement('div');
      img[i].src = ImgPoll[i];
      img[i].height = 25;
      img[i].width = 25;
      const count =
        i === 0
          ? document.createTextNode(' ' + body.pro)
          : i === 1
          ? document.createTextNode(' ' + body.neu)
          : document.createTextNode(' ' + body.con);
      img[i].style.position = 'relative';
      img[i].style.top = '5px';
      tempDiv.style.display = 'inline';
      tempDiv.style.marginLeft = '10px';
      tempDiv.style.position = 'relative';
      tempDiv.style.top = '-9px';
      tempDiv.appendChild(img[i]);
      tempDiv.appendChild(count);
      imageTh.appendChild(tempDiv);
    }
    return imageTh;
  }
}

const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 70px 0;
  position: relative;
`;
const ChartContainer = styled.div`
  position: relative;
  height: 65vh;
  width: 60vw;
  min-width: 600px;
  margin: 0 10px;
`;
const ManualContainer = styled.div`
  position: absolute;
  right: 8%;
  top: -2%;
  z-index: 2;
  overflow: visible;
`;
const ManualFade = keyframes`
  from {
    width: 0
  }
  to {
    width: 250
  }
`;
const Manual = styled.div`
  background-color: ${theme.colors.lighterColor};
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  position: absolute;
  right: -30px;
  top: -135px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  animation: ${ManualFade} 1s 1s linear,
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    right: 10px;
    width: 0;
    border-top: 10px solid ${theme.colors.lighterColor};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`;
interface GraphButtonProps {
  pageable: boolean;
}
const GraphButton = styled.button<GraphButtonProps>`
  float: right;
  opacity: 0.9;
  transition-duration: 0.4s;
  cursor: ${props => (props.pageable ? 'pointer' : 'none')};
`;
