import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'; // useNavigate 훅 추가
import axios from "axios";
import styled from "styled-components";
import about1 from "../imgs/about1.png";
import about2 from "../imgs/about2.png";
import about3 from "../imgs/about3.png";
import about4 from "../imgs/about4.jpg";
import location from "../imgs/location.png";
import {useUserStore} from "../stores";
import {useCookies} from "react-cookie";

const RecruitViewPage = ( props ) => {
    const { id } = useParams();
    const [isCompanyUser, setIsCompanyUser] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate(); // navigate 함수 초기화
    const [recruitments, setRecruitments] = useState([]);
    const [recruitmentId, setRecruitmentId] = useState('');
    const [job_id, setJobId] = useState('');
    const [userId, setUserId] = useState('');
    const [providerId ,  setProviderId] = useState('');
    const {user, setUser} = useUserStore();
    const userType = cookies.userType;
    const userID = user ? user.userId : '';

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
                    <img src = {about1}/>
                    <img src = {about2}/>
                    <img src = {about3}/>
                    <img src = {about4}/>
                </ImgSmallContainer>
            </ImgContainer>
            <LocationContainer>
                <h2><img src = {location}/> {` ${recruitments.region}`} {recruitments.address}</h2>
            </LocationContainer>
            <TitleContainer>
                <h2>{recruitments.title}</h2>
                {/*<h2>{recruitments.providers}</h2>*/}
            </TitleContainer>
            <ApplyButton onClick={applyBtn}>지원하기</ApplyButton>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ImgContainer = styled.div`
  display: flex;
  height: 300px;
  width: 100%;
  margin-top: 10rem;
  justify-content: center;
`

const ImgSmallContainer = styled.div`
  display: flex;
  width: 98%;
  flex-direction: row;
  
  img {
    width: 20%;
    height: auto;
    margin: 0 auto;
  }
`

const LocationContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
  h2 {
    margin-left: 5rem;
    font-size: 20px;
    color: orangered;
  }
  
  img {
    height: 16px;
    
  }
`
const TitleContainer = styled.div`
  display: flex;
  height: auto;
  margin-top: 1rem;
  
  h2 {
    margin-left: 5rem;
    font-size: 32px;
  }
`
const ApplyButton = styled.button`
`
export default RecruitViewPage;