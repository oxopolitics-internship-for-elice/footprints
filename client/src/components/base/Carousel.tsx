// make infinite Carousel
import styled from '@emotion/styled';
import React, { PropsWithChildren } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';

interface CarouselProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  autoPlay?: boolean;
}

const Carousel = ({
  children,
  style,
  autoPlay,
}: PropsWithChildren<CarouselProps>) => {
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

  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        if (currentSlide === React.Children.count(children) - 1) {
          setCurrentSlide(0);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentSlide, autoPlay, children]);

  return (
    <>
      <Container style={style}>
        <Button onClick={handleClickPrev}>
          <GrPrevious />
        </Button>
        <SlideContainer>
          {React.Children.map(children, (child, index) => {
            return (
              <Slide currentSlide={currentSlide} index={index} key={index}>
                {child}
              </Slide>
            );
          })}
        </SlideContainer>
        <Button onClick={handleClickNext}>
          <GrNext />
        </Button>
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
  flex-direction: row;
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

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
