import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import styled from "styled-components";
import noImage from "../imgs/noImage.png"

const RecommendPage = () => {
    const [touristSpots, setTouristSpots] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [pageNo, setPageNo] = useState(1);

    const serviceKey = 'YRUALCBQQWvU6w/tG7ZkUtWtjAeaO9bJjyummGjvfF9SjR0QYO+CRveierZlwe97v5toXybLb6aoFCl1sZ8q4Q==';

    useEffect(() => {
        fetchData(keyword, pageNo);
    }, [pageNo]);

    const fetchData = async (searchKeyword, pageNo, retryCount = 0) => {
        try {
            const encodedServiceKey = encodeURIComponent(serviceKey);
            const encodedKeyword = encodeURIComponent(searchKeyword || "강원");
            const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${encodedServiceKey}&MobileApp=AppTest&MobileOS=ETC&pageNo=${pageNo}&numOfRows=12&listYN=Y&keyword=${encodedKeyword}`;
            const response = await axios.get(url);

            const parser = new XMLParser();
            const jsonObj = parser.parse(response.data);

            if (jsonObj && jsonObj.response && jsonObj.response.body && jsonObj.response.body.items) {
                const spots = jsonObj.response.body.items.item;
                setTouristSpots(spots);
            } else {
                // 유효하지 않은 응답일 경우 재시도
                if (retryCount < 3) { // 최대 3번 재시도
                    fetchData(searchKeyword, pageNo, retryCount + 1);
                } else {
                    console.error("Invalid API response");
                }
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            if (retryCount < 3) {
                fetchData(searchKeyword, pageNo, retryCount + 1);
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="지역 검색"
            />
            <button onClick={() => fetchData(keyword, 1)}>검색</button>
            <GridContainer>
                {Array.isArray(touristSpots) && touristSpots.length > 0 ? (
                    touristSpots.map((spot, index) => (
                        <GridItem key={index}>
                            <h3>{spot.title}</h3>
                            {spot.firstimage && <StyledImage src={spot.firstimage} alt={spot.title} />}
                            {!spot.firstimage && <StyledImage src={noImage} alt={spot.title} />}
                        </GridItem>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </GridContainer>
            <button onClick={() => setPageNo(prev => Math.max(prev - 1, 1))}>이전</button>
            <button onClick={() => setPageNo(prev => prev + 1)}>다음</button>
        </div>
    );
};

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
`;

const GridItem = styled.div`
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

export default RecommendPage;