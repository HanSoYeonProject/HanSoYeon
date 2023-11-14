import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AnnouncementContentPage = () => {
    const { anno_id } = useParams();
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        // API 호출을 통해 해당 글의 내용을 가져오는 로직
        fetch(`http://localhost:8050/api/announcements/${anno_id}`)
            .then((response) => response.json())
            .then((data) => {
                setAnnouncement(data);
                console.log('Announcement Content: ',data);
            })
            .catch((error) => console.error('Error fetching announcement content:', error));
    }, [anno_id]);

    if (!announcement) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{announcement.anno_title}</h2>
            <p>{announcement.anno_content}</p>
            {/* 그 외에 필요한 내용들을 표시 */}
        </div>
    );
};

export default AnnouncementContentPage;
