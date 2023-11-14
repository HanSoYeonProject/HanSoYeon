
import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigate from "./Components/Navigate";
import MainPage from "./Pages/MainPage";
import AnnouncementContentPage from "./Pages/AnnouncementContentPage";
import AnnouncementListPage from "./Pages/AnnouncementListPage";
import LoginPage from "./Pages/SigninPage"
import RegisterPage from "./Pages/SignupPage"
import WritingNewsPage from "./Pages/WritingNewsPage";
import NewPage from "./Pages/NewPage";
import RecommendPage from "./Pages/RecommendPage";
import ThemePage from "./Pages/ThemaPage";
import RegionPage from "./Pages/RegionPage";
import ReviewPage from "./Pages/ReviewPage";
import InputSkill from './Components/InputSkill';


//파일명
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigate/>
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/announcementcontent" element={<AnnouncementContentPage/>}></Route>
                    <Route path="/announcementlist" element={<AnnouncementListPage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/register" element={<RegisterPage/>}></Route>
                    <Route path="/newcourse" element={<NewPage/>}></Route>
                    <Route path="/writingNewsPage" element={<WritingNewsPage/>}></Route>
                    <Route path="/recommendcourse" element={<RecommendPage/>}></Route>
                    <Route path="/themecourse" element={<ThemePage/>}></Route>
                    <Route path="/regioncourse" element={<RegionPage/>}></Route>
                    <Route path="/review" element={<ReviewPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
