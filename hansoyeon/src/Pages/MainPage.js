import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
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
import banner1 from '../imgs/banner4.png';
import banner2 from '../imgs/banner5.png';
import banner3 from '../imgs/banner6.png';
import noImage from '../imgs/noImage.png';
import '../Components/cover.css';

SwiperCore.use([Autoplay, Pagination]);

const MainContainer = styled.div`
  font-family: 'Apple SD Gothic Neo', 'Arial', sans-serif;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  //border: 1px solid #e1e1e1;
  margin-bottom: 40px;
  background-color: #ffffff;
  //overflow: hidden;
  border-radius: 12px;
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const TitleStyle = styled.h1`
  color: #764b36;
  font-size: 54px;
  font-family: 'omyu_pretty';
  margin: 60px 0 5px;
  position: relative;
  padding-left: 20px;
  
  &::after {
    position: absolute;
    left: 0;
    top: 10px;
    content: "";
    display: block;
    width: 6px;
    height: 90px;
    background: #764b36;
  }
`;

const SubTitleStyle = styled.div`
  font-weight: bolder;
  margin: 0 0 16px;
  color: #555555;
  font-size: 20px;
`;

const SwiperContainer = styled.div`
  margin-bottom: 20px;
  height: 450px;

  @media (max-width: 1400px) {
    height: 350px;
  } 
  @media (max-width: 1200px) {
    height: 280px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewCardContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #ffffff;
  display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // 카드의 최소 너비를 250px로 설정
  gap: 60px;
  position: relative;
`;

const DetailButton = styled.button`
  text-align: right;
  background-color: transparent;
  color: black; // 버튼 텍스트 색상
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #764b36;
    font-weight: bold;
  }
`;

const ReviewItem = styled.div`
  background: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ReviewItem2 = styled.div`
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  img {
    height: 450px;
  }
  
  h3 {
    font-size: 34px;
    margin-top: 10px;
    margin-bottom: 12px;
  }
  p {
    font-size: 22px;    
  }
`;


const ReviewImage = styled.img`
  width: 100%;
  height: 200px; // 또는 원하는 높이
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
`;

const ReviewTitle = styled.h3`
  font-weight: bold;
  color: #333;
`;

const ReviewContent = styled.p`
  color: #666;
`;

const ReviewInfo = styled.p`
  margin: 0;
  font-size: 18px;
  color: #777777;
  
  span {
    font-size: 18px;
  }
`;
const Author = styled.span`
  //display: block; // 블록 요소로 만들어 줄바꿈 효과 적용
`;

const Date = styled.span`
  //display: block; // 블록 요소로 만들어 줄바꿈 효과 적용
`;


const MainPage = () => {
    const [recruitments, setRecruitments] = useState([]);
    const [themeCourses, setThemeCourses] = useState([]); // 추가된 부분
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

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

    const handleReviewClick = (reviewId) => {
        navigate(`/reviewContent/${reviewId}`);
    }

    const handleReview = () => {
        navigate(`/review`);
    }

    const handleRecruit = () => {
        navigate(`/recruit`);
    }

    const handleCourse = () => {
        navigate(`/newcourse`);
    }

    return (
        <div>
            <MainContainer>
                <div>
                    <SwiperStyle
                        spaceBetween={50}
                        slidesPerView={1}
                        centeredSlides={true}
                        pagination={{clickable : true}}
                        autoplay= {{delay:4000}}>
                        <SwiperSlide>
                            <StyledImage src={banner1} alt="banner1"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StyledImage src={banner2} alt="banner2"/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <StyledImage src={banner3} alt="banner3"/>
                        </SwiperSlide>
                    </SwiperStyle>
                </div>
                <div className="content-wrapper" >
                <SectionContainer>
                    <TitleStyle>테마별 코스</TitleStyle>
                    <div className="sub-title">
                        <SubTitleStyle>원하는 테마를 선택하세요</SubTitleStyle>
                        <DetailButton onClick={handleCourse}>더보기 ></DetailButton>
                    </div>

                    <Link to={`/newcourse`}>
                    <SwiperSection
                        images={[theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8]} sec={10000} />
                    </Link>
                </SectionContainer>

                <SectionContainer>
                    <TitleStyle>지역별 코스</TitleStyle>
                    <div className="sub-title">
                    <SubTitleStyle>지역별로 분류된 코스</SubTitleStyle>
                    <DetailButton onClick={handleCourse}>더보기 ></DetailButton>
                    </div>
                    <Link to={`/newcourse`}>
                        <SwiperSection images={[region1, region2, region3, region4, region5, region6, region7, region8]} sec={20000} />
                    </Link>
                </SectionContainer>

                <SectionContainer>
                    <TitleStyle>모집일정</TitleStyle>
                    <div className="sub-title">
                        <SubTitleStyle>여행 계획에 맞는 일자리를 찾아보세요</SubTitleStyle>
                        <DetailButton onClick={handleRecruit}>더보기 ></DetailButton>
                    </div>
                    <RecruitmentSchedule
                        schedule={recruitments
                            .slice(0, 5)
                            .map((recruitment) => ({
                                id: recruitment.job_id,
                                title: recruitment.title.length > 25
                                    ? `${recruitment.title.substring(0, 25)}...`
                                    : recruitment.title,
                                date: recruitment.startDate,
                                image: recruitment.image[0]
                            }))}
                    />
                </SectionContainer>

                <ReviewContainer>
                    <TitleStyle>체험 후기</TitleStyle>
                    <div className="sub-title">
                        <SubTitleStyle>다양한 체험 후기를 들어보세요</SubTitleStyle>
                        <DetailButton onClick={handleReview}>더보기 ></DetailButton>
                    </div>
                    <ReviewCardContainer>
                        {reviews.map((review) => (
                            <ReviewItem2 key={review.reviewId} onClick={() => handleReviewClick(review.reviewId)}>
                                <ReviewImage src={review.reviewImage || noImage} alt={review.reviewTitle} />
                                <ReviewTitle>{review.reviewTitle}</ReviewTitle>
                                <div className="review-info-box">
                                    <ReviewContent>{review.reviewContent}</ReviewContent>
                                    <ReviewInfo>
                                        <ReviewInfo>
                                            <Author>작성자: {review.userId}</Author>
                                            <Date>작성일: {review.reviewWriteDate}</Date>
                                        </ReviewInfo>
                                    </ReviewInfo>
                                </div>
                            </ReviewItem2>
                        ))}
                    </ReviewCardContainer>
                </ReviewContainer>
                </div>
            </MainContainer>
            <Footer />
        </div>
    );
};

const SwiperSection = ({ images, sec }) => {
    const SwiperSlideInner = styled.div`
      overflow: hidden;
      height: 450px;
      border-radius: 12px;
      transition: all 0.3s;
      
      &:hover {
        transform: translateY(-10px);
      }

      @media (max-width: 1400px) {
        height: 350px;
      }
      @media (max-width: 1200px) {
        height: 280px;
      }
    `;

    return (
        <SwiperContainer>
            <Swiper

                breakpoints={{

                    768:{
                        slidesPerView:2
                    },
                    1024:{
                        slidesPerView:3
                    }

                }}
                spaceBetween={30}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 300,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop = {true}
                centeredSlides={true}
                speed={sec}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <SwiperSlideInner>
                            <SlideImage src={image} alt={`slide-${index}`} />
                        </SwiperSlideInner>
                    </SwiperSlide>
                ))}
            </Swiper>
        </SwiperContainer>
    );
};

const RecruitmentSchedule = ({ schedule }) => {
    const navigate = useNavigate();

    const handleRecruitmentClick = (recruitmentId) => {
        navigate(`/recruit/${recruitmentId}`);
    };

    return (
        <RecruitmentGrid>
            {schedule.map((item) => (
                <RecruitmentCard key={item.id} onClick={() => handleRecruitmentClick(item.id)}>
                    <CardImage src={item.image && item.image.length > 0 ? item.image : noImage} alt={item.title} />
                    <CardContent>
                        <RecruitmentTitle>
                            {item.title}
                            <RecruitmentDate>{item.date}</RecruitmentDate>
                        </RecruitmentTitle>
                    </CardContent>
                </RecruitmentCard>
            ))}
        </RecruitmentGrid>
    );
};


const RecruitmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e1e1e1;
`;

const RecruitmentTitle = styled.h3`
  font-weight: bold;
  color: #333;
  width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`;

const RecruitmentDate = styled.div`
  color: #666;
  font-size: 20px;
  margin-top: 1rem;
`;

const RecruitmentGrid = styled.div`
  display: flex;
  gap: 40px;
`;

const RecruitmentCard = styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  padding: 20px; // 내부 여백 추가
  cursor : pointer;
  flex: 1 0 calc((100% - 80px) / 3);
  
  &:hover {
    transform: translateY(-5px) scale(1.04);
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px; // 이미지 높이 조정
  margin-bottom: 8px;
  object-fit: cover;
  border-radius: 12px;
  transition: all 0.3s;
`;

const CardContent = styled.div`
  padding: 15px 0;
`;

const SwiperStyle = styled(Swiper)`
  height: 500px;
`;

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export default MainPage;
