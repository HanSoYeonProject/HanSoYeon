import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import navigate from "../Components/Navigate";
import {useNavigate} from "react-router-dom";
const AnnouncementListPage = (props) => {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    //페이지 시작번호
    const [currentPage, setCurrentPage] = useState(1);
    //최대 5개까지만 목록에 표시
    const itemsPerPage = 5;
    //글 작성 버튼 클릭시 작성페이지로 이동
    const WritingNews = () => {
        navigate("/WritingNewsPage");
    }
    // 전체 공지사항 목록에서 현재 페이지에 표시할 목록만 추출
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = announcements.slice(indexOfFirstItem, indexOfLastItem);
    // 글 번호 고유Id값
     // 글 제목 클릭시 상세내용 페이지 이동
    const viewAnnouncement = (annoId) => {
        //고유 Id값 갖고 이동
        navigate(`/AnnouncementContent/${annoId}`);
    };


    //글 목록 띄우기
    useEffect(() => {
        // API 호출을 통해 공지사항 목록 가져오기
        fetch('http://localhost:8050/api/announcements')
            .then(response => response.json())
            .then(data => {
                // 받아온 목록을 오름차순으로 정렬
                const reversedAnnouncements = [...data].reverse();
                setAnnouncements(reversedAnnouncements);
            })
            .catch(error => console.error('Error fetching announcements:', error));
    }, []);

    // 페이지 번호 클릭 시 호출되는 함수
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
                    <BottomTitle>
                        {currentItems.map((announcement) => (
                            <BottomContent key={announcement.anno_id}>
                            <h3 style={{flex: '1', marginTop: "1rem",fontSize:'20px',fontWeight:'700', display: "flex",justifyContent:'center', color: "#747474"}}>{announcement.anno_id}</h3>
                            <button style={{flex: '3', marginTop: "1rem",fontSize:'20px',fontWeight:'700', display: "flex",justifyContent:'center', color: "#747474",border: 'none', backgroundColor:'white'}} onClick={() => viewAnnouncement(announcement.anno_id)} >{announcement.anno_title}</button>
                            <h3 style={{flex: '1.3', marginTop: "1rem",fontSize:'20px',fontWeight:'700', display: "flex",justifyContent:'center', color: "#747474"}}>{announcement.anno_regist.substring(0, 10)}</h3>
                            <h3 style={{flex: '0.7', marginTop: "1rem",fontSize:'20px',fontWeight:'700', color: "#747474",justifyContent:'center'}}>{announcement.anno_views}</h3>
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