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
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = recruitments.slice(indexOfFirstItem, indexOfLastItem);
    const [isAdmin, setIsAdmin] = useState(false);
    const [detailData, setDetailData] = useState(null);

    //글 목록 띄우기
    useEffect(() => {
        axios.get('http://localhost:8050/api/recruitments')
            .then(response => {
                // 받아온 목록을 오름차순으로 정렬
                const reversedRecruitments = [...response.data];
                setRecruitments(reversedRecruitments);
                console.log(reversedRecruitments)
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

    //이미지 가져오기
    function getImageMimeType(imageData) {
        if (!imageData) {
            return '';  // or any default MIME type you want to use when imageData is null
        }

        const mimeType = imageData.split(';')[0].split(':')[1];
        return mimeType;
    }
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
    return (
        <Container>
            <TopContainer>
                {/*<p className="text-3xl font-medium text-red-900">asd</p>*/}
                {currentItems.map((recruitments) => (
                    <BottomContent key={recruitments.job_id}>
                        <button style={{flex: '1', marginTop: "1rem",fontSize:'20px',fontWeight:'700', display: "flex",justifyContent:'center', color: "#747474"}} onClick={() => viewRecruitment(recruitments.job_id)}>{recruitments.job_id}</button>
                        <h3 style={{flex: '0.7', marginTop: "1rem",fontSize:'20px',fontWeight:'700', color: "#747474",justifyContent:'center'}}>{recruitments.content}</h3>
                        <h3 style={{flex: '0.7', marginTop: "1rem",fontSize:'20px',fontWeight:'700', color: "#747474",justifyContent:'center'}}>
                            <img
                                src={`data:${getImageMimeType(recruitments.image)};base64, ${recruitments.image}`}
                                alt="Image"
                                style={{ width: '100px', height: '100px' }}
                            />

                        </h3>
                    </BottomContent>
                ))}
            </TopContainer>
        </Container>

    );
};
const Container = styled.div`
    background-color: #61dafb;
    display: flex;
    flex-direction: column;
    height: 100vh;
  
`
const TopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;  // 여기에 추가
  height: 300px;
  background-color: yellow;
`

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;  // 여기에 수정
  height: 50px;
  width: 50%;  // 여기에 추가
  box-sizing: border-box;  // 여기에 추가
  padding: 10px;  // 여기에 추가
  border-bottom: 1px solid skyblue;
`

export default RecruitPage;