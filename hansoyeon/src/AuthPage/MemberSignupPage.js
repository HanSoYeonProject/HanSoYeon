import React, {useEffect, useState} from 'react';
import axios from "axios"
import { useLocation } from 'react-router-dom';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from "../imgs/logo2.png";

const MemberSignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isKakaoOrGoogleEmail, setIsKakaoOrGoogleEmail] = useState(false);

    useEffect(() => {
        if (location.state && location.state.email) {
            setFormData(prevFormData => ({
                ...prevFormData,
                userEmail: location.state.email
            }));
            setIsKakaoOrGoogleEmail(true);
        }
    }, [location]);

    const [showSecondPart, setShowSecondPart] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        userEmail: '',
        userPassword: '',
        userPasswordCheck: '',
        userGender: '',
        userInfo: '',
        userPrefer: '',
        userPhone: '',
        userAddress: ''
    });
    const [addressFields, setAddressFields] = useState({
        postalCode: '',
        address: '',
        detailAddress: ''
    });

    const [validationErrors, setValidationErrors] = useState({});


    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const searchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                const fullAddress = {
                    postalCode: data.zonecode,
                    address: addr,
                    detailAddress: ''
                };
                setAddressFields(fullAddress);
            }
        }).open();
    };
    const validateForm = () => {
        let errors = {};

        // 아이디 유효성 검사
        if (formData.userId.length < 4 || formData.userId.length > 12) {
            errors.userId = "아이디는 4자 이상 12자 이하로 입력해주세요.";
        }

        // 이름 유효성 검사
        if (!formData.userName) {
            errors.userName = "이름을 입력해주세요.";
        }

        // 이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.userEmail)) {
            errors.userEmail = "올바른 이메일 주소를 입력해주세요.";
        }

        // 비밀번호 유효성 검사
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/;
        if (!passwordPattern.test(formData.userPassword)) {
            errors.userPassword = "비밀번호는 4~12자의 영문 대소문자, 숫자로만 입력해야 합니다.";
        }

        // 비밀번호 확인 검사
        if (formData.userPassword !== formData.userPasswordCheck) {
            errors.userPasswordCheck = "비밀번호가 일치하지 않습니다.";
        }

        // 휴대폰 번호 유효성 검사
        const phonePattern = /^[0-9]{10,11}$/;
        if (!phonePattern.test(formData.userPhone)) {
            errors.userPhone = "올바른 휴대폰 번호를 입력해주세요.";
        }

        // 선호 지역 유효성 검사
        if (!formData.userPrefer) {
            errors.userPrefer = "선호 지역을 입력해주세요.";
        }

        if (!formData.userGender) {
            errors.userGender = "성별을 선택해주세요.";
        }

        // 자기소개 유효성 검사
        if (!formData.userInfo) {
            errors.userInfo = "자기소개를 입력해주세요.";
        }

        console.log(errors); // 오류 객체 출력

        console.log(Object.keys(errors).length);

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setAddressFields({ ...addressFields, [e.target.name]: e.target.value });
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

    const handleSignUp = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const combinedAddress = `${addressFields.postalCode} ${addressFields.address} ${addressFields.detailAddress}`.trim();
            const signUpData = {
                ...formData,
                userAddress: combinedAddress
            };

            axios.post('http://localhost:8050/api/auth/signUp', signUpData)
                .then(response => {
                    console.log("회원가입 성공: ", response.data);
                    navigate("/login");
                })
                .catch(error => {
                    // 에러 처리
                    console.error("회원가입 실패: ", error);
                });
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
                            <StyledFormGroup controlId="formBasicUsername">
                                <StyledFormControl
                                    type="text"
                                    placeholder="아이디"
                                    name="userId"
                                    value={formData.userId}
                                    onChange={handleChange}
                                />
                                {validationErrors.userId && <ErrorText>{validationErrors.userId}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicName">
                                <StyledFormControl
                                    type="text"
                                    placeholder="이름"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                />
                                {validationErrors.userName && <ErrorText>{validationErrors.userName}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicEmail">
                                <StyledFormControl
                                    type="email"
                                    placeholder="이메일"
                                    name="userEmail"
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                    disabled={isKakaoOrGoogleEmail}
                                />
                                {validationErrors.userEmail && <ErrorText>{validationErrors.userEmail}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPassword">
                                <StyledFormControl
                                    type="password"
                                    placeholder="비밀번호"
                                    name="userPassword"
                                    value={formData.userPassword}
                                    onChange={handleChange}
                                />
                                {validationErrors.userPassword && <ErrorText>{validationErrors.userPassword}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPasswordCheck">
                                <StyledFormControl
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    name="userPasswordCheck"
                                    value={formData.userPasswordCheck}
                                    onChange={handleChange}
                                />
                                {validationErrors.userPasswordCheck && <ErrorText>{validationErrors.userPasswordCheck}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPhone">
                                <StyledFormControl
                                    type="text"
                                    placeholder="전화번호"
                                    name="userPhone"
                                    value={formData.userPhone}
                                    onChange={handleChange}
                                />
                                {validationErrors.userPhone && <ErrorText>{validationErrors.userPhone}</ErrorText>}
                            </StyledFormGroup>

                            <StyledButton variant="secondary" onClick={handleNext}>
                                다음
                            </StyledButton>
                        </>
                    ) : (
                        <>
                            <StyledFormGroup>
                                <Row>
                                    <Col>
                                        <StyledFormControl
                                            type="text"
                                            placeholder="우편번호"
                                            name="postalCode"
                                            value={addressFields.postalCode}
                                            onChange={handleAddressChange}
                                            disabled
                                        />
                                    </Col>
                                    <Col md="auto">
                                        <Button variant="outline-secondary" onClick={searchAddress}>
                                            검색
                                        </Button>
                                    </Col>
                                </Row>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <StyledFormControl
                                    type="text"
                                    placeholder="주소"
                                    name="address"
                                    value={addressFields.address}
                                    onChange={handleAddressChange}
                                    disabled
                                />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <StyledFormControl
                                    type="text"
                                    placeholder="상세주소"
                                    name="detailAddress"
                                    value={addressFields.detailAddress}
                                    onChange={handleAddressChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPrefer">
                                <StyledFormControl
                                    type="text"
                                    placeholder="선호 지역"
                                    name="userPrefer"
                                    value={formData.userPrefer}
                                    onChange={handleChange}
                                />
                                {validationErrors.userPrefer && <ErrorText>{validationErrors.userPrefer}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicGender">
                                <Form.Control as="select" name="userGender" value={formData.userGender} onChange={handleChange}>
                                    <option value="">성별 선택</option>
                                    <option value="male">남성</option>
                                    <option value="female">여성</option>
                                </Form.Control>
                                {validationErrors.userGender && <ErrorText>{validationErrors.userGender}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicIntroduction">
                                <StyledFormControl
                                    as="textarea"
                                    placeholder="자기소개"
                                    name="userInfo"
                                    value={formData.userInfo}
                                    onChange={handleChange}
                                    rows={3}
                                />
                                {validationErrors.userInfo && <ErrorText>{validationErrors.userInfo}</ErrorText>}
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
  justify-content: center;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  margin-top: 150px;
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
  height: 18vh;
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

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export default MemberSignUpPage;
