import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

//swiper App.css에 추가한후 import
import {Swiper, SwiperSlide} from 'swiper/react';     //swiper 사용할 import
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';

const KAKAO_MAP_API_KEY = process.env.KAKAO_MAP_API_KEY;

const { kakao } = window;
//리뷰 Test 데이터
const dummyReviews = [
    {
        id: 1,
        title: "멋진 경험이었습니다!",
        content: "가이드분이 너무 친절하셨고, 경치도 환상적이었어요. 다음에 또 방문하고 싶습니다.",
        author: "홍길동",
        date: "2023-01-01"
    },
    {
        id: 2,
        title: "가족과 함께한 최고의 여행",
        content: "아이들과 함께 갔는데 모두가 즐거워했습니다. 추천해요!",
        author: "김철수",
        date: "2023-02-15"
    },
    {
        id: 3,
        title: "다시 오고 싶은 곳",
        content: "서비스도 좋았고, 특히 음식이 맛있었습니다. 여행의 즐거움을 더해주는 곳이었어요.",
        author: "이영희",
        date: "2023-03-20"
    }
];


//===============================페이지 UI========================================

const MainPage = () => {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
    }, [])

    return (
        <div>
            <MainContainer>
                <GoogleMapContainer>
                    <div id="map" style={{width: '90%', height: '700px'}}></div>
                </GoogleMapContainer>
                <NewCourseContainer>
                    <NewCourseTitle><h1>신규코스</h1></NewCourseTitle>
                    <NewCourseSubTitle>이달의 추천코스</NewCourseSubTitle>
                    <NewCourseImage>
                        <>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                                <SwiperSlide>Slide 4</SwiperSlide>
                                <SwiperSlide>Slide 5</SwiperSlide>
                            </Swiper>
                        </>
                    </NewCourseImage>
                </NewCourseContainer>
                <RecommendCourseContainer>
                    <RecommendCourseTitle><h1>추천 코스</h1></RecommendCourseTitle>
                    <RecommendCourseSubTitle>일자리 및 여행 추천</RecommendCourseSubTitle>
                    <RecommendCourseImage>

                        <>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                                <SwiperSlide>Slide 4</SwiperSlide>
                                <SwiperSlide>Slide 5</SwiperSlide>

                            </Swiper>
                        </>
                    </RecommendCourseImage>
                </RecommendCourseContainer>
                <ThemaCourseContainer>
                    <ThemaCourseTitle><h1>테마별 코스</h1></ThemaCourseTitle>
                    <ThemaCourseSubTitle>원하는 테마별로 분류된 코스</ThemaCourseSubTitle>
                    <ThemaCouseImage>

                        <>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                                <SwiperSlide>Slide 4</SwiperSlide>
                                <SwiperSlide>Slide 5</SwiperSlide>
                            </Swiper>
                        </>

                    </ThemaCouseImage>
                </ThemaCourseContainer>

                <RegionalCourseContainer>
                    <RegionalCourseTitle><h1>지역별 코스</h1></RegionalCourseTitle>
                    <RegionalCourseSubTitle>원하는 테마별로 분류된 코스</RegionalCourseSubTitle>
                    <RegionalCouseImage>

                        <>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                                <SwiperSlide>Slide 4</SwiperSlide>
                                <SwiperSlide>Slide 5</SwiperSlide>

                            </Swiper>
                        </>

                    </RegionalCouseImage>
                </RegionalCourseContainer>
                <ReviewContainer>
                    <ReviewTitle>체험 후기</ReviewTitle>
                    <ReviewSubTitle>다양한 체험 후기를 들어보세요</ReviewSubTitle>
                    <ReviewContext>

                        {dummyReviews.map(review => (
                            <Review
                                key={review.id}
                                title={review.title}
                                content={review.content}
                                author={review.author}
                                date={review.date}
                            />
                        ))}

                    </ReviewContext>
                </ReviewContainer>
           </MainContainer>
        </div>
    );
};

//==============================================페이지 CSS===================================================
//=================페이지전체 컨테이너==============
const MainContainer = styled.div`
  font-family: 'Arial', sans-serif;
`

//==================구글맵 css===================
const containerStyle = {    //지도크기 css
    width: '100%',
    // height: '400px',
    flex:1
};

const GoogleMapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
`
// 제목 스타일 공통으로 적용
const TitleStyle = styled.div`
  font-size: 24px;       // 통일된 글씨 크기
  margin-left: 20px;     // 왼쪽 마진 추가
  background-color: white;
`;

const SubTitleStyle = styled.div`
  font-size: 18px;       // 부제목 글씨 크기
  background-color: white;
  margin-top: -10px;     // 제목과의 간격 조정
`;
// =============================================
//==================신규코스 css==================
const NewCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 500px;
  border: 1px solid gray;
`

const NewCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
`
const NewCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
`

const NewCourseImage = styled.div`
  display: flex;
  flex: 7;
  background-color: orange;
`
//==============================================
//==================추천코스 css===================
const RecommendCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 300px;
`
const RecommendCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
`
const RecommendCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
`
const RecommendCourseImage = styled.div`
  display: flex;
  flex: 4;
  background-color: orange;
`
//==============================================
//==============테마별코스=========================
const ThemaCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 500px;
  border: 1px solid gray;
`
const ThemaCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
`
const ThemaCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
`
const ThemaCouseImage = styled.div`
  display: flex;
  flex: 7;
  background-color: orange;
`
//==============================================
//==================지역별 코스 css=================
const RegionalCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 500px;
  border: 1px solid gray;
`
const RegionalCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
`
const RegionalCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
`
const RegionalCouseImage = styled.div`
  display: flex;
  flex: 7;
  background-color: orange;
`
//==============================================
//====================체험후기====================
const ReviewContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 800px;
  background-color: skyblue;
  border: 1px solid grey;
`
const ReviewTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
`
const ReviewSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
`
const ReviewContext = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  background-color: white;
`
const Review = ({ title, content, author, date }) => {
    return (
        <div style={{marginBottom: '20px'}}>
            <h3>{title}</h3>
            <p>{content}</p>
            <p>작성자: {author} | 작성일: {date}</p>
        </div>
    );
}


//==============================================

export default MainPage;