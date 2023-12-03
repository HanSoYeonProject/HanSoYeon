import React, {useEffect, useState} from "react";
import {Row, Col, Button, Form, Container} from 'react-bootstrap';
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';

const WritingReviewPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postImagePreview, setPostImagePreview] = useState(null);
    const writer = user ? user.userName : "익명"; // 현재 로그인한 사용자의 이름이나 "익명" 사용
    const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const { selectedMatching } = location.state || {};

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


    const handlePostImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];
            setPostImage(selectedFile);

            let reader = new FileReader();
            reader.onload = (event) => {
                setPostImagePreview(event.target.result);
            }
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleCreatePost = async () => {
        if (!postTitle || !postContent) {
            alert('제목과 내용을 모두 작성해주세요.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        const formData = new FormData();
        formData.append('reviewTitle', postTitle);
        formData.append('userId', user.userId);
        formData.append('jobId', selectedMatching.recruitment.jobId)
        formData.append('reviewContent', postContent);

        if (postImage) {
            formData.append('postImage', postImage);
        }

        try {
            const response = await axios.post('http://localhost:8050/api/createReview', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                alert('게시글 작성이 완료되었습니다.');
                navigate('/review');
            } else {
                setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
            }
        } catch (error) {
            setErrorMessage('게시글 작성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StyledContainer>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formPostTitle">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="제목을 입력하세요"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPostContent">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                placeholder="내용을 입력하세요"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>

                        {postImagePreview && (
                            <ImagePreview src={postImagePreview} alt="Post Preview" />
                        )}

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="file"
                                onChange={handlePostImageChange}
                            />
                        </Form.Group>

                        {errorMessage && (
                            <Form.Text className="text-danger">{errorMessage}</Form.Text>
                        )}

                        <Button variant="primary" onClick={handleCreatePost} disabled={isLoading}>
                            {isLoading ? '게시 중...' : '게시'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </StyledContainer>
    );
};

const TitleContainer = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const WriterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ContentContainer = styled.div`
  margin-bottom: 15px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
const Popup = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const StyledContainer = styled(Container)`
    // 여기에 커스텀 CSS 스타일을 추가하세요
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    margin-top: 150px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ImagePreview = styled.img`
    width: 100%;
    max-height: 300px;
    margin-bottom: 10px;
`;


export default WritingReviewPage;