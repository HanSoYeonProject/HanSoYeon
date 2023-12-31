import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import {useLocation, useNavigate} from 'react-router-dom';
import logo from '../imgs/logo5.png';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';
import axios from "axios";
import Payment from "../Pages/Payment";

const Navigate = () => {
    const { state } = useLocation();
    const [paymentData, setPaymentData] = useState(null);
    const [IMP, setIMP] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const [fetchedUser, setFetchedUser] = useState();
    const isLoggedIn = cookies.token && user;
    const userType = cookies.userType;
    const userID = user ? user.userId : '';

    const [size, setSize] = useState("10");

    useEffect(() => {
        if (cookies.token) {
            console.log(cookies.token)
            if(userType === "company"){
                axios.get('http://localhost:8050/api/auth/currentCompany', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(response => {
                    console.log(cookies.token)
                    // 토큰이 유효한 경우
                    const fetchedUser = response.data;
                    console.log(fetchedUser)
                    setUser(fetchedUser)
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }else{
                axios.get('http://localhost:8050/api/auth/currentUser', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`
                    }
                }).then(response => {
                    console.log(cookies.token)
                    // 토큰이 유효한 경우
                    const fetchedUser = response.data;
                    setUser(fetchedUser);
                }).catch(error => {
                    // 토큰이 유효하지 않은 경우
                    console.error("Token verification failed:", error);
                    handleLogout();
                });
            }
        }
    }, []);

    const handlePayment = () => {
        // 가맹점 식별
        const { IMP } = window;

        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: 100, // 결제 금액
            name: "한소연 매칭서비스 금액",
            buyer_name: fetchedUser.companyName,
            buyer_email: fetchedUser.providerEmail,
        };

        IMP.request_pay(data, (response) => callback(response, data));
    };
    // 결제창 띄우는 기능
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
        script.async = true;

        script.onload = () => {
            setIMP(window.IMP);
            window.IMP.init("imp64486410");
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    // 결제 성공 여부
    const callback = async (response, paymentData) => {
        const { success, error_msg } = response;
        if (success) {
            alert("결제 성공");
            if (paymentData) {
                try {
                    await axios.get(`http://localhost:8050/api/saveClass`, {
                        params: {
                            email: String(paymentData.buyer_email),
                            company: String(paymentData.buyer_name),
                            amount: String(paymentData.amount),
                            merchant_uid: String(paymentData.merchant_uid), //주문번호
                            apply_num: String(response.apply_num), //
                        },
                    }).then((res) => {
                        console.log("서버로 부터 받는 데이터: ", res.data);
                        if (res.data !== "400") {
                            navigate("/");
                        } else {
                            alert("해당 URI는 사용자 정보와 맞지 않습니다. ");
                        }
                    });
                } catch (error) {
                    console.error("서버에 요청하는 동안 오류 발생, error");
                }
            } else {
                console.error("결제 정보가 부족합니다.");
            }
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
        console.log(response);
    };

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const MainButton = () => {
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

    const handleFriendList = () => {
        navigate("/FriendList");
    }

    const handleScheduler = () => {
        navigate("/scheduler");
    }
    const handleMemberManage = () => {
        navigate("/memberManage")
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

    const handleBlacklist = () => {
        if (userType === 'company') {
            navigate("/companyBlackList");
        }else{
            navigate("/BlackListManage");
        }
    }

    const handleAdminApplyManage = () => {
        navigate("/matchAdmin");
    }

    const handleCompanyApplyManage = () => {
        navigate("/matchCompany");
    }
    const PaymentButton = () => {
        navigate("/payment", {state: {fetchedUser}});
    }
    const getProfilePicSrc = () => {
        if(userType === "company"){
            if (user.providerProfile === "hansoyeon/src/imgs/default_profile.png" || !user.providerProfile) {
                return defaultProfilePic;
            }
            return user.providerProfile;
        }else{
            if (user.userProfile === "hansoyeon/src/imgs/default_profile.png" || !user.userProfile) {
                return defaultProfilePic;
            }
            return user.userProfile;
        }
    }

    return (
        <TopNav>
            <Navbar style={{
                display: "flex",
                maxWidth: "1440px",
                width: "100%",
                padding: "0 20px"
            }}>
                <Navbar.Brand style={{
                    display: "block",
                    width: "100%",
                    margin: "0"
                }}>
                    <Nav_Str style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between"
                    }}>
                        <UserContainer>
                            <UserImg onClick={MainButton}>
                                <img className="logoImage" alt="Logo" src={logo}/>
                            </UserImg>
                        </UserContainer>
                        <PageNav>
                            <AboutPageInfo onClick={AboutPageButton}>한소연이란?</AboutPageInfo>
                            <CoursePageInfo onClick={CoursePageButton}>코스</CoursePageInfo>
                            <RecruitPageInfo onClick={RecruitPageButton}>모집 일정</RecruitPageInfo>
                            <ReviewButton onClick={ReviewPageButton}>체험 후기</ReviewButton>
                            <AnnouncementPageInfo onClick={AnnouncementListPageButton}>공지 사항</AnnouncementPageInfo>
                            {isLoggedIn && userType === 'company' && (
                                <PayButton onClick={PaymentButton}>결제</PayButton>

                            )}
                        </PageNav>
                        <div>
                            {isLoggedIn ? (
                                <>
                                    <ProfileSection>
                                        {userID === 'admin' ?
                                            <Badge bg="warning" style={{marginRight: '20px', fontSize: "16px"}}>관리자</Badge>
                                            :
                                            (userType === 'company' ?
                                                    <Badge bg="primary" style={{marginRight: '20px', fontSize: "16px"}}>기업 회원</Badge>
                                                    :
                                                    <Badge bg="success" style={{marginRight: '20px', fontSize: "16px"}}>일반 회원</Badge>
                                            )
                                        }

                                        {userType === 'company' ?
                                            <span style={{
                                                marginRight: '20px',
                                                fontSize: '19px'
                                            }}>{user.providerName + "님" || 'No Name'}</span>
                                            :
                                            <span style={{
                                                marginRight: '20px',
                                                fontSize: '19px'
                                            }}>{user.userName + "님" || 'No Name'}</span>
                                        }
                                        <StyledDropdown>
                                            <Dropdown.Toggle as={CustomToggle}>
                                                <ProfileImage src={getProfilePicSrc()} alt="Profile"/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={handleMyInfo}>내 정보</Dropdown.Item>
                                                {userID === 'admin' ? (
                                                    <>
                                                        <Dropdown.Item onClick={handleMemberManage}>회원관리</Dropdown.Item>
                                                        <Dropdown.Item onClick={handleAdminApplyManage}>신청현황</Dropdown.Item>
                                                        <Dropdown.Item onClick={handleBlacklist}>블랙리스트</Dropdown.Item>
                                                    </>
                                                ) : (
                                                    <>
                                                        {userType === 'company' && <Dropdown.Item onClick={handleCompanyApplyManage}>공고관리</Dropdown.Item>}
                                                    </>
                                                )}
                                                {userType === 'company' && (
                                                    <>
                                                        <Dropdown.Item onClick={handleBlacklist}>블랙리스트</Dropdown.Item>
                                                    </>
                                                )}
                                                {userType !== 'company' && userID !== 'admin' ? (
                                                    <>
                                                        <Dropdown.Item onClick={handleFriendList}>친구관리</Dropdown.Item>
                                                        <Dropdown.Item onClick={handleScheduler}>스케줄러</Dropdown.Item>
                                                    </>
                                                ) : null}
                                                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </StyledDropdown>
                                    </ProfileSection>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" variant="light" onClick={handleLogin}
                                            style={{marginRight: '0.5rem'}}>로그인</Button>
                                    <Button color="inherit" variant="light" style={{marginRight: '0.5rem'}} onClick={handleSignUp}>회원가입</Button>
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
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #dee2e6;
`

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  height: 10vh;
`;

const LogoImg = styled.img`
  height: 10vh;
  width: auto;
  margin-right: 60px;
  cursor: pointer;
`;

const UserImg = styled.button`
  background: none;
  border: none;
  position: relative;
  padding: 0;

  img {
    width: 250px;
  }
`;

const Nav_Str = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledDropdown = styled(Dropdown)`
  margin-right: 10px;
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

const PageNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
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
  font-size: 20px;
  &:hover {
    color: #D1774C;
  }
`
const CoursePageInfo = styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 20px;
  &:hover {
    color: #D1774C;
  }
`
const RecruitPageInfo =styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 20px;
  &:hover {
    color: #D1774C;
  }
`
const ReviewButton = styled.button`
  border: none;
  font-weight: 600;
  font-size: 20px;
  background-color: white;
  &:hover {
    color: #D1774C;
  }
`
const AnnouncementPageInfo = styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 20px;
  &:hover {
    color: #D1774C;
  }
`
const PayButton = styled.button`
  border: none;
  background-color: white;
  font-weight: 600;
  font-size: 20px;
  &:hover {
    color: #D1774C;
  }
`
export default Navigate;