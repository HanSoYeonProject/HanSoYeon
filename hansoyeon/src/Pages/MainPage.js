import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {useJsApiLoader, GoogleMap, Marker, LoadScript} from '@react-google-maps/api';  //구글 뱁 사용하기 위한 컴포넌트들

//swiper App.css에 추가한후 import
import {Swiper, SwiperSlide} from 'swiper/react';     //swiper 사용할 import
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';

const MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

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


function GoogleMapComponent() {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "${MAP_API_KEY}" // Replace with your API key
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);
    const mapOptions = {
        styles: [
            {
                featureType: "poi", // 관심 지점 (Points of Interest)
                elementType: "labels", // 레이블 요소
                stylers: [{visibility: "off"}] // 레이블 숨기기
            }
        ]
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            function (error) {
                console.error("Error getting location", error);
            },
            {
                enableHighAccuracy: true
            }
        );
    }, []);
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation || {lat: 37.5760222, lng: 126.9769000}}
            zoom={16}
            options={mapOptions} // 추가된 옵션 사용
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {currentLocation && <Marker position={currentLocation}/>}
        </GoogleMap>
    ) : <></>;
}

//===============================페이지 UI========================================

const MainPage = () => {
    return (
        <div>
            <MainContainer>
                <GoogleMapContainer>
                    <GoogleMapComponent/>
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
                                <SwiperSlide>Slide 6</SwiperSlide>
                                <SwiperSlide>Slide 7</SwiperSlide>
                                <SwiperSlide>Slide 8</SwiperSlide>
                                <SwiperSlide>Slide 9</SwiperSlide>
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
`

//==================구글맵 css===================
const containerStyle = {    //지도크기 css
    width: '100%',
    // height: '400px',
    flex:1
};

const GoogleMapContainer = styled.div`
  display: flex;
  background-color: #282c34;
  height: 800px;
`
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
  background-color: purple;
`
const NewCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: yellow;
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
  background-color: skyblue;
`
const RecommendCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: yellow;
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
  background-color: mediumorchid;
`
const ThemaCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: wheat;
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
  background-color: mediumorchid;
`
const RegionalCourseSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: wheat;
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
  background-color: crimson;
`
const ReviewSubTitle = styled.div`
  display: flex;
  flex: 1;
  background-color: lightgreen;
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
