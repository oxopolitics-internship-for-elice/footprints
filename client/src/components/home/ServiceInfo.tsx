import React from 'react';
import styled from '@emotion/styled';
import { AnimationOnScroll } from 'react-animation-on-scroll';

interface ServiceInfoProps {
  imageSrc: string;
  imagePosition: string;
  title: string;
  description: string;
  backgroundColor?: string;
}

const ServiceInfo = ({
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
            <Title>{title}</Title>
            <Description>{description}</Description>
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
  padding-top: 120px;
  padding-bottom: 120px;
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
  width: 80%;
  height: 80%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2em;
  font-weight: 300;
  text-align: center;
`;
