import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';

const Navigate = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { user, setUser } = useUserStore();

    const isLoggedIn = cookies.token && user;
    const userType = cookies.userType;

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
                            <Button variant="light" onClick={handleLogout}>로그아웃</Button>
                            {userType === 'company' ? <span>기업 회원</span> : <span>일반 회원</span>}
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

export default Navigate;