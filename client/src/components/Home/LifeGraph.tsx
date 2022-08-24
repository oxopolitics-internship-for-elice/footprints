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
import * as Api from '@/api/Api';
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
  issues: IssueTypes[];
}

const LifeGraph = ({ issues }: lifeGraphProps): JSX.Element => {
  // const issues: IssueTypes[] = useRecoilValue(issueState);
  // const issueDates: Date[] = useRecoilValue(issueDateState);

  const graphData = issues.map(
    (issue: { poll: { pro: number; con: number } }) =>
      issue.poll.pro - issue.poll.con,
  );

  const issueDates = issues.map(issue => dateFormatter(issue.issueDate));

  const options = {
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
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
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
    <Container>
      <Line data={data} plugins={[ChartDataLabels]} options={options} />
    </Container>
  );
};

export default LifeGraph;

const Container = styled.div`
  width: 90vw;
`;
