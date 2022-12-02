import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import styled from '@emotion/styled';
import dateFormatter from '@/utils/DateFormatter';
import { PoliticianIssue } from '@/types/PoliticiansTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface lifeGraphProps {
  issues: PoliticianIssue[];
}

const LifeGraph = ({ issues }: lifeGraphProps): JSX.Element => {
  const graphData = issues.map(issue => issue.score);
  const issueDates = issues.map(issue => dateFormatter(issue.issueDate));
  const max = Math.max(...graphData);
  const min = Math.min(...graphData);
  const maxDate = issueDates[graphData.indexOf(max)];
  const minDate = issueDates[graphData.indexOf(min)];
  const formatter = (value: number) => {
    if (value === max) {
      return maxDate + '\n' + value;
    } else if (value === min) {
      return value + '\n' + minDate;
    } else {
      return '';
    }
  };
  const dataLabelAlignHandler = ({ dataset, dataIndex }: Context) => {
    if (dataset.data[dataIndex] === max) {
      return 'end';
    } else if (dataset.data[dataIndex] === min) {
      return 'start';
    } else {
      return 'center';
    }
  };

  const options: ChartOptions<'line'> = {
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        formatter,
        anchor: 'end',
        clamp: true,
        align: dataLabelAlignHandler,
        offset: 0,
        textAlign: 'center',
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: 'auto',
        grid: {
          lineWidth: 2,
          borderDash: [5, 5],
          color: function (context: { tick: { value: number } }) {
            if (context.tick.value === 0) return '#d6d6d6';
            return 'transparent';
          },
        },
        min: min - 30,
        max: max + 30,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const data = {
    labels: issueDates,
    datasets: [
      {
        data: graphData,
        tension: 0.5,
        fill: {
          target: { value: 0 },
          below: 'rgba(255, 26, 104, 0.2)',
          above: 'rgba(75, 192, 192,0.2)',
        },
      },
    ],
  };

  return (
    <GraphContainer>
      <Line data={data} options={options} plugins={[ChartDataLabels]} />
    </GraphContainer>
  );
};

export default LifeGraph;

const GraphContainer = styled.div`
  width: 700px;
  height: 50vh;
  margin: 20px 0;
`;
