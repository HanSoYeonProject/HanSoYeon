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
    const NewPageButton = () => {
        navigate("/newcourse");
    }
    const ReCommendPageButton = () => {
        navigate("/recommendcourse");
    }
    const ThemaPageButton = () => {
        navigate("/themecourse");
    }
    const RegionPageButton = () => {
        navigate("/regioncourse");
    }
    const ReviewPageButton = () => {
        navigate("/review");
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
                position: "absolute",
                width: "100%",
                zIndex: "5"
            }}>
                <Navbar.Brand>
                    <Nav_Str>
                        <UserImg onClick={MainButton}>
                            <img className="logoImage" alt="Logo" src={logo}/>
                        </UserImg>
                        <PageNav style={{marginRight: `${size}rem`}}>
                            <NewPageInfo onClick={NewPageButton}>신규 코스</NewPageInfo>
                            <RecommendPageInfo onClick={ReCommendPageButton}>추천 코스</RecommendPageInfo>
                            <ThemaPageInfo onClick={ThemaPageButton}>테마별 코스</ThemaPageInfo>
                            <RegionPageInfo onClick={RegionPageButton}>지역별 코스</RegionPageInfo>
                            <ReviewPageInfo onClick={ReviewPageButton}>체험 후기</ReviewPageInfo>
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
                                <>
                                    <Button color="inherit" variant="light" onClick={handleLogin}
                                            style={{marginRight: '0.5rem'}}>로그인</Button>
                                    <Button color="inherit" variant="light" onClick={handleSignUp}>회원가입</Button>
                                </>
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
const NewPageInfo = styled.button`
  margin-right: 3rem;
  border: none;
  background: none;
  font-weight: 600;
  `

const UserImg = styled.button`
  background: none;
  border: none;
  position: relative;
  left: 2rem;
  
  img {
    width: 10rem;
    height: 5rem;
  }
`;

const Nav_Str = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
`

const PageNav = styled.div`
  display: flex;
  flex: 8;
  align-items: center;
  justify-content: center;
  margin-right: 15rem;
  margin-left: 3rem;
`
const RecommendPageInfo = styled.button`
  margin-right: 3rem;
  border: none;
  background-color: white;
  font-weight: 600;
`
const ThemaPageInfo = styled.button`
  margin-right: 3rem;
  border: none;
  background-color: white;
  font-weight: 600;
`
const RegionPageInfo = styled.button`
  margin-right: 3rem;
  border: none;
  background-color: white;
  font-weight: 600;
`
const ReviewPageInfo = styled.button`
  margin-right: 3rem;
  border: none;
  background-color: white;
  font-weight: 600;
`
const AnnouncementPageInfo = styled.button`
  margin-right: 3rem;
  border: none;
  background-color: white;
  font-weight: 600;
`
export default Navigate;