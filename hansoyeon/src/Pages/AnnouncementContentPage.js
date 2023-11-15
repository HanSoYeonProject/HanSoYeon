import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {responsivePropType} from "react-bootstrap/createUtilityClasses";

const AnnouncementContentPage = () => {
    const { anno_id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const writer = '관리자';
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedContent, setModifiedContent] = useState('');
    const [updateFlag, setUpdateFlag] = useState(false);

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
    //삭제 물어보는메서드
    const confirmDelete = () => {
        const isConfirmed = window.confirm('삭제하시겠습니까?');
        if (isConfirmed) {
            deleteAnnouncement();
        }
    };

    //삭제 메서드
    const deleteAnnouncement = () => {
        fetch(`http://localhost:8050/api/announcements/${anno_id}` , {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete announcement');
                }
                alert("삭제 되었습니다.");
                navigate("/announcementlist");
            })
            .catch((error) => {
                console.error('Error deleting announcement:', error);
                // 에러 처리 로직 추가
            });
    };
    //수정 메서드
    const saveEdit = () => {

        const modifiedData = {
            anno_content: modifiedContent,  // 실제 수정할 내용으로 대체
        };
        fetch(`http://localhost:8050/api/announcements/${anno_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifiedData),
        })

            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to modify announcement');
                }
                alert("수정 되었습니다.");
                setUpdateFlag((prevFlag) => !prevFlag);
            })
            .catch((error) => {
                console.error('Error modifying announcement:', error);
                // 에러 처리 로직 추가
            });
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

    const fetchAnnouncement = () => {
        fetch(`http://localhost:8050/api/announcements/${anno_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch announcement content: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setAnnouncement(data);
                setModifiedContent(data.anno_content); // 수정된 내용도 초기화
                console.log('Announcement Content: ', data);
            })
            .catch((error) => {
                console.error('Error fetching announcement content:', error);
                // 에러 처리 로직 추가
            });
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [anno_id]);


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
                {isEditing ? (
                    // 수정 모드일 때 저장 및 취소 버튼 표시
                    <>
                        <SaveButton onClick={saveEdit}>저장</SaveButton>
                        <CancelButton onClick={cancelEdit}>취소</CancelButton>
                    </>
                ) : (

                    // 수정 모드가 아닐 때 수정 버튼 표시
                    <EditButton onClick={activateEditMode}>수정</EditButton>
                )}
                <DeleteButton onClick={confirmDelete}>삭제</DeleteButton>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 700px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 500px;
  background-color: #f8f8f8; /* Light gray background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  padding: 20px; /* Add some padding */
  margin-top: 20px; /* Add space at the top */
`;

const NoticeTitleContainer = styled.div`
  font-size: 40px;
  font-weight: 700;
  width: 800px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;
const EditButton = styled.button`
  background-color: #007bff;
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
  margin-left: 2rem;
  margin-right: 2rem;
  justify-content: space-between;
`;

const WriterContainer = styled.div`
  display: flex;
  font-size: 20px;
  flex: 3;
  align-items: center;
  margin-left: 1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 4;
  font-size: 20px;
  margin-left: 1rem;
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
  margin-right: 1rem;
`;

const DeleteButton = styled.button`
  background-color: #ff3b30; /* Red color */
  border: none;
  color: white;
  border-radius: 10px;
  margin-right: 1rem;
  width: 80px;
  height: 30px;
`;

const ModifyButton = styled.button`
  background-color: #007bff; /* Blue color */
  border: none;
  color: white;
  border-radius: 10px;
  width: 80px;
  height: 30px;
`;

export default AnnouncementContentPage;
