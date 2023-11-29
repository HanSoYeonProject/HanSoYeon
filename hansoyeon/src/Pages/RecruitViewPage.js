import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'; // useNavigate 훅 추가
import axios from "axios";
import styled from "styled-components";
import about1 from "../imgs/about1.png";
import about2 from "../imgs/about2.png";
import about3 from "../imgs/about3.png";
import about4 from "../imgs/about4.jpg";
import location from "../imgs/location.png";

const RecruitViewPage = ( props ) => {
    const { id } = useParams();
    const [isCompanyUser, setIsCompanyUser] = useState(false);
    const navigate = useNavigate(); // navigate 함수 초기화
    const [recruitments, setRecruitments] = useState([]);

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
                <h2><img src = {location}/> {` ${recruitments.region}`}</h2>
            </LocationContainer>
            <TitleContainer>
                <h2>{recruitments.title}</h2>
                {/*<h2>{recruitments.providers}</h2>*/}
            </TitleContainer>
            <ApplyButton>
                지원하기
            </ApplyButton>
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