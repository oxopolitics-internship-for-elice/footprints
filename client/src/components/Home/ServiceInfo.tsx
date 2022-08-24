import styled from '@emotion/styled';
import chartVideo from '@/chartVideo.mp4';

const ServiceInfo = () => {
  return (
    <>
      <Overlay />
      <Video src={chartVideo} autoPlay loop muted></Video>
      <Content>
        <h2>정치 발자국에 오신 것을 환영합니다.</h2>
      </Content>
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000cc;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  h2 {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    line-height: 8.4rem;
    letter-spacing: -1.5px;
    color: #fff;
    font-weight: 800;
    text-align: center;
  }
`;
