import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가

import {useCookies} from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import {useUserStore} from "../stores";
import Pagination from '../Components/Pagination';
import Footer from "../Components/Footer";

const RecruitPage = (props) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const userType = cookies.userType;

    const [recruitments, setRecruitments] = useState([]);
    const [isCompany, setIsCompany] = useState(false);
    const [detailData, setDetailData] = useState(null);

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 변경: 페이지당 아이템 개수를 8로 설정

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = recruitments.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //라디오버튼
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }
    // 라디오 버튼 상태
    const [selectedContentType, setSelectedContentType] = useState("12");
    //글 목록 띄우기
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
                    setIsCompany(true)
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

    useEffect(() => {
        let blacklistedProviders = [];
        if (user && userType !== "company") {
            axios.get(`http://localhost:8050/api/blacklists/user/${user.userId}`)
                .then(response => {
                    blacklistedProviders = response.data.data.map(blacklist => blacklist.provider.providerId);
                })
                .then(() => {
                    axios.get('http://localhost:8050/api/recruitments')
                        .then(response => {
                            // 받아온 공고 목록에서 블랙리스트에 있는 기업의 공고 제외
                            const filteredRecruitments = response.data.filter(recruitment =>
                                !blacklistedProviders.includes(recruitment.providers)
                            ).reverse();
                            setRecruitments(filteredRecruitments);
                        })
                        .catch(error => console.error('Error fetching recruitments:', error));
                })
                .catch(error => console.error('Error fetching blacklisted providers:', error));
        }else {
            // 회사 사용자의 경우 블랙리스트 필터링 없이 모든 공고 표시
            axios.get('http://localhost:8050/api/recruitments')
                .then(response => {
                    const reversedRecruitments = [...response.data].reverse();
                    setRecruitments(reversedRecruitments);
                })
                .catch(error => console.error('Error fetching recruitments:', error));
        }
    }, [user]);


    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    // 글 제목 클릭시 상세내용 페이지 이동
    const viewRecruitment = async (Id) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/recruitments/${Id}`);
            setDetailData(response.data); // 가져온 데이터를 state에 저장
            navigate(`/recruit/${Id}`);
            console.log("111"+response);
        } catch (error) {
            console.error('Error fetching or updating recruitmnet:', error);
        }
    };

    //글쓰기 버튼
    const WritingBtn = () => {
        navigate("/recruit/write")
    }

    const handleHistoryApplication = () => {
        navigate("/recruitHistory")
    }


    // 라디오 버튼 UI
    const renderRadioButtons = () => {
        const contentTypeOptions = [
            { label: "# 숙소", value: "12" },
            { label: "# 농업", value: "14" },
            { label: "# 1주일 이내 모집", value: "32" },
            { label: "# 2주일 이내 모집", value: "38" },
            { label: "# 10만원이상", value: "39" }
        ];

        return (
            <div style={{display:"flex", flexDirection:"row",backgroundColor:""}}>
                {contentTypeOptions.map((option, index) => (
                    <RadioButtonLabel key={index}>
                        <RadioButton
                            type="radio"
                            name="contentType"
                            value={option.value}
                            onChange={() => setSelectedContentType(option.value)}
                        />
                        <RadioButtonSpan>{option.label}</RadioButtonSpan>
                    </RadioButtonLabel>
                ))}
            </div>
        );
    };
    return (
        <Container>
            <TopContainer>
                <MoTopContainer>모집 일정</MoTopContainer>
                <MoBottomContainer>앞으로의 일정</MoBottomContainer>
            </TopContainer>
            <AlgoContainer>
                <SmallAlgoContainer>
                    <RadioContainer>
                        {renderRadioButtons()}
                        {isCompany ?
                            null
                            :
                            <WritingButton onClick={handleHistoryApplication}>신청 내역</WritingButton>
                        }
                        {isCompany && user.providerApproval === "true" ?
                            <WritingButton onClick={WritingBtn}>글 쓰기</WritingButton>
                            :
                            null
                        }
                    </RadioContainer>
                </SmallAlgoContainer>
            </AlgoContainer>
            <Bottom>
                {currentItems.map((recruitments) => (
                    <BottomContent key={recruitments.job_id}>

                        <BottomMain  style={{cursor: "pointer"}} onClick={() => viewRecruitment(recruitments.job_id)}
                                     onMouseOver={(e) => (e.target.style.textDecoration="underline")}
                                     onMouseOut={(e) => (e.target.style.textDecoration="none")}>
                            <ImgContainer>
                                <img
                                    src={recruitments.image[0]}
                                    alt="Image"
                                    style={{display: "flex",height: "250px",justifyContent: "center", alignItems: "center",borderRadius:"10px"}}
                                />
                            </ImgContainer>
                            <TitleContainer>
                                <h3
                                    style={{ display: "flex",flex: "2",marginTop: "1rem", fontSize: '24px', fontWeight: 'bold', color: "#747474", justifyContent:"center", alignItems: "center"}}>
                                    {recruitments.title.length > 25
                                        ? `${recruitments.title.substring(0, 25)}...`
                                        : recruitments.title}
                                </h3>
                                <h3 style={{ display: "flex",flex: "2", fontSize: '22px', fontWeight: '600', color: '#747474', justifyContent: "center", alignItems: "center"}}>{recruitments.region} {recruitments.address}</h3>
                                <h4 style={{ display: "flex",flex: "1", fontSize: "18px", fontWeight: "600", color: "#747474", justifyContent: "center", alignItems: "center"}}>
                                    {recruitments.startDate} ~ {recruitments.endDate}
                                </h4>
                            </TitleContainer>
                        </BottomMain>
                    </BottomContent>
                ))}
            </Bottom>
            <PaginationContainer>
                <Pagination
                    totalPages={Math.ceil(recruitments.length / itemsPerPage)}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </PaginationContainer>

            <Footer/>
        </Container>

    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
`
const TopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  flex-direction: column;
  height: auto;  // 높이를 자동으로 조정
  margin-top: 8rem;
  justify-content: center;
  align-items: center;
`;
const MoTopContainer = styled.div`
  display: flex;
  font-size: 48px;
  font-weight: 700;
  width: 100%;
`
const RadioButtonSpan = styled.span`
  display: flex;
`;

const MoBottomContainer = styled.div`
  display: flex;
  font-size: 20px;
  margin-top: 1rem;
  width: 100%;
`
const AlgoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
`
const SmallAlgoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  border-radius: 10px;
`
const RadioContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  font-size: 14px;
  flex-direction: row; // 가로로 배치
  justify-content: space-between;
  align-items: center; // 세로 중앙 정렬
`
const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 40px;
  margin: 5px;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid #ddd;
  cursor: pointer;
  font-weight: 500;
  flex-direction: row;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const RadioButton = styled.input`
  display: none;

  &:checked + span {
    color: #0000ff;
    font-weight: bold;
    border-color: #4CAF50;
  }
`;
const Bottom = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: -1rem;
  width: 80%;
  margin-bottom: 1rem;
  max-height: 100vh; /* Increase the max-height value */
  background-color: #f0f0f0;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BottomContent = styled.div`
  border-radius: 10px;
  border: 2px solid #d6d6d6;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: background-color 0.1s ease;
  height: 100%; /* Increase the height to 100% */

  &:hover {
    background-color: #eee;
  }

  h3,
  h4 {
    font-size: 18px;
    margin: 0;
  }

  img {
    width: 100%;
    height: 60%;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 1s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;


const BottomMain = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
  border: 2px solid #d6d6d6;
  width: 100%;
  height:100%; /* Increase the height to 100% */
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: #eee;
  }

  h3,
  h4 {
    font-size: 10px;
    transition: background-color 0.3s ease;
  }
  img {
    width: 100%;
    height: 50%;
    border-radius: 10px;
    transition: transform 1s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex: 5;
  height: 100px;
`
const WritingButton = styled.button`
  width: 300px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 700;
`;

const PaginationContainer = styled.div`
`;
const Upimage = styled.div`
  display: flex;
  flex : 1;
  height: 100px;
  align-items: center;
  width: 100%; /* Change to 100% to take the full width */
  margin-bottom: -25px;
  object-fit: cover; /* 이미지 비율 유지를 위한 설정 */
`;
const Footer1Container = styled.div`
  display: flex;
  flex : 3;
`
const Footer2Container = styled.div`
  display: flex;
  height: 100px;
  flex : 7;
  margin-bottom: -50px;
`

const Footer1Image = styled.div`
  display: flex;
  img {
    width: 50px;
    height: auto;
  }
`;

const Footer2Image = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  img {
    width: 60px;
    height: auto; /* 높이 자동 조절 */
  }
`;
const Aa = styled.div`
  height: 50px;
  flex: 5;
  display: flex;
  justify-content: flex-start;
  margin-top: -1.3rem;
`
const Bb = styled.div`
  flex: 5;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  margin-top: -3.5rem;
`



export default RecruitPage;