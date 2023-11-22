import React, {useEffect, useState} from 'react';
import axios from "axios"
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from "../imgs/logo2.png";

const CompanySignUpPage = () => {
    const navigate = useNavigate();

    const [showSecondPart, setShowSecondPart] = useState(false);
    const [formData, setFormData] = useState({
        providerId: '',
        providerName: '',
        providerEmail: '',
        providerPassword: '',
        providerPasswordCheck: '',
        companyName: '',
        companyAddress: '',
        companyTel: '',
        providerProfile: ''
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
        if (formData.providerId.length < 4 || formData.providerId.length > 12) {
            errors.providerId = "아이디는 4자 이상 12자 이하로 입력해주세요.";
        }

        // 이름 유효성 검사
        if (!formData.providerName) {
            errors.providerName = "이름을 입력해주세요.";
        }

        // 이메일 유효성 검사
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.providerEmail)) {
            errors.providerEmail = "올바른 이메일 주소를 입력해주세요.";
        }

        // 비밀번호 유효성 검사
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,12}$/;
        if (!passwordPattern.test(formData.providerPassword)) {
            errors.providerPassword = "비밀번호는 4~12자의 영문 대소문자, 숫자로만 입력해야 합니다.";
        }

        // 비밀번호 확인 검사
        if (formData.providerPassword !== formData.providerPasswordCheck) {
            errors.providerPasswordCheck = "비밀번호가 일치하지 않습니다.";
        }

        // 휴대폰 번호 유효성 검사
        const telPattern = /^[0-9]{8,11}$/;
        if (!telPattern.test(formData.companyTel)) {
            errors.companyTel = "올바른 회사 전화번호를 입력해주세요.";
        }

        // 회사명
        if (!formData.companyName) {
            errors.companyName = "선호 지역을 입력해주세요.";
        }

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
                companyAddress: combinedAddress
            };

            axios.post('http://localhost:8050/api/auth/signUp/company', signUpData)
                .then(response => {
                    console.log("회원가입 성공: ", response.data);
                    navigate("/login");
                })
                .catch(error => {
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
                            <StyledFormGroup controlId="formBasicProviderId">
                                <StyledFormControl
                                    type="text"
                                    placeholder="아이디"
                                    name="providerId"
                                    value={formData.providerId}
                                    onChange={handleChange}
                                />
                                {validationErrors.providerId && <ErrorText>{validationErrors.providerId}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicProviderName">
                                <StyledFormControl
                                    type="text"
                                    placeholder="이름"
                                    name="providerName"
                                    value={formData.providerName}
                                    onChange={handleChange}
                                />
                                {validationErrors.providerName && <ErrorText>{validationErrors.providerName}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicProviderEmail">
                                <StyledFormControl
                                    type="email"
                                    placeholder="회사 이메일"
                                    name="providerEmail"
                                    value={formData.providerEmail}
                                    onChange={handleChange}
                                />
                                {validationErrors.providerEmail && <ErrorText>{validationErrors.providerEmail}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicProviderPassword">
                                <StyledFormControl
                                    type="password"
                                    placeholder="비밀번호"
                                    name="providerPassword"
                                    value={formData.providerPassword}
                                    onChange={handleChange}
                                />
                                {validationErrors.providerPassword && <ErrorText>{validationErrors.providerPassword}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicPasswordCheck">
                                <StyledFormControl
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    name="providerPasswordCheck"
                                    value={formData.providerPasswordCheck}
                                    onChange={handleChange}
                                />
                                {validationErrors.providerPasswordCheck && <ErrorText>{validationErrors.providerPasswordCheck}</ErrorText>}
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
                                            placeholder="회사 우편번호"
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
                                    placeholder="회사 주소"
                                    name="address"
                                    value={addressFields.address}
                                    onChange={handleAddressChange}
                                    disabled
                                />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <StyledFormControl
                                    type="text"
                                    placeholder="회사 상세주소"
                                    name="detailAddress"
                                    value={addressFields.detailAddress}
                                    onChange={handleAddressChange}
                                />
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicCompanyName">
                                <StyledFormControl
                                    type="text"
                                    placeholder="회사명"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                                {validationErrors.companyName && <ErrorText>{validationErrors.companyName}</ErrorText>}
                            </StyledFormGroup>

                            <StyledFormGroup controlId="formBasicTel">
                                <StyledFormControl
                                    type="text"
                                    placeholder="회사 전화번호(-빼고 입력)"
                                    name="companyTel"
                                    value={formData.companyTel}
                                    onChange={handleChange}
                                />
                                {validationErrors.companyTel && <ErrorText>{validationErrors.companyTel}</ErrorText>}
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

export default CompanySignUpPage;