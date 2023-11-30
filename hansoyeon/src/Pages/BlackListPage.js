import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const BlackListPage = () => {
    const navigate = useNavigate();
    const [blacklist, setBlacklist] = useState([]);
    const {user, setUser} = useState();
    const [provider, setProviderId] = useState();

    useEffect(() => {
        fetchBlacklist(user, provider);
    }, []);

    const fetchBlacklist = () => {
        const url = "http://localhost:8050/api/blacklist";
        axios
            .get(url)
            .then((response) => {
                setBlacklist(response.data);
            })
            .catch((error) => {
                console.error("Error fetching blacklist: ", error);
            });
    };

    return (
        <Container>
            <Header>블랙리스트 관리</Header>

            <StyledTable striped bordered hover>
                <thead>
                <tr>
                    <th>회원명</th>
                    <th>기업명</th>
                    <th>아이디</th>
                    <th>전화번호</th>
                    <RotatedTextHeader>삭제</RotatedTextHeader>
                </tr>
                </thead>
                <tbody>
                {blacklist.map((user, index) => (
                    <tr key={index}>
                        <td>{user.user.nameId}</td>
                        <td>{user.id}</td>
                        <td>{user.phone}</td>
                        <td> {/* 삭제 버튼 추가 위치 */}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
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

const StyledTable = styled(Table)`
  background-color: white;
  width: 80%;

  thead {
    background-color: #f8f9fa;
  }

  th,
  td {
    text-align: center;
    vertical-align: middle;
  }

  td {
    font-size: 17px;
  }

  th:first-child,
  td:first-child {
    width: 250px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 250px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 300px;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 160px;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;

    th,
    td {
      padding: 10px;
    }
  }
`;

const RotatedTextHeader = styled.th`
  white-space: nowrap;
`;

export default BlackListPage;
