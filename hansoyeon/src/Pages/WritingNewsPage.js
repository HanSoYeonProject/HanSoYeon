import React, {useState} from "react";
import styled from "styled-components";

const WritingNewsPage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleInputTitle = e => {
        setTitle(e.target.value);
    }

    const handleInputContent = e => {
        setContent(e.target.value);
    }

    const writer = "관리자";

    const handleSubmit = e => {
        e.preventDefault();

        const newsPost = {
            title,
            writer: writer,
            content
        };

    }

    return (
        <Container>
            <NoticeTitleContainer>
                공지사항
            </NoticeTitleContainer>
            <form onSubmit={handleSubmit}>
                <MiddleContainer>
                    <Title>
                        <label>글 제목 : </label>
                        <input type={"text"} value={title} onChange={handleInputTitle}/>
                    </Title>
                    <WriterContainer>
                        <label>작성자 : {writer} </label>
                    </WriterContainer>
                    <ContentContainer>
                        <label>글 내용 : </label>
                        <textarea value={content} onChange={handleInputContent}/>
                    </ContentContainer>
                    <ButtonContainer>
                    <SubmitButton type="submit">글 작성</SubmitButton>
                    </ButtonContainer>
                </MiddleContainer>
            </form>
        </Container>
    )
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 700px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 800px;
  height: 500px;
`

const NoticeTitleContainer = styled.div`
  font-size: 40px;
  font-weight: 700;
  width: 800px;
  display: flex;
  margin-bottom: 1rem;
`
const Title = styled.div`
  display: flex;
  flex: 1;
  font-size: 20px;
  align-items: center;

  input {
    width: 700px;
    margin-left: 1rem;
  }
`

const WriterContainer = styled.div`
  display: flex;
  font-size: 20px;
  flex: 1;
  align-items: center;
`

const ContentContainer = styled.div`
  display: flex;
  flex: 7;
  font-size: 20px;
  align-items: center;

  textarea {
    width: 700px;
    height: 350px;
    margin-left: 1rem;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`
const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: #007bff;
  width: 70px;
  height: 30px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3; /* 마우스 호버 시 배경색 변경 */
  }
`

export default WritingNewsPage;