import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";
import axios from "axios";
import defaultProfilePic from '../imgs/default_profile.png';

const CompanyMatchingPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const [announcements, setAnnouncements] = useState([]);

    const [applicants, setApplicants] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


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

    useEffect(() => {
        if (user && cookies.token) {
            fetchJobAnnouncements();
        }
    }, [user]);

    const fetchJobAnnouncements = async () => {
        try {
            const response = await axios.get(`http://localhost:8050/api/recruitments`, {
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

    const handleJobView = (jobId) => {
        navigate(`/recruit/${jobId}`);
    };

    const fetchApplicants = async (jobId) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/matchings/recruitments/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            if (response.data && response.data.data) {
                console.log(response.data)
                setApplicants(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching applicants:", error);
            setApplicants([]);
        }
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

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const acceptMatching = async (recruitmentId, userId) => {
        const confirmSelection = window.confirm(`${userId}님을 선발하시겠습니까?`);
        if (confirmSelection) {
            try {
                const response = await axios.put('http://localhost:8050/api/matchings', {
                    recruitmentId,
                    userId
                }, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });

                if (response.status === 200) {
                    alert('선발 처리가 완료되었습니다.');
                    // Refresh the applicant list or handle the UI update
                    fetchApplicants(recruitmentId);
                }
            } catch (error) {
                console.error("Error accepting the matching:", error);
                alert('선발 처리 중 오류가 발생했습니다.');
            }
        }
    };

    const cancelApproval = async (recruitmentId, userId) => {
        const confirmCancel = window.confirm(`${userId}님의 선발을 취소하시겠습니까?`);
        if (confirmCancel) {
            try {
                const response = await axios.put('http://localhost:8050/api/matchings/cancelApproval', {
                    recruitmentId,
                    userId
                }, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });

                if (response.status === 200) {
                    alert('선발 취소 처리가 완료되었습니다.');
                    fetchApplicants(recruitmentId);
                }
            } catch (error) {
                console.error("Error canceling the approval:", error);
                alert('선발 취소 처리 중 오류가 발생했습니다.');
            }
        }
    };

    const handleDeleteAllMatchings = async (recruitmentId) => {
        const confirmDeletion = window.confirm(`공고를 정말 삭제하시겠습니까?`);
        if (confirmDeletion) {
            try {
                await axios.delete(`http://localhost:8050/api/matchings/byRecruitment/${recruitmentId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                await axios.delete(`http://localhost:8050/api/recruitments/${recruitmentId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                alert('공고가 삭제되었습니다.');
                if (user && cookies.token) {
                    fetchJobAnnouncements(user.providerId);
                }
            } catch (error) {
                console.error("Error deleting all matchings:", error);
                alert('매칭 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const hasDatePassed = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        return end < today;
    };

    const pastAnnouncements = announcements.filter(announcement => hasDatePassed(announcement.endDate));
    const upcomingAnnouncements = announcements.filter(announcement => !hasDatePassed(announcement.endDate));

    return (
        <Container>
            <h2>신청 가능 공고</h2>
            {upcomingAnnouncements.map(announcement => (
                <AnnouncementCard
                    key={announcement.job_id}
                >
                    <AnnouncementTitle onClick={() => handleJobView(announcement.job_id)}>
                        <h3>{announcement.title}</h3>
                    </AnnouncementTitle>
                    <div className="buttons">
                        <button onClick={() => handleCheckApplicants(announcement)}>신청자 확인</button>
                        <button onClick={() => handleDeleteAllMatchings(announcement.job_id)}>공고 삭제</button>
                    </div>
                </AnnouncementCard>
            ))}
            <h2>지난 공고</h2>
            {pastAnnouncements.map(announcement => (
                <AnnouncementCard
                    key={announcement.job_id}
                >
                    <AnnouncementTitle onClick={() => handleJobView(announcement.job_id)}>
                        <h3>{announcement.title}</h3>
                    </AnnouncementTitle>
                    <div className="buttons">
                        <button onClick={() => handleCheckApplicants(announcement)}>신청자 확인</button>
                        <button onClick={() => handleDeleteAllMatchings(announcement.job_id)}>공고 삭제</button>
                    </div>
                </AnnouncementCard>
            ))}
            {isModalOpen && (
                <Modal>
                    <ModalContent>
                        <ModalHeader>
                            <h2>{selectedAnnouncement.title} 신청 명단</h2>
                            <button onClick={handleModalClose}>닫기</button>
                        </ModalHeader>
                        <ApplicantsList>
                            {applicants.length > 0 ? (
                                <StyledTable>
                                    <thead>
                                    <TableRow>
                                        <TableHeader>이름</TableHeader>
                                        <TableHeader>전화번호</TableHeader>
                                        <TableHeader>승인상태</TableHeader>
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
                                                {applicant.status === "REQUESTED" ?
                                                    <NoApproveButton onClick={() => acceptMatching(applicant.recruitment.jobId, applicant.user.userId)}>
                                                        비승인
                                                    </NoApproveButton>
                                                    :
                                                    <ApproveButton onClick={() => cancelApproval(applicant.recruitment.jobId, applicant.user.userId)}>
                                                        승인
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
                </Modal>
            )}
            {isDetailModalOpen && selectedUser && (
                <DetailModal>
                    <DetailModalContent>
                        <h2>회원 상세 정보</h2>
                        {selectedUser.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                            <ProfileRequestPic src={defaultProfilePic} alt="Profile" />
                            :
                            <ProfileRequestPic src={selectedUser.userProfile} alt="Profile" />
                        }
                        <p>이름: {selectedUser.userName}</p>
                        <p>전화번호: {selectedUser.userPhone}</p>
                        <p>이메일: {selectedUser.userEmail}</p>
                        <p>주소: {selectedUser.userAddress}</p>
                        {/*다른거 출력하려면 ㄱㄱ*/}
                        <button onClick={() => setIsDetailModalOpen(false)}>닫기</button>
                    </DetailModalContent>
                </DetailModal>
            )}
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; 
  padding: 20px;
`;


const AnnouncementCard = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  background: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 60%;

  .title {
    margin-right: auto; 
  }

  .buttons {
    display: flex;
    gap: 10px; 
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0;
    color: #333;
  }

  button {
    padding: 5px 10px;
  }
`;

const AnnouncementTitle = styled.div`
  cursor: pointer;
`

const ApplicantsList = styled.div`
    margin-top: 20px;
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
`;

const Modal = styled.div`
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
`;

const ProfileRequestPic = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export default CompanyMatchingPage;