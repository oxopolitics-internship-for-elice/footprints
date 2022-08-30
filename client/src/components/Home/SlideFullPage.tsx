import React from 'react';
import ServiceInfo from '@/components/Home/ServiceInfo';
import { FullPage, Slide } from 'react-full-page';
import HomePolitician from './HomePolitician';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';

const SlideFullPage = () => {
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const politicanNames = Object.keys(fetchedPoliticans);
  return (
    <FullPage>
      <Slide>
        <ServiceInfo />
      </Slide>
      {politicanNames.length > 0
        ? politicanNames.map(politicanName => (
            <Slide key={politicanName}>
              <HomePolitician politicanName={politicanName} />
            </Slide>
          ))
        : null}
    </FullPage>
  );
};

export default SlideFullPage;
