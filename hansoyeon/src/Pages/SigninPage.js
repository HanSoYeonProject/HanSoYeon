import React, {useState} from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import logo from "../imgs/logo2.png";
import kakao from "../imgs/kakao.png"
import google from "../imgs/google.png"
import company from "../imgs/company.png"
import member from "../imgs/member.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';


const SigninPage = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
    };

    const handleSignUp = () => {
        navigate("/register")
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCompanyImageClick = () => {
        setShowCompanyForm(true);
    };

    const handleMemberImageClick = () => {
        setShowMemberForm(true);
    };

    const handleBack = () => {
        setShowCompanyForm(false);
        setShowMemberForm(false);
    };


    if (!showMemberForm && !showCompanyForm) {
        return (
            <StyledContainer>
                <Title>로그인</Title>
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
                <FormBox>
                    <BackButton onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </BackButton>
                    <LogoImg src={logo} alt="Logo" />
                    <Form onSubmit={handleLogin}>
                        <StyledFormGroup controlId="formBasicId">
                            <StyledFormControl type="text" placeholder="아이디 입력" />
                        </StyledFormGroup>

                        <StyledFormGroup controlId="formBasicPassword">
                            <InputGroup>
                                <StyledFormControl
                                    type={showPassword ? "text" : "password"}
                                    placeholder="비밀번호 입력"
                                />
                                <InputGroup.Text onClick={togglePasswordVisibility} style={{ borderLeft: 'none', cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </InputGroup.Text>
                            </InputGroup>
                        </StyledFormGroup>

                        <StyledButton variant="primary" type="submit">
                            로그인
                        </StyledButton>

                        <Divider>또는</Divider>
                        <UserImg>
                            <KakaoImg alt="kakao" src={kakao} />
                        </UserImg>
                        <UserImg>
                            <GoogleImg alt="google" src={google} />
                        </UserImg>
                    </Form>
                    <NavigationLinks>
                        <NavLink href="#find-id">아이디 찾기</NavLink>
                        <NavLinkDivider>•</NavLinkDivider>
                        <NavLink href="#find-password">비밀번호 찾기</NavLink>
                        <NavLinkDivider>•</NavLinkDivider>
                        <NavLink onClick={handleSignUp}>회원가입</NavLink>
                    </NavigationLinks>
                </FormBox>
            </StyledContainer>
        )
    }else if(!showMemberForm && showCompanyForm){
        return (
            <StyledContainer>
                <FormBox>
                    <BackButton onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </BackButton>
                    <LogoImg src={logo} alt="Logo" />
                    <Form onSubmit={handleLogin}>
                        <StyledFormGroup controlId="formBasicId">
                            <StyledFormControl type="text" placeholder="기업 아이디 입력" />
                        </StyledFormGroup>

                        <StyledFormGroup controlId="formBasicPassword">
                            <InputGroup>
                                <StyledFormControl
                                    type={showPassword ? "text" : "password"}
                                    placeholder="비밀번호 입력"
                                />
                                <InputGroup.Text onClick={togglePasswordVisibility} style={{ borderLeft: 'none', cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </InputGroup.Text>
                            </InputGroup>
                        </StyledFormGroup>

                        <StyledButton variant="primary" type="submit">
                            로그인
                        </StyledButton>
                    </Form>
                    <NavigationLinks>
                        <NavLink href="#find-id">아이디 찾기</NavLink>
                        <NavLinkDivider>•</NavLinkDivider>
                        <NavLink href="#find-password">비밀번호 찾기</NavLink>
                        <NavLinkDivider>•</NavLinkDivider>
                        <NavLink onClick={handleSignUp}>회원가입</NavLink>
                    </NavigationLinks>
                </FormBox>
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

const FormBox = styled.div`
  padding: 40px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px; 
  margin-top: 20px;
  position: relative;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 20px; 
`;

const StyledFormControl = styled(Form.Control)`
  font-size: 16px; 
  padding: 10px; 
  
  ::placeholder {
    color: #666; 
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

const LogoImg = styled.img`
  height: 20vh;
  width: auto;
  margin-bottom: 20px;
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
    border-bottom: 1px solid #ccc;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
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

const KakaoImg = styled.img`
  height: 5.5vh;
  width: auto;
`;

const GoogleImg = styled.img`
  height: 7vh;
  width: auto;
`;

const NavigationLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bolder;
  margin-top: 25px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #000; 
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const NavLinkDivider = styled.span`
  color: #000; 
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



export default SigninPage;
