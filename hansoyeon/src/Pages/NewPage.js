import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import sharing from "../imgs/sharing.png"
import bookmark from "../imgs/bookmark.png"
import hart from "../imgs/hart.png"
import winter from "../imgs/winter.jpg";

const NewPage = (props) => {

    const handleSharingClick = () => {
        console.log("Click");
    }
    const handleBookmarkClick = () => {
        console.log("Click2");
    }
    const handleHartClick = () => {
        console.log("Click3");
    }
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <Container>
            <TopContainer>
                    <TopImage className="NewCourse" alt="Title" src={winter} />
            </TopContainer>
                <MiddleContainer>
                    <MiddleTopContainer>
                        <ThreeImgs>
                            <StyledButton onClick={handleSharingClick}>
                                <StyledImage className="sharing" alt="sharing" src={sharing}/>
                            </StyledButton>
                            <StyledButton onClick={handleBookmarkClick}>
                                <StyledImage className="bookmark" alt="bookmark" src={bookmark}/>
                            </StyledButton>
                            <StyledButton onClick={handleHartClick}>
                                <StyledImage className="hart" alt="hart" src={hart}/>
                            </StyledButton>
                        </ThreeImgs>
                    </MiddleTopContainer>
                    <MiddleBottomContainer>
                        <NewCourseContainer>
                            <NewCourseTitle>신규 코스</NewCourseTitle>
                        </NewCourseContainer>
                    </MiddleBottomContainer>
                </MiddleContainer>
            <BottomContainer>
                <MenuContainer>
                    <MenuTitle>
                        <TabButton onClick={() => { handleTabClick(1); console.log("Tab 1 clicked"); }} className={activeTab === 1 ? 'active' : ''}>정보</TabButton>
                        <TabButton onClick={() => { handleTabClick(2); console.log("Tab 2 clicked"); }} className={activeTab === 2 ? 'active' : ''}>여행지</TabButton>
                        <TabButton onClick={() => { handleTabClick(3); console.log("Tab 3 clicked"); }} className={activeTab === 3 ? 'active' : ''}>갤러리</TabButton>
                        <TabButton onClick={() => { handleTabClick(4); console.log("Tab 4 clicked"); }} className={activeTab === 4 ? 'active' : ''}>후기</TabButton>
                    </MenuTitle>
                </MenuContainer>
                <SmallTitleContainer>
                    <SmallTitle>
                        <SmallTitleContent>[차 한잔으로 완성되는 휴식, 김포다도박물관]</SmallTitleContent>
                    </SmallTitle>
                    <SmallTag>
                     {/*이부분에 InputSkill 추가하면됨*/}
                    </SmallTag>
                </SmallTitleContainer>
                <ContentContainer>
                    <ContentTitleContainer>
                        <ContentSmallTitleContainer>모집 일정</ContentSmallTitleContainer>
                    </ContentTitleContainer>
                    <ContentMainContainer>
                        <ContentMainTextContainer>
                            <ContentTitle>
                                <h2>웹 디자이너</h2>
                                <h3>(경력)</h3>
                            </ContentTitle>
                            <ContentMemory>
                                <h2>이런 일을 해요</h2>
                                <ul>
                                    <li>11</li>
                                    <li>22</li>
                                    <li>33</li>
                                </ul>
                            </ContentMemory>
                        </ContentMainTextContainer>
                    </ContentMainContainer>
                </ContentContainer>
            </BottomContainer>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: column;
  background-color: blue;
`
const TopImage = styled.img`
  height: 300px;
  width: 500px;
`
const TopContainer = styled.div`
  background-color: red;
  display: flex;
  flex: 2;
  flex-direction: column;
align-items: center;
justify-content: center
`
const MiddleContainer = styled.div`
  //background-color: orange;
  display: flex;
  flex-direction: column;
  flex: 1;
`
const MiddleTopContainer = styled.div`
  //background-color: blue;
  display: flex;
  flex: 2;
  justify-content: flex-end;
`
const ThreeImgs = styled.div`
  display: flex;
  flex-direction: row;
  background-color: gray;
  justify-content: space-between;
  align-items: center;
  margin-right: 2rem;
`
const StyledButton = styled.button`
  background: none;
  border: none;
`
const StyledImage = styled.img`
  width: 20px;
  height: 15px;
`
const MiddleBottomContainer = styled.div`
  background-color: pink;
  display: flex;
  flex: 8;
`

const NewCourseContainer = styled.div`
  display: flex;
  flex: 7;
  justify-content: center;
  align-items: center;
`
const NewCourseTitle = styled.div`
  font-size: 44px;
  color: orange;
  font-weight: 800;
  background-color: green;
`

const BottomContainer = styled.div`
  background-color: yellow;
  display: flex;
  flex-direction: column;
  flex: 7;
`
const MenuContainer = styled.div`
    display: flex;
    flex: 1;
  justify-content: center;
  background: #61dafb;
`
const MenuTitle = styled.div`
    display: flex;
    flex: 0.6;
    flex-direction: row;
    background-color: red;
    border-top: 2px solid gray;
    border-bottom: 2px solid gray;
    justify-content: space-around;
`
const TabButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin: 0 10px;

`;
const SmallTitleContainer = styled.div`
  background-color: purple;
  display: flex;
  flex-direction: column;
  flex: 2;
`
const SmallTitle = styled.div`
  display: flex;
  flex: 5;
  background-color: yellow;
  justify-content: center;
  align-items: center;
`
const SmallTitleContent = styled.div`
  display: flex;
  flex: 0.6;
  background-color: orange;
  font-size: 28px;
  font-weight: 700;  
`
const SmallTag = styled.div`
    display: flex;
  flex: 5;
  background-color: green;
`
const ContentContainer = styled.div`
  background-color: bisque;
  display: flex;
  flex-direction: column;
  flex: 7;
`
const ContentTitleContainer = styled.div`
  display: flex;
  flex: 1.5;
  background-color: gray;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  align-items: center;
`
const ContentSmallTitleContainer = styled.div`
  display: flex;
  flex: 0.6;
  background-color: aquamarine;
`
const ContentMainContainer = styled.div`
  display: flex;
  flex: 8.5;
  background-color: pink;
  justify-content: center;
`
const ContentMainTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: brown;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 1100px;
  height: 400px;
`
const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: flex-start;
  background-color: white;
h2 {
  color: dodgerblue;
  font-weight: 800;
  margin-left: 2rem;
  margin-top: 2rem;
}
  
  h3 {
    color: dodgerblue;
    font-weight: 600;
    margin-left: 2rem;
  }
`
const ContentMemory = styled.div`
  display: flex;
  flex: 8;
  flex-direction: column;
  background-color: yellow;
  align-items: flex-start;
  
  h2 {
    color: black;
    font-weight: 800;
    margin-left: 2rem;
    margin-top: 2rem;
  }
  ul {
    list-style-type: disc; /* 원형 글머리 기호 */
    margin-left: 2rem;
    margin-top: 2rem;
  }

  li {
    color: black;
    font-weight: 600;
    margin-bottom: 0.5em; /* 각 항목 사이의 간격 조절 */
  }

`



export default NewPage;