import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useNavigate, useParams} from 'react-router-dom';
import {Badge} from 'react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';

const ReviewContentPage = () => {
    const { id } = useParams(); // URL에서 리뷰 ID를 가져옴
    const [review, setReview] = useState(null);

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const userType = cookies.userType;

    const [comments, setComments] = useState([]);  // 댓글 리스트
    const [comment, setComment] = useState('');

    useEffect( () => {
        if (cookies.token) {
            if (userType === "company") {
                axios.get('http://localhost:8050/api/auth/currentCompany', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(response => {
                    // 토큰이 유효한 경우
                    const fetchedUser = response.data;
                    setUser(fetchedUser)
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            } else {
                axios.get('http://localhost:8050/api/auth/currentUser', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(response => {
                    // 토큰이 유효한 경우
                    const fetchedUser = response.data;
                    setUser(fetchedUser);
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }
        }
        axios.get(`http://localhost:8050/api/reviews/${id}`)
            .then(response => {
                setReview(response.data);
            })
            .catch(error => console.error('Error fetching review:', error));

        axios.get(`http://localhost:8050/api/comments/${id}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => console.error('Error fetching comment', error));
    }, [id]);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const handleEdit = (reviewId) => {
        navigate(`/reviewEdit/${reviewId}`, { state: { reviewId }});
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            try {
                await axios.delete(`http://localhost:8050/api/reviews/${reviewId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                navigate("/review");
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const handleBackToList = () => {
        navigate("/review");
    };

    // 댓글을 서버에 전송하는 함수
    const handlePostComment = async () => {
        try {
            let commentData = null;
            if(userType === "company"){
                commentData = {
                    reviewId: id,
                    userId: user.providerId,
                    userType: userType,
                    commentContent: comment
                };
            }else{
                commentData = {
                    reviewId: id,
                    userId: user.userId,
                    userType: userType,
                    commentContent: comment
                };
            }
            console.log(commentData)
            const reviewId = commentData.reviewId

            const response = await axios.post(`http://localhost:8050/api/comments/${reviewId}`, commentData);
            setComments([...comments, response.data]);
            setComment('');
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };
    const handleHeart = async (review) => {
        if (userType !== "company") {
            if (review.userId === user.userId) {
                alert("본인 리뷰에는 좋아요를 누를 수 없어요!");
                return;
            }
        }
        try {
            if (user.userId !== review.userId) { // 작성자와 현재 사용자가 다른 경우에만
                await axios.post(`http://localhost:8050/api/reviews/${review.reviewId}/incrementLike`);
            }
            alert("좋아요가 반영되었습니다!")
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }
    };


    if (!review) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    return (
        <div>
            <Container>
                <Title>
                    <ReviewTitle>
                        <h2>{review.reviewTitle}</h2>
                    </ReviewTitle>

                    <HeartIcon onClick={() => handleHeart(review)}>
                        <h2>좋아요</h2>❤️
                    </HeartIcon>
                </Title>
                <ReviewImage src={review.reviewImage} alt="Review" />
                <ReviewDetails>
                    <DetailItem><Label>작성자:</Label> {review.userId}</DetailItem>
                    <DetailItem><Label>작성일:</Label> {formatDate(review.reviewWriteDate)}</DetailItem>
                    <DetailItem><Label>내용:</Label> {review.reviewContent}</DetailItem>
                </ReviewDetails>
                <ButtonContainer>
                    {user && userType !== "company" && user.userId === review.userId && (
                        <>
                            <ActionButton onClick={() => handleEdit(review.reviewId)}>수정</ActionButton>
                            <ActionButton onClick={() => handleDelete(review.reviewId)}>삭제</ActionButton>
                        </>
                    )}
                    <ActionButton onClick={handleBackToList}>목록</ActionButton>
                </ButtonContainer>
            </Container>
            <CommentSection>
                <h3>댓글 ({comments.length})</h3>
                <CommentList>
                    {comments.map((comment) => (
                        <CommentItem key={comment.commentId}>
                            <CommentAuthorAndBadge>
                                <CommentAuthor>{comment.userId}</CommentAuthor>
                                {comment.userType === 'company' ?
                                    <Badge bg="primary" style={{ marginRight: '20px', fontSize: "16px" }}>기업 회원</Badge>
                                    :
                                    <Badge bg="success" style={{ marginRight: '20px', fontSize: "16px" }}>일반 회원</Badge>
                                }
                            </CommentAuthorAndBadge>
                            <CommentContent>{comment.commentContent}</CommentContent>
                            <CommentWriteDate>{comment.commentWriteDate}</CommentWriteDate>
                        </CommentItem>
                    ))}
                </CommentList>
                <CommentInput
                    placeholder="댓글을 입력하세요"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <PostCommentButton onClick={handlePostComment}>댓글 작성</PostCommentButton>
            </CommentSection>
        </div>

    );
};

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(0, 0, 0,0.3);
  background-color: white;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  color: #333;
  margin-bottom: 5px;
  font-weight: bold;
`;
const ReviewTitle = styled.div`
  display: flex;
  font-family: 'omyu_pretty';
  width:90%;
  justify-content: center;
  align-items: center;
  h2 {

    font-weight: 500;
    font-size: 40px;
  }
`

const ReviewImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 20px;
  border-radius: 10px;
`;

const ReviewDetails = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DetailItem = styled.p`
  margin: 10px 0;
`;

const Label = styled.span`
  font-weight: bold;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff9933;
  color: white;
  font-size: 18px;
  width: 70px;
  height: 40px;
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkorange;
  }
`;

const CommentSection = styled.div`
  max-width: 800px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  margin: 10px auto; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
`;


const CommentList = styled.ul`
  list-style: none;
  justify-content: center;
  padding: 0;
`;

const CommentItem = styled.li`
  display: flex;
  width: 90%;
  justify-content: space-between; // 이 부분을 유지하되, 각 요소의 너비를 조절하여 위치를 정렬합니다.
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

const CommentAuthorAndBadge = styled.div`
  flex: 1; // 왼쪽 끝에 위치하도록 설정
  display: flex;
  align-items: center;
`;

const CommentContent = styled.div`
  flex: 2; // 중앙에 위치하도록 설정
  text-align: center; // 내용을 중앙 정렬합니다.
  margin-top: 5px;
`;

const CommentWriteDate = styled.div`
  flex: 1; // 오른쪽 끝에 위치하도록 설정
  text-align: right; // 날짜를 오른쪽 정렬합니다.
`;


const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

const PostCommentButton = styled.button`
  background-color: #ffffff;
  color: #333333;
  font-weight: 600;
  border: 1px solid #dcdcdc;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* hover 효과를 부드럽게 만들기 위한 트랜지션 설정 */

  &:hover {
    background-color: #f5f5f5; /* hover 시 배경 색상 변경 */
    color: #555555; /* hover 시 글자 색상 변경 */
    border-color: #bfbfbf; /* hover 시 테두리 색상 변경 */
  }
`;


// 하트 아이콘 스타일링
const HeartIcon = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  width: 70px;
  cursor: pointer;
  margin-left: 10px;
  align-items: flex-end;
  justify-content: center;
  h2 {
    margin-right: 0.3rem;
    display: flex;
    align-items: flex-end;
    font-size: 12px;
  }
`;

export default ReviewContentPage;