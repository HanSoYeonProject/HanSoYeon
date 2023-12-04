import React from "react";
import styled from "styled-components";
import aboutPolicy from "../imgs/aboutPolicy.jpg";
import Footer from "../Components/Footer";

const AboutPolicyPage = () => {
    return (
        <Container>
            <CenterContainer>
                <TopContainer>
                    <TopImgContainer>
                        <img src={aboutPolicy} alt="About Image" />
                        <OverlayTextContainer>
                            <OverlayTextTop>
                                <h2>우리의 생각</h2>
                                <h2>Policy</h2>
                            </OverlayTextTop>
                        </OverlayTextContainer>
                    </TopImgContainer>
                </TopContainer>
                <BottomContainer>
                    <BottomContentContainer>
                        <br/>
                        <h2>매번<br/></h2>
                        <h2>마음과 조건이 듬뿍 담긴 서비스입니다.<br/><br/></h2>
                        <h4>한국에는 아직 놀라울 정도로 매력 넘치는 지역들로 가득합니다.</h4>
                        <h4>더 많은 사람들이 한국 각지에 부담없이 나가서 지역에 들어가,</h4>
                        <h4>한국의 사랑스럽고 풍부한 매력에 빠지게 만들고 싶습니다.<br/><br/></h4>
                        <h4>"한소연"은 그런 생각에서 태어난 서비스입니다.<br/><br/></h4>
                        <h4>아무것도 없어 보이고, 모르는 사람들을 만나서 재밌습니다.</h4>
                        <h4>매번 가서 준 분들이 도움을 통해 지역에 빠져들고,</h4>
                        <h4>뭔가 멋진 발견이나 경험을 많이하고, 눈치채면 자신에게 있어서와 특별한 지역이 되어 돌아오는,</h4>
                        <h4>그런 새로운 여행의 형태를 제안할 수 있으면 하는 마음입니다.</h4>
                        <TextContainer>
                            <h3>대표 한소원 일동</h3>
                        </TextContainer>
                    </BottomContentContainer>
                </BottomContainer>
            </CenterContainer>
            <Footer/>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`
const CenterContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
  margin-top: 8rem;
`
const TopContainer = styled.div`
  display: flex;
  flex: 4;
  justify-content: center;
`
const TopImgContainer = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  min-height: 80%;
  justify-content: center;
  align-items: center;
  img {
    width: 75%; /* 이미지 크기를 부모 컨테이너에 맞게 설정 */
    height: auto; /* 가로 비율에 맞추어 세로 비율을 자동으로 조정 */
    max-height: 100%;
    max-width: 100%;
    min-height: 100%;
    border-radius: 10px;
  }
`
const OverlayTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;

const OverlayTextTop = styled.div`
  h2 {
    font-size: 32px;
    font-weight: 700;
    color: white;
  }
`;
const BottomContainer = styled.div`
    display: flex;
  flex: 6;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const BottomContentContainer = styled.div`
  background-color: #FDF9EA;
  margin-bottom: 3rem;
  width: 90%;
  height: auto;
  margin-top: 1rem;
  border-radius: 3rem;
  h2 {
    color: orange;
    font-weight: 700;
  }
  h4 {
    font-size: 20px;
  }
`

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  
  h3 {
    font-size: 36px;
    font-weight: 700;
    margin-right: 7rem;
  }
`
export default AboutPolicyPage;