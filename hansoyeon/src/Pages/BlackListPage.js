import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {Table} from "react-bootstrap";

const BlackListPage = () => {
    const [blacklist, setBlacklist] = useState([]);
    const [activeTab, setActiveTab] = useState(1); // 탭 상태 관리

    useEffect(() => {
        fetchBlacklist();
    }, [activeTab]); // activeTab 변경 시 fetchBlacklist 호출

    const fetchBlacklist = () => {
        // 탭에 따라 다른 URL에서 데이터를 가져올 수 있음
        const url = activeTab === 1 ? "http://localhost:8050/api/blacklist/specific" : "http://localhost:8050/api/blacklist/all";
        axios.get(url)
            .then(response => {
                setBlacklist(response.data);
            })
            .catch(error => {
                console.error("Error fetching blacklist: ", error);
            });
    };

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };



    return (
        <Container>
            <Header>블랙리스트 관리</Header>

            <ButtonContainer>
                <TabButton onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>특정 공고 사용불가</TabButton>
                <TabButton onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>전체 사용불가</TabButton>
            </ButtonContainer>

            {activeTab === 1&& (
                <StyledTable striped bordered hover>
                    <thead>
                    <tr>
                        <th>회원명</th>
                        <th>기업명</th>
                        <th>아이디</th>
                        <th>전화번호</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blacklist.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.id}</td>
                            <td>{user.phone}</td>
                            <td> {/* 삭제 버튼 추가 위치 */}</td>
                        </tr>
                    ))}
                    </tbody>
                </StyledTable>
            )}

            {activeTab === 2&& (
                <StyledTable striped bordered hover>
                    <thead>
                    <tr>
                        <th>회원명</th>
                        <th>아이디</th>
                        <th>전화번호</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {blacklist.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.id}</td>
                            <td>{user.phone}</td>
                            <td> {/* 삭제 버튼 추가 위치 */}</td>
                        </tr>
                    ))}
                    </tbody>
                </StyledTable>
            )}

        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h2`
  color: #333;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const TabButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e2e6ea;
  }

  &.active {
    background-color: #007bff;
    color: white;
  }
`;

const StyledTable = styled(Table)`
  background-color: white;
  width: 80%;

  thead {
    background-color: #f8f9fa;
  }

  th, td {
    text-align: center;
    vertical-align: middle;
  }

  td {
    font-size: 17px;
  }

  th:first-child, td:first-child {
    width: 250px;
  }

  th:nth-child(2), td:nth-child(2) {
    width: 250px;
  }

  th:nth-child(3), td:nth-child(3) {
    width: 300px;
  }

  th:nth-child(4), td:nth-child(4) {
    width: 150px;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px; /* 화면이 작을 때 폰트 크기 줄임 */

    th, td {
      padding: 10px; /* 셀의 패딩 조정 */
    }

    /* 필요한 경우 여기에 더 많은 스타일 규칙 추가 */
  }
`;


const ButtonContainer = styled.div`

`;

export default BlackListPage;
