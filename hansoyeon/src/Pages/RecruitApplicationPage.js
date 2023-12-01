import React, {useEffect, useRef, useState} from 'react';
import axios from "axios"
import styled, { keyframes } from "styled-components";
import logo from "../imgs/logo2.png";
import {Button} from "react-bootstrap";
import {useNavigate, useLocation} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";

const RecruitApplicationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const jobDetails = location.state?.jobDetails;
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();

    useEffect(() => {
        if (cookies.token) {
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
    }, []);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const handleCheck = () => {
        navigate("/recruitHistory")
    };

    const handleMain = () => {
        navigate("/")
    };

    return (
        <StyledContainer>
            <FormBox>
                <Title>공고 신청 완료</Title>
                <LogoImg src={logo} alt="Logo" />
                <SubTitle>{user.userName}님의 공고신청이 완료되었습니다.</SubTitle>
                <SubTitle>{jobDetails?.title}</SubTitle>
                <SubTitle>({jobDetails?.providers})</SubTitle>
                <ButtonContainer>
                    <Button variant="success" onClick={handleCheck}
                            style={{marginRight: '0.5rem', marginTop: '2rem'}}>신청 확인</Button>
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

export default RecruitApplicationPage;
