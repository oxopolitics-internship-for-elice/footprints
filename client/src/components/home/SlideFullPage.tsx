import React from 'react';
import ServiceInfo from '@/components/Home/ServiceInfo';
import { FullPage, Slide } from 'react-full-page';
import HomePolitician from '@/components/Home/HomePolitician';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';
import Loading from '@components/Base/Loading';
import { PoliticiansTypes } from '@/types/PoliticiansTypes';

const SlideFullPage = () => {
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const politicansName = fetchedPoliticans.map(
    (politician: PoliticiansTypes) => {
      if (!politician?.name) {
        return 'null';
      }
      return politician.name;
    },
  );
  const politicansID = fetchedPoliticans.map(
    (politician: PoliticiansTypes) => politician?._id,
  );

  return (
    <FullPage>
      <Slide>
        <ServiceInfo />
      </Slide>
      {politicansName.length > 0 ? (
        politicansName.map((politicanName: string, index: number) => (
          <Slide key={politicansID[index]}>
            <HomePolitician
              politicanName={politicanName}
              politicansID={politicansID[index]}
            />
          </Slide>
        ))
      ) : (
        <Loading />
      )}
    </FullPage>
  );
};

export default SlideFullPage;
