import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../stores";
import Footer from "../Components/Footer";

const WritingReviewPage = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [reviewImage, setReviewImage] = useState(null);
    const writer = user ? user.userName : "익명";
    const [showPopup, setShowPopup] = useState(false);

    const handleInputTitle = (e) => {
        setReviewTitle(e.target.value);
    };

    const handleInputContent = (e) => {
        setReviewContent(e.target.value);
    };

    const handleImageChange = async (e) => {
        setReviewImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let base64Image = "";
        if (reviewImage) {
            const reader = new FileReader();
            reader.readAsDataURL(reviewImage);
            base64Image = await new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        }

        const reviewData = {
            jobId: 1,
            userId: user ? user.userId : 999,
            reviewTitle: reviewTitle,
            reviewContent: reviewContent,
            reviewDate: new Date(),
            reviewRecommend: 0,
            writer: writer,
            image: base64Image,
        };

        try {
            const response = await axios.post(
                "http://localhost:8050/api/reviews",
                reviewData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
                navigate("/review");
            } else {
                console.error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error posting review:", error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <TitleContainer>리뷰 작성</TitleContainer>
                <MiddleContainer>
                    <WriterContainer>
                        <Label>작성자 :</Label>
                        <span>{writer}</span>
                    </WriterContainer>
                    <Title>
                        <Label>리뷰 제목</Label>
                        <Input
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={reviewTitle}
                            onChange={handleInputTitle}
                        />
                    </Title>
                    <ContentContainer>
                        <Label>리뷰 내용</Label>
                        <Textarea
                            placeholder="리뷰를 작성하세요"
                            value={reviewContent}
                            onChange={handleInputContent}
                        />
                    </ContentContainer>
                    <div>
                        <Label>사진 첨부:</Label>
                        <FileInput
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                    <ButtonContainer>
                        <SubmitButton type="submit">리뷰 작성</SubmitButton>
                    </ButtonContainer>
                </MiddleContainer>
            </Form>
            {showPopup && <Popup>리뷰가 성공적으로 작성되었습니다!</Popup>}
            <Footer />
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 85vh;
  box-sizing: border-box;
  margin-top: 35px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  

  &:after {
    content: "* 는 필수 입력 항목입니다.";
    display: block;
    font-size: 14px;
    color: red;
    padding-top: 10px;
  }
`;

const TitleContainer = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  margin-bottom: 15px;
  &:before {
    content: "*";
    display: inline;
    color: red;
  }
`;


const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const WriterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ContentContainer = styled.div`
  margin-bottom: 15px;
  &:before {
    content: "*";
    display: inline;
    color: red;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px; // 더 큰 입력 필드
  padding: 15px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
`;

const FileInput = styled.input`
  padding: 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;  // 가운데로 보내기 위해 수정
`;

const SubmitButton = styled.button`
  background-color: #0095f6;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.5s; // 부드러운 색상 전환
  width: 40%;

  &:hover {
    background-color: #0077cc;
  }
`;
const Popup = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export default WritingReviewPage;
