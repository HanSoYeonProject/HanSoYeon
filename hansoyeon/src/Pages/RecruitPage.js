import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가

import {useCookies} from "react-cookie";
import axios from "axios";
import styled from "styled-components";

const RecruitPage = () => {
    const navigate = useNavigate();
    const [cookies, sestCookie, removeCookie] = useCookies(['token']);
    const [recruitments, setRecruitments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = recruitments.slice(indexOfFirstItem, indexOfLastItem);
    const [isAdmin, setIsAdmin] = useState(false);
    const [detailData, setDetailData] = useState(null);
    //라디오버튼
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }
    // 라디오 버튼 상태
    const [selectedContentType, setSelectedContentType] = useState("12");
    //글 목록 띄우기
    useEffect(() => {
        axios.get('http://localhost:8050/api/recruitments')
            .then(response => {
                // 받아온 목록을 오름차순으로 정렬
                const reversedRecruitments = [...response.data];
                setRecruitments(reversedRecruitments);
                console.log(reversedRecruitments);

            })
            .catch(error => console.error('Error fetching recruitments:', error));
    }, []);

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

    //admin구분
    useEffect(() => {
        axios.get('http://localhost:8050/api/auth/currentUser', {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                const user = response.data;
                const isAdminUser = user.userId === 'admin';
                setIsAdmin(isAdminUser);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
                if (error.response) {
                    console.error('Status Code:', error.response.status);
                    console.error('Response Data:', error.response.data);
                }
            });
    }, []);
//이미지 가져오기
    function getImageMimeType(imageData) {
        if (!imageData) {
            return '';  // or any default MIME type you want to use when imageData is null
        }

        const mimeType = imageData.split(';')[0].split(':')[1];
        return mimeType;
    }
    //글쓰기 버튼
    const WritingBtn = () => {
        navigate("/recruit/write")
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
            <div style={{display:"flex", flexDirection:"row"}}>
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
                    </RadioContainer>
                </SmallAlgoContainer>
            </AlgoContainer>
            <Bottom>
                {currentItems.map((recruitments) => (
                    <BottomContent key={recruitments.job_id}>
                        <BottomMain>
                            <img
                                src={recruitments.image}
                                alt="Image"
                                style={{display: "flex",flex:"6",width: '100%',height: "100px",justifyContent: "center", alignItems: "center" }}
                            />
                            <h3 style={{flex: '1', marginTop: "1rem", fontSize: '30px', fontWeight: '700', color: "#747474", justifyContent: 'center'}} onClick={() => viewRecruitment(recruitments.job_id)}>{recruitments.title}</h3>
                            <h3 style={{flex: '1', marginTop: "1rem", fontSize: '20px', fontWeight: '700', color: "#747474", justifyContent: 'center'}}>{recruitments.content}</h3>
                            <h4 style={{flex: '1', marginTop: "1rem", fontSize: '15px', fontWeight: '700', color: "#747474", justifyContent: 'center'}}>{recruitments.startDate} ~ {recruitments.endDate}</h4>
                        </BottomMain>
                    </BottomContent>
                ))}
            </Bottom>
            <WritingButton onClick={WritingBtn}>글 쓰기</WritingButton>

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
  margin-top: 2rem;
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
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f5f5; // 박스의 배경색
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1); // 박스에 그림자 효과 추가
`
const RadioContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;

  font-size: 20px;
  flex-direction: row; // 가로로 배치
  justify-content: flex-start; // 가운데 정렬
  align-items: center; // 세로 중앙 정렬
`
const RadioButtonLabel = styled.label`
  display: flex;
  background-color: #f0f0f0;
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
  display: flex;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  margin-top: 1rem;
  height: auto;
  width: 80%;
`;

const BottomContent = styled.div`
  flex: 1;
  flex-basis: calc(25% - 10px); /* 25% 너비로 조절, 간격을 제외한 너비 계산 */
  margin: 5px; /* 각 요소 사이의 간격 조절 */
  box-sizing: border-box; /* 내부 여백 및 테두리를 요소의 크기에 포함시킵니다. */
`;

const BottomMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  border: 2px solid #d6d6d6;
  width: 100%; /* 내용이 100% 너비를 가지도록 설정 */
  height: 300px;
  h4 {
    font-size: 10px;
  }
`;

const WritingButton = styled.button`
  margin-top: 2rem;
  width: 300px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 700;
`;
export default RecruitPage;
