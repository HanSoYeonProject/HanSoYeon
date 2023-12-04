import React, {useEffect, useRef, useState} from 'react';
import axios from "axios"
import styled, { keyframes } from "styled-components";
import logo from "../imgs/logo2.png";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Footer from "../Components/Footer";

const ApprovalPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")
    };

    const handleMain = () => {
        navigate("/")
    };

    return (
        <StyledContainer>
            <FormBox>
                <Title>회원가입 완료</Title>
                <LogoImg src={logo} alt="Logo" />
                <SubTitle>24시간 내 관리자 심사 및 승인이 이루어지며</SubTitle>
                <SubTitle>관리자의 승인 후 공고 작성이 가능합니다.</SubTitle>
                <ButtonContainer>
                    <Button variant="success" onClick={handleLogin}
                            style={{marginRight: '0.5rem', marginTop: '2rem'}}>로그인</Button>
                    <Button variant="primary" onClick={handleMain}
                            style={{marginTop: '2rem'}}>메인으로</Button>
                </ButtonContainer>
            </FormBox>
        </StyledContainer>
    );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  animation: ${fadeIn} 1s ease-out;
`;

const FormBox = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 450px;
`;

const LogoImg = styled.img`
  height: 24vh;
  width: auto;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
`;

const SubTitle = styled.h6`
  color: #666;
  text-align: center;
  margin: 5px 0;
`;

const ButtonContainer = styled.div`
  
`;

export default ApprovalPage;
