
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigate from "./Components/Navigate";
import MainPage from "./Pages/MainPage";
import AnnouncementPage from "./Pages/AnnouncementPage";




//파일명
function App() {
//자바스크립트를 쓸 영역(컴포넌트 안)

//jsx
  return (
    <div className="App">
      <BrowserRouter>
      <Navigate/>
        <Routes>
            <Route path = "/" element={<MainPage/>}></Route>
            <Route path ="/Announcement" element={<AnnouncementPage/>}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
