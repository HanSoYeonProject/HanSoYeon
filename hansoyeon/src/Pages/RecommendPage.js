import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecommendPage = () => {
    const [touristSpots, setTouristSpots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/B551011/KorService1', {
                    params: {
                        serviceKey: 'YRUALCBQQWvU6w/tG7ZkUtWtjAeaO9bJjyummGjvfF9SjR0QYO+CRveierZlwe97v5toXybLb6aoFCl1sZ8q4Q==',
                        // 여기에 필요한 기타 파라미터 추가
                    }
                });
                // 데이터 구조에 따라 적절한 경로 설정
                setTouristSpots(response.data.items.item);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {touristSpots.length > 0 ? (
                <ul>
                    {touristSpots.map((spot, index) => (
                        <li key={index}>
                            <h3>{spot.title}</h3> {/* 'title'은 관광지의 제목 필드를 가정 */}
                            <p>{spot.description}</p> {/* 'description'은 설명 필드를 가정 */}
                            {/* 기타 필요한 정보를 표시 */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecommendPage;
