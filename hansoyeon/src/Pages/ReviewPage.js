import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ReviewPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [reviews, setReviews] = useState([]);

    // 서버에서 리뷰 데이터 가져오기
    useEffect(() => {
        fetch('http://localhost:8050/api/reviews')
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    const ITEMS_PER_PAGE = 4;
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleWriteButtonClick = () => {
        navigate('/writeReview');
    };

    return (
        <Container>
            <ReviewPageTitle>
                <h1>후기 체험담</h1>
                <button onClick={handleWriteButtonClick}><h4>글쓰기</h4></button>
            </ReviewPageTitle>
            <ReviewPageSubTitle><h4>생생한 후기</h4></ReviewPageSubTitle>
            <ReviewPageContentContainer>
                <ReviewPageContent>
                    {currentItems.map(item => (
                        <ReviewPageContentItem key={item.id}>
                            <Image src={item.imagePath} alt="Review" />
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </ReviewPageContentItem>
                    ))}
                </ReviewPageContent>
            </ReviewPageContentContainer>
            <Pagination>
                {Array.from({ length: Math.ceil(reviews.length / ITEMS_PER_PAGE) }, (_, i) => (
                    <PageNumber key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </PageNumber>
                ))}
            </Pagination>
        </Container>
    );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`
const ReviewPageTitle = styled.div`
  display: flex;
  flex-direction: row; // 가로 방향으로 내용을 정렬
  align-items: center; // 수직 방향으로 가운데 정렬
  justify-content: space-between; // 내용을 양 끝으로 정렬

  background-color: lightgreen;
  margin-top: 20%;
  flex: 2;
  text-align: right; // 텍스트 오른쪽 정렬
  margin-left: 40px;
`

const ReviewPageSubTitle = styled.div`
  display: flex;
  flex: 1; // 비율 1로 설정
  text-align: right; // 텍스트 오른쪽 정렬
  margin-left: 40px;
`

const ReviewPageContentContainer = styled.div`
  //display:flex;
  //flex: 7;
  width: 80%;
  margin: 0 auto;// 좌우 마진을 auto로 설정하여 가운데 정렬
`

const ReviewPageContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 세 개의 열을 동일한 너비로 생성합니다.
  gap: 20px; // 그리드 아이템 사이의 간격을 추가합니다.
  padding: 20px; // 그리드 컨테이너 안쪽에 패딩을 추가합니다.
  background-color: darkviolet; // 원래의 배경색입니다.
`

const ReviewPageContentItem = styled.div`
  display: flex;
  flex-direction: column; // 세로 방향으로 내용을 쌓기 위해 변경합니다.
  align-items: center; // 내용을 가운데 정렬합니다.
  background-color: yellow;
  padding: 16px; // 패딩을 추가하여 내용과 테두리 사이에 공간을 만듭니다.
  border-radius: 8px; // 카드 모서리를 둥글게 합니다.
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); // 그림자를 추가하여 입체감을 줍니다.
  overflow: hidden; // 내용이 밖으로 넘치지 않도록 합니다.
  height: 300px;
`

// 이미지 컴포넌트를 만듭니다.
const Image = styled.img`
  width: 100%; // 이미지의 너비를 부모 요소에 맞춥니다.
  height: auto; // 이미지의 높이를 자동으로 설정하여 비율을 유지합니다.
  margin-bottom: 8px; // 이미지와 텍스트 사이의 간격을 추가합니다.
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageNumber = styled.button`
  border: none;
  background-color: #f0f0f0;
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  &:focus {
    outline: none;
  }
`;

export default ReviewPage;