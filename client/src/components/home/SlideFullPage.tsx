import React from 'react';
import ServiceIntro from '@/components/home/ServiceIntro';
import ServiceInfo from './ServiceInfo';
import { FullPage, Slide } from 'react-full-page';
import HomePolitician from '@/components/home/HomePolitician';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';
import Loading from '@components/base/Loading';
import { PoliticiansTypes } from '@/types/PoliticiansTypes';

const SlideFullPage = () => {
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const politicansName = fetchedPoliticans.map(
    (politician: PoliticiansTypes) => {
      if (!politician?.politicianInfo[0].name) {
        return 'null';
      }
      return politician?.politicianInfo[0].name;
    },
  );
  const politicansID = fetchedPoliticans.map(
    (politician: PoliticiansTypes) => politician?._id,
  );

  return (
    <FullPage>
      <Slide>
        <ServiceIntro />
      </Slide>
      <Slide>
        <ServiceInfo
          imageSrc="ready"
          title="정치인의 이슈를 한눈에"
          description="정치인의 이슈를 한눈에 볼 수 있습니다."
          backgroundColor="#F5F5F5"
          imagePosition="right"
        />
      </Slide>
      <Slide>
        <ServiceInfo
          imageSrc="ready"
          title="정치인의 이슈를 한눈에"
          description="정치인의 이슈를 한눈에 볼 수 있습니다."
          imagePosition="left"
        />
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
