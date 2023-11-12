import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigate from "./Components/Navigate";
import MainPage from "./Pages/MainPage";
import AnnouncementPage from "./Pages/AnnouncementPage";
import LoginPage from "./Pages/SigninPage"
import RegisterPage from "./Pages/SignupPage"
import NewPage from "./Pages/NewPage";
import RecommendPage from "./Pages/RecommendPage";
import ThemePage from "./Pages/ThemePage";
import RegionPage from "./Pages/RegionPage";
import ReviewPage from "./Pages/ReviewPage";
import NoticePage from "./Pages/NoticePage";

function RecommendCourse() {
    return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigate/>
        <Routes>
          <Route path = "/" element={<MainPage/>}></Route>
            <Route path ="/Announcement" element={<AnnouncementPage/>}></Route>
            <Route path = "/login" element={<LoginPage />}></Route>
            <Route path = "/register" element={<RegisterPage />}></Route>

            <Route path = "/newcourse" element={<NewPage />}></Route>
            <Route path = "/recommendcourse" element={<RecommendPage />}></Route>
            <Route path = "/themecourse" element={<ThemePage />}></Route>
            <Route path = "/regioncourse" element={<RegionPage />}></Route>
            <Route path = "/review" element={<ReviewPage />}></Route>
            <Route path = "/notice" element={<NoticePage />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
