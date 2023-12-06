import React from 'react';
import styled from 'styled-components';
import logo from '../imgs/logo-removebg.png';
import footer1 from '../imgs/footer1.png';
import footer2 from '../imgs/footer2.png';

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 200px;
`;

const Footer2Image = styled.div`
  display: flex;
  height: 100px;
  width: auto;
  margin-top: 18px;
  margin-left: 1200px; /* 원하는 값으로 조절 */
`;

const Footer1ImageContainer = styled.div`
  margin-left: auto; // 오른쪽 정렬을 위해 auto 사용
  display: flex;
`;

const Footer1Image = styled.div`
  display: flex;
  height: 70px;
  width: 70px;
  position: absolute; // 절대 위치 사용
  right: 800px; // 오른쪽에서 50px 떨어진 곳에 위치
  top: 36px; // 상단에서 36px 떨어진 곳에 위치
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%; /* 변경된 부분 */
  flex: 3;
  justify-content: space-between;
  padding: 0 20px;
`;

const ImageContainer = styled.div`
  width: 80%;
  height: 100%;
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const LogoImageCon = styled.div`
  background-color: #ffa506;
  flex: 3;
`;

const LogoImage = styled.img`
  width: 220px;
  background-color: #FFA506;
`;

const FooterInfo = styled.div`
  margin-top: 20px;
  color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  flex: 3; /* 변경된 부분: 7에서 3으로 조절 */
  h2 {
    margin-right: 5rem;
    font-size: 20px;
  }

  .color2 {
    font-weight: 600;
  }
`;


const King = styled.div`
  background-color: #3A1D0C;
  flex: 7; /* 변경된 부분: 3에서 7으로 조절 */
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FirstRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between; /* 변경된 부분: 사이에 공간을 넣기 위해 space-between 추가 */
`;

const SecondRow = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
`;

const LogoContainer = styled.div`
  flex: 3;
`;

const InfoContainer = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;


function Footer() {
    return (
        <FooterContainer>
            <FirstRow>
                <FooterContent>
                    <ImageContainer>
                        <Footer1ImageContainer>
                            <Footer1Image>
                                <img src={footer1} alt="Footer1" />
                            </Footer1Image>
                        </Footer1ImageContainer>
                        <Footer2Image>
                            <img src={footer2} alt="Footer2" />
                        </Footer2Image>
                    </ImageContainer>
                </FooterContent>
            </FirstRow>

            <SecondRow>
                <King>
                    <LogoContainer>
                        <LogoImageCon>
                            <LogoImage className="logoImage" alt="Logo" src={logo} />
                        </LogoImageCon>
                    </LogoContainer>
                    <InfoContainer>
                        <FooterInfo>
                            <h2 className="color2 f-w_600">
                                서울특별시 강남구<br />
                                한소연 Copyright(C)<br />
                                HanSoYeon all rights reserved.
                            </h2>
                        </FooterInfo>
                    </InfoContainer>
                </King>
            </SecondRow>
        </FooterContainer>
    );
}

export default Footer;