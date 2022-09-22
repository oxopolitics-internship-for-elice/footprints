import React from 'react';
import Loading from '@components/base/Loading';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';
import { PoliticiansTypes } from '@/types/PoliticiansTypes';
import PoliticianListItem from './PoliticianListItem';
import styled from '@emotion/styled';

const PoliticianBoard = () => {
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const politicansName = fetchedPoliticans.map(
    (politician: PoliticiansTypes) => {
      console.log(politician);
      if (!politician.name) {
        return 'null';
      }
      return politician.name;
    },
  );
  const politicansID = fetchedPoliticans.map(
    (politician: PoliticiansTypes) => politician?._id,
  );

  return (
    <Container>
      {politicansName.length > 0 ? (
        politicansName.map((politicanName: string, index: number) => {
          return (
            <PoliticianListItem
              politicanName={politicanName}
              politicansID={politicansID[index]}
              key={index}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default PoliticianBoard;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
`;
