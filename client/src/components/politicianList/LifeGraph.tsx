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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from '@emotion/styled';
import dateFormatter from '@/utils/DateFormatter';

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
  issues: any[];
}

const LifeGraph = ({ issues }: lifeGraphProps): JSX.Element => {
  const graphData = issues.map((issue: any) => issue.score);
  const issueDates = issues.map(issue => dateFormatter(issue.issueDate, '.'));
  const max = Math.max(...graphData);
  const min = Math.min(...graphData);
  const maxDate = issueDates[graphData.indexOf(max)];
  const minDate = issueDates[graphData.indexOf(min)];

  console.log(maxDate, minDate);

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
        formatter: function (value: any, context: any) {
          if (value === max) return maxDate + '\n' + value;
          if (value === min) return value + '\n' + minDate;
          return '';
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
          } else {
            return 'start';
          }
        },
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
        display: true,
        grid: {
          lineWidth: 2,
          borderDash: [5, 5],
          color: function (context: { tick: { value: number } }) {
            if (context.tick.value === 0) return '#d6d6d6';
            return 'transparent';
          },
        },
        min: min - 50,
        max: max + 50,
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
