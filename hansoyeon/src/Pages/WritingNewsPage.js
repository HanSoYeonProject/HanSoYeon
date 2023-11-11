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
        <form onSubmit={handleSubmit}>
            <MiddleContainer>
            <Title>
                <label>글 제목: </label>
                <input type={"text"} value={title} onChange={handleInputTitle} />
            </Title>
            <WriterContainer>
                <label>작성자: {writer} </label>
            </WriterContainer>
            <ContentContainer>
                <label>글 내용: </label>
                <textarea value={content} onChange={handleInputContent} />
            </ContentContainer>
            <SubmitButton>
            <button type="submit">글 작성</button>
            </SubmitButton>
            </MiddleContainer>
        </form>
        </Container>
    )
};

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 700px;
  background-color: wheat;
  margin-top: 1rem;
`
const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 300px;
  background-color: red;
`

const Title = styled.div`
background-color: #61dafb;
`

const WriterContainer = styled.div`
background-color: green;
`

const ContentContainer = styled.div`
background-color: gray;
`
const SubmitButton = styled.div`
  width: 70px;
  height: 30px;
`

export default WritingNewsPage;