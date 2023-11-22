import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewPage = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        axios.get('http://localhost:8050/api/reviews')
            .then(response => {
                setReviews(response.data.reverse());
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    const handleWriteButtonClick = () => {
        navigate('/writeReview');
    };

    const handleReviewClick = (reviewId) => {
        navigate(`/reviewContent/${reviewId}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <ReviewPageTitle>
                <h1>후기 체험담</h1>
                <Button onClick={handleWriteButtonClick}>글쓰기</Button>
            </ReviewPageTitle>
            <ReviewPageContentContainer>
                {currentItems.map(item => (
                    <ReviewPageContentItem key={item.reviewId} onClick={() => handleReviewClick(item.reviewId)}>
                        <ReviewDetails>
                            <p>Review ID: {item.reviewId}</p>
                            <p>Job ID: {item.jobId}</p>
                            <p>User ID: {item.userId}</p>
                            <p>Review Content: {item.reviewContent}</p>
                            <p>Review Recommend: {item.reviewRecommend}</p>
                            <p>Date: {formatDate(item.reviewDate)}</p>
                        </ReviewDetails>
                    </ReviewPageContentItem>
                ))}
            </ReviewPageContentContainer>
            <Pagination>
                {Array.from({ length: Math.ceil(reviews.length / ITEMS_PER_PAGE) }, (_, i) => (
                    <PageNumber key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </PageNumber>
                ))}
            </Pagination>
        </Container>
    );
};

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ReviewPageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ReviewPageContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ReviewPageContentItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

const ReviewDetails = styled.div`
  margin-bottom: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  cursor: pointer;
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:hover {
    background-color: #eee;
  }
`;

export default ReviewPage;