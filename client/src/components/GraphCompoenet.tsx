import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import { FaBeer } from 'react-icons/fa';
import { BsFillArchiveFill } from 'react-icons/bs';
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
import { getElementAtEvent, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import Modal from './Modal';

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
export const options = {
  responsive: true,
  plugins: {
    tooltip: {
      displayColors: false,
      backgroundColor: '#FFFFFF',
      titleColor: '#000',
      bodyColor: '#000',
      padding: 10,
      borderColor: '#D3D3D3',
      boxWidth: 10,
      boxHeight: 30,
      borderWidth: 3,
      callbacks: {
        label: function (context) {
          let num: number[][] = [
            [10, 30, 50],
            [20, 60, 30],
            [30, 50, 20],
            [10, 50, 20],
            [70, 50, 20],
            [30, 50, 20],
            [60, 50, 20],
          ];
          return [
            ':' + ' ' + String(num[context.dataIndex][0]),
            ':' + ' ' + String(num[context.dataIndex][1]),
            ':' + ' ' + String(num[context.dataIndex][2]),
          ];
        },
        cornerRadius: 10,
      },
    },
    legend: {
      position: null,
    },
    title: {
      display: true,
      text: '윤석열 인생 그래프',
    },
  },
};

const labels = [
  '11:30분',
  '11:45분',
  '12:10분',
  '15:50분',
  '17:30분',
  '19:30분',
  '20:30분',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -100, max: 100 })),
      tension: 0.5,
      fill: {
        target: { value: 0 },
        below: 'rgba(255, 26, 104, 0.2)',
        above: 'rgba(75, 192, 192,0.2)',
      },
    },
  ],
};

function Graph(): JSX.Element {
  const chartRef = useRef(null);
  const [open, setOpen] = useState(false);

  function ClickHander(element: InteractionItem[]) {
    const { datasetIndex, index } = element[0];
    setOpen(!open);
    console.log(open);
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        height: '200px',
        width: '800px',
      }}
    >
      <Line
        ref={chartRef}
        onClick={event => {
          ClickHander(getElementAtEvent(chartRef.current, event));
        }}
        options={options}
        data={data}
      />
      <button
        onClick={() => {
          setOpen(!open);
        }}
      ></button>
      <div>
        {open && (
          <Modal setOpen={setOpen}>
            <div>
              <form>
                <div>
                  <label htmlFor="email">이메일</label>
                  <input type="email" placeholder="name@email.com" />
                </div>
                <div>
                  <label htmlFor="password">비밀번호</label>
                  <input type="password" placeholder="••••••••" />
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Graph;
