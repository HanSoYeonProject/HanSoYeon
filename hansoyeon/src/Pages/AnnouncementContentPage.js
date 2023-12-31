import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {responsivePropType} from "react-bootstrap/createUtilityClasses";
import axios from "axios";
import {useCookies} from "react-cookie";
import Footer from "../Components/Footer";

const AnnouncementContentPage = () => {
    const { anno_id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const writer = '관리자';
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedContent, setModifiedContent] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // 수정 버튼 클릭 시 수정 모드 활성화
    const activateEditMode = () => {
        setIsEditing(true);
    };

    // 수정 취소 시 수정 모드 비활성화 및 내용 초기화
    const cancelEdit = () => {
        setIsEditing(false);
        setModifiedContent(announcement.anno_content); // 수정된 내용을 이전 내용으로 초기화
    };

    // 글 내용이 수정될 때마다 상태 업데이트
    const handleContentChange = (e) => {
        setModifiedContent(e.target.value);
    };

    //상세 페이지 불러오는 함수
    const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(`http://localhost:8050/api/announcements/${anno_id}`)
            if (response.status !== 200 ) {
                throw new Error('Failed to fetch announcement content');
            }
            const data = response.data;
            setAnnouncement(data);
            setModifiedContent(data.anno_content);
            console.log('Announcement Content: ', data);
        } catch (error) {
            console.error('Error fetching announcement content: ', error);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [anno_id]);

    //삭제 물어보는메서드
    const confirmDelete = () => {
        const isConfirmed = window.confirm('삭제하시겠습니까?');
        if (isConfirmed) {
            deleteAnnouncement();
        }
    };

    //삭제 메서드
    const deleteAnnouncement = async () => {
        try {
            const response = await axios.delete(`http://localhost:8050/api/announcements/${anno_id}`);
            if (response.status === 200) {
                alert("삭제 되었습니다.");
                navigate("/announcementlist");
            } else {
                throw new Error('Failed to delete announcement');
            }
        } catch(error) {
            console.error('error', error);
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
                console.error('Error fetching user info: ', error);
                if (error.response) {
                    console.error('Status Code: ', error.response.status);
                    console.error('Response Data: ', error.response.data);
                }
            })
    }, []);

    //수정 메서드
    const saveEdit = async () => {
        const modifiedData = {
            anno_content: modifiedContent,
        };
        try {
            const response = await axios.put(`http://localhost:8050/api/announcements/${anno_id}`,modifiedData)

            if (response.status ===200) {
                alert("수정 되었습니다.");
                setUpdateFlag((prevFlag) => !prevFlag);
            } else {
                throw new Error('Failed to modify announcement');
            }
        } catch (error) {
            console.error('Error modifying announcement: ', error);
        }
    };

    useEffect(() => {
        if (updateFlag) {
            setIsEditing(false);
        }
        fetchAnnouncement();
    }, [anno_id, updateFlag]);

    // 수정되었을 때 호출되는 함수
    const handleUpdateFlag = () => {
        setUpdateFlag((prevFlag) => !prevFlag);
    };

    if (!announcement) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <NoticeTitleContainer>공지사항</NoticeTitleContainer>
            <MiddleContainer>
                <Title>
                    <h2>글 제목 : {announcement.anno_title}</h2>
                    <h6>조회수 : {announcement.anno_views}</h6>
                </Title>
                <WriterContainer>
                    <h6>작성자 : {writer} </h6>
                </WriterContainer>
                <ContentContainer>
                    {isEditing ? (
                        // 수정 모드일 때 textarea로 변경
                        <textarea
                            value={modifiedContent}
                            onChange={(e) => setModifiedContent(e.target.value)}
                            rows={10}
                            style={{ width: '100%' }}
                        />
                    ) : (
                        // 수정 모드가 아닐 때는 <p> 태그로 표시
                        <p>{announcement.anno_content}</p>
                    )}
                </ContentContainer>
            </MiddleContainer>
            <ButtonContainer>
                {isAdmin && !isEditing && (
                    <EditButton onClick={activateEditMode}>수정</EditButton>
                )}
                {isAdmin && !isEditing && (
                    <DeleteButton onClick={confirmDelete}>삭제</DeleteButton>
                )}
                {isEditing && (
                    <>
                        <SaveButton onClick={saveEdit}>저장</SaveButton>
                        <CancelButton onClick={cancelEdit}>취소</CancelButton>
                    </>
                )}
            </ButtonContainer>
            <Footer/>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Set minimum height to 100% of the viewport height */
  justify-content: space-between; /* Space between children elements */
  align-items: center;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 500px;
  font-weight: 600;
  background-color: #f8f8f8; /* Light gray background */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Soft shadow */
  padding: 20px; /* Add some padding */
  margin-top: 20px; /* Add space at the top */
  font-family: 'SUITE-Light';
  
`;

const NoticeTitleContainer = styled.div`
  font-size: 40px;
  font-weight: 500;
  width: 900px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 9rem;
  font-family: 'omyu_pretty';
`;
const EditButton = styled.button`
  background-color: #2582fa;
  border: none;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
  margin-right: 1rem;
`;
const Title = styled.div`
  display: flex;
  flex: 1;
  font-size: 20px;
  align-items: center;
  margin-right: 2rem;
  justify-content: space-between;
`;

const WriterContainer = styled.div`
  display: flex;
  font-size: 20px;
  flex: 3;
  align-items: center;
  margin-left: 0.3rem;
  
  h6 {
  font-size: 20px;
}
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 4;
  margin-left: 0.3rem;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 900px;
  justify-content: flex-end;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
  margin-right: 1rem;
`;

const CancelButton = styled.button`
  background-color: #dc3545;
  border: none;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
`;

const DeleteButton = styled.button`
  background-color: tomato; /* Red color */
  border: none;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
`;

const ModifyButton = styled.button`
  background-color: orange; /* Blue color */
  border: none;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
`;

export default AnnouncementContentPage;