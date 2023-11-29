import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AnnouncementListPage = () => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);

    // 페이지 시작 번호
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지당 표시할 항목 수
    const itemsPerPage = 5;

    // 공지사항 목록 가져오기
    useEffect(() => {
        axios.get('http://localhost:8050/api/announcements')
            .then(response => {
                // 받아온 목록을 역순으로 정렬
                const reversedAnnouncements = [...response.data].reverse();
                setAnnouncements(reversedAnnouncements);
            })
            .catch(error => console.error('Error fetching announcements:', error));
    }, []);

    // 글 작성 페이지로 이동
    const WritingNews = () => {
        navigate("/WritingNewsPage");
    }

    // 공지사항 상세 보기
    const viewAnnouncement = async (annoId) => {
        try {
            await axios.put(`http://localhost:8050/api/announcements/${annoId}/increaseViews`);
            navigate(`/AnnouncementContent/${annoId}`);
        } catch (error) {
            console.error('Error fetching or updating announcement:', error);
        }
    };

    // 현재 페이지에 표시할 목록 추출
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = announcements.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 변경
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <MiddleContainer>
                <AnnouncementTitle>공지사항</AnnouncementTitle>
                <NewsTitle>
                    <SmallNewsTitle>
                        <LeftNewsTitle>한소연 소식</LeftNewsTitle>
                        <RightNewsTitle>
                            <WritingButton onClick={WritingNews}>글 작성</WritingButton>

                        </RightNewsTitle>
                    </SmallNewsTitle>
                </NewsTitle>
                <MainTitle>
                    <TopMainTitle>
                        <h3 style={{ flex: '1', marginTop: "1rem", fontSize: '20px', fontWeight: '700', display: "flex", justifyContent: 'center', color: "#747474" }}>번호</h3>
                        <h3 style={{ flex: '3', marginTop: "1rem", fontSize: '20px', fontWeight: '700', display: "flex", justifyContent: 'center', color: "#747474" }}>제목</h3>
                        <h3 style={{ flex: '1.3', marginTop: "1rem", fontSize: '20px', fontWeight: '700', display: "flex", justifyContent: 'center', color: "#747474" }}>등록일</h3>
                        <h3 style={{ flex: '0.7', marginTop: "1rem", fontSize: '20px', fontWeight: '700', color: "#747474", justifyContent: 'center' }}>조회수</h3>
                    </TopMainTitle>
                    <BottomTitle>
                        {currentItems.map((announcement, index) => (
                            <BottomContent key={announcement.anno_id}>
                                <h3 style={{ flex: '1', marginTop: "1rem", fontSize: '20px', fontWeight: '700', display: "flex", justifyContent: 'center', color: "#747474" }}>{index + 1 + itemsPerPage * (currentPage - 1)}</h3>
                                <button style={{ flex: '3', marginTop: "1rem", fontSize: '20px', fontWeight: '700', display: "flex", justifyContent: 'center', color: "#747474", border: 'none', backgroundColor: 'white' }} onClick={() => viewAnnouncement(announcement.anno_id)} >{announcement.anno_title}</button>
                                <h3 style={{ flex: '1.3', marginTop: "1rem", fontSize: '20px', fontWeight: '700', display: "flex", justifyContent: 'center', color: "#747474" }}>{announcement.anno_regist.substring(0, 10)}</h3>
                                <h3 style={{ flex: '0.7', marginTop: "1rem", fontSize: '20px', fontWeight: '700', color: "#747474", justifyContent: 'center' }}>{announcement.anno_views}</h3>
                            </BottomContent>
                        ))}
                    </BottomTitle>
                </MainTitle>
                <Pagination>
                    {Array.from({ length: Math.ceil(announcements.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                        <PageNumber key={number} onClick={() => paginate(number)}>
                            {number}
                        </PageNumber>
                    ))}
                </Pagination>
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
  background-color: #FFC107;
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
const BottomTitle = styled.div`
  display: flex;
  height: 250px;
  flex-direction: column;

`
const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  border-bottom: 1px solid skyblue;
`

const Pagination = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
`;

const PageNumber = styled.div`
  cursor: pointer;
  margin: 0 0.5rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid #61dafb;
  border-radius: 5px;
  color: #61dafb;
  &:hover {
    background-color: #61dafb;
    color: white;
  }
`;

export default AnnouncementListPage;