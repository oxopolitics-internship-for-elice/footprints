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

  const issueDates = issues.map(issue => dateFormatter(issue.issueDate));

  const options = {
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
          const max = Math.max(...context.dataset.data);
          const min = Math.min(...context.dataset.data);
          if (value === max || value === min) {
            return value;
          } else {
            return '';
          }
        },
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
            if (context.tick.value === 0) {
              return '#d6d6d6';
            } else {
              return 'transparent';
            }
          },
        },
      },
    },
    layout: {
      padding: 20,
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
      },
    ],
  };

  return (
    <GraphContainer>
      <Line
        width={'1300px'}
        height={'400px'}
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </GraphContainer>
  );
};

export default LifeGraph;

const GraphContainer = styled.div`
  width: 90vw;
  height: 400px;
  padding-top: 40px;
`;
