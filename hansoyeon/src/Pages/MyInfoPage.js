import React, {useEffect} from 'react';
import styled from 'styled-components';
import defaultProfilePic from '../imgs/default_profile.png';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";
import axios from "axios";
import {Badge} from "react-bootstrap";
import logo from "../imgs/seungjun.jpg";
import iu from "../imgs/iu2.jpeg"
import Footer from "../Components/Footer";

const MyInfoPage = (props) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { user, setUser } = useUserStore();
    const userType = cookies.userType;

    useEffect(() => {
        if (cookies.token) {
            if(userType === "company"){
                axios.get('http://localhost:8050/api/auth/currentCompany', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(response => {
                    console.log(cookies.token)
                    // 토큰이 유효한 경우
                    const fetchedUser = response.data;
                    console.log(fetchedUser)
                    setUser(fetchedUser);
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }else{
                axios.get('http://localhost:8050/api/auth/currentUser', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(response => {
                    console.log(cookies.token)
                    // 토큰이 유효한 경우
                    const fetchedUser = response.data;
                    console.log(fetchedUser)
                    setUser(fetchedUser);
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }
        }
    }, []);

    const getProfilePicSrc = () => {
        if(userType === "company"){
            if (user.providerProfile === "hansoyeon/src/imgs/default_profile.png" || !user.providerProfile) {
                return defaultProfilePic;
            }
            return user.providerProfile;
        }else{
            if (user.userProfile === "hansoyeon/src/imgs/default_profile.png" || !user.userProfile) {
                return defaultProfilePic;
            }
            return user.userProfile;
        }
    };

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const handleEditProfile = () => {
        if(userType === "company"){
            navigate("/companyInfoChange");
        }else{
            navigate("/infoChange");
        }
    };

    const companyInfo = () => {
        return "회사명 : " + user.companyName + "\n주소 : " + user.companyAddress + "\n전화 : " + user.companyTel;
    }

    return (
        <StyledContainer>
            <BoxContainer>
            <InfoBox>
                <ProfileSection>
                    <ProfileImage src={getProfilePicSrc()} alt="프로필 사진" />
                    <NameSection>
                        {userType === 'company' ?
                            <Name>{user.providerName + "님" || 'No Name'}</Name>
                            :
                            <Name>{user.userName + "님" || 'No Name'}</Name>
                        }
                        {userType === 'company' ?
                            <Badge bg="primary" style={{ fontSize: "16px", marginLeft: "10px" }}>기업 회원</Badge>
                            :
                            <Badge bg="success" style={{ fontSize: "16px", marginLeft: "10px" }}>일반 회원</Badge>
                        }
                    </NameSection>
                    {userType === 'company' ?
                        <Email>{user.providerEmail || 'No Email'}</Email>
                        :
                        <Email>{user.userEmail || 'No Email'}</Email>
                    }
                    <EditProfileButton onClick={handleEditProfile}>프로필 수정</EditProfileButton>
                </ProfileSection>
                <InfoSection>
                    {userType === 'company' ?
                        <Divider>회사소개</Divider>
                        :
                        <Divider>자기소개</Divider>
                    }
                    {userType === 'company' ?
                        <SelfIntroductionTextarea
                            readOnly
                            value={companyInfo() || '회사소개가 없습니다.'}
                        />
                        :
                        <SelfIntroductionTextarea
                            readOnly
                            value={user.userInfo || '자기소개가 없습니다.'}
                        />
                    }
                </InfoSection>
            </InfoBox>
                <ImageBox>
                    <LargeImage src={logo} alt="logo" />
                </ImageBox>
            </BoxContainer>
            <StyledFooter>
            <Footer />
            </StyledFooter>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column; /* 수직 방향으로 컨테이너 아이템 정렬 */
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin-top: 50px;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  width: 90%;
  max-width: 500px;
  background: white;
  padding: 20px;
  margin-right: 5px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const ImageBox = styled.div`
  width: 90%;
  max-width: 500px;
  height: 90%;
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LargeImage = styled.img`
  max-width: 124%;
  max-height: 90%;
  border-radius: 10px;
  object-fit: cover; 
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Name = styled.h2`
  margin: 0;
  color: #381E1F;
`;

const Email = styled.p`
  color: gray;
`;

const InfoSection = styled.div`
  // 스타일링 추가
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  color: gray;
`;

const EditProfileButton = styled.button`
  padding: 8px 12px;
  border-radius: 20px;
  background-color: #F7E600;
  color: #381E1F; 
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-top: 5px;
  font-family: 'omyu_pretty';
  &:hover {
    background-color: #e6d700;
  }
`;

const NameSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 13px;
  margin-top: 30px;
  margin-bottom: 20px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #ccc;
  }

  &::before {
    margin-right: 10px;
  }

`;

const SelfIntroductionTextarea = styled.textarea`
  width: 100%;
  height: 140px; 
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 15px;
  color: #333;
  background-color: #f7f7f7; 
  margin-bottom: 10px;
  margin-top: 10px;

  &:focus {
    outline: none; 
    border-color: #F7E600; 
  }
`;

const StyledFooter = styled.footer`
  padding: 10px;
  text-align: center;
  width: 100%;
  margin-top: auto; /* 다른 요소 아래에 위치하도록 설정 */
`;


export default MyInfoPage;
