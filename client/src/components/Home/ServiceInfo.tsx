import styled from '@emotion/styled';
import React from 'react';
import chartVideo from '../../../public/chartVideo.mp4';

const ServiceInfo = () => {
  return (
    <>
      <Video src={chartVideo} autoPlay loop muted></Video>
    </>
  );
};

export default ServiceInfo;

const Container = styled.div`
  width: 810px;
  height: 500px;
  background-color: rgb(234, 238, 241);
  position: absolute;
  overflow: hidden;
  border-radius: 15px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgb(234, 238, 241);
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
