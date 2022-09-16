import React from 'react';
import styled from '@emotion/styled';
import { AnimationOnScroll } from 'react-animation-on-scroll';

interface ServiceInfoProps {
  index: number;
  imageSrc: string;
  imagePosition: string;
  title: string;
  description: string;
  backgroundColor?: string;
}

const ServiceInfo = ({
  index,
  imageSrc,
  imagePosition,
  title,
  description,
  backgroundColor,
}: ServiceInfoProps) => {
  const animationStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10%',
  };
  return (
    <>
      <Container backgroundColor={backgroundColor}>
        <AnimationOnScroll animateIn="animate__fadeIn" style={animationStyle}>
          <ImageContainer imagePosition={imagePosition}>
            {imageSrc === '' ? (
              <div>준비중입니다.</div>
            ) : (
              <Image src={imageSrc} />
            )}
          </ImageContainer>
          <TextContainer>
            <InfoIndex>{`서비스 소개 ${index}`}</InfoIndex>
            <h2>{title}</h2>
            <p>{description}</p>
          </TextContainer>
        </AnimationOnScroll>
      </Container>
    </>
  );
};

export default ServiceInfo;

interface ContainerProps {
  backgroundColor?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  margin-top: 36px;
`;

interface ImageContainerProps {
  imagePosition: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: ${({ imagePosition }) =>
    imagePosition === 'left' ? 'flex-start' : 'flex-end'};
  order: ${({ imagePosition }) => (imagePosition === 'left' ? 0 : 1)};
`;

const Image = styled.img`
  width: 90%;
  height: 100%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: flex-start;
  justify-content: center;

  h2 {
    font-size: 44px;
    line-height: 1.36;
    font-weight: 400;
  }
  p {
    word-break: keep-all;
    padding-top: 1em;
    font-size: 1.2rem;
    line-height: 1.55;
  }
`;

const InfoIndex = styled.h6`
  font-size: 1.2vw;
  background-color: ${({ theme }) => theme.colors.subColor};
  color: white;
  font-weight: bold;
  padding: 10px;
  width: fit-content;
  border-radius: 5px;
  margin-bottom: 10px;
  align-self: flex-start;
`;
