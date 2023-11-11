import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {useJsApiLoader, GoogleMap, Marker, LoadScript} from '@react-google-maps/api';  //구글 뱁 사용하기 위한 컴포넌트들

//swiper App.css에 추가한후 import
import {Swiper, SwiperSlide} from 'swiper/react';     //swiper 사용할 import
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.css';


const containerStyle = {    //지도크기 css
    width: '100%',
    height: '400px',
};

const MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

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
                    <RegionalCourseTitle><h1>테마별 코스</h1></RegionalCourseTitle>
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



            </MainContainer>
        </div>
    );
};


//=================페이지전체 컨테이너==============
const MainContainer = styled.div`
`

//==================구글맵 css===================
const GoogleMapContainer = styled.div`
  display: flex;
  background-color: #282c34;
  height: 500px;
`
// =============================================
//==================신규코스 css==================
const NewCourseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 400px;
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
  background-color: khaki;
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
  background-color: sienna;
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
  background-color: sienna;
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


export default MainPage;
