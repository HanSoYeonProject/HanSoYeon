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

    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const fileInputRef = useRef(null);

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
    }, []);

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

    const handleBack = () => {
        navigate("/MyInfo");
    };

    return (
        <StyledContainer>
            <BoxContainer>
                <ImageBox>
                    <LargeImage src={logo} alt="logo" />
                </ImageBox>
                <InfoBox>
                    <BackButton onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </BackButton>
                    <ProfileEditSection>
                        <ImageEditContainer>
                            <ProfileImagePreview src={previewImage || defaultProfilePic} alt="미리보기" />
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
                    </ProfileEditSection>
                    <InfoSection>
                        <Divider>자기소개</Divider>
                        <SelfIntroductionTextarea
                            readOnly
                            value={user.userInfo || '자기소개가 없습니다.'}
                        />
                    </InfoSection>
                    <SaveChangesButton onClick={handleSaveChanges}>변경 사항 저장</SaveChangesButton>
                </InfoBox>
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
  // 스타일링 추가
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 13px;
  margin-top: 60px;
  margin-bottom: 20px;

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

const SelfIntroductionTextarea = styled.textarea`
  width: 100%;
  height: 140px; 
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


export default InfoChangePage;
