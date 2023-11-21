import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import winter from '../imgs/winter.jpg';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import noImage from "../imgs/noImage.png"

const NewPage = (props) => {

    const [activeTab, setActiveTab] = useState(1);
    const [touristSpots, setTouristSpots] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [pageNo, setPageNo] = useState(1);

    const serviceKey = 'YRUALCBQQWvU6w/tG7ZkUtWtjAeaO9bJjyummGjvfF9SjR0QYO+CRveierZlwe97v5toXybLb6aoFCl1sZ8q4Q==';

    useEffect(() => {
        fetchData(keyword, pageNo);
    }, [pageNo]);

    const fetchData = async (searchKeyword, pageNo, retryCount = 0) => {
        try {
            const encodedServiceKey = encodeURIComponent(serviceKey);
            const encodedKeyword = encodeURIComponent(searchKeyword || "서울");
            const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${encodedServiceKey}&MobileApp=AppTest&MobileOS=ETC&pageNo=${pageNo}&numOfRows=12&listYN=Y&keyword=${encodedKeyword}`;
            const response = await axios.get(url);

            const parser = new XMLParser();
            const jsonObj = parser.parse(response.data);

            if (jsonObj && jsonObj.response && jsonObj.response.body && jsonObj.response.body.items) {
                const spots = jsonObj.response.body.items.item;
                setTouristSpots(spots);
                setSearchKeyword(searchKeyword)
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


    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <>
                        <TopContainer>
                            <TopImage className="NewCourse" alt="Title" src={winter} />
                        </TopContainer>
                        <MiddleContainer>
                            <MiddleBottomContainer>
                                <NewCourseContainer>
                                    <NewCourseTitle>신규 코스</NewCourseTitle>
                                </NewCourseContainer>
                            </MiddleBottomContainer>
                        </MiddleContainer>
                        <BottomContainer>
                            <MenuContainer>
                                <MenuTitle>
                                    <TabButton onClick={() => {handleTabClick(1);}} className={activeTab === 1 ? 'active' : ''}>신규 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(2);}} className={activeTab === 2 ? 'active' : ''}>테마별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(3);}} className={activeTab === 3 ? 'active' : ''}>지역별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(4);}} className={activeTab === 4 ? 'active' : ''}>추천 코스</TabButton>
                                </MenuTitle>
                            </MenuContainer>
                            <SmallTitleContainer>
                                <SmallTitle>
                                    <SmallTitleContent>[차 한잔으로 완성되는 휴식, 김포다도박물관]</SmallTitleContent>
                                </SmallTitle>
                                <SmallTag>{/* 이부분에 InputSkill 추가하면됨 */}</SmallTag>
                            </SmallTitleContainer>
                            <ContentContainer>
                                <ContentTitleContainer>
                                    <ContentSmallTitleContainer>모집 일정</ContentSmallTitleContainer>
                                </ContentTitleContainer>
                                <ContentMainContainer>
                                    <ContentMainTextContainer>
                                        <ContentTitle>
                                            <h2>웹 디자이너</h2>
                                            <h3>(경력)</h3>
                                        </ContentTitle>
                                        <ContentMemory>
                                            <h2>이런 일을 해요</h2>
                                            <ul>
                                                <li>11</li>
                                                <li>22</li>
                                                <li>33</li>
                                            </ul>
                                        </ContentMemory>
                                    </ContentMainTextContainer>
                                </ContentMainContainer>
                            </ContentContainer>
                        </BottomContainer>
                    </>
                );
            case 2:
                return (
                    <>
                        <TopContainer>
                            <TopImage className="NewCourse" alt="Title" src={winter} />
                        </TopContainer>
                        <MiddleContainer>
                            <MiddleBottomContainer>
                                <NewCourseContainer>
                                    <NewCourseTitle>테마별 코스</NewCourseTitle>
                                </NewCourseContainer>
                            </MiddleBottomContainer>
                        </MiddleContainer>
                        <BottomContainer>
                            <MenuContainer>
                                <MenuTitle>
                                    <TabButton onClick={() => {handleTabClick(1);}} className={activeTab === 1 ? 'active' : ''}>신규 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(2);}} className={activeTab === 2 ? 'active' : ''}>테마별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(3);}} className={activeTab === 3 ? 'active' : ''}>지역별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(4);}} className={activeTab === 4 ? 'active' : ''}>추천 코스</TabButton>
                                </MenuTitle>
                            </MenuContainer>
                        </BottomContainer>
                    </>
                );
            case 3:
                return (
                    <>
                        <TopContainer>
                            <TopImage className="NewCourse" alt="Title" src={winter} />
                        </TopContainer>
                        <MiddleContainer>
                            <MiddleBottomContainer>
                                <NewCourseContainer>
                                    <NewCourseTitle>지역별 코스</NewCourseTitle>
                                </NewCourseContainer>
                            </MiddleBottomContainer>
                        </MiddleContainer>
                        <BottomContainer>
                            <MenuContainer>
                                <MenuTitle>
                                    <TabButton onClick={() => {handleTabClick(1);}} className={activeTab === 1 ? 'active' : ''}>신규 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(2);}} className={activeTab === 2 ? 'active' : ''}>테마별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(3);}} className={activeTab === 3 ? 'active' : ''}>지역별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(4);}} className={activeTab === 4 ? 'active' : ''}>추천 코스</TabButton>
                                </MenuTitle>
                            </MenuContainer>
                        </BottomContainer>
                        <AreaContentContainer>
                            <SearchBoxContainer>
                                <SearchContainer>
                                    <SearchInput
                                        type="text"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        placeholder="지역 검색"
                                    />
                                    <SearchButton onClick={() => fetchData(keyword, 1)}>검색</SearchButton>
                                </SearchContainer>
                                <SearchResultText>
                                    {searchKeyword ? `'${searchKeyword}' 검색 결과입니다.` : '전체 목록'}
                                </SearchResultText>
                            </SearchBoxContainer>
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
                            <PaginationContainer>
                                <PageButton onClick={() => setPageNo(prev => Math.max(prev - 1, 1))}>이전</PageButton>
                                <PageButton onClick={() => setPageNo(prev => prev + 1)}>다음</PageButton>
                            </PaginationContainer>
                        </AreaContentContainer>
                    </>
                );
            case 4:
                return (
                    <>
                        <TopContainer>
                            <TopImage className="NewCourse" alt="Title" src={winter} />
                        </TopContainer>
                        <MiddleContainer>
                            <MiddleBottomContainer>
                                <NewCourseContainer>
                                    <NewCourseTitle>추천 코스</NewCourseTitle>
                                </NewCourseContainer>
                            </MiddleBottomContainer>
                        </MiddleContainer>
                        <BottomContainer>
                            <MenuContainer>
                                <MenuTitle>
                                    <TabButton onClick={() => {handleTabClick(1);}} className={activeTab === 1 ? 'active' : ''}>신규 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(2);}} className={activeTab === 2 ? 'active' : ''}>테마별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(3);}} className={activeTab === 3 ? 'active' : ''}>지역별 코스</TabButton>
                                    <TabButton onClick={() => {handleTabClick(4);}} className={activeTab === 4 ? 'active' : ''}>추천 코스</TabButton>
                                </MenuTitle>
                            </MenuContainer>
                        </BottomContainer>
                    </>
                );
            default:
                return null;
        }
    };

    return <Container>{renderTabContent()}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: column;
  //background-color: blue;
`;
const TopImage = styled.img`
  height: 300px;
  width: 500px;
`;
const TopContainer = styled.div`
  //background-color: red;
  display: flex;
  flex: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MiddleContainer = styled.div`
  //background-color: orange;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MiddleBottomContainer = styled.div`
  //background-color: pink;
  display: flex;
  flex: 8;
  margin-top: 10px;
`;

const NewCourseContainer = styled.div`
  display: flex;
  flex: 7;
  justify-content: center;
  align-items: center;
`;
const NewCourseTitle = styled.div`
  font-size: 44px;
  color: orange;
  font-weight: 800;
  //background-color: green;
`;

const BottomContainer = styled.div`
  //background-color: yellow;
  display: flex;
  flex-direction: column;
  flex: 7;
`;
const MenuContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  //background: #61dafb;
`;
const MenuTitle = styled.div`
  display: flex;
  flex: 0.6;
  flex-direction: row;
  height: 50px;
  //background-color: red;
  border-top: 2px solid gray;
  border-bottom: 2px solid gray;
  margin-top: 1rem;
  justify-content: space-around;
`;
const TabButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin: 0 10px;
  position: relative;

  // hover 효과
  &:hover {
    color: orange;
    &::after {
      content: "";
      position: absolute;
      left: 50%; /* 가운데 정렬을 위해 left 속성 수정 */
      transform: translateX(-50%); /* 가운데 정렬을 위한 변환 적용 */
      bottom: -2px;
      width: 120px;
      height: 3px;
      background-color: orange;
    }
  }

  // 선택된 탭의 스타일
  &.active {
    color: orange;
    font-size: 32px;
    font-weight: 700;
    &::after {
      content: "";
      position: absolute;
      left: 50%; /* 가운데 정렬을 위해 left 속성 수정 */
      transform: translateX(-50%); /* 가운데 정렬을 위한 변환 적용 */
      bottom: -2px;
      width: 120px;
      height: 3px;
      background-color: orange;
    }
  }
`;

const SmallTitleContainer = styled.div`
  //background-color: purple;
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-top: 1rem;
`;
const SmallTitle = styled.div`
  display: flex;
  flex: 5;
  //background-color: yellow;
  justify-content: center;
  align-items: center;
`;
const SmallTitleContent = styled.div`
  display: flex;
  flex: 0.6;
  //background-color: orange;
  font-size: 36px;
  font-weight: 700;
`;
const SmallTag = styled.div`
  display: flex;
  flex: 5;
  //background-color: green;
`;
const ContentContainer = styled.div`
  //background-color: bisque;
  display: flex;
  flex-direction: column;
  flex: 7;
`;
const ContentTitleContainer = styled.div`
  display: flex;
  flex: 1.5;
  //background-color: gray;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  align-items: center;
`;
const ContentSmallTitleContainer = styled.div`
  display: flex;
  flex: 0.6;
  margin-top: 1rem;
`;
const ContentMainContainer = styled.div`
  display: flex;
  flex: 8.5;
  justify-content: center;
  align-items: flex-start; /* 세로 기준으로 top에 위치하도록 설정 */
`;
const ContentMainTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  //background-color: brown;
  border-radius: 5px;
  border: dodgerblue 5px solid;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 1100px;
  height: 400px;
`;
const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: flex-start;
  //background-color: white;
  h2 {
    color: dodgerblue;
    font-weight: 800;
    margin-left: 2rem;
    margin-top: 2rem;
  }

  h3 {
    color: dodgerblue;
    font-weight: 600;
    margin-left: 2rem;
  }
`;
const ContentMemory = styled.div`
  display: flex;
  flex: 8;
  flex-direction: column;
  //background-color: yellow;
  border-left: dodgerblue 3px solid;
  align-items: flex-start;
  h2 {
    color: black;
    font-weight: 800;
    margin-left: 2rem;
    margin-top: 2rem;
    //background-color: red;
  }
  ul {
    //background-color: gray;
    display: block;
    flex-direction: column;
    list-style-type: disc; /* 원형 글머리 기호 */
    margin-top: 1rem;
  }

  li {
    font-size: 24px;
    display: flex;
    color: black;
    font-weight: 600;
    margin-bottom: 0.5em; /* 각 항목 사이의 간격 조절 */
  }
`;
const TravelContent = styled.div`
  display: flex;
  flex: 1;
  background-color: green;
  justify-content: center;
  align-items: center;
  color: white; /* 텍스트의 색상을 흰색으로 설정 */
  font-size: 24px; /* 텍스트의 크기를 24px로 설정 (원하는 크기로 조절) */
`;

const AreaContentContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 80%;
  margin: 0 auto;
`;

const GridItem = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  border-radius: 10px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const SearchBoxContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f5f5; // 박스의 배경색
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1); // 박스에 그림자 효과 추가
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 30%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 10px;
  text-align: center;
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #008CBA;
  color: white;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    background-color: #007B9E;
  }
`;

const SearchResultText = styled.div`
  margin-bottom: 10px;
  color: #333;
  font-size: 17px;
`;

export default NewPage;