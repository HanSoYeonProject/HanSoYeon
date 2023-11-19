import React, {useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import defaultProfilePic from '../imgs/default_profile.png';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";
import axios from "axios";
import {Badge} from "react-bootstrap";
import logo from "../imgs/gwanghui.jpg";
import iu from "../imgs/iu3.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faCamera} from '@fortawesome/free-solid-svg-icons';

const InfoChangePage = (props) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { user, setUser } = useUserStore();
    const userType = cookies.userType;
    const [step, setStep] = useState(1);

    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const fileInputRef = useRef(null);

    const [addressFields, setAddressFields] = useState({
        postalCode: '',
        address: '',
        detailAddress: ''
    });

    const [address, setAddress] = useState(user.userAddress || '');
    const [preferredArea, setPreferredArea] = useState(user.userPrefer || '');
    const [gender, setGender] = useState(user.userGender || '');
    const [phoneNumber, setPhoneNumber] = useState(user.userPhone || '');

    useEffect(() => {
        if (cookies.token) {
            axios.get('http://localhost:8050/api/auth/currentUser', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }).then(response => {
                const fetchedUser = response.data;
                setUser(fetchedUser);
            }).catch(error => {
                // 토큰이 유효하지 않은 경우
                console.error("Token verification failed:", error);
                handleLogout();
            });
        }

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

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        // 프로필 사진 업로드 로직
    };

    const goToNextStep = () => {
        setStep(2);
    };

    const goToPreviousStep = () => {
        setStep(1);
    };

    const handleBack = () => {
        navigate("/MyInfo");
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePreferredAreaChange = (e) => {
        setPreferredArea(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };


    return (
        <StyledContainer>
            <BoxContainer>
                <ImageBox>
                    <LargeImage src={logo} alt="logo" />
                </ImageBox>
                {step === 1 && (
                    <InfoBox>
                        <BackButton onClick={handleBack}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </BackButton>
                        <EditInfoTitle>정보 수정</EditInfoTitle>
                        <ProfileEditSection>
                            <ImageEditContainer>
                                <ProfileImagePreview src={previewImage || defaultProfilePic} alt="Profile Preview" />
                                <CameraIconLabel onClick={triggerFileInput}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </CameraIconLabel>
                                <HiddenFileInput
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />
                            </ImageEditContainer>
                            <Name>{user.userName + "님" || 'No Name'}</Name>
                            <Email>{user.userEmail || 'No Email'}</Email>
                            <Divider>자기소개</Divider>
                            <SelfIntroductionTextarea
                                value={user.userInfo || ''}
                                onChange={(e) => {/* handle self-introduction change */}}
                                placeholder="자기소개"
                            />
                        </ProfileEditSection>
                        <SaveChangesButton onClick={goToNextStep}>다음</SaveChangesButton>
                    </InfoBox>
                )}
                {step === 2 && (
                    <InfoBox>
                        <BackButton onClick={goToPreviousStep}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </BackButton>
                        <InfoSection>
                            <Divider2>주소</Divider2>
                            <AddressContainer>
                                <AddressInput
                                    type="text"
                                    value={user.userAddress || ''}
                                    onChange={handleAddressChange}
                                    placeholder="주소"
                                />
                                <SearchButton onClick={searchAddress}>
                                    검색
                                </SearchButton>
                            </AddressContainer>
                            <Divider2>선호 지역</Divider2>
                            <PreferredAreaInput
                                type="text"
                                value={user.userPrefer || ''}
                                onChange={handlePreferredAreaChange}
                                placeholder="선호 지역"
                            />
                            <Divider2>성별</Divider2>
                            <GenderSelect
                                value={user.userGender || ''}
                                onChange={handleGenderChange}
                            >
                                <option value="">성별 선택</option>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </GenderSelect>
                            <Divider2>전화번호</Divider2>
                            <PhoneNumberInput
                                type="text"
                                value={user.userPhone || ''}
                                onChange={handlePhoneNumberChange}
                                placeholder="전화번호"
                            />
                        </InfoSection>
                        <SaveChangesButton onClick={handleSaveChanges}>저장</SaveChangesButton>
                    </InfoBox>
                )}
            </BoxContainer>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 1000px; 
  margin: 0 auto;
`;

const InfoBox = styled.div`
  width: 90%;
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const EditInfoTitle = styled.h2`
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px; 
  color: #381E1F; 
  font-size: 25px;
  font-weight: bold;
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

const ImageBox = styled.div`
  width: 100%;
  max-width: 600px;
  height: 90%;
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LargeImage = styled.img`
  max-width: 100%;
  max-height: 90%;
  border-radius: 10px;
  object-fit: cover; 
`;

const Name = styled.h2`
  margin: 0;
  margin-top: 20px;
  color: #381E1F;
`;

const Email = styled.p`
  color: gray;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #ccc;
  }

  &::before {
    margin-right: 10px;
  }

`;

const Divider2 = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    margin-left: 10px;
    border-bottom: 1px solid #ccc;
  }

`;

const SelfIntroductionTextarea = styled.textarea`
  width: 100%;
  height: 120px; 
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 15px;
  color: #333;
  background-color: #f7f7f7; 
  margin-top: 10px;
  margin-bottom: 10px;

  &:focus {
    outline: none; 
    border-color: #F7E600; 
  }
`;
const ProfileEditSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImagePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const SaveChangesButton = styled.button`
  padding: 8px 12px;
  border-radius: 20px;
  background-color: #F7E600;
  color: #381E1F;
  border: none;
  cursor: pointer;
  font-size: 15px;
  margin-top: 10px;
  &:hover {
    background-color: #e6d700;
  }
`;

const ImageEditContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const CameraIconLabel = styled.label`
  position: absolute;
  bottom: 0;
  transform: translate(50%, 50%);
  cursor: pointer;
  background-color: white; 
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  width: 80%; 
`;

const SearchButton = styled.button`
  margin-left: 10px; 
  padding: 8px 12px; 
  border: 1px solid #ccc; 
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7; 
  }
`;

const AddressInput = styled.input`
  display: block;
  width: 60%;
  &:focus {
    outline: none;
    border-color: #F7E600;
  }
`;

const PreferredAreaInput = styled.input`
  display: block;
  width: 60%;
  margin-bottom: 15px;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #F7E600;
  }
`;

const GenderSelect = styled.select`
  display: block;
  width: 60%;
  margin-bottom: 15px;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #F7E600;
  }
`;

const PhoneNumberInput = styled.input`
  display: block;
  width: 60%;
  margin-bottom: 15px;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #F7E600;
  }
`;

export default InfoChangePage;
