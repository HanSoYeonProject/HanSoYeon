// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import sharing from '../imgs/sharing.png';
// import bookmark from '../imgs/bookmark.png';
// import hart from '../imgs/hart.png';
// import ningning from '../imgs/ningning.jpeg';
//
// const RegionPage = (props) => {
//     // 공유
//     const handleSharingClick = () => {
//         console.log('Click');
//     };
//     // 북마크
//     const handleBookmarkClick = () => {
//         console.log('Click2');
//     };
//     // 좋아요
//     const handleHartClick = () => {
//         console.log('Click3');
//     };
//     const [activeTab, setActiveTab] = useState(1);
//
//     const handleTabClick = (tabNumber) => {
//         setActiveTab(tabNumber);
//     };
//
//     const renderTabContent = () => {
//         switch (activeTab) {
//             case 1:
//                 return (
//                     <>
//                         <TopContainer>
//                             <TopImage className="NewCourse" alt="Title" src={ningning} />
//                         </TopContainer>
//                         <MiddleContainer>
//                             <MiddleTopContainer>
//                                 <ThreeImgs>
//                                     <StyledButton onClick={handleSharingClick}>
//                                         <StyledImage className="sharing" alt="sharing" src={sharing} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleBookmarkClick}>
//                                         <StyledImage className="bookmark" alt="bookmark" src={bookmark} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleHartClick}>
//                                         <StyledImage className="hart" alt="hart" src={hart} />
//                                     </StyledButton>
//                                 </ThreeImgs>
//                             </MiddleTopContainer>
//                             <MiddleBottomContainer>
//                                 <NewCourseContainer>
//                                     <NewCourseTitle>지역별 코스</NewCourseTitle>
//                                 </NewCourseContainer>
//                             </MiddleBottomContainer>
//                         </MiddleContainer>
//                         <BottomContainer>
//                             <MenuContainer>
//                                 <MenuTitle>
//                                     <TabButton onClick={() => {handleTabClick(1);console.log('Tab 1 clicked');}} className={activeTab === 1 ? 'active' : ''}>정보</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(2);console.log('Tab 2 clicked');}} className={activeTab === 2 ? 'active' : ''}>여행지</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(3);console.log('Tab 3 clicked');}} className={activeTab === 3 ? 'active' : ''}>갤러리</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(4);console.log('Tab 4 clicked');}} className={activeTab === 4 ? 'active' : ''}>후기</TabButton>
//                                 </MenuTitle>
//                             </MenuContainer>
//                             <SmallTitleContainer>
//                                 <SmallTitle>
//                                     <SmallTitleContent>[와따마,, 다시봐도 으마무시하고마잉 ~?]</SmallTitleContent>
//                                 </SmallTitle>
//                                 <SmallTag>{/* 이부분에 InputSkill 추가하면됨 */}</SmallTag>
//                             </SmallTitleContainer>
//                             <ContentContainer>
//                                 <ContentTitleContainer>
//                                     <ContentSmallTitleContainer>모집 일정</ContentSmallTitleContainer>
//                                 </ContentTitleContainer>
//                                 <ContentMainContainer>
//                                     <ContentMainTextContainer>
//                                         <ContentTitle>
//                                             <h2>웹 디자이너</h2>
//                                             <h3>(경력)</h3>
//                                         </ContentTitle>
//                                         <ContentMemory>
//                                             <h2>이런 일을 해요</h2>
//                                             <ul>
//                                                 <li>11</li>
//                                                 <li>22</li>
//                                                 <li>33</li>
//                                             </ul>
//                                         </ContentMemory>
//                                     </ContentMainTextContainer>
//                                 </ContentMainContainer>
//                             </ContentContainer>
//                         </BottomContainer>
//                     </>
//                 );
//             case 2:
//                 return (
//                     <>
//                         <TopContainer>
//                             <TopImage className="NewCourse" alt="Title" src={ningning} />
//                         </TopContainer>
//                         <MiddleContainer>
//                             <MiddleTopContainer>
//                                 <ThreeImgs>
//                                     <StyledButton onClick={handleSharingClick}>
//                                         <StyledImage className="sharing" alt="sharing" src={sharing} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleBookmarkClick}>
//                                         <StyledImage className="bookmark" alt="bookmark" src={bookmark} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleHartClick}>
//                                         <StyledImage className="hart" alt="hart" src={hart} />
//                                     </StyledButton>
//                                 </ThreeImgs>
//                             </MiddleTopContainer>
//                             <MiddleBottomContainer>
//                                 {/*여기에 사진들추가*/}
//                             </MiddleBottomContainer>
//                         </MiddleContainer>
//                         <BottomContainer>
//                             <MenuContainer>
//                                 <MenuTitle>
//                                     <TabButton onClick={() => {handleTabClick(1);console.log('Tab 1 clicked');}} className={activeTab === 1 ? 'active' : ''}>정보</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(2);console.log('Tab 2 clicked');}} className={activeTab === 2 ? 'active' : ''}>여행지</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(3);console.log('Tab 3 clicked');}} className={activeTab === 3 ? 'active' : ''}>갤러리</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(4);console.log('Tab 4 clicked');}} className={activeTab === 4 ? 'active' : ''}>후기</TabButton>
//                                 </MenuTitle>
//                             </MenuContainer>
//                         </BottomContainer>
//                     </>
//                 );
//             case 3:
//                 return (
//                     <>
//                         <TopContainer>
//                             <TopImage className="NewCourse" alt="Title" src={ningning} />
//                         </TopContainer>
//                         <MiddleContainer>
//                             <MiddleTopContainer>
//                                 <ThreeImgs>
//                                     <StyledButton onClick={handleSharingClick}>
//                                         <StyledImage className="sharing" alt="sharing" src={sharing} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleBookmarkClick}>
//                                         <StyledImage className="bookmark" alt="bookmark" src={bookmark} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleHartClick}>
//                                         <StyledImage className="hart" alt="hart" src={hart} />
//                                     </StyledButton>
//                                 </ThreeImgs>
//                             </MiddleTopContainer>
//                             <MiddleBottomContainer>
//                                 {/*여기에 사진들추가*/}
//                             </MiddleBottomContainer>
//                         </MiddleContainer>
//                         <BottomContainer>
//                             <MenuContainer>
//                                 <MenuTitle>
//                                     <TabButton onClick={() => {handleTabClick(1);console.log('Tab 1 clicked');}} className={activeTab === 1 ? 'active' : ''}>정보</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(2);console.log('Tab 2 clicked');}} className={activeTab === 2 ? 'active' : ''}>여행지</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(3);console.log('Tab 3 clicked');}} className={activeTab === 3 ? 'active' : ''}>갤러리</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(4);console.log('Tab 4 clicked');}} className={activeTab === 4 ? 'active' : ''}>후기</TabButton>
//                                 </MenuTitle>
//                             </MenuContainer>
//                         </BottomContainer>
//                     </>
//                 );
//             case 4:
//                 return (
//                     <>
//                         <TopContainer>
//                             <TopImage className="NewCourse" alt="Title" src={ningning} />
//                         </TopContainer>
//                         <MiddleContainer>
//                             <MiddleTopContainer>
//                                 <ThreeImgs>
//                                     <StyledButton onClick={handleSharingClick}>
//                                         <StyledImage className="sharing" alt="sharing" src={sharing} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleBookmarkClick}>
//                                         <StyledImage className="bookmark" alt="bookmark" src={bookmark} />
//                                     </StyledButton>
//                                     <StyledButton onClick={handleHartClick}>
//                                         <StyledImage className="hart" alt="hart" src={hart} />
//                                     </StyledButton>
//                                 </ThreeImgs>
//                             </MiddleTopContainer>
//                             <MiddleBottomContainer>
//                                 {/*여기에 사진들추가*/}
//                             </MiddleBottomContainer>
//                         </MiddleContainer>
//                         <BottomContainer>
//                             <MenuContainer>
//                                 <MenuTitle>
//                                     <TabButton onClick={() => {handleTabClick(1);console.log('Tab 1 clicked');}} className={activeTab === 1 ? 'active' : ''}>정보</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(2);console.log('Tab 2 clicked');}} className={activeTab === 2 ? 'active' : ''}>여행지</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(3);console.log('Tab 3 clicked');}} className={activeTab === 3 ? 'active' : ''}>갤러리</TabButton>
//                                     <TabButton onClick={() => {handleTabClick(4);console.log('Tab 4 clicked');}} className={activeTab === 4 ? 'active' : ''}>후기</TabButton>
//                                 </MenuTitle>
//                             </MenuContainer>
//                         </BottomContainer>
//                     </>
//                 );
//             default:
//                 return null;
//         }
//     };
//
//     return <Container>{renderTabContent()}</Container>;
// };
//
// const Container = styled.div`
//   display: flex;
//   flex: 1;
//   height: 100vh;
//   flex-direction: column;
//   //background-color: blue;
// `;
// const TopImage = styled.img`
//   height: 300px;
//   width: 500px;
// `;
// const TopContainer = styled.div`
//   //background-color: red;
//   display: flex;
//   flex: 2;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;
// const MiddleContainer = styled.div`
//   //background-color: orange;
//   display: flex;
//   flex-direction: column;
//   flex: 1;
// `;
// const MiddleTopContainer = styled.div`
//   //background-color: blue;
//   display: flex;
//   flex: 2;
//   justify-content: flex-end;
// `;
// const ThreeImgs = styled.div`
//   display: flex;
//   flex-direction: row;
//   //background-color: gray;
//   justify-content: space-between;
//   align-items: center;
//   margin-right: 2rem;
// `;
// const StyledButton = styled.button`
//   background: none;
//   border: none;
// `;
// const StyledImage = styled.img`
//   width: 20px;
//   height: 15px;
// `;
// const MiddleBottomContainer = styled.div`
//   //background-color: pink;
//   display: flex;
//   flex: 8;
// `;
//
// const NewCourseContainer = styled.div`
//   display: flex;
//   flex: 7;
//   justify-content: center;
//   align-items: center;
// `;
// const NewCourseTitle = styled.div`
//   font-size: 44px;
//   color: orange;
//   font-weight: 800;
//   //background-color: green;
// `;
//
// const BottomContainer = styled.div`
//   //background-color: yellow;
//   display: flex;
//   flex-direction: column;
//   flex: 7;
// `;
// const MenuContainer = styled.div`
//   display: flex;
//   flex: 1;
//   justify-content: center;
//   //background: #61dafb;
// `;
// const MenuTitle = styled.div`
//   display: flex;
//   flex: 0.6;
//   flex-direction: row;
//   height: 50px;
//   //background-color: red;
//   border-top: 2px solid gray;
//   border-bottom: 2px solid gray;
//   margin-top: 1rem;
//   justify-content: space-around;
// `;
// const TabButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 24px;
//   margin: 0 10px;
//   position: relative;
//
//   // hover 효과
//   &:hover {
//     color: orange;
//     &::after {
//       content: "";
//       position: absolute;
//       left: 50%; /* 가운데 정렬을 위해 left 속성 수정 */
//       transform: translateX(-50%); /* 가운데 정렬을 위한 변환 적용 */
//       bottom: -2px;
//       width: 120px;
//       height: 3px;
//       background-color: orange;
//     }
//   }
//
//   // 선택된 탭의 스타일
//   &.active {
//     color: orange;
//     font-size: 32px;
//     font-weight: 700;
//     &::after {
//       content: "";
//       position: absolute;
//       left: 50%; /* 가운데 정렬을 위해 left 속성 수정 */
//       transform: translateX(-50%); /* 가운데 정렬을 위한 변환 적용 */
//       bottom: -2px;
//       width: 120px;
//       height: 3px;
//       background-color: orange;
//     }
//   }
// `;
//
// const SmallTitleContainer = styled.div`
//   //background-color: purple;
//   display: flex;
//   flex-direction: column;
//   flex: 2;
//   margin-top: 1rem;
// `;
// const SmallTitle = styled.div`
//   display: flex;
//   flex: 5;
//   //background-color: yellow;
//   justify-content: center;
//   align-items: center;
// `;
// const SmallTitleContent = styled.div`
//   display: flex;
//   flex: 0.6;
//   //background-color: orange;
//   font-size: 36px;
//   font-weight: 700;
// `;
// const SmallTag = styled.div`
//   display: flex;
//   flex: 5;
//   //background-color: green;
// `;
// const ContentContainer = styled.div`
//   //background-color: bisque;
//   display: flex;
//   flex-direction: column;
//   flex: 7;
// `;
// const ContentTitleContainer = styled.div`
//   display: flex;
//   flex: 1.5;
//   //background-color: gray;
//   justify-content: center;
//   font-size: 28px;
//   font-weight: 700;
//   align-items: center;
// `;
// const ContentSmallTitleContainer = styled.div`
//   display: flex;
//   flex: 0.6;
//   margin-top: 1rem;
// `;
// const ContentMainContainer = styled.div`
//   display: flex;
//   flex: 8.5;
//   justify-content: center;
//   align-items: flex-start; /* 세로 기준으로 top에 위치하도록 설정 */
// `;
// const ContentMainTextContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   //background-color: brown;
//   border-radius: 5px;
//   border: dodgerblue 5px solid;
//   margin-top: 1rem;
//   margin-bottom: 1rem;
//   width: 1100px;
//   height: 400px;
// `;
// const ContentTitle = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 2;
//   align-items: flex-start;
//   //background-color: white;
//   h2 {
//     color: dodgerblue;
//     font-weight: 800;
//     margin-left: 2rem;
//     margin-top: 2rem;
//   }
//
//   h3 {
//     color: dodgerblue;
//     font-weight: 600;
//     margin-left: 2rem;
//   }
// `;
// const ContentMemory = styled.div`
//   display: flex;
//   flex: 8;
//   flex-direction: column;
//   //background-color: yellow;
//   border-left: dodgerblue 3px solid;
//   align-items: flex-start;
//   h2 {
//     color: black;
//     font-weight: 800;
//     margin-left: 2rem;
//     margin-top: 2rem;
//     //background-color: red;
//   }
//   ul {
//     //background-color: gray;
//     display: block;
//     flex-direction: column;
//     list-style-type: disc; /* 원형 글머리 기호 */
//     margin-top: 1rem;
//   }
//
//   li {
//     font-size: 24px;
//     display: flex;
//     color: black;
//     font-weight: 600;
//     margin-bottom: 0.5em; /* 각 항목 사이의 간격 조절 */
//   }
// `;
//
// export default RegionPage;