import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import company from "../imgs/company.png"
import member from "../imgs/member.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import kakao from "../imgs/kakaoRegister.png";
import google from "../imgs/googleRegister.png";
import email from "../imgs/emailRegister.png"
import GoogleLogin from "react-google-login";
const SignupPage = (props) => {
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        script.async = true;
        document.body.appendChild(script);

        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('af3894518c9ad04274d8c7c098885abd');
        }

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleCompanyImageClick = () => {
        setShowCompanyForm(true);
    };

    const handleMemberImageClick = () => {
        setShowMemberForm(true);
    };

    const handleGoogleRegisterImageClick = () => {
        const clientId = "234889770604-vcqi694q1kvfblt30ajhq77gsh5s8j2t.apps.googleusercontent.com";
        const redirectUri = "http://localhost:3000/googleCallback";
        const scope = "https://www.googleapis.com/auth/userinfo.email";
        const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline&prompt=consent`;

        window.location.href = url;
    };

    const handleEmailRegisterImageClick = () => {
        navigate("/memberRegister")
    };

    const handleBack = () => {
        setShowCompanyForm(false);
        setShowMemberForm(false);
    };

    const handleKakaoRegisterImageClick = () => {
        window.Kakao.Auth.login({
            success: function(authObj) {
                console.log(authObj); // 인증 객체 확인

                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: function(response) {
                        console.log(response);
                        if (response.kakao_account && response.kakao_account.email) {
                            const email = "(kakao)" + response.kakao_account.email;
                            navigate("/memberRegister", { state: { email } });
                        } else {
                            console.log("이메일 정보를 가져올 수 없습니다.");
                        }
                    },
                    fail: function(error) {
                        console.log(error);
                    },
                });
            },
            fail: function(err) {
                console.log(err);
            },
        });
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