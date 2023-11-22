import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useUserStore } from '../stores'; // useUserStore 훅의 실제 경로

const WritingReviewPage = () => {
    const navigate = useNavigate();
    const { user } = useUserStore(); // 현재 로그인한 사용자 정보 가져오기
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const writer = user ? user.userName : "익명"; // 현재 로그인한 사용자의 이름이나 "익명" 사용
    const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리

    const handleInputTitle = e => {
        setReviewTitle(e.target.value);
    };

    const handleInputContent = e => {
        setReviewContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {

            jobId: 1, // 임시로 설정된 값, 실제 애플리케이션에서는 사용자가 선택하거나 다른 방법으로 결정해야 합니다.
            userId: user ? user.userId : 999, // 만약 사용자 정보가 없으면 임시 ID를 사용
            reviewTitle: reviewTitle, // 사용자가 입력한 리뷰 제목
            reviewContent: reviewContent, // 사용자가 입력한 리뷰 내용
            reviewDate: new Date(), // 현재 날짜와 시간
            reviewRecommend: 0, // 초기 추천 수, 0으로 설정
            writer: writer // 현재 로그인한 사용자의 이름이나 "익명"
        };

        try {
            const response = await axios.post('http://localhost:8050/api/reviews', reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setShowPopup(true); // 팝업 표시
                setTimeout(() => setShowPopup(false), 3000); // 3초 후에 팝업 숨김
                navigate("/review");
            } else {
                console.error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };

    return (
        <Container>
            <TitleContainer>
                리뷰 작성
            </TitleContainer>
            <Form onSubmit={handleSubmit}>
                <MiddleContainer>
                    <Title>
                        <Label>리뷰 제목:</Label>
                        <Input type="text" value={reviewTitle} onChange={handleInputTitle} />
                    </Title>
                    <WriterContainer>
                        <Label>작성자:</Label>
                        <span>{writer}</span>
                    </WriterContainer>
                    <ContentContainer>
                        <Label>리뷰 내용:</Label>
                        <Textarea value={reviewContent} onChange={handleInputContent} />
                    </ContentContainer>
                    <ButtonContainer>
                        <SubmitButton type="submit">리뷰 작성</SubmitButton>
                    </ButtonContainer>
                </MiddleContainer>
            </Form>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
`;

const TitleContainer = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const WriterContainer = styled.div`
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


export default WritingReviewPage;