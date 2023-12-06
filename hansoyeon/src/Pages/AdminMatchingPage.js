import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";
import axios from "axios";
import defaultProfilePic from '../imgs/default_profile.png';
import useThrottle from "../Components/useThrottle";
import usePushNotification from "../Components/usePushNotification";
import Footer from "../Components/Footer";

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

    const [providerPhone, setProviderPhone] = useState('');

    const { fireNotificationWithTimeout } = usePushNotification();
    const { throttle } = useThrottle();


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

    const acceptMatching = async (recruitment, user) => {
        const confirmSelection = window.confirm(`${user.userId}님을 선발하시겠습니까?`);
        const userId = user.userId;
        const recruitmentId = recruitment.jobId;
        const userPhone = user.userPhone;

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

                    fireNotificationWithTimeout('매칭 완료', 5000, {
                        body: `[${recruitment.jobTitle}]에 ${user.userName}이 매칭되었습니다. `
                    });

                    fetchApplicants(recruitmentId);

                    const providerResponse = await axios.get(`http://localhost:8050/api/auth/provider/${recruitment.jobProviders}`);
                    if (providerResponse.status === 200) {
                        console.log(providerResponse.data);
                        setProviderPhone(providerResponse.data.companyTel);
                    }

                    // SMS 전송 로직
                    try {
                        const smsResponse = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingComplete", {
                            phone: userPhone,
                            jobTitle: recruitment.jobTitle
                        });
                        console.log(smsResponse.data);

                        // Provider에게도 SMS 전송
                        const sms2Response = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingCompanyComplete", {
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
                alert('선발 처리 중 오류가 발생했습니다.');
            }
        }
    };

    const cancelApproval = async (recruitment, user) => {
        const confirmCancel = window.confirm(`${user.userId}님의 선발을 취소하시겠습니까?`);
        const userId = user.userId;
        const recruitmentId = recruitment.jobId;
        const userPhone = user.userPhone;

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

                    fireNotificationWithTimeout('매칭 취소 완료', 5000, {
                        body: `[${recruitment.jobTitle}]에 ${user.userName}의 매칭이 취소되었습니다. `
                    });

                    fetchApplicants(recruitmentId);

                    const providerResponse = await axios.get(`http://localhost:8050/api/auth/provider/${recruitment.jobProviders}`);
                    if (providerResponse.status === 200) {
                        console.log(providerResponse.data);
                        setProviderPhone(providerResponse.data.companyTel);
                    }

                    // SMS 전송 로직
                    try {
                        const smsResponse = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingCancel", {
                            phone: userPhone,
                            jobTitle: recruitment.jobTitle
                        });
                        console.log(smsResponse.data);

                        // Provider에게도 SMS 전송
                        const sms2Response = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingCompanyCancel", {
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
                alert('선발 취소 처리 중 오류가 발생했습니다.');
            }
        }
    };

    const handleDeleteAllMatchings = async (recruitment) => {
        const confirmDeletion = window.confirm(`공고를 정말 삭제하시겠습니까?`);
        if (confirmDeletion) {
            try {
                await axios.delete(`http://localhost:8050/api/matchings/byRecruitment/${recruitment.job_id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                await axios.delete(`http://localhost:8050/api/recruitments/${recruitment.job_id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                });
                alert('공고가 삭제되었습니다.');
                if (user && cookies.token) {
                    fetchJobAnnouncements(user.providerId);
                }

                fireNotificationWithTimeout('매칭 삭제 완료', 5000, {
                    body: `[${recruitment.title}] 공고가 삭제되었습니다. `
                });

                // SMS 전송 로직
                try {
                    // Provider에게도 SMS 전송
                    const smsResponse = await axios.post("http://localhost:8050/api/sms/sendApplicationMatchingDelete", {
                        phone: user.companyTel,
                        jobTitle: recruitment.title
                    });
                    console.log(smsResponse.data);
                } catch (smsError) {
                    console.error("SMS 전송 중 오류 발생:", smsError);
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

    const pastAnnouncements = announcements.filter(announcement => hasDatePassed(announcement.startDate));
    const upcomingAnnouncements = announcements.filter(announcement => !hasDatePassed(announcement.startDate));

    return (
        <Container>
            <Title>신청 가능 공고</Title>
            {upcomingAnnouncements.map(announcement => (
                <AnnouncementCard
                    key={announcement.job_id}
                >
                    <AnnouncementTitle onClick={() => handleJobView(announcement.job_id)}>
                        <h3>{announcement.title}</h3>
                    </AnnouncementTitle>
                    <div>
                        <Button onClick={() => handleCheckApplicants(announcement)}>신청자 확인</Button>
                        <Button onClick={() => handleDeleteAllMatchings(announcement)}>공고 삭제</Button>
                    </div>
                </AnnouncementCard>
            ))}
            <Title>지난 공고</Title>
            {pastAnnouncements.map(announcement => (
                <AnnouncementCard
                    key={announcement.job_id}
                >
                    <AnnouncementTitle onClick={() => handleJobView(announcement.job_id)}>
                        <h3>{announcement.title}</h3>
                    </AnnouncementTitle>
                    <div>
                        <Button onClick={() => handleCheckApplicants(announcement)}>신청자 확인</Button>
                        <Button onClick={() => handleDeleteAllMatchings(announcement)}>공고 삭제</Button>
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
                                                    (hasDatePassed(selectedAnnouncement.endDate) ?
                                                            <DisabledButton>비승인</DisabledButton> :
                                                            <NoApproveButton onClick={() => acceptMatching(applicant.recruitment, applicant.user)}>
                                                                비승인
                                                            </NoApproveButton>
                                                    )
                                                    :
                                                    (hasDatePassed(selectedAnnouncement.endDate) ?
                                                            <DisabledButton>승인</DisabledButton> :
                                                            <ApproveButton onClick={() => cancelApproval(applicant.recruitment, applicant.user)}>
                                                                승인
                                                            </ApproveButton>
                                                    )
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
            <StyledFooter>
                <Footer />
            </StyledFooter>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-family: 'omyu_pretty';
`

const AnnouncementCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;

const AnnouncementTitle = styled.div`
  cursor: pointer;

  h3 {
    font-size: 1.2em;
    color: #333;
    margin: 0;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  margin-left: 10px;

  &:first-child {
    background-color: #4CAF50;
    color: white;

    &:hover {
      background-color: #45A049;
    }
  }

  &:last-child {
    background-color: #F44336;
    color: white;

    &:hover {
      background-color: #D32F2F;
    }
  }
`;

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

const DisabledButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #cccccc; 
  color: white;
  cursor: not-allowed; 
`;

const StyledFooter = styled.footer`
  width: 100%;
  margin-top: auto; 
`;



export default CompanyMatchingPage;