import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';
import axios from "axios";
import AboutPage from "../Pages/AboutPage";
import RecruitPage from "../Pages/RecruitPage";

const Navigate = () => {
    const navigate = useNavigate();
    const [size, setSize] = useState("12");
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const isLoggedIn = cookies.token && user;
    const userType = cookies.userType;


    useEffect(() => {
        if (cookies.token) {
            axios.get('http://localhost:8050/api/auth/currentUser', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }).then(response => {
                console.log(cookies.token)
                // 토큰이 유효한 경우
                const fetchedUser = response.data;
                console.log(fetchedUser)
                setUser(fetchedUser);
            }).catch(error => {
                // 토큰이 유효하지 않은 경우
                console.error("Token verification failed:", error);
                handleLogout();
            });
        }
    }, []);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const MainButton = () => {      //로고 클릭시 메인페이지 이동
        navigate("/");
    }

    const handleLogin = () => {
        navigate("/login")
    };

    const handleSignUp = () => {
        navigate("/register")
    };
    const handleMyInfo = () => {
        navigate("/MyInfo")
    };
    const CoursePageButton = () => {
        navigate("/newcourse");
    }
    const AboutPageButton = () => {
        navigate("/about");
    }
    const ReviewPageButton = () => {
        navigate("/review");
    }
    const RecruitPageButton = () => {
        navigate("/recruit");
    }
    const AnnouncementListPageButton = () => {
        navigate("/announcementlist");
    }

    const getProfilePicSrc = () => {
        if (user.userProfile === "hansoyeon/src/imgs/default_profile.png" || !user.userProfile) {
            return defaultProfilePic;
        }
        return user.userProfile;
    };

    return (
        <TopNav>
            <Navbar style={{
                display: "flex",
                flex: "1",

            }}>
                <Navbar.Brand>
                    <Nav_Str>
                        <UserContainer>
                        <UserImg onClick={MainButton}>
                            <img className="logoImage" alt="Logo" src={logo}/>
                        </UserImg>
                        </UserContainer>
                        <PageNav style={{marginRight: `${size}rem`}}>
                            <AboutPageInfo onClick={AboutPageButton}>한소연이란?</AboutPageInfo>
                            <CoursePageInfo onClick={CoursePageButton}>코스</CoursePageInfo>
                            <RecruitPageInfo onClick={RecruitPageButton}>모집 일정</RecruitPageInfo>
                            <ReviewButton onClick={ReviewPageButton}>체험 후기</ReviewButton>
                            <AnnouncementPageInfo onClick={AnnouncementListPageButton}>공지 사항</AnnouncementPageInfo>
                        </PageNav>
                        <div>
                            {isLoggedIn ? (
                                <>
                                    <ProfileSection>
                                        {userType === 'company' ?
                                            <Badge bg="primary" style={{marginRight: '20px', fontSize: "16px"}}>기업
                                                회원</Badge>
                                            :
                                            <Badge bg="success" style={{marginRight: '20px', fontSize: "16px"}}>VVIP
                                                </Badge>
                                        }
                                        <span style={{
                                            marginRight: '20px',
                                            fontSize: '19px'
                                        }}>{user.userName + "님" || 'No Name'}</span>
                                        <StyledDropdown>
                                            <Dropdown.Toggle as={CustomToggle}>
                                                <ProfileImage src={getProfilePicSrc()} alt="Profile"/>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={handleMyInfo}>내 정보</Dropdown.Item>
                                                <Dropdown.Item href="#action/3.2">스케줄러</Dropdown.Item>
                                                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </StyledDropdown>
                                    </ProfileSection>
                                </>
                            ) : (
                                <MypageConatiner>
                                    <Button color="inherit" variant="light" onClick={handleLogin}
                                            style={{marginRight: '0.5rem', width: "90px", height: "35px", fontWeight: "600"}}>로그인</Button>
                                    <Button color="inherit" variant="light" onClick={handleSignUp}
                                    style={{ width: "90px", height: "35px", fontWeight: "600"}}>회원가입</Button>
                                </MypageConatiner>
                            )}
                        </div>
                    </Nav_Str>
                </Navbar.Brand>
            </Navbar>
        </TopNav>
    )
}

const TopNav = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #dee2e6;
`
const StyledDropdown = styled(Dropdown)`
      .dropdown-toggle::after {
        display: none;
      }
    `;


const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={{marginRight: '30px'}}
    >
        {children}
    </a>
));
const ProfileSection = styled.div`
      display: flex;
      align-items: center;
    `;
const ProfileImage = styled.img`
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
    `;

const UserContainer = styled.div`
  display: flex;
  flex: 2;
  height: 80px;
  align-items: center;
  justify-content: center;
`
const UserImg = styled.button`
  background: none;
  border: none;
  position: relative;
  left: 2rem;
  
  img {
    width: 200px;
    height: 80px;
  }
`;

const Nav_Str = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: center;
`

const PageNav = styled.div`
  display: flex;
  flex: 6;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  margin-left: 4rem;
`
const MypageConatiner = styled.div`
  display: flex;
  flex: 2;
  margin-right: 2rem;
  height: 80px;
  justify-content: center;
  align-items: center;
`
const AboutPageInfo = styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 28px;
  color: #D1774C;
`
const CoursePageInfo = styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 28px;
  color: #D1774C;
`
const RecruitPageInfo =styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 28px;
  color: #D1774C;
`
const ReviewButton = styled.button`
  border: none;
  background: none;
  font-weight: 600;
  font-size: 28px;
  background-color: white;
  color: #D1774C;
  `
const AnnouncementPageInfo = styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 28px;
  color: #D1774C;
`
export default Navigate;