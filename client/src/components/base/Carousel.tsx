// make infinite Carousel
import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Carousel = ({ children, style }: PropsWithChildren<CarouselProps>) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const handleClickPrev = (event: React.MouseEvent) => {
    event.preventDefault();

    if (currentSlide === 0) {
      setCurrentSlide(React.Children.count(children) - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const handleClickNext = (event: React.MouseEvent) => {
    event.preventDefault();

    if (currentSlide === React.Children.count(children) - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <>
      <Container style={style}>
        <SlideContainer>
          {React.Children.map(children, (child, index) => {
            return (
              <Slide currentSlide={currentSlide} index={index} key={index}>
                {child}
              </Slide>
            );
          })}
        </SlideContainer>
        <ButtonContainer>
          <Button onClick={handleClickPrev}>{'<'}</Button>
          <Button onClick={handleClickNext}>{'>'}</Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default Carousel;

interface ContainerProps {
  style?: React.CSSProperties;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props => props.style?.width || '100%'};
  height: ${props => props.style?.height || '100%'};
`;

const SlideContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

interface SlideProps {
  currentSlide: number;
  index: number;
}

const Slide = styled.div<SlideProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  transform: translateX(${props => 0 - props.currentSlide * 100}%);
  transition: transform ease-out 0.45s;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #fff;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
