import React, {useEffect} from 'react';
import styled from 'styled-components';
import sharing from "../imgs/sharing.png"
import bookmark from "../imgs/bookmark.png"
import hart from "../imgs/hart.png"

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
    return (
        <Container>
            <TopContainer>
                <TopTitleContainer>
                    1212321
                </TopTitleContainer>
                <BottomTitleContainer>
                    <NewCourseTitle>신규 코스
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
                    </NewCourseTitle>
                </BottomTitleContainer>
            </TopContainer>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  background-color: blue;
`

const TopContainer = styled.div`
  background-color: gray;
  height: 400px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

const TopTitleContainer = styled.div`
  background-color: pink;
  display: flex;
  flex: 7;
`
const BottomTitleContainer = styled.div`
  background-color: #61dafb;
  display: flex;
  flex-direction: row;
  flex: 3;
  justify-content: center;
  align-items: center;
`
const NewCourseTitle = styled.div`
  font-size: 40px;
  color: orange;
  font-weight: 800;
`
const ThreeImgs = styled.div`
  display: flex;
  flex-direction: row;
  background-color: gray;

`

const StyledButton = styled.button`
  background: none;
  border: none;
`
const StyledImage = styled.img`
  width: 30px;
  height: 30px;
`
export default NewPage;