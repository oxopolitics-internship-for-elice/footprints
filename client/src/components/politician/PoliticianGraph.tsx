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
  ChartOptions,
  ChartEvent,
  ActiveElement,
  ScatterDataPoint,
  Chart,
  ChartData,
  TooltipModel,
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
import { useParams } from 'react-router-dom';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import theme from '@/styles/theme';
import {
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { keyframes } from '@emotion/react';
import SortKey from '@/utils/SortKey';
import { Poll, pollDeep } from '@/types/IssueTypes';
import { GraphIssueDataType } from '@/types/GraphTypes';
import dateFormatter from '@/utils/DateFormatter';
import MinMax from '@/utils/MinMax';
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

export type GraphDataType = ChartData<'line', number[], string> | null;

const PoliticianGraph = () => {
  const chartRef = useRef<Chart<'line'> | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedIssueIndex, setselectedIssueIndex] = useState<number | null>(
    null,
  );
  const [index, setIndex] = useState<number>(1);
  const [graphData, setGraphData] = useState<GraphDataType>(null);
  const [graphIssueData, setGraphIssueData] =
    useState<GraphIssueDataType | null>(null);
  const [minMax, setMinMax] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const { politicianID } = useParams();

  const getData = async (index: number) => {
    if (!politicianID) return;
    const { data } = await GraphAPI.getGraph(politicianID, index);
    setGraphIssueData({
      issueDate: data.data.map(issue => DateFormatter(issue.issueDate)),
      poll: data.data.map(issue => PollFormatter(issue)),
      content: data.data.map(issue => issue.content),
      id: data.data.map(issue => issue._id),
      title: data.data.map(issue => issue.title),
    });
    const Img = [oxo, tiger, hippo, elephant, dinosaur, lion];
    const chartPoint = Img.map(img => {
      const chartPoint = new Image();
      chartPoint.src = img;
      chartPoint.width = 30;
      chartPoint.height = 30;
      return chartPoint;
    });
    const score = data.data.map(issue => ScoreFormatter(issue));
    const chartData = {
      labels: data.data.map(issue => dateFormatter(issue.issueDate)),
      datasets: [
        {
          label: '합계',
          data: score.map(score => score.total.score),
          pointStyle: chartPoint[0],
          tension: 0.3,
        },
        {
          label: '호랑이',
          data: score.map(score => score.tiger.score),
          tension: 0.3,
          borderColor: '#E48F05',
          backgroundColor: 'transparent',
          pointStyle: chartPoint[1],
        },
        {
          label: '하마',
          data: score.map(score => score.hippo.score),
          tension: 0.3,
          borderColor: '#8D39A8',
          pointStyle: chartPoint[2],
        },
        {
          label: '코끼리',
          data: score.map(score => score.elephant.score),
          tension: 0.3,
          borderColor: '#2d8bb2',
          pointStyle: chartPoint[3],
        },
        {
          label: '공룡',
          data: score.map(score => score.dinosaur.score),
          tension: 0.3,
          borderColor: '#91A401',
          pointStyle: chartPoint[4],
        },

        {
          label: '사자',
          data: score.map(score => score.lion.score),
          tension: 0.3,
          borderColor: '#C2403D',
          pointStyle: chartPoint[5],
        },
      ],
    };
    setGraphData(chartData);
    setMinMax(MinMax(data.data));
  };

  const getNextData = async () => {
    await getData(index + 1);
    setIndex(index + 1);
  };
  const getPreData = async () => {
    await getData(index - 1);
    setIndex(index - 1);
  };

  const graphIssueClickHandler = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    if (event.target instanceof Element && chartRef.current) {
      const index = getElementAtEvent(chartRef.current, event)[0]?.index;
      setselectedIssueIndex(index);
      console.log(index);
      setOpen(true);
    }
  };

  const options: ChartOptions<'line'> = {
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
        position: 'customPositioner' as 'average',
        external: args => {
          drawTooltip(args, graphIssueData);
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
      },
      datalabels: {
        font: {
          size: 15,
        },
        anchor: 'end',
        clamp: true,
        align: (context: Context) => {
          const index = context.dataIndex;
          const value = context.dataset.data[index] || 0;
          return value < 0 ? 'start' : 'end';
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
        min: graphData?.datasets[0].data.reduce((a, b) => Math.min(a, b)) || 0,
        max: graphData?.datasets[0].data.reduce((a, b) => Math.max(a, b)) || 0,
        afterFit: axis => {
          axis.paddingRight = 12;
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  Tooltip.positioners.customPositioner = (elements, position) => {
    if (!elements.length) {
      return false;
    }
    const offset = ((window.innerWidth - 300) / 5) * 3 > position.x ? -10 : 340;

    return {
      x: position.x + offset,
      y: position.y,
    };
  };

  useEffect(() => {
    getData(index);
  }, []);

  return (
    <>
      {graphIssueData && (
        <GraphContainer>
          <ManualContainer>
            <HiQuestionMarkCircle
              size="25"
              color={theme.colors.mainColor}
              overflow="visible"
              cursor="pointer"
            ></HiQuestionMarkCircle>
            {
              <Manual>
                - 부족 이름을 클릭하여 각 그래프를 켜거나 끌 수 있습니다.
                <br />- 스코어에 마우스를 올리면 통계를 볼 수 있으며 클릭하여
                투표를 진행할 수 있습니다.
              </Manual>
            }
          </ManualContainer>
          <GraphButton
            onClick={getNextData}
            // disabled={!NextPageable}
            // pageable={NextPageable}
          >
            <HiArrowCircleLeft
              size="30"
              color={theme.colors.thirdColor}
              // onMouseOver={event => {
              //   if (NextPageable) {
              //     (
              //       event.target as HTMLButtonElement
              //     ).style.color = `${theme.colors.subColor}`;
              //   } else {
              //     (
              //       event.target as HTMLButtonElement
              //     ).style.color = `${theme.colors.lighterColor}`;
              //   }
              // }}
              // onMouseOut={event => {
              //   if (NextPageable) {
              //     (
              //       event.target as HTMLButtonElement
              //     ).style.color = `${theme.colors.thirdColor}`;
              //   } else {
              //     (
              //       event.target as HTMLButtonElement
              //     ).style.color = `${theme.colors.lighterColor}`;
              //   }
              // }}
            />
          </GraphButton>
          {graphData && (
            <ChartContainer>
              <Line
                ref={chartRef}
                onClick={graphIssueClickHandler}
                options={options}
                data={graphData}
                plugins={[ChartDataLabels]}
              />
            </ChartContainer>
          )}
          <div>
            {open && selectedIssueIndex && graphIssueData && (
              <Modal
                setOpen={setOpen}
                selectedIssueIndex={selectedIssueIndex}
                resData={graphIssueData}
              />
            )}
          </div>
          <GraphButton
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
      )}
    </>
  );
};

export default PoliticianGraph;

function drawTooltip(
  context: { chart: Chart; tooltip: TooltipModel<'line'> },
  graphIssueData: GraphIssueDataType | null,
) {
  if (!graphIssueData) {
    return;
  }
  const dataIndex = context?.chart?.tooltip?.dataPoints[0];
  if (!dataIndex) {
    return;
  }
  const ImgTribe = [oxo, tiger, hippo, elephant, dinosaur, lion];
  const ImgPoll = [ColoredCircle, ColoredTriangle, ColoredX];
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
    return graphIssueData?.poll;
  }
  // Set Text
  const bodyLines = tooltipModel.body.map(getBody);
  if (bodyLines[0]) {
    const result = bodyLines[0].map((body: Poll) => {
      let tempArray = SortKey(body);
      return Object.values(tempArray);
    });

    const tableHead = document.createElement('div');

    function drow(div: Element, body: pollDeep, index: number) {
      const Title = CreateTitle();
      tableHead.appendChild(Title);
      if (index === 0) {
        const total = true;
        result[tooltipModel.dataPoints[0].dataIndex].forEach(
          (body: pollDeep, index: number) => {
            if (index === 0) {
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
      graphIssueData?.title[tooltipModel.dataPoints[0].dataIndex] as string,
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
  right: -10px;
  top: -135px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
interface GraphButtonProps {
  pageable: boolean;
}
const GraphButton = styled.button<GraphButtonProps>`
  display: ${props => (props.pageable ? 'block' : 'none')};
  background-color: ${props =>
    props.pageable ? theme.colors.mainColor : theme.colors.lighterColor};
  color: ${props =>
    props.pageable ? theme.colors.lighterColor : theme.colors.mainColor};
  border: 1px solid ${theme.colors.mainColor};
  border-radius: 10px;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 15px;
  font-weight: 700;
`;
