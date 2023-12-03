import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import noImage from '../imgs/noImage.png'
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';

const ReviewPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const userType = cookies.userType;
    const [isUser, setIsUser] = useState(false)
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    const [matchings, setMatchings] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
        fetchMatchings(user.userId);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        if (cookies.token) {
            if(userType === "company"){
                axios.get('http://localhost:8050/api/auth/currentCompany', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(response => {
                    console.log(cookies.token)
                    // 토큰이 유효한 경우
                    const fetchedUser = response.data;
                    console.log(fetchedUser)

                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }else{
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
                    setIsUser(true);
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }
        }

        const fetchReviewsWithCommentCount = async () => {
            try {
                // 리뷰 데이터 가져오기
                const reviewResponse = await axios.get('http://localhost:8050/api/reviews');
                const reviewsWithCommentCount = await Promise.all(reviewResponse.data.map(async review => {
                    // 각 리뷰에 대해 댓글 수 가져오기
                    const commentResponse = await axios.get(`http://localhost:8050/api/comments/${review.reviewId}`);
                    return {
                        ...review,
                        commentCount: commentResponse.data.length // 댓글 수를 리뷰 객체에 추가
                    };
                }));
                setReviews(reviewsWithCommentCount.reverse()); // 업데이트된 리뷰 데이터 설정
            } catch (error) {
                console.error('Error fetching reviews and comment counts:', error);
            }
        };

        fetchReviewsWithCommentCount();
    }, []);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const handleWriteButtonClick = () => {
        navigate('/writeReview');
    };

    const handleReviewClick = async (review) => {
        try {
            if (user.userId !== review.userId) { // 작성자와 현재 사용자가 다른 경우에만
                await axios.post(`http://localhost:8050/api/reviews/${review.reviewId}/incrementView`);
            }
            navigate(`/reviewContent/${review.reviewId}`);
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchMatchings = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/matchings/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            const currentDate = new Date();
            const validMatchings = response.data.data.filter(matching => {
                const endDate = new Date(matching.recruitment.jobEndDate);
                return endDate < currentDate;
            });
            const validWritingMatchings = validMatchings.filter(matching => {
                const status = matching.status;
               return status === "ACCEPTED"
            });
            console.log(validMatchings)
            setMatchings(validWritingMatchings);
        } catch (error) {
            console.error("Error fetching matchings:", error);
        }
    };

    const handleSelectMatching = (selectedMatching) => {
        // 선택된 matching 정보를 가지고 글 쓰기 페이지로 이동
        navigate('/writeReview', { state: { selectedMatching } });
    };

    return (
        <Container>
            <MiddleContainer>
                <HeaderContainer>
                    <ReviewPageTitle>체험 후기 게시판</ReviewPageTitle>
                    <RightNewsTitle>
                        {isUser &&
                            <Button onClick={handleOpenModal}>글쓰기</Button>
                        }
                    </RightNewsTitle>
                </HeaderContainer>
                <NewsTitle>
                <ReviewPageContentContainer>
                {currentItems.map(item => (
                    <ReviewPageContentItem key={item.reviewId} onClick={() => handleReviewClick(item)}>
                        <ReviewDetails>
                            <ImgContainer>
                                <Image
                                    src={item.reviewImage || noImage}
                                    alt="Review"
                                />
                            </ImgContainer>
                            <TextInfo>
                                <Title>{item.reviewTitle} ({item.commentCount})</Title>
                                <AdditionalInfo>작성자: {item.userId}</AdditionalInfo>
                                <AdditionalInfo>날짜: {item.reviewWriteDate}</AdditionalInfo>
                                <AdditionalInfo>조회수: {item.reviewClickCount},  좋아요: {item.reviewLikeCount}</AdditionalInfo>
                            </TextInfo>
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
            <StyledModal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>체험 후기 작성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {matchings.map(matching => (
                        <StyledSelectContainer key={matching.matchingId}>
                            <p>{matching.recruitment.jobTitle}</p>
                            <Button variant="primary" onClick={() => handleSelectMatching(matching)}>
                                이 공고로 작성하기
                            </Button>
                        </StyledSelectContainer>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </StyledModal>
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
  grid-template-columns: repeat(2, 1fr);;
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

const StyledModal = styled(Modal)`
  .modal-dialog {
    margin-top: 28vh; // 모달의 위치를 조정
  }
`;

const StyledSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; // 아이템 간 간격 조정

  p {
    margin: 0;
    flex-grow: 1; // 제목이 더 많은 공간을 차지하도록 설정
  }

  button {
    flex-shrink: 0; // 버튼 크기가 내용에 따라 축소되지 않도록 설정
  }
`;


const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; // 이미지와 텍스트 사이 간격
`;

const Image = styled.img`
  max-height: 250px;
  border-radius: 10px;
`;

const TextInfo = styled.div`
  text-align: center;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0; // 여백 조정
`;

const AdditionalInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin: 3px 0; // 여백 조정
`;


export default ReviewPage;