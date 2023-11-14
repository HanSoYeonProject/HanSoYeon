import React, { useState, useEffect } from 'react';
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
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { user, setUser } = useUserStore();

    const isLoggedIn = cookies.token && user;
    const userType = cookies.userType;

    useEffect(() => {
        console.log(cookies.token)
        if (cookies.token) {
            axios.get('http://localhost:8050/api/auth/currentUser', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }).then(response => {
                setUser(response.data);
                console.log(user)
            }).catch(error => {
                console.error("Error fetching user data:", error);
                handleLogout();
            });
        }
    }, []);
    useEffect(() => {
        console.log("Updated user:", user);
    }, [user]);


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

    const getProfilePicSrc = () => {
        if (user.userProfile === "hansoyeon/src/imgs/default_profile.png" || !user.userProfile) {
            return defaultProfilePic;
        }
        return user.userProfile;
    };

    return (

        <Navbar fixed="top" style={{ position: "fixed", backgroundColor: "white", boxShadow: "1.5px 1.5px 1.5px 1.5px #F3F4F6", width: "100%", zIndex: "1000" }}>
            <NavContainer>
                <Navbar.Brand >
                    <UserImg onClick={MainButton}>
                        <LogoImg alt="Logo" src={logo} />
                    </UserImg>
                </Navbar.Brand>
                <div>
                    {isLoggedIn ? (
                        <>
                                <ProfileSection>
                                    {userType === 'company' ?
                                        <Badge bg="primary" style={{ marginRight: '20px', fontSize: "16px" }}>기업 회원</Badge>
                                        :
                                        <Badge bg="primary" style={{ marginRight: '20px', fontSize: "16px" }}>일반 회원</Badge>
                                    }
                                    <span style={{ marginRight: '20px', fontSize: '19px' }}>{user.userName + "님" || 'No Name'}</span>
                                    <StyledDropdown>
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <ProfileImage src={getProfilePicSrc()} alt="Profile" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#action/3.1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#action/3.2">Another action</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </StyledDropdown>
                                </ProfileSection>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" variant="light" onClick={handleLogin} style={{ marginRight: '0.5rem' }}>로그인</Button>
                            <Button color="inherit" variant="light" onClick={handleSignUp}>회원가입</Button>
                        </>
                    )}
                </div>
            </NavContainer>
        </Navbar>
    )
}

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
  cursor: pointer;
`;

const UserImg = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Nav_Str = styled.div`

  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-between;
  align-items: center;
  
`

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
`;

const StyledDropdown = styled(Dropdown)`
    .dropdown-toggle::after {
        display: none;
    }
`;

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={{ marginRight: '30px' }}
    >
        {children}
    </a>
));

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
`;

export default Navigate;