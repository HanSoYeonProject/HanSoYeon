import React, {useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import aboutLogo from "../imgs/aboutLogo.jpg";
import about1 from "../imgs/about1.png";
import about2 from "../imgs/about2.png";
import about3 from "../imgs/about3.png";
import about4 from "../imgs/about4.jpg";
import about5 from "../imgs/about5.jpg";
import about6 from "../imgs/about6.jpg";


import Flow1 from "../imgs/Flow1.png";
import Flow2 from "../imgs/Flow2.png";
import Flow3 from "../imgs/Flow3.png";
import Flow4 from "../imgs/Flow4.png";
import Footer from "../Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';


const AboutPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            offset: 500,
            easing: "ease-in-out",
        });
    }, []);

    const navigate = useNavigate();


    const Detailbutton = () => {
        navigate("/aboutPolicy");
    }

    const Flowbutton = () => {
        navigate("/recommendcourse")
    }
    return (
        <Container>
            <CCContainer>
                <BigAboutContainer>
                    <div data-aos="fade-down">
                        <AboutContainer>
                            <TopAboutContainer>
                                <ImageContainer>
                                    <img src={aboutLogo} alt="About Image"/>
                                    <OverlayTextContainer>

                                        <OverlayTextTop>
                                            <h2>한소연이란 무엇입니까?</h2>
                                        </OverlayTextTop>
                                        <OverlayTextBottom>
                                            <h2>About</h2>
                                        </OverlayTextBottom>

                                    </OverlayTextContainer>
                                </ImageContainer>

                            </TopAboutContainer>
                            <BottomAboutContainer>
                                <BottomCenterContainer>
                                    <h2>우리의 생각</h2>
                                    <h3>한국에는 아직 놀라울 정도로 넘치는 지역으로 가득합니다.</h3>
                                    <h3>더 많은 사람들이 한국 각지에 부담없이 나가서 지역 각지에서 즐기는 세상을 만들고 싶습니다!</h3>
                                    <h3>"한소연"은 그런 생각에서 태어난 서비스 입니다.</h3>
                                    <DeatailButton onClick={Detailbutton}>자세히 보기</DeatailButton>
                                </BottomCenterContainer>
                            </BottomAboutContainer>
                        </AboutContainer>
                    </div>
                </BigAboutContainer>
            </CCContainer>
            <FeatureContainer>
                <h2 style={{color: "#EF6C00"}}>매일의 특징</h2>
                <BigFeatureContainer>
                    <FirstFeatureContainer>
                        <div data-aos="flip-left">
                            <img src={about1} alt="about1 Image"/>
                            <h2>도움(일)을 하고 <br/>돈을 벌 수 있습니다.</h2>
                            <h3>※최저임금 이상의 보상을 얻을 수 있습니다.</h3>
                        </div>
                    </FirstFeatureContainer>
                    <FirstFeatureContainer>
                        <div data-aos="flip-left">
                            <img src={about2} alt="about2 Image"/>
                            <h2>지역 여행</h2>
                            <h3>※교통비 지급은 없습니다.</h3>
                        </div>
                    </FirstFeatureContainer>
                    <FirstFeatureContainer>
                        <div data-aos="flip-left">
                            <img src={about3} alt="about3 Image"/>
                            <h2>무료로 숙박을 제공해주는 <br/> 지역도 매칭해 드립니다.</h2>
                            <h3>※일부 예외도 있습니다.</h3>

                        </div>
                    </FirstFeatureContainer>
                </BigFeatureContainer>
            </FeatureContainer>
            <BottomFeatureContainer>
                <h2 style={{color: "#EF6C00", fontSize: "28px", fontWeight: "700"}}>조건 포인트</h2>
                <BottomBigFeatureContainer>
                    <FirstFeatureContainer>
                        <div data-aos="flip-right">
                            <img src={about4} alt="about4 Image"/>
                            <h2>새로운 사람들과<br/>
                                새로운 인연을 맺어보세요!
                            </h2>
                            <h3>각지에서 여러분을 기다리고 있습니다.<br/>
                                여러분들이 가고싶은 곳에 가서<br/>
                                여러분을 원하는 사람들과<br/>
                                색다른 경험과 추억을 만들어보세요.
                            </h3>
                        </div>
                    </FirstFeatureContainer>
                    <FirstFeatureContainer>
                        <div data-aos="flip-right">
                            <img src={about5} alt="about5 Image"/>
                            <h2>모르는 지역에 갈 기회가 생긴다</h2>
                            <h3>
                                「어디 거기?!」라고 생각하는 지역도 <br/>
                                호기심이 생긴다면 언제든 출발해보세요!!! <br/>
                                걱정말고 떠난다면 다른 세상이 보입니다.<br/>
                                한 번의 여행에서 소중한 인연을 만나보세요.
                            </h3>
                        </div>
                    </FirstFeatureContainer>
                    <FirstFeatureContainer>
                        <div data-aos="flip-right">
                            <img src={about6} alt="about6 Image"/>
                            <h2>사회문제도 해결하고 <br/>
                                여행경비 부담도 덜어보세요!.</h2>
                            <h3>여러가지 경험을 할 수 있습니다</h3>
                        </div>

                    </FirstFeatureContainer>
                </BottomBigFeatureContainer>
            </BottomFeatureContainer>
            <FlowContainer>
                <FlowBigContainer>
                    <FlowCenterContainer>
                        <div data-aos="zoom-in-down">
                            <TopText>
                                <h2>매번 참가까지의 흐름</h2>
                            </TopText>
                            <BBContainer>
                                <div className={"Image1"} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "300px",
                                    height: "300px"
                                }}>
                                    <img src={Flow1} alt="Flow1 Image"
                                         style={{borderBottom: "2px dashed red", width: "200px", height: "150px"}}/>
                                    <h2 style={{fontSize: "20px", fontWeight: "700", marginTop: "1rem"}}>마이 페이지 정보를
                                        등록!</h2>
                                    <h4 style={{fontSize: "18px", fontWeight: "600"}}>간단한 자기소개나 스킬을 등록하자!</h4>
                                </div>
                                <div className={"Image2"} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "300px",
                                    height: "300px"
                                }}>
                                    <img src={Flow2} alt="Flow2 Image"
                                         style={{borderBottom: "2px dashed red", width: "200px", height: "150px"}}/>
                                    <h2 style={{fontSize: "20px", fontWeight: "700", marginTop: "1rem"}}>가고 싶은 날을 지역에서
                                        선택해
                                        응모!</h2>
                                    <h4 style={{fontSize: "18px", fontWeight: "600"}}>모집 일람에서 가고 싶은 <br/>대접을 찾아 응모하자!
                                    </h4>
                                </div>
                                <div className={"Image3"} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "300px",
                                    height: "300px"
                                }}>
                                    <img src={Flow3} alt="Flow3 Image"
                                         style={{borderBottom: "2px dashed red", width: "200px", height: "150px"}}/>
                                    <div>
                                        <h2 style={{fontSize: "20px", fontWeight: "700", marginTop: "1rem"}}>매칭 성립!</h2>
                                        <h4 style={{fontSize: "18px", fontWeight: "600"}}>매칭이 성립되면, <br/> 매번 갈 준비를
                                            시작합시다!
                                        </h4>
                                    </div>
                                </div>
                                <div className={"Image4"} style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "300px",
                                    height: "300px"
                                }}>
                                    <img src={Flow4} alt="Flow4 Image"
                                         style={{borderBottom: "2px dashed red", width: "200px", height: "150px"}}/>
                                    <h2 style={{fontSize: "20px", fontWeight: "700", marginTop: "1rem"}}>매번마다 출발!</h2>
                                    <h4 style={{fontSize: "18px", fontWeight: "600"}}>출발일이 오면, 매칭한 굉장히 먼저 출발!</h4>
                                </div>
                            </BBContainer>
                            <FlowButtonContainer>
                                <FlowButton onClick={Flowbutton}>매번 시작하기</FlowButton>
                            </FlowButtonContainer>
                        </div>
                    </FlowCenterContainer>
                </FlowBigContainer>
                <Footer/>
            </FlowContainer>
        </Container>
    )
}
const Container = styled.div`
  position: absolute;
  width: 100%;
  justify-content: center;
  height: 100vh;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr; /* Single column for the entire container */
  grid-template-rows: auto 1fr auto auto; /* Four rows for BigAboutContainer, FeatureContainer, FlowContainer, and SocialContainer */
  grid-template-areas:
    "BigAboutContainer"
    "FeatureContainer"
    "FlowContainer"
    "SocialContainer";
`;

const BigAboutContainer = styled.div`
  display: flex;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr; /* Adjust rows as needed */
  height: 70vh; /* Change height to auto for responsiveness */
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  width: 90%;
  border-radius: 10% 10% 0 0 / 10% 10% 0 0; /* 부드러운 흐물한 효과를 위한 border-radius 설정 */
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* Change width to 100% for responsiveness */
  max-width: 1200px; /* Add max-width for responsiveness */
`;
const CCContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const TopAboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 5.5;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;

  img {
    width: 100%;
    height: 300px;
    max-width: 100%; /* Ensure the image does not exceed its natural size */
    border-radius: 10% 10% 0 0 / 10% 10% 0 0; /* 부드러운 흐물한 효과를 위한 border-radius 설정 */
  }
`;
const OverlayTextContainer = styled.div`
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  top: 50%; /* 부모 요소의 50% 높이에서 정렬 시작 */
  transform: translateY(-50%); /* 부모 요소의 50% 높이만큼 위로 이동 */
`;

const OverlayTextTop = styled.div`
  border-radius: 5px;
  text-align: center;

  h2 {
    font-size: 32px;
    font-weight: 700;
    color: white;
  }
`;

const OverlayTextBottom = styled.div`
  border-radius: 5px;
  text-align: center;

  h2 {
    font-size: 28px;
    font-weight: 600;
    color: white;
  }
`;

const BottomAboutContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

`;

const BottomCenterContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: #FDF9EA;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  border-radius: 5px;
  border: 2px solid #FBCEB1;

  h2 {
    font-size: 36px;
    color: orange;
    font-weight: 700;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
  }
`;

const DeatailButton = styled.button`
  background-color: #EF6C00;
  color: white;
  margin-bottom: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 3px;
  width: 250px;
  height: 35px;
`
const FeatureContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto; /* Change height to auto for responsiveness */
  align-items: center;
  justify-content: center; /* 가로 방향 중앙 정렬 */

  h2 {
    font-size: 28px;
    font-weight: 700;
  }
`;

const BigFeatureContainer = styled.div`
  width: 100%; /* Change width to 100% for responsiveness */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  gap: 1rem;
  justify-content: space-around;
  height: auto; /* Change height to auto for responsiveness */
`;

const FirstFeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  text-align: center;
  margin: 1rem;

  img {
    width: 20rem;
    height: 15rem;
    border-radius: 10rem;
    margin: 0 auto;
  }

  h2 {
    margin-top: 5px;
    font-size: 24px;
    font-weight: 700;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
  }
`;

const BottomFeatureContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto; /* Change height to auto for responsiveness */
  align-items: center;
  justify-content: center; /* 가로 방향 중앙 정렬 */
`;

const BottomBigFeatureContainer = styled.div`
  width: 100%; /* Change width to 100% for responsiveness */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  gap: 1rem;
  justify-content: space-between;
  height: auto; /* Change height to auto for responsiveness */
`;

const FlowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Single column for the entire container */
  gap: 20px;
  width: 100%;
  height: 400px;
  align-items: center;
  justify-items: center;
`;

const FlowBigContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* Three rows for TopText, FlowCenterContainer, and FlowButtonContainer */
  width: 100%;
  height: auto;

`;

const TopText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: orange;
  }
`;

const FlowCenterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto; /* 자동으로 행의 크기를 조정 */
  gap: 20px;
  justify-content: space-between;
  padding: 30px; /* 필요에 따라 패딩 조정 */
  background-color: #FDF9EA;
  margin-top: 2rem;
  margin-bottom: 3rem;
  /* 각 요소에 일정한 간격을 위해 마진 추가 */

  .Image1, .Image2, .Image3, .Image4 {
    margin: 10px;
  }
`;
const BBContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* 반응형 그리드 */
  gap: 20px;
  justify-content: space-around;
  background-color: #FDF9EA;
`;

const FlowButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FlowButton = styled.button`
  height: 50px;
  width: 500px;
  background-color: #FDF9EA;
  border-radius: 5px;
  border-color: orange;
  color: orange;
  font-weight: 700;
  font-size: 24px;

  &:hover {
    background-color: #FBCEB1;
    color: #f7e8cb;
  }
`;
const SocialContainer = styled.div`
  display: flex;
  margin-top: 3rem;
  height: auto; /* Change height to auto for responsiveness */
  flex-direction: column;
  justify-content: center;
  grid-area: SocialContainer; /* Specify the grid area */
`;

const SocialBigContainer = styled.div`
  display: flex;
  height: auto; /* Change height to auto for responsiveness */
  background-color: white;
  flex-direction: column;

  h2 {
    font-size: 32px;
    font-weight: 700;
  }

  h4 {
    font-size: 20px;
  }
`;

export default AboutPage;