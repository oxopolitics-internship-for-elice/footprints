import issueState from '@/store/IssueState';
import issueDateState from '@/store/IssueDateState';
import { Line } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
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
import styled from '@emotion/styled';
import { IssueTypes } from '@/types/IssueTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const WholeGraph = ({ target }: { target: string }): JSX.Element => {
  const issues: IssueTypes[] = useRecoilValue(issueState);
  const issueDates: Date[] = useRecoilValue(issueDateState);
  const GraphData = issues.map(
    (issue: { poll: { pro: number; con: number } }) =>
      issue.poll.pro - issue.poll.con,
  );

  const options = {
    plugins: {
      legend: {
        display: false,
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

  const data = {
    labels: issueDates,
    datasets: [
      {
        data: GraphData,
        tension: 0.5,
      },
    ],
  };

  return (
    <Container>
      <Line data={data} options={options} />
    </Container>
  );
};

export default WholeGraph;

const Container = styled.div`
  width: 90vw;
`;
