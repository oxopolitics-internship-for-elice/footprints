import { useState, useEffect } from 'react';
import LineGraph from '../components/Graph';
import styled from 'styled-components';

const Graph = () => {
  interface data {
    startDate: string;
    endDate: string;
    period: number;
    cycle: number;
  }

  const TITLE: string = 'User Report';
  const DOT_DESCRIPTION: string = '활동 주기';
  const LINE_DESCRIPTION: string = '활동 기간, 시작일';

  const [data, setData] = useState<data[]>([]);
  const [lineGraphData, setLineGraphData] = useState<any>([]);
  const [longestPeriod, setLongestPeriod] = useState<number>(0);

  const calculateLongestPeriod = (data: data[]) =>
    data.reduce((acc, cur) => {
      const { period } = cur;
      return period > acc ? period : acc;
    }, 0);

  const calculateLongestCycle = (data: data[]) =>
    data.reduce((acc, cur) => {
      const { cycle } = cur;
      return cycle > acc ? cycle : acc;
    }, 0);

  const makeLineGraphData = (data: data[]) => {
    const longestCycle = calculateLongestCycle(data);
    const arr = data.map((info: any, index) => {
      const lineHeight = (info.cycle / longestCycle) * 80;
      const chartHeight = 80;
      return {
        x: index * 100 + 30,
        y: chartHeight - lineHeight,
      };
    });
    setLineGraphData(arr);
  };

  const getData = () => {
    fetch(`https://motionz-kr.github.io/playground/apis/report.json`)
      .then(res => res.json())
      .then(res => setData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setLongestPeriod(calculateLongestPeriod(data));
    makeLineGraphData(data);
  }, [data]);

  return (
    <Wrapper>
      <Container>
        <Title>{TITLE}</Title>
        <Charts>
          <Info>
            <DotDescription>
              <Dot />
              <Description>{DOT_DESCRIPTION}</Description>
            </DotDescription>
            <LineDescription>
              <Line />
              <Description>{LINE_DESCRIPTION}</Description>
            </LineDescription>
          </Info>
          <LineGraphWrapper>
            <LineGraph points={lineGraphData} data={data} />
          </LineGraphWrapper>
        </Charts>
      </Container>
    </Wrapper>
  );
};

export default Graph;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 600px;
  height: 100vh;
  padding: 20px;
  background: white;
`;

const Title = styled.h2`
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  color: rgb(36, 36, 36);
  font-size: 1.5em;
  font-weight: bold;
`;

const Charts = styled.div`
  border: 1px solid rgb(234, 234, 234);
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const DotDescription = styled.div`
  display: flex;
  align-items: center;
`;

const LineDescription = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.span`
  margin-right: 4px;
  font-size: 10px;
  color: rgb(96, 96, 96);
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  margin-right: 6px;
  background-color: rgb(34, 34, 34);
  border-radius: 14px;
`;

const Line = styled.div`
  width: 22px;
  height: 7px;
  margin-right: 6px;
  margin-left: 18px;
  border-radius: 14px;
  background-color: rgb(34, 34, 34);
`;

const LineGraphWrapper = styled.div`
  margin-top: 60px;
  padding-left: 80px;
`;

const BarGraphWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  padding-left: 80px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
