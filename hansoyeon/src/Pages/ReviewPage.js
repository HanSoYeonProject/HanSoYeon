import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Modal} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import noImage from '../imgs/noImage.png'
import {useCookies} from 'react-cookie';
import {useUserStore} from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';
import useThrottle from "../Components/useThrottle";
import usePushNotification from "../Components/usePushNotification";
import Footer from "../Components/Footer";

const ReviewPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const userType = cookies.userType;
    const [isUser, setIsUser] = useState(false)
    const [isCompanyUser, setIsCompanyUser] = useState(false)
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 4;

    const [matchings, setMatchings] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [providerPhone, setProviderPhone] = useState('')

    const { fireNotificationWithTimeout } = usePushNotification();
    const { throttle } = useThrottle();

    const handleOpenModal = () => {
        setShowModal(true);
        fetchMatchings(user.userId);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleOpenCompanyModal = () => {
        setShowCompanyModal(true);
    };

    const handleCloseCompanyModal = () => setShowCompanyModal(false);

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
                    setUser(fetchedUser)
                    setIsCompanyUser(true)
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
                console.log(reviewResponse.data)
                const reviewsWithCommentCount = await Promise.all(reviewResponse.data.map(async review => {
                    // 각 리뷰에 대해 댓글 수 가져오기
                    const commentResponse = await axios.get(`http://localhost:8050/api/comments/${review.reviewId}`);
                    return {
                        ...review,
                        commentCount: commentResponse.data.length // 댓글 수를 리뷰 객체에 추가
                    };
                }));
                reviewsWithCommentCount.sort((a, b) => b.reviewLikeCount - a.reviewLikeCount);
                setReviews(reviewsWithCommentCount);
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

    useEffect(() => {
        if (user && cookies.token && userType === "company") {
            setProviderPhone(user.companyTel);
            fetchJobAnnouncements(user.providerId);
        }
    }, [user]);

    const fetchJobAnnouncements = async (jobProviders) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/recruitments/byProvider/${jobProviders}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            console.log(response.data)
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching job announcements:", error);
        }
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
               return status === "COMPLETED"
            });
            console.log(validMatchings)
            setMatchings(validWritingMatchings);
        } catch (error) {
            console.error("Error fetching matchings:", error);
        }
    };

    const fetchApplicants = async (jobId) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/matchings/recruitments/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            if (response.data && response.data.data) {
                const validWritingMatchings = response.data.data.filter(matching => {
                    const status = matching.status;
                    return status === "ACCEPTED" || status === "COMPLETED";
                });
                console.log(validWritingMatchings)
                setApplicants(validWritingMatchings);
            }
        } catch (error) {
            console.error("Error fetching applicants:", error);
            setApplicants([]);
        }
    };

    const handleSelectMatching = (selectedMatching) => {
        // 선택된 matching 정보를 가지고 글 쓰기 페이지로 이동
        navigate('/writeReview', { state: { selectedMatching } });
    };

    const handleCheckApplicants = async (announcement) => {
        setSelectedAnnouncement(announcement);
        setSelectedJobId(announcement.job_id);
        fetchApplicants(announcement.job_id);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleDetailModalClose = () => {
        setIsDetailModalOpen(false);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const hasDatePassed = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        return end < today;
    };

    const pastAnnouncements = announcements.filter(announcement => hasDatePassed(announcement.endDate));

    const acceptMatching = async (recruitment, user) => {
        const confirmSelection = window.confirm(`${user.userId}님의 리뷰 권한을 허용하시겠습니까?`);
        const userId = user.userId;
        const recruitmentId = recruitment.jobId;
        const userPhone = user.userPhone;

        if (confirmSelection) {
            try {
                const response = await axios.put('http://localhost:8050/api/matchings/completed', {
                    recruitmentId,
                    userId
                }, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });

                if (response.status === 200) {
                    alert('권한 허용 처리가 완료되었습니다.');
                    fetchApplicants(recruitmentId);

                    fireNotificationWithTimeout('권한 허용 완료', 5000, {
                        body: `[${recruitment.jobTitle}]에 ${user.userName}의 리뷰 권한이 허용되었습니다. `
                    });

                    // SMS 전송 로직
                    try {
                        const smsResponse = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingWriteBoard", {
                            phone: userPhone,
                            jobTitle: recruitment.jobTitle
                        });
                        console.log(smsResponse.data);

                        // Provider에게도 SMS 전송
                        const sms2Response = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingWriteBoardCompany", {
                            phone: providerPhone,
                            jobTitle: recruitment.jobTitle
                        });
                        console.log(sms2Response.data);
                    } catch (smsError) {
                        console.error("SMS 전송 중 오류 발생:", smsError);
                    }
                }
            } catch (error) {
                console.error("Error accepting the matching:", error);
                alert('권한 처리 중 오류가 발생했습니다.');
            }
        }
    };

    const cancelApproval = async (recruitment, user) => {
        const userId = user.userId;
        const recruitmentId = recruitment.jobId;
        const userPhone = user.userPhone;
        const confirmCancel = window.confirm(`${user.userId}님의 리뷰 권한을 취소하시겠습니까?`);
        if (confirmCancel) {
            try {
                const response = await axios.put('http://localhost:8050/api/matchings/completedCancel', {
                    recruitmentId,
                    userId
                }, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });

                if (response.status === 200) {
                    alert('권한 취소 처리가 완료되었습니다.');
                    fetchApplicants(recruitmentId);

                    fireNotificationWithTimeout('권한 취소 완료', 5000, {
                        body: `[${recruitment.jobTitle}]에 ${user.userName}의 리뷰 권한이 취소되었습니다. `
                    });

                    // SMS 전송 로직
                    try {
                        const smsResponse = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingWriteBoardCancel", {
                            phone: userPhone,
                            jobTitle: recruitment.jobTitle
                        });
                        console.log(smsResponse.data);

                        // Provider에게도 SMS 전송
                        const sms2Response = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingWriteBoardCancelCompany", {
                            phone: providerPhone,
                            jobTitle: recruitment.jobTitle
                        });
                        console.log(sms2Response.data);
                    } catch (smsError) {
                        console.error("SMS 전송 중 오류 발생:", smsError);
                    }
                }
            } catch (error) {
                console.error("Error canceling the approval:", error);
                alert('권한 취소 처리 중 오류가 발생했습니다.');
            }
        }
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
                        {isCompanyUser &&
                            <Button onClick={handleOpenCompanyModal}>권한 허용</Button>
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
            <StyledModal show={showCompanyModal} onHide={handleCloseCompanyModal}>
                <Modal.Header closeButton>
                    <Modal.Title>후기 작성 권한 허용</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pastAnnouncements.map(announcement => (
                        <StyledSelectContainer key={announcement.job_id}>
                            <p>{announcement.title}</p>
                            <Button variant="primary" onClick={() => handleCheckApplicants(announcement)}>
                                신청자
                            </Button>
                        </StyledSelectContainer>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCompanyModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </StyledModal>
            <StyledModal show={isModalOpen} onHide={handleModalClose}>
                <ModalContent>
                    <ModalHeader>
                        {selectedAnnouncement &&
                            <h2>{selectedAnnouncement.title} 신청 명단</h2>
                        }
                        <button onClick={handleModalClose}>닫기</button>
                    </ModalHeader>
                    <ApplicantsList>
                        {applicants.length > 0 ? (
                            <StyledTable>
                                <thead>
                                <TableRow>
                                    <TableHeader>이름</TableHeader>
                                    <TableHeader>전화번호</TableHeader>
                                    <TableHeader>권한상태</TableHeader>
                                </TableRow>
                                </thead>
                                <tbody>
                                {applicants.map(applicant => (
                                    <TableRow key={applicant.user.userId}>
                                        <TableCell onClick={() => handleUserClick(applicant.user)}>
                                            {applicant.user.userName}
                                        </TableCell>
                                        <TableCell>{applicant.user.userPhone}</TableCell>
                                        <TableCell>
                                            {applicant.status === "ACCEPTED" &&
                                                <NoApproveButton onClick={() => acceptMatching(applicant.recruitment, applicant.user)}>
                                                    비허용
                                                </NoApproveButton>
                                            }
                                            {applicant.status === "COMPLETED" &&
                                                <ApproveButton onClick={() => cancelApproval(applicant.recruitment, applicant.user)}>
                                                    허용
                                                </ApproveButton>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </tbody>
                            </StyledTable>
                        ) : (
                            <p>신청자가 아직 없습니다. </p>
                        )}
                    </ApplicantsList>
                </ModalContent>
            </StyledModal>
            <StyledModal show={isDetailModalOpen} onHide={handleDetailModalClose}>
                <DetailModalContent>
                    <h2>회원 상세 정보</h2>
                    {selectedUser &&
                        <>
                            {selectedUser.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                                <ProfileRequestPic src={defaultProfilePic} alt="Profile" />
                                :
                                <ProfileRequestPic src={selectedUser.userProfile} alt="Profile" />
                            }
                            <p>이름: {selectedUser.userName}</p>
                            <p>전화번호: {selectedUser.userPhone}</p>
                            <p>이메일: {selectedUser.userEmail}</p>
                            <p>주소: {selectedUser.userAddress}</p>
                        </>
                    }
                    <button onClick={handleDetailModalClose}>닫기</button>
                </DetailModalContent>
            </StyledModal>
            <Footer/>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 700px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px; // 여백 추가
  margin-left: 3rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  height: 500px;
  width: 1000px;
  flex-direction: column;
  align-items: center;
  margin-top: 19rem;
  margin-bottom: 2rem;
`;

const NewsTitle = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  align-items: center;
`

const ReviewPageTitle = styled.div`
  font-size: 44px;
  font-weight: 500;
  font-family: 'omyu_pretty';
`;

const RightNewsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;
`;

const Button = styled.button`
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkorange;
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

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 5px 10px;
    margin-left: 10px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const ApplicantsList = styled.div`
    margin-top: 20px;
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
`;

const DetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  font-size: 18px;
  text-align: center;
`;

const ProfileRequestPic = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const NoApproveButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ff6b6b;
  color: white;
  &:hover {
    background-color: #ff4747;
  }
`;

const ApproveButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: green;
  color: white;
  &:hover {
    background-color: darkgreen;
  }
`;

export default ReviewPage;

export const fetchReviewsData = async () => {
    try {
        // 리뷰 데이터 가져오기
        const reviewResponse = await axios.get('http://localhost:8050/api/reviews');
        return reviewResponse.data.sort((a, b) => b.reviewLikeCount - a.reviewLikeCount);
    } catch (error) {
        console.error('Error fetching reviews and comment counts:', error);
    }
};