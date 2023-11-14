import React, { useState } from 'react';
import styled from 'styled-components';

// 더미 데이터 배열
const dummyData = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    title: `Review Title ${i + 1}`,
    content: `Review Content ${i + 1}`,
    imagePath: "/../imgs/IU.png" // 더미 이미지 경로
}));

const ITEMS_PER_PAGE = 4;



const ReviewPage = (props) => {

    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 해당하는 리뷰들을 계산합니다.
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호를 클릭했을 때 실행되는 함수입니다.
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <Container>
            <ReviewPageTitle><h1>후기 체험담</h1></ReviewPageTitle>
            <ReviewPageSubTitle><h4>생생한 후기</h4></ReviewPageSubTitle>
            <ReviewPageContentContainer>
                <ReviewPageContent>
                    {currentItems.map(item => (
                        <ReviewPageContentItem key={item.id}>
                            <Image src={item.imagePath} alt="안녕" />
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </ReviewPageContentItem>
                    ))}
                </ReviewPageContent>
            </ReviewPageContentContainer>
            <Pagination>
                {Array.from({ length: Math.ceil(dummyData.length / ITEMS_PER_PAGE) }, (_, i) => (
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
  flex-direction: column;
  align-items: flex-start; // 왼쪽 정렬을 위해 추가
  justify-content: flex-end; // 아래쪽 정렬을 위해 추가
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