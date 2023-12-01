import React, {useState, useCallback, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//swiper App.css에 추가한후 import
import {Swiper, SwiperSlide} from 'swiper/react';     //swiper 사용할 import
import {Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';
import new1 from '../imgs/newcourse-1.png';
import new2 from '../imgs/newcourse-2.png';
import new3 from '../imgs/newcourse-3.png';
import new4 from '../imgs/newcourse-4.png';
import recommend1 from '../imgs/recommendcourse-1.png';
import recommend2 from '../imgs/recommendcourse-2.png';
import Footer from '../Components/Footer';
import logo from "../imgs/logo-removebg.png";
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

    return (
        <div>
            <MainContainer>
                <NewCourseContainer>
                    <NewCourseTitle><h1>신규코스</h1></NewCourseTitle>
                    <NewCourseSubTitle>이달의 추천코스</NewCourseSubTitle>
                    <NewCourseImage>
                        <>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={30}
                                modules={[Pagination, Autoplay]} // Autoplay 모듈 추가
                                className="mySwiper"
                                autoplay={{
                                    delay: 2000, // 2초마다 슬라이드
                                    disableOnInteraction: false // 사용자가 슬라이더를 조작한 후에도 자동 재생 계속
                                }}
                                speed={1300} // 슬라이드 전환 속도를 1.3초로 설정
                                // pagination 속성 제거
                            >
                                <SwiperSlide><img src={new1} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new2} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new3} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new4} style={{width: '340px'}}/></SwiperSlide>
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
                                modules={[Pagination, Autoplay]} // Autoplay 모듈 추가
                                className="mySwiper"
                                autoplay={{
                                    delay: 2000, // 2초마다 슬라이드
                                    disableOnInteraction: false // 사용자가 슬라이더를 조작한 후에도 자동 재생 계속
                                }}
                                speed={1300} // 슬라이드 전환 속도를 1.3초로 설정
                                // pagination 속성 제거
                            >
                                <SwiperSlide><img src={recommend1} style={{width: '310px'}}/></SwiperSlide>
                                <SwiperSlide><img src={recommend2} style={{width: '310px'}}/></SwiperSlide>
                                <SwiperSlide>3</SwiperSlide>
                                <SwiperSlide>4</SwiperSlide>
                                <SwiperSlide>5</SwiperSlide>

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
                                modules={[Pagination, Autoplay]} // Autoplay 모듈 추가
                                className="mySwiper"
                                autoplay={{
                                    delay: 2000, // 2초마다 슬라이드
                                    disableOnInteraction: false // 사용자가 슬라이더를 조작한 후에도 자동 재생 계속
                                }}
                                speed={1300} // 슬라이드 전환 속도를 1.3초로 설정
                                // pagination 속성 제거
                            >
                                <SwiperSlide><img src={new1} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new2} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new3} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new4} style={{width: '340px'}}/></SwiperSlide>
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
                                modules={[Pagination, Autoplay]} // Autoplay 모듈 추가
                                className="mySwiper"
                                autoplay={{
                                    delay: 2000, // 2초마다 슬라이드
                                    disableOnInteraction: false // 사용자가 슬라이더를 조작한 후에도 자동 재생 계속
                                }}
                                speed={1300} // 슬라이드 전환 속도를 1.3초로 설정
                                // pagination 속성 제거
                            >
                                <SwiperSlide><img src={new1} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new2} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new3} style={{width: '340px'}}/></SwiperSlide>
                                <SwiperSlide><img src={new4} style={{width: '340px'}}/></SwiperSlide>

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
                <Footer/>
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
  padding-left: 50px;
`

const NewCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
  margin-top: 30px;
  margin-bottom: -40px;
  color: #D1774C;
`
const NewCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  padding-top: 0;
  font-weight: bolder;
`

const NewCourseImage = styled.div`
  display: flex;
  flex: 7;
  background-color: white;
`
//==============================================
//==================추천코스 css===================
const RecommendCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 300px;
  padding-left: 50px;
`
const RecommendCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
  margin-top: 30px;
  margin-bottom: -40px;
  color: #D1774C;
`
const RecommendCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  font-weight: bolder;
`
const RecommendCourseImage = styled.div`
  display: flex;
  flex: 4;
`
//==============================================
//==============테마별코스=========================
const ThemaCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 500px;
  border: 1px solid gray;
  padding-left: 50px;
`
const ThemaCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
  margin-top: 30px;
  margin-bottom: -40px;
  color: #D1774C;
`
const ThemaCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  font-weight: bolder;
`
const ThemaCouseImage = styled.div`
  display: flex;
  flex: 7;
`
//==============================================
//==================지역별 코스 css=================
const RegionalCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 500px;
  border: 1px solid gray;
  padding-left: 50px;
`
const RegionalCourseTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
  margin-top: 30px;
  margin-bottom: -40px;
  color: #D1774C;
`
const RegionalCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  font-weight: bolder;
`
const RegionalCouseImage = styled.div`
  display: flex;
  flex: 7;
`
//==============================================
//====================체험후기====================
const ReviewContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 800px;
  background-color: white;
  border: 1px solid grey;
  padding-left: 50px;
`
const ReviewTitle = styled.div`
  display: flex;
  flex: 2;
  background-color: white;
  margin-top: 30px;
  margin-bottom: -40px;
  font-size: 40px;
  color: #D1774C;
`
const ReviewSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: white;
  font-weight: bolder;
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