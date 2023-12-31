import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigate from "./Components/Navigate";
import MainPage from "./Pages/MainPage";
import AnnouncementContentPage from "./Pages/AnnouncementContentPage";
import AnnouncementListPage from "./Pages/AnnouncementListPage";
import LoginPage from "./Pages/SigninPage"
import RegisterPage from "./Pages/SignupPage"
import MemberSignUpPage from "./AuthPage/MemberSignupPage";
import GoogleCallbackPage from "./AuthPage/GoogleLoginPage"
import CompanySignUpPage from "./AuthPage/CompanySignupPage";
import ApprovalPage from "./Pages/ApprovalPage";
import MyInfoPage from "./Pages/MyInfoPage";
import InfoChange from "./Pages/InfoChangePage";
import CompanyInfoChange from "./Pages/CompanyInfoChangePage";
import WritingNewsPage from "./Pages/WritingNewsPage";
import NewPage from "./Pages/NewPage";
import RecommendPage from "./Pages/RecommendPage";
import ThemePage from "./Pages/ThemaPage";
import RegionPage from "./Pages/RegionPage";
import ReviewPage from "./Pages/ReviewPage";
import AboutPage from "./Pages/AboutPage";
import RecruitPage from "./Pages/RecruitPage";
import InputSkill from './Components/InputSkill';
import WritingReviewPage from "./Pages/WritingReviewPage";
import ReviewContentPage from './Pages/ReviewContentPage';
import AboutPolicyPage from "./Pages/AboutPolicyPage";
import WritingRecruitPage from "./Pages/WritingRecruitPage";
import RecruitViewPage from "./Pages/RecruitViewPage";
import MemberManagePage from "./Pages/MemberManagePage";
import CompanyManagePage from "./Pages/CompanyManagePage";
import GeneralManagePage from "./Pages/GeneralManagePage";
import BlackListPage from "./Pages/BlackListPage";
import CompanyMatchingPage from "./Pages/CompanyMatchingPage";
import FriendListPage from "./Pages/FriendListPage";
import BlackListCompanyPage from "./Pages/BlackListCompanyPage";
import RecruitApplicationPage from "./Pages/RecruitApplicationPage";
import RecruitApplicationHistoryPage from "./Pages/RecruitApplicationHistoryPage";
import SchedulerPage from "./Pages/SchedulerPage";
import AdminMatchingPage from "./Pages/AdminMatchingPage";
import ReviewChangePage from "./Pages/ReviewChangePage";
import Payment from "./Pages/Payment";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigate/>
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/about" element={<AboutPage/>}></Route>
                    <Route path="/announcementcontent/:anno_id" element={<AnnouncementContentPage/>}></Route>
                    <Route path="/announcementlist" element={<AnnouncementListPage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/register" element={<RegisterPage/>}></Route>
                    <Route path="/memberRegister" element={<MemberSignUpPage/>}></Route>
                    <Route path="/googleCallback" element={<GoogleCallbackPage/>}></Route>
                    <Route path="/companyRegister" element={<CompanySignUpPage/>}></Route>
                    <Route path="/approval" element={<ApprovalPage/>}></Route>
                    <Route path="/MyInfo" element={<MyInfoPage/>}></Route>
                    <Route path="/infoChange" element={<InfoChange/>}></Route>
                    <Route path="/memberManage" element={<MemberManagePage/>}></Route>
                    <Route path="/companyManage" element={<CompanyManagePage/>}></Route>
                    <Route path="/generalManage" element={<GeneralManagePage/>}></Route>
                    <Route path="/companyInfoChange" element={<CompanyInfoChange/>}></Route>
                    <Route path="/newcourse" element={<NewPage/>}></Route>
                    <Route path="/writingNewsPage" element={<WritingNewsPage/>}></Route>
                    <Route path="/recommendcourse" element={<RecommendPage/>}></Route>
                    <Route path="/review" element={<ReviewPage/>}></Route>
                    <Route path="/recruit" element={<RecruitPage/>}></Route>
                    <Route path="/writeReview" element={<WritingReviewPage/>}></Route>
                    <Route path="/reviewContent/:id" element={<ReviewContentPage/>}/>
                    <Route path="/aboutPolicy" element={<AboutPolicyPage/>}/>
                    <Route path="/recruit/:id" element={<RecruitViewPage/>}></Route>
                    <Route path="/recruit/write" element={<WritingRecruitPage/>}/>
                    <Route path="/BlackListManage" element={<BlackListPage/>}></Route>
                    <Route path="/matchCompany" element={<CompanyMatchingPage/>}></Route>
                    <Route path="/FriendList" element={<FriendListPage/>}></Route>
                    <Route path="/companyBlackList" element={<BlackListCompanyPage/>}></Route>
                    <Route path="/recruitApply" element={<RecruitApplicationPage/>}></Route>
                    <Route path="/recruitHistory" element={<RecruitApplicationHistoryPage />}></Route>
                    <Route path="/scheduler" element={<SchedulerPage/>}></Route>
                    <Route path="/matchAdmin" element={<AdminMatchingPage/>}></Route>
                    <Route path="/reviewEdit/:id" element={<ReviewChangePage/>}></Route>
                    <Route path="/payment" element={<Payment/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
