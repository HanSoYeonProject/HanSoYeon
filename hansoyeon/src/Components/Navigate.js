import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import logo from '../imgs/logo.png';
import NewPage from "../Pages/NewPage";
import RegionPage from "../Pages/RegionPage";
import AnnouncementListPage from "../Pages/AnnouncementListPage";

const Navigate = () => {
    const navigate = useNavigate();
    const [size, setSize] = useState("12");

    const MainButton = () => {      //로고 클릭시 메인페이지 이동
        navigate("/");
    }

    const handleLogin = () => {
        navigate("/login")
    };

    const handleSignUp = () => {
        navigate("/newcourse");
    };

    const NewPageButton = () => {
        navigate("/newcourse");
        console.log("click11");
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
                            <NewPageInfo onClick={NewPageButton} >신규 코스</NewPageInfo>
                            <RecommendPageInfo onClick={ReCommendPageButton}>추천 코스</RecommendPageInfo>
                            <ThemaPageInfo onClick={ThemaPageButton}>테마별 코스</ThemaPageInfo>
                            <RegionPageInfo onClick={RegionPageButton}>지역별 코스</RegionPageInfo>
                            <ReviewPageInfo onClick={ReviewPageButton}>체험 후기</ReviewPageInfo>
                            <AnnouncementPageInfo onClick={AnnouncementListPageButton}>공지 사항</AnnouncementPageInfo>
                        </PageNav>
                        <Button color="inherit" variant="light" onClick={handleLogin}
                                style={{marginRight: '0.5rem'}}>로그인</Button>
                        <Button color="inherit" variant="light" onClick={handleSignUp} style={{marginRight: '2rem'}}>회원가입</Button>
                    </Nav_Str>
                </Navbar.Brand>
            </Navbar>
        </TopNav>
    )
}

const TopNav = styled.div`
  height: 100px;
  
`
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