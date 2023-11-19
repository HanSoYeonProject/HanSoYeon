import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigate from "./Components/Navigate";
import MainPage from "./Pages/MainPage";
import AnnouncementPage from "./Pages/AnnouncementPage";
import LoginPage from "./Pages/SigninPage"
import RegisterPage from "./Pages/SignupPage"
import MemberSignUpPage from "./AuthPage/MemberSignupPage";
import GoogleCallbackPage from "./AuthPage/GoogleLoginPage"
import CompanySignUpPage from "./AuthPage/CompanySignupPage";
import MyInfoPage from "./Pages/MyInfoPage";
import InfoChange from "./Pages/InfoChangePage";

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
            <Route path = "/memberRegister" element={<MemberSignUpPage />}></Route>
            <Route path = "/googleCallback" element={<GoogleCallbackPage />}></Route>
            <Route path = "/companyRegister" element={<CompanySignUpPage />}></Route>
            <Route path = "/MyInfo" element={<MyInfoPage />}></Route>
            <Route path = "/infoChange" element={<InfoChange />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
