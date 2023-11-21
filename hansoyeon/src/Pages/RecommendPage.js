import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const RecommendPage = () => {
    const [touristSpots, setTouristSpots] = useState([]);

    const serviceKey = 'YRUALCBQQWvU6w/tG7ZkUtWtjAeaO9bJjyummGjvfF9SjR0QYO+CRveierZlwe97v5toXybLb6aoFCl1sZ8q4Q==';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const encodedServiceKey = encodeURIComponent(serviceKey);
                const keyword = encodeURIComponent("강원");
                const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${encodedServiceKey}&MobileApp=AppTest&MobileOS=ETC&pageNo=1&numOfRows=10&listYN=Y&keyword=${keyword}`;
                const response = await axios.get(url);

                // fast-xml-parser 객체 생성 및 사용
                const parser = new XMLParser();
                const jsonObj = parser.parse(response.data);

                console.log(jsonObj); // 파싱된 객체 구조 확인

                // 파싱된 데이터에서 필요한 부분 추출
                const spots = jsonObj.response.body.items.item;
                setTouristSpots(spots);
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
                            <h3>{spot.title}</h3>
                            <br/>
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
