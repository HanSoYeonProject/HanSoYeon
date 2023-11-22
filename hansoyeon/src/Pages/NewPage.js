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
    const [searchDetailKeyword, setSearchDetailKeyword] = useState("");
    const [pageNo, setPageNo] = useState(1);

    const [pageContentNo, setContentPageNo] = useState(1);
    const [searchContentKeyword, setSearchContentKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [selectedSido, setSelectedSido] = useState('');
    const [selectedGugun, setSelectedGugun] = useState('');
    const [gugunOptions, setGugunOptions] = useState([]);
    const [localNum, setLocalNum] = useState("1");
    const [detailNum, setDetailNum] = useState("1");

    // 라디오 버튼 상태
    const [selectedContentType, setSelectedContentType] = useState('12');

    const sidoOptions = [
        "시/도 선택", "서울특별시", "인천광역시", "대전광역시", "광주광역시",
        "대구광역시", "부산광역시", "경기도", "강원도", "충청북도",
        "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"
    ];

    useEffect(() => {
        let option = [];
        if (!selectedSido || selectedSido === "시/도 선택") {
            setGugunOptions([]);
            setSelectedGugun('');
        } else {
            if (selectedSido === "서울특별시") {
                setLocalNum("1")
                option = [
                    {name: "강남구", detailNum: "1"}, {name: "강동구", detailNum: "2"}, {name: "강북구", detailNum: "3"},
                    {name: "강서구", detailNum: "4"}, {name: "관악구", detailNum: "5"}, {name: "광진구", detailNum: "6"},
                    {name: "구로구", detailNum: "7"}, {name: "금천구", detailNum: "8"}, {name: "노원구", detailNum: "9"},
                    {name: "도봉구", detailNum: "10"}, {name: "동대문구", detailNum: "11"}, {name: "동작구", detailNum: "12"},
                    {name: "마포구", detailNum: "13"}, {name: "서대문구", detailNum: "14"}, {name: "서초구", detailNum: "15"},
                    {name: "성동구", detailNum: "16"}, {name: "성북구", detailNum: "17"}, {name: "송파구", detailNum: "18"},
                    {name: "양천구", detailNum: "19"}, {name: "영등포구", detailNum: "20"}, {name: "용산구", detailNum: "21"},
                    {name: "은평구", detailNum: "22"}, {name: "종로구", detailNum: "23"}, {name: "중구", detailNum: "24"}, {name: "중랑구", detailNum: "25"}
                ]
            }else if(selectedSido === "인천광역시"){
                setLocalNum("2")
                option = [
                    {name: "계양구", detailNum: "2"}, {name: "미추홀구", detailNum: "3"}, {name: "남동구", detailNum: "4"},
                    {name: "동구", detailNum: "5"}, {name: "부평구", detailNum: "6"}, {name: "서구", detailNum: "7"},
                    {name: "연수구", detailNum: "8"}, {name: "중구", detailNum: "10"}, {name: "강화군", detailNum: "1"}, {name: "옹진군", detailNum: "9"}
                ]
            }else if(selectedSido === "대전광역시"){
                setLocalNum("3")
                option = [
                    {name: "대덕구", detailNum: "1"}, {name: "동구", detailNum: "2"}, {name: "서구", detailNum: "3"},
                    {name: "유성구", detailNum: "4"}, {name: "중구", detailNum: "5"}
                ]
            }else if(selectedSido === "광주광역시"){
                setLocalNum("5")
                option = [
                    {name: "광산구", detailNum: "1"}, {name: "남구", detailNum: "2"}, {name: "동구", detailNum: "3"},
                    {name: "북구", detailNum: "4"}, {name: "서구", detailNum: "5"}
                ]
            }else if(selectedSido === "대구광역시"){
                setLocalNum("4")
                option = [
                    {name: "남구", detailNum: "1"}, {name: "달서구", detailNum: "2"}, {name: "동구", detailNum: "4"},
                    {name: "북구", detailNum: "5"}, {name: "서구", detailNum: "6"}, {name: "수성구", detailNum: "7"},
                    {name: "중구", detailNum: "8"}, {name: "달성군", detailNum: "3"}, {name: "군위군", detailNum: "9"}
                ]
            }else if(selectedSido === "울산광역시"){
                setLocalNum("7")
                option = [
                    {name: "남구", detailNum: "2"}, {name: "동구", detailNum: "3"}, {name: "북구", detailNum: "4"},
                    {name: "중구", detailNum: "1"}, {name: "울주군", detailNum: "5"}
                ]
            }else if(selectedSido === "부산광역시"){
                setLocalNum("6")
                option = [
                    {name: "강서구", detailNum: "1"}, {name: "금정구", detailNum: "2"}, {name: "남구", detailNum: "4"},
                    {name: "동구", detailNum: "5"}, {name: "동래구", detailNum: "6"}, {name: "부산진구", detailNum: "7"},
                    {name: "북구", detailNum: "8"}, {name: "사상구", detailNum: "9"}, {name: "사하구", detailNum: "10"},
                    {name: "서구", detailNum: "11"}, {name: "수영구", detailNum: "12"}, {name: "연제구", detailNum: "13"},
                    {name: "영도구", detailNum: "14"}, {name: "중구", detailNum: "15"}, {name: "해운대구", detailNum: "16"}, {name: "기장군", detailNum: "3"}
                ]
            }else if(selectedSido === "경기도"){
                setLocalNum("31")
                option = [
                    {name: "고양시", detailNum: "2"}, {name: "과천시", detailNum: "3"}, {name: "광명시", detailNum: "4"},
                    {name: "광주시", detailNum: "5"}, {name: "구리시", detailNum: "6"}, {name: "군포시", detailNum: "7"},
                    {name: "김포시", detailNum: "8"}, {name: "남양주시", detailNum: "9"}, {name: "동두천시", detailNum: "10"},
                    {name: "부천시", detailNum: "11"}, {name: "성남시", detailNum: "12"}, {name: "수원시", detailNum: "13"},
                    {name: "시흥시", detailNum: "14"}, {name: "안산시", detailNum: "15"}, {name: "안성시", detailNum: "16"}, {name: "안양시", detailNum: "17"},
                    {name: "양주시", detailNum: "18"}, {name: "오산시", detailNum: "22"}, {name: "용인시", detailNum: "23"},
                    {name: "의왕시", detailNum: "24"}, {name: "의정부시", detailNum: "25"}, {name: "이천시", detailNum: "26"},
                    {name: "파주시", detailNum: "27"}, {name: "평택시", detailNum: "28"}, {name: "포천시", detailNum: "29"},
                    {name: "하남시", detailNum: "30"}, {name: "화성시", detailNum: "31"}, {name: "가평군", detailNum: "1"},
                    {name: "양평군", detailNum: "19"}, {name: "여주시", detailNum: "20"}, {name: "연천군", detailNum: "21"},
                ]
            }else if(selectedSido === "강원도"){
                setLocalNum("32")
                option = [
                    {name: "강릉시", detailNum: "1"}, {name: "고성군", detailNum: "2"}, {name: "동해시", detailNum: "3"},
                    {name: "삼척시", detailNum: "4"}, {name: "속초시", detailNum: "5"}, {name: "양구군", detailNum: "6"},
                    {name: "양양군", detailNum: "7"}, {name: "영월군", detailNum: "8"}, {name: "원주시", detailNum: "9"},
                    {name: "인제군", detailNum: "10"}, {name: "정선군", detailNum: "11"}, {name: "철원군", detailNum: "12"},
                    {name: "춘천시", detailNum: "13"}, {name: "태백시", detailNum: "14"}, {name: "평창군", detailNum: "15"},
                    {name: "홍천군", detailNum: "16"}, {name: "화천군", detailNum: "17"}, {name: "횡성군", detailNum: "18"}
                ]
            }else if(selectedSido === "충청북도"){
                setLocalNum("33")
                option = [
                    {name: "괴산군", detailNum: "1"}, {name: "단양군", detailNum: "2"}, {name: "보은군", detailNum: "3"},
                    {name: "영동군", detailNum: "4"}, {name: "옥천군", detailNum: "5"}, {name: "음성군", detailNum: "6"},
                    {name: "제천시", detailNum: "7"}, {name: "진천군", detailNum: "8"}, {name: "청원군", detailNum: "9"},
                    {name: "청주시", detailNum: "10"}, {name: "충주시", detailNum: "11"}, {name: "증평군", detailNum: "12"}
                ]
            }else if(selectedSido === "충청남도"){
                setLocalNum("34")
                option = [
                    {name: "공주시", detailNum: "1"}, {name: "금산군", detailNum: "2"}, {name: "논산시", detailNum: "3"},
                    {name: "당진시", detailNum: "4"}, {name: "보령시", detailNum: "5"}, {name: "부여군", detailNum: "6"},
                    {name: "서산시", detailNum: "7"}, {name: "서천군", detailNum: "8"}, {name: "아산시", detailNum: "9"},
                    {name: "예산군", detailNum: "10"}, {name: "천안시", detailNum: "11"}, {name: "청양군", detailNum: "12"},
                    {name: "태안군", detailNum: "13"}, {name: "홍성군", detailNum: "14"}, {name: "계룡시", detailNum: "15"}
                ]
            }else if(selectedSido === "전라북도"){
                setLocalNum("37")
                option = [
                    {name: "고창군", detailNum: "1"}, {name: "군산시", detailNum: "2"}, {name: "김제시", detailNum: "3"},
                    {name: "남원시", detailNum: "4"}, {name: "무주군", detailNum: "5"}, {name: "부안군", detailNum: "6"},
                    {name: "순창군", detailNum: "7"}, {name: "완주군", detailNum: "8"}, {name: "익산시", detailNum: "9"},
                    {name: "임실군", detailNum: "10"}, {name: "장수군", detailNum: "11"}, {name: "전주시", detailNum: "12"},
                    {name: "정읍시", detailNum: "13"}, {name: "진안군", detailNum: "14"}
                ]
            }else if(selectedSido === "전라남도"){
                setLocalNum("38")
                option = [
                    {name: "강진군", detailNum: "1"}, {name: "고흥군", detailNum: "2"}, {name: "곡성군", detailNum: "3"},
                    {name: "광양시", detailNum: "4"}, {name: "구례군", detailNum: "5"}, {name: "나주시", detailNum: "6"},
                    {name: "담양군", detailNum: "7"}, {name: "목포시", detailNum: "8"}, {name: "무안군", detailNum: "9"},
                    {name: "보성군", detailNum: "10"}, {name: "순천시", detailNum: "11"}, {name: "신안군", detailNum: "12"},
                    {name: "여수시", detailNum: "13"}, {name: "영광군", detailNum: "16"}, {name: "영암군", detailNum: "17"},
                    {name: "완도군", detailNum: "18"}, {name: "장성군", detailNum: "19"}, {name: "장흥군", detailNum: "20"},
                    {name: "진도군", detailNum: "21"}, {name: "함평군", detailNum: "22"}, {name: "해남군", detailNum: "23"}, {name: "화순군", detailNum: "24"}
                ]
            }else if(selectedSido === "경상북도"){
                setLocalNum("35")
                option = [
                    {name: "경산시", detailNum: "1"}, {name: "경주시", detailNum: "2"}, {name: "고령군", detailNum: "3"},
                    {name: "구미시", detailNum: "4"}, {name: "김천시", detailNum: "6"}, {name: "문경시", detailNum: "7"},
                    {name: "봉화군", detailNum: "8"}, {name: "상주시", detailNum: "9"}, {name: "성주군", detailNum: "10"},
                    {name: "안동시", detailNum: "11"}, {name: "영덕군", detailNum: "12"}, {name: "영양군", detailNum: "13"},
                    {name: "영주시", detailNum: "14"}, {name: "영천시", detailNum: "15"}, {name: "예천군", detailNum: "16"},
                    {name: "울릉군", detailNum: "17"}, {name: "울진군", detailNum: "18"}, {name: "의성군", detailNum: "19"},
                    {name: "청도군", detailNum: "20"}, {name: "청송군", detailNum: "21"}, {name: "칠곡군", detailNum: "22"}, {name: "포항시", detailNum: "23"}
                ]
            }else if(selectedSido === "경상남도"){
                setLocalNum("36")
                option = [
                    {name: "거제시", detailNum: "1"}, {name: "거창군", detailNum: "2"}, {name: "고성군", detailNum: "3"},
                    {name: "김해시", detailNum: "4"}, {name: "남해군", detailNum: "5"}, {name: "마산시", detailNum: "6"},
                    {name: "밀양시", detailNum: "7"}, {name: "사천시", detailNum: "8"}, {name: "산청군", detailNum: "9"},
                    {name: "양산시", detailNum: "10"}, {name: "의령군", detailNum: "12"}, {name: "진주시", detailNum: "13"},
                    {name: "진해시", detailNum: "14"}, {name: "창녕군", detailNum: "15"}, {name: "창원시", detailNum: "16"},
                    {name: "통영시", detailNum: "17"}, {name: "하동군", detailNum: "18"}, {name: "함안군", detailNum: "19"},
                    {name: "함양군", detailNum: "20"}, {name: "합천군", detailNum: "21"}
                ]
            }else if(selectedSido === "제주특별자치도"){
                setLocalNum("39")
                option = [
                    {name: "남제주군", detailNum: "1"}, {name: "북제주군", detailNum: "2"}, {name: "서귀포시", detailNum: "3"}, {name: "제주시", detailNum: "4"}
                ]
            }
            setGugunOptions(option);
        }
    }, [selectedSido]);

    const serviceKey = 'YRUALCBQQWvU6w/tG7ZkUtWtjAeaO9bJjyummGjvfF9SjR0QYO+CRveierZlwe97v5toXybLb6aoFCl1sZ8q4Q==';

    useEffect(() => {
        fetchLocalData(keyword, pageNo);
    }, [pageNo]);

    const fetchContentData = async (contentTypeCode, pageNo, retryCount = 0) => {
        try {
            const encodedServiceKey = encodeURIComponent(serviceKey);
            const encodedKeyword = encodeURIComponent(searchKeyword || "서울");
            const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${encodedServiceKey}&MobileApp=AppTest&MobileOS=ETC&pageNo=${pageContentNo}&numOfRows=12&listYN=Y&contentTypeId=${selectedContentType}&keyword=${encodedKeyword}`;
            const response = await axios.get(url);

            const parser = new XMLParser();
            const jsonObj = parser.parse(response.data);

            if (jsonObj && jsonObj.response && jsonObj.response.body && jsonObj.response.body.items) {
                const spots = jsonObj.response.body.items.item;
                setSearchResults(spots);
            } else {
                // 유효하지 않은 응답일 경우 재시도
                if (retryCount < 3) { // 최대 3번 재시도
                    fetchContentData(searchKeyword, pageNo, retryCount + 1);
                } else {
                    console.error("Invalid API response");
                }
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            if (retryCount < 3) {
                fetchContentData(searchKeyword, pageNo, retryCount + 1);
            }
        }
    };

    const fetchLocalData = async (searchKeyword, pageNo, retryCount = 0) => {
        try {
            const encodedServiceKey = encodeURIComponent(serviceKey);
            const url = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${encodedServiceKey}&pageNo=${pageNo}&numOfRows=12&MobileApp=AppTest&MobileOS=ETC&arrange=A&areaCode=${localNum}&sigunguCode=${detailNum}`;
            const response = await axios.get(url);

            const parser = new XMLParser();
            const jsonObj = parser.parse(response.data);

            if (jsonObj && jsonObj.response && jsonObj.response.body && jsonObj.response.body.items) {
                const spots = jsonObj.response.body.items.item;
                setTouristSpots(spots);
                setSearchKeyword(searchKeyword)
                setSearchDetailKeyword(selectedGugun);
            } else {
                // 유효하지 않은 응답일 경우 재시도
                if (retryCount < 3) { // 최대 3번 재시도
                    fetchLocalData(searchKeyword, pageNo, retryCount + 1);
                } else {
                    console.error("Invalid API response");
                }
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            if (retryCount < 3) {
                fetchLocalData(searchKeyword, pageNo, retryCount + 1);
            }
        }
    };

    // 구/군 선택 핸들러
    const handleGugunChange = (e) => {
        const selectedOption = gugunOptions.find(option => option.name === e.target.value);
        setSelectedGugun(e.target.value);
        if (selectedOption) {
            setDetailNum(selectedOption.detailNum);
        } else {
            setDetailNum("");
        }
    };

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        setSearchContentKeyword()
        fetchContentData(selectedContentType, 1); // 선택된 컨텐트 타입으로 검색
    };

    // 라디오 버튼 UI
    const renderRadioButtons = () => {
        const contentTypeOptions = [
            { label: "관광지", value: "12" },
            { label: "문화시설", value: "14" },
            { label: "행사/공연/축제", value: "15" },
            { label: "레포츠", value: "28" },
            { label: "숙박", value: "32" },
            { label: "쇼핑", value: "38" },
            { label: "음식점", value: "39" }
        ];

        return (
            <div>
                {contentTypeOptions.map((option, index) => (
                    <RadioButtonLabel key={index}>
                        <RadioButton
                            type="radio"
                            name="contentType"
                            value={option.value}
                            onChange={() => setSelectedContentType(option.value)}
                        />
                        <RadioButtonSpan>{option.label}</RadioButtonSpan>
                    </RadioButtonLabel>
                ))}
            </div>
        );
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
                        <AreaContentContainer>
                            <SearchBoxContainer>
                                <SearchContainer>
                                    {renderRadioButtons()}
                                    <SearchButton onClick={handleSearch}>검색</SearchButton>
                                </SearchContainer>
                            </SearchBoxContainer>
                            <GridContainer>
                                {Array.isArray(searchResults) && searchResults.length > 0 ? (
                                    searchResults.map((spot, index) => (
                                        <GridItem key={index}>
                                            <h3>{spot.title}</h3>
                                            {spot.firstimage && <StyledImage src={spot.firstimage} alt={spot.title} />}
                                            {!spot.firstimage && <StyledImage src={noImage} alt="No image available" />}
                                        </GridItem>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </GridContainer>
                            <PaginationContainer>
                                <PageButton onClick={() => setContentPageNo(prev => Math.max(prev - 1, 1))}>이전</PageButton>
                                <PageButton onClick={() => setContentPageNo(prev => prev + 1)}>다음</PageButton>
                            </PaginationContainer>
                        </AreaContentContainer>
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
                                    {/* 시/도 선택 드롭다운 */}
                                    <StyledSelect value={selectedSido} onChange={(e) => setSelectedSido(e.target.value)}>
                                        {sidoOptions.map(sido => (
                                            <option key={sido} value={sido}>{sido}</option>
                                        ))}
                                    </StyledSelect>

                                    {/* 구/군 선택 드롭다운 */}
                                    <StyledSelect value={selectedGugun} onChange={handleGugunChange}>
                                        {gugunOptions.map(({ name }) => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </StyledSelect>

                                    {/* 검색 버튼 */}
                                    <SearchButton onClick={() => fetchLocalData(selectedSido, selectedGugun, 1)}>검색</SearchButton>
                                </SearchContainer>
                                <SearchResultText>
                                    {searchKeyword ? `'${searchKeyword} ${searchDetailKeyword}' 검색 결과입니다.` : '전체 목록'}
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

const StyledSelect = styled.select`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    border-color: #aaa;
  }
`;

const RadioButtonLabel = styled.label`
  display: inline-block;
  background-color: #f0f0f0;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 20px;
  border: 2px solid #ddd;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const RadioButton = styled.input`
  display: none;

  &:checked + span {
    color: #0000ff;
    font-weight: bold;
    border-color: #4CAF50;
  }
`;

const RadioButtonSpan = styled.span`
`;

export default NewPage;