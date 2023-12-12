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
  margin-top: 80px;
`;

const Footer2Image = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  right: 100px;
  bottom: -15px;

  img {
    width: 100%;
  }
`;

const Footer1ImageContainer = styled.div`
  margin-left: auto; // 오른쪽 정렬을 위해 auto 사용
  display: flex;
`;

const Footer1Image = styled.div`
  height: 70px;
  width: 70px;
  position: absolute; // 절대 위치 사용
  left: 10%;
  bottom: -6px;

  img {
    width: 100%;
  }
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%; /* 변경된 부분 */
  flex: 3;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  width: 100%;
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
  padding: 25px 0;
  color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  text-align: center;
  h2 {
    font-size: 18px;
    margin: 0;
    line-height: 28px;
  }
  p {
    font-size: 15px;
    margin-top: 8px;
    margin-bottom: 0;
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
                        <Footer1Image>
                            <img src={footer1} alt="Footer1" />
                        </Footer1Image>
                        <Footer2Image>
                            <img src={footer2} alt="Footer2" />
                        </Footer2Image>
                    </ImageContainer>
                </FooterContent>
            </FirstRow>

            <SecondRow>
                <King>
                    <InfoContainer>
                        <FooterInfo>
                            <h2 className="color2 f-w_600">
                                충청남도 아산시 탕정면 선문로 221번길 70<br />
                                한소연 Copyright(C)
                            </h2>
                            <p>
                                HanSoYeon all rights reserved.
                            </p>
                        </FooterInfo>
                    </InfoContainer>
                </King>
            </SecondRow>
        </FooterContainer>
    );
}

export default Footer;