import React from 'react';
import styled from 'styled-components';
import navigate from "../Components/Navigate";
import {useNavigate} from "react-router-dom";
const AnnouncementPage = (props) => {
    const navigate = useNavigate();

    const WritingNews = () => {
        navigate("/WritingNewsPage");
    }
    return (
        <Container>
            <MiddleContainer>
                <AnnouncementTitle>공지사항</AnnouncementTitle>
                <NewsTitle>
                    <SmallNewsTitle>
                        <LeftNewsTitle>한소연 소식</LeftNewsTitle>
                        <RightNewsTitle>
                            <WritingButton onClick={WritingNews}>글 작성</WritingButton>
                            <ExitButton>더 보기 ></ExitButton>
                        </RightNewsTitle>
                    </SmallNewsTitle>
                </NewsTitle>
                <MainTitle>
                    <TopMainTitle>
                        <h3 style={{flex: '1', marginTop: "1rem",fontSize:'20px',fontWeight:'700', display: "flex",justifyContent:'center', color: "#747474"}}>번호</h3>
                        <h3 style={{flex: '3', marginTop: "1rem",fontSize:'20px',fontWeight:'700', display: "flex",justifyContent:'center', color: "#747474"}}>제목</h3>
                        <h3 style={{flex: '1.3', marginTop: "1rem",fontSize:'20px',fontWeight:'700', display: "flex",justifyContent:'center', color: "#747474"}}>등록일</h3>
                        <h3 style={{flex: '0.7', marginTop: "1rem",fontSize:'20px',fontWeight:'700', color: "#747474",justifyContent:'center'}}>조회수</h3>
                    </TopMainTitle>
                </MainTitle>
            </MiddleContainer>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 700px;
  align-items: center;
  justify-content: center;
`

const MiddleContainer = styled.div`
  display: flex;
  height: 500px;
  width: 1000px;
  flex-direction: column;
`
const AnnouncementTitle = styled.div`
  display: flex;
  flex: 1;
  align-items:center;
  font-size: 40px;
  font-weight: 700;
`

const NewsTitle = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  align-items: center;
`
const SmallNewsTitle = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  flex: 1;
`

const LeftNewsTitle = styled.div`
  display: flex;
  flex: 5;
  height: 60px;
  font-size: 20px;
  align-items: center;
  margin-left: 0.5rem;
`

const RightNewsTitle = styled.div`
  display: flex;
  flex: 5;
  height: 60px;
  font-weight: 700;
  align-items: center;
  justify-content: right;
`
const WritingButton = styled.button`
  background-color: skyblue;
  display: flex;
  width: 100px;
  height: 40px;
  text-align: center;
  color: white;
  margin-right: 1rem;
  border-radius: 10px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  border: none;
`

const ExitButton = styled.div`
  display: flex;
  width: 100px;
  height: 40px;
  text-align: center;
  color: white;
  border-radius: 10px;
  background-color: mediumseagreen;
  font-size: 20px;
  float: right;
  align-items: center;
  justify-content: center;
`
const MainTitle = styled.div`
  display: flex;
  flex: 7;
  flex-direction: column;
`
const TopMainTitle = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid hotpink;
  border-top: 2px solid gray;
  height: 50px;
  align-items: center;
`


export default AnnouncementPage;