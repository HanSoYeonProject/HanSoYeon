import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import SwiperCore from 'swiper';
import theme1 from '../imgs/themecourse1.jpg';
import theme2 from '../imgs/themecourse2.jpg';
import theme3 from '../imgs/themecourse3.jpg';
import theme4 from '../imgs/themecourse4.jpg';
import theme5 from '../imgs/themecourse5.jpg';
import theme6 from '../imgs/themecourse6.jpg';
import theme7 from '../imgs/themecourse7.jpg';
import theme8 from '../imgs/themecourse8.jpg';
import region1 from '../imgs/regioncourse1.jpg';
import region2 from '../imgs/regioncourse2.jpg';
import region3 from '../imgs/regioncourse3.jpg';
import region4 from '../imgs/regioncourse4.jpg';
import region5 from '../imgs/regioncourse5.jpg';
import region6 from '../imgs/regioncourse6.jpg';
import region7 from '../imgs/regioncourse7.jpg';
import region8 from '../imgs/regioncourse8.jpg';
import recruitment1 from '../imgs/recruitment1.png';
import recommend1 from '../imgs/recommendcourse-1.png';
import recommend2 from '../imgs/recommendcourse-2.png';
import Footer from '../Components/Footer';
import logo from '../imgs/logo-removebg.png';
import { getRecruitmentsData } from './RecruitPage';
import { fetchReviewsData } from './ReviewPage';

const dummyReviews = [
    {
        id: 1,
        title: '멋진 경험이었습니다!',
        content: '가이드분이 너무 친절하셨고, 경치도 환상적이었어요. 다음에 또 방문하고 싶습니다.',
        author: '홍길동',
        date: '2023-01-01',
    },
    {
        id: 2,
        title: '가족과 함께한 최고의 여행',
        content: '아이들과 함께 갔는데 모두가 즐거워했습니다. 추천해요!',
        author: '김철수',
        date: '2023-02-15',
    },
    {
        id: 3,
        title: '다시 오고 싶은 곳',
        content: '서비스도 좋았고, 특히 음식이 맛있었습니다. 여행의 즐거움을 더해주는 곳이었어요.',
        author: '이영희',
        date: '2023-03-20',
    },
];

SwiperCore.use([Autoplay, Pagination]);

const MainContainer = styled.div`
  font-family: 'Apple SD Gothic Neo', 'Arial', sans-serif;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  border: 1px solid #e1e1e1;
  margin-bottom: 40px;
  background-color: #ffffff;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const TitleStyle = styled.h1`
  color: #000000;
  margin: 20px 0;
`;

const SubTitleStyle = styled.div`
  font-weight: bolder;
  margin: 0 0 20px;
  color: #555555;
`;

const SwiperContainer = styled.div`
  padding: 20px;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewContainer = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 40px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewItem = styled.div`
  margin-bottom: 20px;
`;

const ReviewInfo = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #777777;
`;


const MainPage = () => {
    const [recruitments, setRecruitments] = useState([]);
    const [themeCourses, setThemeCourses] = useState([]); // 추가된 부분
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        getRecruitmentsData()
            .then((response) => {
                const reversedRecruitments = [...response];
                setRecruitments(reversedRecruitments);
                console.log(reversedRecruitments);
            })
            .catch((error) => console.error('Error fetching recruitments:', error));

        fetchReviewsData()
            .then((response) => {
                setReviews(response.slice(0, 3)); // 상위 3개의 리뷰만 저장
            })
            .catch((error) => console.error('Error fetching reviews:', error));

        // 추가된 부분: 테마별 코스 데이터 가져오기
        fetchThemeCourses();
    }, []);

    // 추가된 함수: 테마별 코스 데이터 가져오기

    const fetchThemeCourses = async () => {
        try {
            // 테마별 코스를 불러오는 API 요청 수행
            const themeCoursesUrl = 'your-theme-courses-api-url';
            const themeCoursesResponse = await axios.get(themeCoursesUrl);
            const themeCoursesData = themeCoursesResponse.data;

            // 받아온 데이터를 상태에 업데이트
            setThemeCourses(themeCoursesData);
        } catch (error) {
            console.error('Error fetching theme courses:', error);
        }
    };


    return (
        <div>
            <MainContainer>
                <SectionContainer>
                    <TitleStyle>테마별 코스</TitleStyle>
                    <SubTitleStyle>원하는 테마를 선택하세요</SubTitleStyle>
                    <Link to={`/newcourse`}>
                    <SwiperSection
                        images={[theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8]} />
                    </Link>
                </SectionContainer>

                <SectionContainer>
                    <TitleStyle>지역별 코스</TitleStyle>
                    <SubTitleStyle>지역별로 분류된 코스</SubTitleStyle>
                    <Link to={`/newcourse`}>
                    <SwiperSection images={[region1, region2, region3, region4, region5, region6, region7, region8]} />
                    </Link>
                </SectionContainer>

                <SectionContainer>
                    <TitleStyle>모집일정</TitleStyle>
                    <RecruitmentSchedule
                        schedule={recruitments
                            .slice(0, 5)
                            .map((recruitment) => ({
                                id: recruitment.job_id,
                                title: recruitment.title,
                                date: recruitment.startDate,
                            }))}
                    />
                </SectionContainer>

                <ReviewContainer>
                    <TitleStyle>체험 후기</TitleStyle>
                    <SubTitleStyle>다양한 체험 후기를 들어보세요</SubTitleStyle>
                    {reviews.map((review) => (
                        <ReviewItem key={review.reviewId}>
                            <h3>{review.reviewTitle}</h3>
                            <p>{review.reviewContent}</p>
                            <ReviewInfo>작성자: {review.userId} | 작성일: {review.reviewWriteDate}</ReviewInfo>
                        </ReviewItem>
                    ))}
                </ReviewContainer>
            </MainContainer>
            <Footer />
        </div>
    );
};

const SwiperSection = ({ images }) => {
    return (
        <SwiperContainer>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                speed={1300}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <SlideImage src={image} alt={`slide-${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </SwiperContainer>
    );
};

const RecruitmentSchedule = ({ schedule }) => {
    return (
        <div>
            {schedule.map((item) => (
                <RecruitmentItem key={item.id}>
                    <Link to={`/recruit/${item.id}`}>
                        <RecruitmentTitle>{item.title}</RecruitmentTitle>
                    </Link>
                    <Link to={`/recruit/${item.id}`}>
                        <RecruitmentDate>{item.date}</RecruitmentDate>
                    </Link>
                </RecruitmentItem>
            ))}
        </div>
    );
};

const RecruitmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e1e1e1;
`;

const RecruitmentTitle = styled.div`
  font-weight: bold;
  color: #000000;
`;

const RecruitmentDate = styled.div`
  color: #666666;
`;

export default MainPage;
