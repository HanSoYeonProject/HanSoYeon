import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import logo from '../imgs/logo.png';

const Navigate = () => {
    const navigate = useNavigate();

    const MainButton = () => {      //로고 클릭시 메인페이지 이동
        navigate("/");
    }
    return (

        <Navbar style={{position: "fixed", backgroundColor : "white", boxShadow : "1.5px 1.5px 1.5px 1.5px #F3F4F6", width: "100vw", height: "10vh", zIndex: "1000"}} >
                <Navbar.Brand>
                    <Nav_Str>
                        <UserImg onClick={MainButton}>
                            <LogoImg className="LogoImage" alt="LogoImage" src={logo}/>
                        </UserImg>
                    </Nav_Str>
                </Navbar.Brand>
                <Nav className="me-auto">

                </Nav>
        </Navbar>
    )
}

const Nav_Str = styled.div`

  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-between;
  align-items: center;
  
`
const LogoImg = styled.img`

  height: 10vh;
  width: 170px;// 원하는 크기로 조절해주세요.
`
const UserImg = styled.button`
  background: none;
  border: none;
  position: relative;
  left: 2rem;
  height: 10vh;

`


export default Navigate;