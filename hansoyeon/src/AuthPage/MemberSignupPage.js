import React, { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from "../imgs/logo2.png";

const MemberSignUpPage = () => {
    const navigate = useNavigate();
    const [showSecondPart, setShowSecondPart] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        gender: '',
        phoneNumber: '',
        postalCode: '',
        address: '',
        detailAddress: '',
        prefer: '',
        introduction: ''
    });

    const handleSignUp = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleNext = () => {
        setShowSecondPart(true);
    };

    const handleBack = () => {
        if (showSecondPart) {
            setShowSecondPart(false);
        } else {
            navigate(-1);
        }
    };
    return (
        <StyledContainer>
            <FormBox>
                <BackButton onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>
                <LogoImg src={logo} alt="Logo" />
                <Form onSubmit={handleSignUp}>
                    {!showSecondPart ? (
                        <>
                            <Title>당신의 정보를 입력해주세요!</Title>
                            <StyledFormGroup controlId="formBasicUsername">
                                <StyledFormControl
                                    type="text"
                                    placeholder="아이디"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicName">
                                <StyledFormControl
                                    type="text"
                                    placeholder="이름"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicEmail">
                                <StyledFormControl
                                    type="email"
                                    placeholder="이메일"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPassword">
                                <StyledFormControl
                                    type="password"
                                    placeholder="비밀번호"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPhone">
                                <StyledFormControl
                                    type="text"
                                    placeholder="전화번호"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledButton variant="secondary" onClick={handleNext}>
                                다음
                            </StyledButton>
                        </>
                    ) : (
                        <>
                            <StyledFormGroup controlId="formBasicPostalCode">
                                <StyledFormControl
                                    type="text"
                                    placeholder="우편번호"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicAddress">
                                <StyledFormControl
                                    type="text"
                                    placeholder="주소"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicDetailAddress">
                                <StyledFormControl
                                    type="text"
                                    placeholder="상세주소"
                                    name="detailAddress"
                                    value={formData.detailAddress}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPrefer">
                                <StyledFormControl
                                    type="text"
                                    placeholder="선호 지역"
                                    name="prefer"
                                    value={formData.prefer}
                                    onChange={handleChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicIntroduction">
                                <StyledFormControl
                                    as="textarea"
                                    placeholder="자기소개"
                                    name="introduction"
                                    value={formData.introduction}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </StyledFormGroup>

                            <StyledButton variant="primary" type="submit">
                                회원가입
                            </StyledButton>
                        </>
                    )}
                </Form>
            </FormBox>
        </StyledContainer>
    );
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
  margin-top: 40px;
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
  margin-bottom: 10px;
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
  margin-bottom: 40px;
  align-items:center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  font-family: "Berlin Sans FB",fantasy;
  color: #996666;
`;

export default MemberSignUpPage;
