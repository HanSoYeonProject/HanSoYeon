import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigate from "./Components/Navigate";
import MainPage from "./Pages/MainPage";
import AnnouncementPage from "./Pages/AnnouncementPage";

function App() {
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
