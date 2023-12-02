import React, {useEffect, useRef, useState} from 'react';
import axios from "axios"
import styled, { keyframes } from "styled-components";
import logo from "../imgs/logo2.png";
import {Button} from "react-bootstrap";
import {useNavigate, useLocation} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";
import useThrottle from "../Components/useThrottle";
import usePushNotification from "../Components/usePushNotification";

const RecruitApplicationPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const [matchings, setMatchings] = useState([]);
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
            fetchMatchings(user.userId);
        }
    }, [user]);

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
                return endDate >= currentDate;
            });
            console.log(validMatchings)
            setMatchings(validMatchings);
        } catch (error) {
            console.error("Error fetching matchings:", error);
        }
    };

    const handlePrev = () => {
        navigate("/recruit")
    };

    const handleMain = () => {
        navigate("/")
    };

    const handleJobView = (jobId) => {
        navigate(`/recruit/${jobId}`);
    };

    const handleCancelApplication = async (matching) => {
        if (window.confirm("신청을 취소하시겠습니까?")) {
            try {
                const requestBody = {
                    recruitmentId: matching.recruitment.jobId,
                    userId: user.userId
                };

                // 공고 올린 사람의 정보를 가져옵니다.
                const providerResponse = await axios.get(`http://localhost:8050/api/auth/provider/${matching.recruitment.jobProviders}`);
                if (providerResponse.status === 200) {
                    console.log(providerResponse.data);
                    setProviderPhone(providerResponse.data.companyTel);

                    // 신청 취소 요청을 보냅니다.
                    const response = await axios({
                        method: 'delete',
                        url: 'http://localhost:8050/api/matchings',
                        data: requestBody,
                        headers: {
                            Authorization: `Bearer ${cookies.token}`
                        }
                    });

                    fireNotificationWithTimeout('공고 취소 완료', 5000, {
                        body: `[${matching.recruitment.jobTitle}] 취소 완료`
                    });

                    if (response.status === 200) {
                        setMatchings(prevMatchings => prevMatchings.filter(m => m.matchingId !== matching.matchingId));
                        alert("신청이 취소되었습니다.");

                        // SMS 전송 로직
                        try {
                            const smsResponse = await axios.post("http://localhost:8050/api/sms/sendApplicationCancel", {
                                phone: user.userPhone,
                                jobTitle: matching.recruitment.jobTitle
                            });
                            console.log(smsResponse.data);

                            // Provider에게도 SMS 전송
                            const sms2Response = await axios.post("http://localhost:8050/api/sms/sendApplicationCompanyCancel", {
                                phone: providerPhone,
                                jobTitle: matching.recruitment.jobTitle
                            });
                            console.log(sms2Response.data);
                        } catch (smsError) {
                            console.error("SMS 전송 중 오류 발생:", smsError);
                        }
                    }
                }
            } catch (error) {
                console.error("Error cancelling application:", error);
                alert("신청 취소에 실패했습니다.");
            }
        }
    };

    return (
        <StyledContainer>
            <FormBox>
                <Title>공고 신청 내역</Title>
                <LogoImg src={logo} alt="Logo" />
                <SubTitle>{user?.userName}님의 공고신청내역입니다.</SubTitle>
                <MatchingList>
                    {matchings.map(matching => (
                        <MatchingItem
                            key={matching.matchingId}
                            onClick={() => handleJobView(matching.recruitment.jobId)}
                        >
                            <JobTitle>{matching.recruitment.jobTitle}</JobTitle>
                            {matching.status === "REQUESTED" ?
                                <>
                                    <Status>승인 여부: 비승인</Status>
                                    <CancelButton onClick={(e) => {
                                        e.stopPropagation(); // Prevents triggering the onClick of MatchingItem
                                        handleCancelApplication(matching);
                                    }}>
                                        신청 취소
                                    </CancelButton>
                                </>
                                :
                                <Status>승인 여부: 승인</Status>
                            }
                        </MatchingItem>
                    ))}
                </MatchingList>
                <ButtonContainer>
                    <Button variant="success" onClick={handlePrev}
                            style={{marginRight: '0.5rem', marginTop: '2rem'}}>이전</Button>
                    <Button variant="primary" onClick={handleMain}
                            style={{marginTop: '2rem'}}>메인으로</Button>
                </ButtonContainer>
            </FormBox>
        </StyledContainer>
    );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  animation: ${fadeIn} 1s ease-out;
`;

const FormBox = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 450px;
`;

const LogoImg = styled.img`
  height: 24vh;
  width: auto;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
`;

const SubTitle = styled.h6`
  color: #666;
  text-align: center;
  margin: 5px 0;
`;

const ButtonContainer = styled.div`
  
`;

const MatchingList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const MatchingItem = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const JobTitle = styled.h5`
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
`;

const Status = styled.span`
    font-size: 1rem;
    color: #666;
`;

const CancelButton = styled.button`
    padding: 8px 15px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    margin-left: 10px; 
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ff4747;
    }

    &:focus {
        outline: none;
    }
`;


export default RecruitApplicationPage;
