import React from 'react';
import styled from '@emotion/styled';
import FooterGraph from '@/assets/FooterGraph.svg';
import MainLogo from '@/assets/MainLogo.gif';

import { RiFootprintFill, RiGithubFill, RiDiscordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ServiceFooter = () => {
  const navigate = useNavigate();
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };
  const handlePoliticianButtonClick = () => {
    navigate('/politician');
  };

  const handleGithubClick = () => {
    window.open(
      'https://github.com/oxopolitics-internship-for-elice/footprints',
      '_blank',
    );
  };

  const handleDiscordClick = () => {
    window.open('https://discord.gg/6Z7HQgAUk7', '_blank');
  };

  return (
    <>
      <Container>
        <Img
          src={FooterGraph}
          alt="
          FooterImage"
        />
        <NavigatePoliticianButton
          onClick={handlePoliticianButtonClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          isMouseOver={isMouseOver}
        >
          <RiFootprintFill />
          <span>발자국 남기러 가기</span>
        </NavigatePoliticianButton>
        <FooterInfo>
          <FooterButtonContainer>
            <FooterButton onClick={handleGithubClick}>
              <RiGithubFill />
              <span>Github</span>
            </FooterButton>
            <FooterButton onClick={handleDiscordClick}>
              <RiDiscordFill />
              <span>Discord</span>
            </FooterButton>
          </FooterButtonContainer>
          <FooterLogo>
            <img src={MainLogo} width="140px" />
          </FooterLogo>
          <FooterInfoText>
            <span>© 2022. 정치 발자국. All rights reserved.</span>
          </FooterInfoText>
        </FooterInfo>
      </Container>
    </>
  );
};

export default ServiceFooter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Img = styled.img`
  margin-top: 90px;
  width: 70%;
  height: 80%;
  object-fit: contain;
`;

interface NavigatePoliticianButtonProps {
  isMouseOver: boolean;
}

const NavigatePoliticianButton = styled.div<NavigatePoliticianButtonProps>`
  width: 300px;
  height: 120px;
  margin-top: 50px;
  border-radius: 10px;
  border: ${({ isMouseOver, theme }) =>
    isMouseOver
      ? `3px solid ${theme.colors.subColor}`
      : `3px solid transparent`};
  background-color: ${({ isMouseOver, theme }) =>
    isMouseOver ? '#fff' : theme.colors.subColor};
  color: ${({ isMouseOver, theme }) =>
    isMouseOver ? theme.colors.subColor : 'white'};
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 2.5rem;
    margin-right: 10px;
    margin-top: 5px;
  }
  span {
    font-size: 1.5rem;
  }
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 500px;
  padding: 50px 0 20px 0;
`;

const FooterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FooterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  margin: 0 30px;
  border-radius: 10px;
  border: none;
  background-color: #fff;
  color: #000;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;

  svg {
    font-size: 30px;
    margin-right: 10px;
    margin-top: 5px;
  }

  span {
    font-size: 20px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor};
    color: #fff;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 20px 0;
`;

const FooterInfoText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  span {
    font-size: 15px;
  }
`;
