import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';

const ReviewChangePage = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);
    const { user } = useUserStore();
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [postImagePreview, setPostImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const { reviewId } = location.state || {};

    useEffect(() => {
        if (cookies.token) {
            axios.get(`http://localhost:8050/api/reviews/${reviewId}`)
                .then((response) => {
                    const reviewData = response.data;
                    setPostTitle(reviewData.reviewTitle);
                    setPostContent(reviewData.reviewContent);
                    setPostImagePreview(reviewData.reviewImage);
                })
                .catch((error) => {
                    console.error('Error fetching review:', error);
                    // 에러 처리
                });
        }
    }, [cookies.token, reviewId]);

    const handlePostImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let selectedFile = e.target.files[0];
            setPostImage(selectedFile);

            let reader = new FileReader();
            reader.onload = (event) => {
                setPostImagePreview(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpdatePost = async () => {
        if (!postTitle || !postContent) {
            alert('제목과 내용을 모두 작성해주세요.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        const formData = new FormData();
        formData.append('reviewTitle', postTitle);
        formData.append('reviewContent', postContent);

        if (postImage) {
            formData.append('reviewImage', postImage);
        }

        try {
            const response = await axios.put(
                `http://localhost:8050/api/reviews/${reviewId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            alert('게시글 수정이 완료되었습니다.');
            navigate('/review');
        } catch (error) {
            setErrorMessage('게시글 수정 중 오류가 발생했습니다.');
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
                            <Form.Control type="file" onChange={handlePostImageChange} />
                        </Form.Group>

                        {errorMessage && (
                            <Form.Text className="text-danger">{errorMessage}</Form.Text>
                        )}

                        <ButtonContainer>
                            <SubmitButton onClick={handleUpdatePost} disabled={isLoading}>
                                {isLoading ? '수정 중...' : '수정'}
                            </SubmitButton>
                        </ButtonContainer>
                    </Form>
                </Col>
            </Row>
        </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
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
`;

export default ReviewChangePage;
