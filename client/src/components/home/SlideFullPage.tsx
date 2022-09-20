import ServiceIntro from '@/components/home/ServiceIntro';
import ServiceInfo from './ServiceInfo';
import { FullPage, Slide } from 'react-full-page';
import PoliticianGraph from '@/assets/PoliticianGraph.png';
import PoliticianGraphModal from '@/assets/PoliticianGraphModal.png';
import StandbyIssue from '@/assets/StandbyIssue.png';
import theme from '@/styles/theme';
import ServiceFooter from './ServiceFooter';

const SlideFullPage = () => {
  const InfoContent = [
    {
      imageSrc: PoliticianGraph,
      title: '정치인 그래프',
      description:
        '정치인의 사건·사고에 대한 여론 투표 결과를 그래프로 확인해보세요.',
      backgroundColor: theme.colors?.lighterColor,
      imagePosition: 'right',
    },
    {
      imageSrc: PoliticianGraphModal,
      title: '이슈 투표',
      description: '그래프 속 이슈를 클릭해 자신의 의견을 표현할 수 있습니다.',
      imagePosition: 'left',
    },
    {
      imageSrc: StandbyIssue,
      title: '대기 중 이슈',
      description:
        '이용자들의 동의를 얻은 이슈만이 그래프에 등록됩니다! 새로운 이슈를 등록하거나 대기 중인 이슈에 투표해보세요.',
      backgroundColor: theme.colors?.lighterColor,
      imagePosition: 'right',
    },
  ];

  return (
    <FullPage>
      <Slide>
        <ServiceIntro />
      </Slide>
      {InfoContent.map((content, index) => (
        <Slide key={content.title}>
          <ServiceInfo
            index={index + 1}
            imageSrc={content.imageSrc}
            title={content.title}
            description={content.description}
            backgroundColor={content.backgroundColor}
            imagePosition={content.imagePosition}
          />
        </Slide>
      ))}
      <Slide>
        <ServiceFooter />
      </Slide>
    </FullPage>
  );
};

export default SlideFullPage;
