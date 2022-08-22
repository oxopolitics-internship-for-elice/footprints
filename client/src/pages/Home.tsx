import { issueDateState, issueState } from '@/store/IssueState';
import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet-async';
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
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Home = () => {
  const issues = useRecoilValue(issueState);
  const issueDates = useRecoilValue(issueDateState);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'ㅇㅇㅇ의 정치 발자국',
      },
    },
  };

  const data = {
    issues,
    datasets: [
      {
        label: 'whole life',
        data: issueDates.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>정치 발자국</title>
      </Helmet>
      <Line options={options} data={data} />
    </>
  );
};

export default Home;
