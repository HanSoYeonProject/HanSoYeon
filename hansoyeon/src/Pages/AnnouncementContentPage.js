import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

const AnnouncementContentPage = () => {
    const { anno_id } = useParams();
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8050/api/announcements/${anno_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch announcement content: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setAnnouncement(data);
                console.log('Announcement Content: ', data);
            })
            .catch((error) => {
                console.error('Error fetching announcement content:', error);
                // 에러 처리 로직 추가
            });
    }, [anno_id]);

    if (!announcement) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h2>{announcement.anno_title}</h2>
            <p>{announcement.anno_content}</p>
            <p>작성자: 관리자</p>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: gray;
  height: 300px;
`

export default AnnouncementContentPage;
