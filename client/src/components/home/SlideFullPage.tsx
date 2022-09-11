import React from 'react';
import ServiceIntro from '@/components/home/ServiceIntro';
import ServiceInfo from './ServiceInfo';
import { FullPage, Slide } from 'react-full-page';
import HomePolitician from '@/components/home/HomePolitician';
import { useRecoilValue } from 'recoil';
import PoliticiansState from '@/store/PoliticiansState';
import Loading from '@components/base/Loading';
import { PoliticiansTypes } from '@/types/PoliticiansTypes';
import PoliticianGraph from '@/assets/PoliticianGraph.png';
import PoliticianGraphModal from '@/assets/PoliticianGraphModal.png';
import StandbyIssue from '@/assets/StandbyIssue.png';

const SlideFullPage = () => {
  const fetchedPoliticans = useRecoilValue(PoliticiansState);
  const InfoContent = [
    {
      imageSrc: PoliticianGraph,
      title: '정치인 그래프',
      description:
        '해당 정치인의 여러가지 이슈를 투표받아 수치로 환산해 그래프로 보여줍니다.',
      backgroundColor: '#F5F5F5',
      imagePosition: 'right',
    },
    {
      imageSrc: PoliticianGraphModal,
      title: '이슈 투표',
      description: '그래프 속 이슈를 클릭 해 해당 이슈를 평가할 수 있습니다.',
      imagePosition: 'left',
    },
    {
      imageSrc: StandbyIssue,
      title: '대기 중 이슈',
      description:
        '그래프로 등록하기 위해서 대기 중 이슈를 등록하거나 다른 대기 중 이슈를 투표할 수 있습니다.',
      backgroundColor: '#F5F5F5',
      imagePosition: 'right',
    },
  ];
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
      {InfoContent.map((content, index) => (
        <Slide key={content.title}>
          <ServiceInfo
            imageSrc={content.imageSrc}
            title={content.title}
            description={content.description}
            backgroundColor={content.backgroundColor}
            imagePosition={content.imagePosition}
          />
        </Slide>
      ))}
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
