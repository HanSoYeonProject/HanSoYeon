import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewContentPage = () => {
    const { id } = useParams(); // URL에서 리뷰 ID를 가져옴
    const [review, setReview] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8050/api/reviews/${id}`)
            .then(response => {
                console.log(response.data); // 로그로 데이터 확인
                setReview(response.data);
            })
            .catch(error => console.error('Error fetching review:', error));
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    if (!review) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>리뷰 상세 페이지</h1>
            <ReviewDetails>
                <p>Review ID: {review.id}</p>
                <p>Job ID: {review.jobId}</p>
                <p>User ID: {review.userId}</p>
                <p>Review Content: {review.reviewContent}</p>
                <p>Review Recommend: {review.reviewRecommend}</p>
                <p>Date: {formatDate(review.reviewDate)}</p>
            </ReviewDetails>
        </Container>
    );
};

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ReviewDetails = styled.div`
  margin-top: 20px;
`;

export default ReviewContentPage;