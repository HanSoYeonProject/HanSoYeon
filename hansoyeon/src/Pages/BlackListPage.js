import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import { Table, Modal, Button } from "react-bootstrap";
import defaultProfilePic from '../imgs/default_profile.png';

const BlackListPage = () => {
    const [blacklist, setBlacklist] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };


    useEffect(() => {
        fetchBlacklist();
    }, []);

    const fetchBlacklist = () => {
        // 탭에 따라 다른 URL에서 데이터를 가져올 수 있음
        axios.get(`http://localhost:8050/api/blacklists`)
            .then(response => {
                setBlacklist(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching blacklist: ", error);
            });
    };

    const handleDelete = (blacklistId) => {
        // 삭제 API 호출
        axios
            .delete(`http://localhost:8050/api/blacklists/${blacklistId}`)
            .then((response) => {
                fetchBlacklist();
            })
            .catch((error) => {
                console.error("Error deleting blacklist: ", error);
            });
    };

    const UserDetailModal = ({ show, onHide, user }) => {
        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>블랙리스트 상세 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user.user.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                        <UserProfileImage src={defaultProfilePic} alt="User Profile" />
                        :
                        <UserProfileImage src={user.user.userProfile} alt="User Profile" />
                    }
                    <UserInfo>
                        <p>이름: {user.user.userName}</p>
                        <p>아이디: {user.user.userId}</p>
                        <p>전화번호: {user.user.userPhone}</p>
                        <p>
                            의뢰회원(회사): {user.provider.providerName}({user.provider.companyName})
                        </p>
                        {/* 기타 회원 정보 추가 */}
                    </UserInfo>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };


    return (
        <Container>
            <Header>블랙리스트 관리</Header>

            <StyledTable striped bordered hover>
                <thead>
                <tr>
                    <th>회원명</th>
                    <th>아이디</th>
                    <th>전화번호</th>
                    <th>의뢰회원</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {blacklist.map((user, index) => (
                    <tr key={index} onClick={() => handleUserClick(user)}>
                        <td>{user.user.userName}</td>
                        <td>{user.user.userId}</td>
                        <td>{user.user.userPhone}</td>
                        <td>{user.provider.providerName}({user.provider.companyName})</td>
                        <td>
                            <ButtonContainer>
                                <DeleteButton onClick={() => handleDelete(user.id)}>삭제</DeleteButton>
                            </ButtonContainer>
                        </td>
                    </tr>
                ))}

                </tbody>
            </StyledTable>
            <UserDetailModal
                show={showModal}
                onHide={() => setShowModal(false)}
                user={selectedUser}
            />
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
    width: 180px;
  }

  th:nth-child(2), td:nth-child(2) {
    width: 200px;
  }

  th:nth-child(3), td:nth-child(3) {
    width: 250px;
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

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const UserProfileImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  text-align: center;
`;




export default BlackListPage;