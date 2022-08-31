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
import { IssueTypes } from '@/types/IssueTypes';
import { useState, useEffect } from 'react';
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
  // const issues: IssueTypes[] = useRecoilValue(issueState);
  // const issueDates: Date[] = useRecoilValue(issueDateState);

  const graphData = issues.map((issue: any) => issue.totalPolls);

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
      <Line width={'1300px'} height={'400px'} data={data} options={options} />
    </GraphContainer>
  );
};

export default LifeGraph;

const GraphContainer = styled.div`
  width: 90vw;
  height: 400px;
  padding-top: 40px;
`;
