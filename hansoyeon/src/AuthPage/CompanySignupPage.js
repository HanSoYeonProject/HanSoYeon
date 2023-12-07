import React, {useEffect, useRef, useState} from 'react';
import axios from "axios"
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faCamera} from '@fortawesome/free-solid-svg-icons';
import logo from "../imgs/logo2.png";
import license from "../imgs/license.jpg"
import question from "../imgs/question.png"
import noImage from "../imgs/noImage.png";
import Footer from "../Components/Footer";

const CompanySignUpPage = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [licenseImage, setLicenseImage] = useState(null);
    const fileInputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [verificationPhone, setVerificationPhone] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState("");

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
        providerProfile: '',
        companyLicense: '',
        providerApproval: '',
        verificationCode: ''
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
            errors.companyTel = "올바른 전화번호를 입력해주세요.";
        }

        if(!verificationPhone){
            errors.userPhoneCheck = "휴대폰 인증을 진행해주세요. "
        }

        // 라이센스 유효성 검사
        if(!businessNumber){
            errors.companyLicense = "사업자 등록증을 제출해주세요. "
        }

        if(!businessCheck){
            errors.businessCheck = "사업자 등록을 확인해주세요"
        }

        // 회사명
        if (!formData.companyName) {
            errors.companyName = "회사명을 입력해주세요.";
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

    const uploadProfileImage = async () => {
        if (!licenseImage) return null;

        const formData = new FormData();
        formData.append('profileImage', licenseImage);

        try {
            const response = await axios.post('http://localhost:8050/api/uploadProfileImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading profile image:', error);
            return null;
        }
    };

    const [businessNumber, setBusinessNumber] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [businessCheck, setBusinessCheck] = useState(false);


    async function handleCheckRegistrationNumber(req: string): Promise<string> {
        const url: string = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=7qe7vg3zUQdiZErzcHVVolstffAp3wUBke37nX4dyFcWCPsjYsiHmb5Su25Dw/s1uv5zk6sh3oQq4sIynl8z0A==`;
        const { data } = await axios.post(url, {
            b_no: [req],
        });
        // 📌 01 값이 반환되면 계속사업자 02 값은 휴업자 03 값은 폐업자로 확인이 가능합니다.
        return data.data[0].b_stt_cd;
    }

    const handleChangeBusinessNumber = (e) => {
        setBusinessNumber(e.target.value);
    };

    const handlerCheckSchoolNum = async () => {
        try {
            const data = await handleCheckRegistrationNumber(businessNumber);
            if (data === "01") {
                setResultMessage('사업자 등록이 확인되었습니다.');
                setBusinessCheck(true);
            } else {
                setResultMessage('사업자 등록이 확인되지 않았습니다.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const imageUrl = await uploadProfileImage();
            const combinedAddress = `${addressFields.postalCode} ${addressFields.address} ${addressFields.detailAddress}`.trim();
            const signUpData = {
                ...formData,
                companyAddress: combinedAddress,
                companyLicense: businessNumber,
                providerApproval: "false"
            };

            axios.post('http://localhost:8050/api/auth/signUp/company', signUpData)
                .then(response => {
                    console.log("회원가입 성공: ", response.data);
                    navigate("/approval");
                })
                .catch(error => {
                    console.error("회원가입 실패: ", error);
                });
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLicenseImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendVerification = async () => {
        const userPhone = formData.companyTel;
        // 백엔드의 SMS 서비스를 호출하여 인증번호 전송
        try {
            await axios.post('http://localhost:8050/api/sms/sendVerification', { phone: userPhone });
            // 성공적으로 전송된 경우, 인증번호 입력 칸 표시
            setShowVerificationInput(true);
        } catch (error) {
            console.error('Error sending verification code:', error);
        }
    };

    const handleVerifyCode = async () => {
        const phone = formData.companyTel;
        const code = formData.verificationCode;

        try {
            const response = await axios.post('http://localhost:8050/api/sms/verifyCode', { phone, code });
            if (response.status === 200) {
                setVerificationMessage("인증번호가 일치합니다.");
                setVerificationPhone(true);
                console.log("인증번호 검증 성공");
            }
        } catch (error) {
            setVerificationMessage("인증번호를 확인해주세요.");
            console.error("인증번호 검증 실패:", error);
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const Modal = ({onClose}) => {
        return (
            <ModalContainer>
                <ModalContent>
                    <ModalTitle>사업자 등록</ModalTitle>
                    <LogoImg src={logo} alt="Logo" />
                    <ModalText>공고 작성을 위해서는 검증 요소가 필요합니다. </ModalText>
                    <ModalText>Ex. 사업자 등록증 또는 농업 경영체 등록증</ModalText>
                    <CloseButton onClick={onClose}>닫기</CloseButton>
                </ModalContent>
            </ModalContainer>
        );
    };

    return (
        <StyledContainer>
            <FormBox>
                <BackButton onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>
                <Form onSubmit={handleSignUp}>
                    {!showSecondPart ? (
                        <>
                            <LogoImg src={logo} alt="Logo" />
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
                                    placeholder="이메일"
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
                            <StyledFormGroup controlId="formBasicBusinessNumber">
                                <StyledFormControl
                                    type="text"
                                    placeholder="사업자 등록번호"
                                    name="businessNumber"
                                    value={businessNumber}
                                    onChange={handleChangeBusinessNumber}
                                />
                                <StyledButton variant="outline-secondary" onClick={handlerCheckSchoolNum}>
                                    사업자 등록 확인
                                </StyledButton>
                            </StyledFormGroup>
                            {resultMessage && <ResultMessage>{resultMessage}</ResultMessage>}
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
                                <Row>
                                    <Col>
                                        <StyledFormControl
                                            type="text"
                                            placeholder="전화번호(-빼고 입력)"
                                            name="companyTel"
                                            value={formData.companyTel}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col md="auto">
                                        <Button variant="outline-secondary" onClick={handleSendVerification}>
                                            인증번호 전송
                                        </Button>
                                    </Col>
                                </Row>
                                {validationErrors.companyTel && <ErrorText>{validationErrors.companyTel}</ErrorText>}
                                {validationErrors.userPhoneCheck && <ErrorText>{validationErrors.userPhoneCheck}</ErrorText>}
                            </StyledFormGroup>

                            {showVerificationInput && (
                                <StyledFormGroup controlId="formBasicVerificationCode">
                                    <StyledFormControl
                                        type="text"
                                        placeholder="인증번호"
                                        name="verificationCode"
                                        value={formData.verificationCode}
                                        onChange={handleChange}
                                    />
                                    <StyledButton variant="outline-secondary" onClick={handleVerifyCode}>
                                        인증번호 검증
                                    </StyledButton>
                                    {verificationMessage && <ErrorText>{verificationMessage}</ErrorText>}
                                </StyledFormGroup>
                            )}

                            <StyledButton variant="primary" type="submit">
                                회원가입
                            </StyledButton>
                        </>
                    )}
                </Form>
            </FormBox>
            <Footer/>
            {modalVisible && <Modal onClose={toggleModal} />}
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

const CompanyImagePreview = styled.img`
  width: 140px;
  height: 160px;
  margin-bottom: 10px;
`;

const CameraIconLabel = styled.label`
  cursor: pointer;
  background-color: purple;
  color: white;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const QuestionImg = styled.img`
  height: 4vh;
  width: auto;
  margin-left: 8px;
  margin-bottom: 8px;
  cursor: pointer; 
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const ModalTitle = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
`;

const ModalText = styled.h5`
    color: #555;
    font-size: 16px;
    margin: 5px 0;
`;

const CloseButton = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    background-color: #f44336;
    color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #d32f2f;
    }
`;

const ResultMessage = styled.div`
    color: #006400; /* Green color */
    font-size: 14px;
    margin-top: 10px;
`;

export default CompanySignUpPage;
