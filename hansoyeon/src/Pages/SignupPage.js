import React, {useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import company from "../imgs/company.png"
import member from "../imgs/member.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import kakao from "../imgs/kakaoRegister.png";
import google from "../imgs/googleRegister.png";
import email from "../imgs/emailRegister.png"
const SignupPage = (props) => {
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
    };

    const handleSignIp = () => {
        navigate("/login")
    };

    const handleCompanyImageClick = () => {
        setShowCompanyForm(true);
    };

    const handleMemberImageClick = () => {
        setShowMemberForm(true);
    };

    const handleKakaoRegisterImageClick = () => {
        navigate("/memberRegister")
    };

    const handleGoogleRegisterImageClick = () => {
        navigate("/memberRegister")
    };

    const handleEmailRegisterImageClick = () => {
        navigate("/memberRegister")
    };

    const handleBack = () => {
        setShowCompanyForm(false);
        setShowMemberForm(false);
    };

    if (!showMemberForm && !showCompanyForm) {
        return (
            <StyledContainer>
                <Title>회원가입</Title>
                <ImageContainer>
                    <UserImg onClick={handleCompanyImageClick}>
                        <SelectImg alt="company" src={company} />
                    </UserImg>
                    <UserImg onClick={handleMemberImageClick}>
                        <SelectImg alt="member" src={member} />
                    </UserImg>
                </ImageContainer>
            </StyledContainer>
        );
    }else if(showMemberForm && !showCompanyForm){
        return (
            <StyledContainer>
                <Title>일반회원가입</Title>
                <UserImg onClick={handleKakaoRegisterImageClick}>
                    <RegisterSelectImg alt="kakao" src={kakao} />
                </UserImg>
                <UserImg onClick={handleGoogleRegisterImageClick}>
                    <RegisterSelectImg alt="google" src={google} />
                </UserImg>
                <UserImg onClick={handleEmailRegisterImageClick}>
                    <RegisterEmailImg alt="email" src={email} />
                </UserImg>
            </StyledContainer>
        )
    }else if(!showMemberForm && showCompanyForm){
        return (
            <StyledContainer>

            </StyledContainer>
        )
    }
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 80px;
  align-items:center;
  font-size: 40px;
  font-weight: 700;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImg = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const SelectImg = styled.img`
  height: 45vh;
  width: auto;
  margin-right: 20px;
`;

const RegisterSelectImg = styled.img`
  height: 10vh;
  width: 500px;
  margin-bottom: 20px;
`;

const RegisterEmailImg = styled.img`
  height: 8.8vh;
  width: 500px;
  margin-bottom: 20px;
`;

export default SignupPage;