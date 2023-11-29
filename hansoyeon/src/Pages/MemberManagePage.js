import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import company from "../imgs/company.png"
import member from "../imgs/member.png"
import blacklist from "../imgs/Blacklist_logo.png"
const SignupPage = (props) => {
    const navigate = useNavigate();

    const handleCompanyImageClick = () => {
        navigate("/companyManage")
    };

    const handleMemberImageClick = () => {
        navigate("/generalManage")
    };

    const handleBlackListImageClick = () => {
        navigate("/BlackListManage")
    };


    return (
        <StyledContainer>
            <Title>회원 관리</Title>
            <ImageContainer>
                <UserImg onClick={handleCompanyImageClick}>
                    <SelectImg alt="company" src={company} />
                </UserImg>
                <UserImg onClick={handleMemberImageClick}>
                    <SelectImg alt="member" src={member} />
                </UserImg>
                <UserImg onClick={handleBlackListImageClick}>
                    <SelectImg alt="blacklist" src={blacklist} />
                </UserImg>
            </ImageContainer>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #ffffff;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 80px;
  align-items:center;
  justify-content: center;
  font-size: 30px;
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

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5em; 
  color: #000; 
`;

const FormBox = styled.div`
  padding: 40px;
  justify-content: center;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-top: 150px;
  position: relative;
`;

export default SignupPage;