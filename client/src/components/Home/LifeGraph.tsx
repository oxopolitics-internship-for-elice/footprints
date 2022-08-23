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

const LifeGraph = ({ target }: { target: string }): JSX.Element => {
  // const issues: IssueTypes[] = useRecoilValue(issueState);
  // const issueDates: Date[] = useRecoilValue(issueDateState);

  const [lifeIssue, setLifeIssue] = useState<IssueTypes[]>([]);
  useEffect(() => {
    const getLifeIssue = async () => {
      try {
        const res = await Api.get(
          `issues?targetPolitician=${target}&regiStatus=true`,
        );
        setLifeIssue(res.data);
      } catch (Error) {
        alert(`에러가 발생했습니다. 다시 시도해주세요: ${Error}`);
      }
    };
    getLifeIssue();
  }, [target]);
  console.log(lifeIssue);

  const graphData = lifeIssue.map(
    (issue: { poll: { pro: number; con: number } }) =>
      issue.poll.pro - issue.poll.con,
  );

  const issueDates = lifeIssue.map(issue => dateFormatter(issue.issueDate));

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
