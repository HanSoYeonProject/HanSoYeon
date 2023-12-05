import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import styled from 'styled-components';
import noImage from '../imgs/noImage.png';
import Footer from '../Components/Footer';

const RecommendPage = () => {
    const [touristSpots, setTouristSpots] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData(keyword, pageNo);
    }, [pageNo]);

    const fetchData = async (searchKeyword, pageNo, retryCount = 0) => {
        try {
            const encodedServiceKey = encodeURIComponent('YRUALCBQQWvU6w/tG7ZkUtWtjAeaO9bJjyummGjvfF9SjR0QYO+CRveierZlwe97v5toXybLb6aoFCl1sZ8q4Q==');
            const encodedKeyword = encodeURIComponent(searchKeyword || '강원');
            const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${encodedServiceKey}&MobileApp=AppTest&MobileOS=ETC&pageNo=${pageNo}&numOfRows=12&listYN=Y&keyword=${encodedKeyword}`;
            const response = await axios.get(url);

            const parser = new XMLParser();
            const jsonObj = parser.parse(response.data);

            if (jsonObj && jsonObj.response && jsonObj.response.body && jsonObj.response.body.items) {
                const spots = jsonObj.response.body.items.item;
                setTouristSpots(spots);
                setTotalPages(jsonObj.response.body.totalCount);
            } else {
                if (retryCount < 3) {
                    fetchData(searchKeyword, pageNo, retryCount + 1);
                } else {
                    console.error('Invalid API response');
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
        <Container>
            <SearchContainer>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="지역 검색"
                />
                <SearchButton onClick={() => fetchData(keyword, 1)}>검색</SearchButton>
            </SearchContainer>
            <GridContainer>
                {Array.isArray(touristSpots) && touristSpots.length > 0 ? (
                    touristSpots.map((spot, index) => (
                        <GridItem key={index}>
                            <SpotTitle>{spot.title}</SpotTitle>
                            {spot.firstimage ? (
                                <SpotImage src={spot.firstimage} alt={spot.title} />
                            ) : (
                                <SpotImage src={noImage} alt={spot.title} />
                            )}
                        </GridItem>
                    ))
                ) : (
                    <LoadingMessage>Loading...</LoadingMessage>
                )}
            </GridContainer>
            <PageButtons>
                <PageButton onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))} direction="prev">
                    이전
                </PageButton>
                <PageInfo>
                    {pageNo} 페이지 / 총 {totalPages} 페이지
                </PageInfo>
                <PageButton onClick={() => setPageNo((prev) => prev + 1)} direction="next">
                    다음
                </PageButton>
            </PageButtons>
            <StyledFooter>
                <Footer/>
            </StyledFooter>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  margin-bottom: -20px; /* Remove the margin at the bottom */
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #0095f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  flex-grow: 1;
`;

const GridItem = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  overflow: hidden;
`;

const SpotTitle = styled.h3`
  padding: 10px;
  font-size: 18px;
  color: #262626;
`;

const SpotImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #262626;
`;

const PageButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0077cc;
  }
  margin-right: ${(props) => (props.direction === 'next' ? '0' : '15px')};
`;

const PageInfo = styled.div`
  font-size: 16px;
  color: #333;
  margin: 0 15px;
`;


const StyledFooter = styled.div`
  width: 104%;
  display: flex;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default RecommendPage;
