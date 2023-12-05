import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import about1 from "../imgs/about1.png";
import about2 from "../imgs/about2.png";
import about3 from "../imgs/about3.png";
import about4 from "../imgs/about4.jpg";
import location from "../imgs/location.png";
import {useUserStore} from "../stores";
import {useCookies} from "react-cookie";
import useThrottle from "../Components/useThrottle";
import usePushNotification from "../Components/usePushNotification";
import sunnny from "../imgs/sunnny.png";
import moon from "../imgs/moon.png";
import morning from "../imgs/morning.png";
import carrerPeople from "../imgs/carrerPeople.png";
import together from "../imgs/together.png";
import work from "../imgs/work.png";

const RecruitViewPage = ( props ) => {
    const {isUser, setIsUser} = useState(false);
    const { id } = useParams();
    const [isCompanyUser, setIsCompanyUser] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate(); // navigate 함수 초기화
    const [recruitments, setRecruitments] = useState([]);
    const [isUser, setIsUser] = useState(false);
    const [recruitmentId, setRecruitmentId] = useState('');
    const [job_id, setJobId] = useState('');
    const [userId, setUserId] = useState('');
    const [providerId ,  setProviderId] = useState('');
    const {user, setUser} = useUserStore();
    const userType = cookies.userType;
    const userID = user ? user.userId : '';
    const [hasApplied, setHasApplied] = useState(false);
    const [providerPhone, setProviderPhone] = useState('');

    const { fireNotificationWithTimeout } = usePushNotification();
    const { throttle } = useThrottle();


    //상세 페이지 불러오는 함수
    const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(`http://localhost:8050/api/recruitments/${id}`)
            if (response.status !== 200 ) {
                throw new Error('Failed to fetch announcement content');
            }
            const data = response.data;
            setRecruitments(data);

            console.log('Announcement Content: ', data);


            const providerResponse = await axios.get(`http://localhost:8050/api/auth/provider/${data.providers}`);
            if (providerResponse.status === 200) {
                setProviderPhone(providerResponse.data.companyTel);
            }

        } catch (error) {
            console.error('Error fetching announcement content: ', error);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [id]);

    useEffect(() => {
        if (cookies.token) {
            console.log(userType)
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
                    setUser(fetchedUser);
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
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }
        }
    }, []);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    //공고 지원
    const applyBtn = async () => {
        console.log(recruitments.job_id);
        console.log(user.userId);
        try {
            const response = await axios.post(
                `http://localhost:8050/api/matchings`,
                {
                    recruitmentId: recruitments.job_id,
                    userId: user.userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                alert("정상 신청 되었습니다.");

                navigate(`/recruit`);

                fireNotificationWithTimeout('신청 완료', 5000, {
                    body: `${recruitments.title} 신청 완료`
                });
                try {
                    const smsResponse = await axios.post("http://localhost:8050/api/sms/sendApplicationComplete", {
                        phone: user.userPhone,
                        jobTitle: recruitments.title
                    });
                    console.log(smsResponse.data);
                    const sms2Response = await axios.post("http://localhost:8050/api/sms/sendApplicationCompanyComplete", {
                        phone: providerPhone,
                        jobTitle: recruitments.title
                    });
                    console.log(smsResponse.data);
                    console.log(sms2Response.data);
                } catch (smsError) {
                    console.error("SMS 전송 중 오류 발생:", smsError);
                }
                console.log(recruitments)
                navigate('/recruitApply', { state: { jobDetails: recruitments } });

            }
            // 서버 응답에 대한 처리 (예: 성공 여부에 따라 다른 동작 수행)
            console.log(response.data);

        } catch (error) {
            // 오류 처리
            console.error('API 요청 중 오류 발생: ', error);
        }
    };

    return (
        <Container>
            <ImgContainer>
                <ImgSmallContainer>
                    {recruitments.image && recruitments.image.length >= 4 && (
                        <>
                            <img src={recruitments.image[0]} />
                            <img src={recruitments.image[1]} />
                            <img src={recruitments.image[2]} />
                            <img src={recruitments.image[3]} />
                        </>
                    )}
                </ImgSmallContainer>
            </ImgContainer>
            <LocationContainer>
                <h2><img src = {location}/> {` ${recruitments.region}`} {recruitments.address}</h2>
            </LocationContainer>
            <TitleContainer>
                <h2>{recruitments.title}</h2>
                {/*<h2>{recruitments.providers}</h2>*/}
            </TitleContainer>
            <ScheduleContainer>
                <TopSchedule>모집 일정</TopSchedule>
            </ScheduleContainer>
            <TopMainContainer>
                <TopContainer>
                    <DayContainer>
                        <DayFirstContainer>일정 1</DayFirstContainer>
                        <DayCondContainer>{recruitments.startDate} ~ {recruitments.endDate}</DayCondContainer>
                    </DayContainer>
                    <DeyContainer>
                        <FirstContainer>
                            <FirstLeft>
                                <img src={carrerPeople}/>
                            </FirstLeft>
                            <FirstRight>
                                <FirstTop>
                                    <h2>첫날</h2>
                                </FirstTop>
                                <FirstBottom>
                                    <h2>{recruitments.content}</h2>
                                </FirstBottom>
                            </FirstRight>
                        </FirstContainer>
                        <SecondContainer>
                            <SecondLeft>
                                <img src={work}/>
                            </SecondLeft>
                            <FirstRight>
                                <SecondTop>
                                    <h2>잠시 동안</h2>
                                </SecondTop>
                                <SecondBottom>
                                    <h2>{recruitments.second}</h2>
                                </SecondBottom>
                            </FirstRight>
                        </SecondContainer>
                        <ThirdContainer>
                            <ThirdLeft>
                                <img src={together}/>
                            </ThirdLeft>
                            <FirstRight>
                                <ThirdTop>
                                    <h2>마지막 날</h2>
                                </ThirdTop>
                                <ThirdBottom>
                                    <h2>{recruitments.third}</h2>
                                </ThirdBottom>
                            </FirstRight>
                        </ThirdContainer>
                    </DeyContainer>
                    <MoneyContainer>
                        <h2>총 금액 : {recruitments.money}<br/>10시간 도와드릴경우의 금액입니다.</h2>
                        <h3>※날씨나 당일의 스케줄의 변경에 의해 변동하는 경우가 있습니다.</h3>
                    </MoneyContainer>
                </TopContainer>
            </TopMainContainer>
            <HanSoContainer>
                <HanSoText>
                    한소연 개요
                </HanSoText>
            </HanSoContainer>
            <MainContainer>
                <MainCenterContainer>
                    <MainContentContainer>
                        <HelpContent>도움 내용</HelpContent>
                        <HelpSchedule>{recruitments.schedule}</HelpSchedule>
                    </MainContentContainer>
                    <BackgroundContainer>
                        <HelpContent>한소연 모집배경</HelpContent>
                        <Background>{recruitments.background}</Background>
                    </BackgroundContainer>
                    <FoodContainer>
                        <HelpContent>식사</HelpContent>
                        <FoodDayContainer>
                            <img src = {sunnny} style={{width: '50px', height: '50px'}}/>
                            <h2>조식</h2>
                        </FoodDayContainer>
                        <FoodContent>
                            <h2>{recruitments.morning}</h2>
                        </FoodContent>
                        <FoodDayContainer>
                            <img src = {morning} style={{width: '50px', height: '50px', marginTop:'1rem'}}/>
                            <h2>점심</h2>
                        </FoodDayContainer>
                        <FoodContent>
                            <h2>{recruitments.lunch}</h2>
                        </FoodContent>
                        <FoodDinnerContainer>
                            <img src = {moon} style={{width: '20px', height: '20px', marginLeft:'1rem'}}/>
                            <h2>저녁</h2>
                        </FoodDinnerContainer>
                        <FoodContent>
                            <h2>{recruitments.dinner}</h2>
                        </FoodContent>
                    </FoodContainer>
                    <SoJiPoomContainer>
                        <HelpContent>
                            필요한 소지품, 복장
                        </HelpContent>
                        <HelpBottom>
                            {recruitments.need}
                        </HelpBottom>
                    </SoJiPoomContainer>
                </MainCenterContainer>
            </MainContainer>
            <ButtonContainer>
                {!hasApplied && userType !== "company" && (
                    <ApplyButton onClick={applyBtn}>지원하기</ApplyButton>
                )}
            </ButtonContainer>

        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ImgContainer = styled.div`
  display: flex;
  height: 400px;
  width: 100%;
  margin-top: 1rem;
  justify-content: center;
`

const ImgSmallContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  img {
    width: 24%;
    border-radius: 0.5rem;
    height: auto;
  }
`

const LocationContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  h2 {
    margin-left: 16rem;
    font-size: 24px;
    color: orangered;
  }
  
  img {
    height: 24px;
    
  }
`
const ScheduleContainer = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  justify-content: center;
`
const TitleContainer = styled.div`
  display: flex;
  height: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  h2 {
    margin-left: 16rem;
    font-size: 32px;
  }
`
const TopMainContainer = styled.div`
  display: flex;
  height: 600px;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid orangered;
  background-color: #FDF9EA;
  border-radius: 5px;
  width: 70%;
  height: 600px;
  align-items: center;
`
const TopSchedule = styled.div`
  display: flex;
  height: 50px;
  width: 70%;
  font-size: 24px;
  font-weight: 700;
  align-items: center;
`
const DeyContainer = styled.div`
  display: flex;
  height: 380px;
  background-color: #FDF9EA;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
const FirstContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 120px;
  width: 95%;
  background-color: #FDF9EA;
`
const FirstLeft = styled.div`
  display: flex;
  height: auto;
  width: 8%;
  background-color: #FDF9EA;
  justify-content: center;
  align-items: center;
  img {
    width: 70px;
    height: 70px;
  }
`
const FirstRight = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 92%;
  background-color: #FDF9EA;
`

const FirstTop = styled.div`
  display: flex;
  height: 50px;
  background-color: #FDF9EA;
  width: auto;
  align-items: center;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`
const FirstBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 80px;
  width: auto;
  background-color: #FDF9EA;
  justify-content: flex-start;
  text-align: start;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`

const SecondContainer = styled.div`
  display: flex;
  height: 130px;
  width: 95%;
  background-color: #FDF9EA;
`
const SecondLeft = styled.div`
  display: flex;
  height: auto;
  width: 8%;
  background-color: #FDF9EA;
  justify-content: center;
  align-items: center;
  img {
    margin-left: 5px;
    width: 50px;
    height: 60px;
  }
`
const SecondTop = styled.div`
  display: flex;
  height: 50px;
  background-color: #FDF9EA;
  width: auto;
  align-items: center;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`

const SecondBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  width: auto;
  background-color: #FDF9EA;
  justify-content: flex-start;
  text-align: start;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`
const ThirdContainer = styled.div`
  display: flex;
  height: 100px;
  width: 95%;
  background-color: #FDF9EA;
`
const ThirdLeft = styled.div`
  display: flex;
  height: auto;
  width: 8%;
  background-color: #FDF9EA;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 60px;
  }
`
const ThirdTop = styled.div`
  display: flex;
  height: 40px;
  background-color: #FDF9EA;
  width: auto;
  align-items: center;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`
const ThirdBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 60px;
  width: auto;
  background-color: #FDF9EA;
  justify-content: flex-start;
  text-align: start;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`
const MoneyContainer = styled.div`
    display: flex;
  flex-direction: column;
  width: 95%;
  height: 120px;
  background-color: #FDF9EA;
  border: 1px solid red;
  margin-bottom: 2rem;
  text-align: start;
  h2 {
    margin-left: 1rem;
    margin-top: 1rem;
    font-size: 24px;
  }
  h3 {
    margin-left: 1rem;
    font-size: 20px;
  }
`
const MiddleSchedule = styled.div`
`
const DayContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: blue;
  margin-top: 1rem;
  width: 100%;
  height: 50px;
`
const DayFirstContainer = styled.div`
  display: flex;
  width: 10%;
  height: auto;
  background-color: #FDF9EA;
  font-size: 20px;
  font-weight: 600;
  color: gray;
  justify-content: center;
  align-items: center;
`
const DayCondContainer = styled.div`
    display: flex;
  width: 90%;
  height: auto;
  background-color: #FDF9EA;
  font-size: 24px;
  font-weight: 500;
  color: black;
  align-items: center;
`
const HanSoContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 100%;
  height: 50px;
  justify-content: center;
`

const HanSoText = styled.div`
  width: 70%;
  height: 50px;
  text-align: start;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  align-items: center;
`
const MainContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 800px;
  width: 100%;
  justify-content: center;
  margin-bottom: 1rem;
`
const SoJiPoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FDF9EA;
  border-bottom: 1px solid orangered;
  width: 100%;
  height: 110px;
  justify-content: center;
  align-items: center;
`
const MainCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid orangered;
  border-radius: 5px;
  width: 70%;
  height: auto;
`

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 100%;
  background-color: #FDF9EA;
  align-items: center;
  border-bottom: 1px solid #FBCEB1;
`
const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 220px;
  width: 100%;
  background-color: #FDF9EA;
  align-items: center;
  border-bottom: 1px solid #FBCEB1;
`
const FoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 320px;
  width: 100%;
  background-color: #FDF9EA;
  align-items: center;
  border-bottom: 2px solid #FBCEB1;
  text-align: start;
`
const Background = styled.div`
  display: flex;
  background-color: #FDF9EA;
  width: 95%;
  height: 170px;
  align-items: center;
  text-align: start;
  font-size: 18px;
  font-weight: 500;
`
const HelpContent = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    width: 95%;
    height: 40px;
    font-size: 24px;
    font-weight: 700;
    background-color: #FDF9EA;
`
const HelpBottom = styled.div`
  display: flex;
  background-color: #FDF9EA;
  width: 95%;
  height: 70px;
  align-items: center;
  text-align: start;
  font-size: 24px;
  font-weight: 500;
  
`
const FoodDayContainer = styled.div`
  display: flex;
  width: 95%;
  height: 30px;
  font-size: 20px;
  font-weight: 600;
  background-color: #FDF9EA;
  align-items: center;
  h2 {
    margin-top: 10px;
    font-size: 20px;
  }
`
const FoodContent = styled.div`
  display: flex;
  align-items: center;
  width: 87%;
  height: 70px;
  background-color: #FDF9EA;
  
  h2 {
    font-size: 18px;
  }
`
const FoodDinnerContainer = styled.div`
  display: flex;
  width: 95%;
  height: 30px;
  font-size: 20px;
  font-weight: 600;
  align-items: center;
  h2 {
    margin-top: 10px;
    margin-left: 1rem;
    font-size: 20px;
  }
`
const HelpSchedule = styled.div`
  display: flex;
  width: 95%;
  height: 100px;
  align-items: center;
  text-align: start;
  font-size: 18px;
  font-weight: 500;
`
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
const ApplyButton = styled.button`
  display: flex;
  background-color: #FDF9EA;
  width: 20%;
  border-radius: 10rem;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: 1px solid darkkhaki;
  transition: background-color 0.3s ease; /* 호버 효과를 위한 전환 효과 */

  &:hover {
    background-color: #FCE999; /* 호버 시 배경색 변경 */
    cursor: pointer; /* 호버 시 커서 모양 변경 */
  }
`

export default RecruitViewPage;