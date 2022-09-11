import React from 'react';
import styled from '@emotion/styled';

interface ServiceInfoProps {
  imageSrc: string;
  imagePosition: 'left' | 'right';
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
  return (
    <>
      <Container backgroundColor={backgroundColor}>
        <ImageContainer imagePosition={imagePosition}>
          {imageSrc === 'ready' ? (
            <div>준비중입니다.</div>
          ) : (
            <Image src={imageSrc} />
          )}
        </ImageContainer>
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContainer>
      </Container>
    </>
  );
};

export default ServiceInfo;

const Container = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
`;

const ImageContainer = styled.div<{ imagePosition: 'left' | 'right' }>`
  display: flex;
  flex-direction: row;
  width: 50%;
  height: 100%;
  justify-content: ${({ imagePosition }) =>
    imagePosition === 'left' ? 'flex-start' : 'flex-end'};
  align-items: center;
`;

const Image = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
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
