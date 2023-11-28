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
            <MiddleContainer>
                <HeaderContainer> {/* 새 컨테이너 추가 */}
                    <ReviewPageTitle>체험 후기</ReviewPageTitle>
                    <RightNewsTitle>
                        <Button onClick={handleWriteButtonClick}>글쓰기</Button>
                    </RightNewsTitle>
                </HeaderContainer>
                <NewsTitle>
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
                </NewsTitle>
            <Pagination>
                {Array.from({ length: Math.ceil(reviews.length / ITEMS_PER_PAGE) }, (_, i) => (
                    <PageNumber key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </PageNumber>
                ))}
            </Pagination>
            </MiddleContainer>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 700px;
  align-items: center;
  justify-content: center;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px; // 여백 추가
`;

const MiddleContainer = styled.div`
  display: flex;
  height: 500px;
  width: 1000px;
  flex-direction: column;
  align-items: center;
`;

const NewsTitle = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  align-items: center;
`

const ReviewPageTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

const RightNewsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 100px;
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