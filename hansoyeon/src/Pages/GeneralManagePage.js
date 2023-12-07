import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import styled from 'styled-components';
import defaultProfile from '../imgs/default_profile.png';
import Footer from "../Components/Footer";

const GeneralManagePage = () => {
    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:8050/api/auth/allUsers")
            .then(response => {
                const filteredUsers = response.data.filter(user => user.userId !== 'admin');
                setUsers(filteredUsers);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            handleDelete(userToDelete.userId);
        }
        setShowDeleteConfirmModal(false);
    };

    const handleDelete = (userId) => {
        axios.delete(`http://localhost:8050/api/auth/deleteUser/${userId}`)
            .then(response => {
                console.log("Delete success:", response);
                fetchUsers();
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            });
        setShowDeleteConfirmModal(false);
    };


    const handleShowModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <Header>일반 회원 관리</Header>
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
                {users.map(user => (
                    <tr key={user.userId}>
                        <td>
                            <CompanyProfile onClick={() => handleShowModal(user)}>
                                {user.userProfile === 'hansoyeon/src/imgs/default_profile.png' || user.userProfile === null ?
                                    <>
                                        <img src={defaultProfile} alt="Profile" />
                                        <span>{user.userName}</span>
                                    </>
                                    :
                                    <>
                                        <img src={user.userProfile} alt="Profile" />
                                        <span>{user.userName}</span>
                                    </>
                                }
                            </CompanyProfile>
                        </td>
                        <td>{user.userId}</td>
                        <td>{user.userPhone}</td>
                        <td>
                            <StyledButton variant="danger" onClick={() => handleDeleteClick(user)}> 회원 삭제</StyledButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
            <StyledModal
                show={showDeleteConfirmModal}
                onHide={() => setShowDeleteConfirmModal(false)}
                centered
            >
                <StyledModalHeader closeButton>
                    <StyledModalTitle>회원 삭제 확인</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalBody>
                    <p>이 회원을 정말 삭제하시겠습니까?</p>
                </StyledModalBody>
                <StyledModalFooter>
                    <Button variant="danger" onClick={handleConfirmDelete}>삭제</Button>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}>취소</Button>
                </StyledModalFooter>
            </StyledModal>
            <StyledModal
                show={showModal}
                onHide={handleCloseModal}
                centered
            >
                <StyledModalHeader closeButton>
                    <StyledModalTitle>회원 상세 정보</StyledModalTitle>
                </StyledModalHeader>
                <StyledModalBody>
                    {selectedUser && (
                        <>
                            {selectedUser.userProfile === 'hansoyeon/src/imgs/default_profile.png' ?
                                <>
                                    <StyledModalImage src={defaultProfile} alt="Profile" />
                                </>
                                :
                                <>
                                    <StyledModalImage src={selectedUser.userProfile} alt="Profile" />
                                </>
                            }
                            <StyledModalText>회원명: {selectedUser.userName}</StyledModalText>
                            <StyledModalText>아이디: {selectedUser.userId}</StyledModalText>
                            <StyledModalText>이메일: {selectedUser.userEmail}</StyledModalText>
                            <StyledModalText>성별: {selectedUser.userGender}</StyledModalText>
                            <StyledModalText>주소: {selectedUser.userAddress}</StyledModalText>
                            <StyledModalText>전화번호: {selectedUser.userPhone}</StyledModalText>
                            <StyledModalText>자기소개: {selectedUser.userInfo}</StyledModalText>
                        </>
                    )}
                </StyledModalBody>
                <StyledModalFooter>
                    <Button variant="secondary" onClick={handleCloseModal}>닫기</Button>
                </StyledModalFooter>
            </StyledModal>
            <Footer/>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  td{
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
`;

const Header = styled.h2`
  color: #333;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  background-color: #dc3545;
  border: none;
  &:hover {
    background-color: #c82333;
  }
`;

const CompanyProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
  }
  span {
    font-size: 1rem;
  }
`;

const StyledModal = styled(Modal)`
  & .modal-dialog {
    margin-top: 5rem;  // 모달의 상단 여백
  }
`;

const StyledModalHeader = styled(Modal.Header)`
  background-color: #f8f9fa; 
  color: #333; 
  border-bottom: 1px solid #dee2e6; 
`;

const StyledModalTitle = styled(Modal.Title)`
  font-weight: bold;
`;

const StyledModalBody = styled(Modal.Body)`
  padding: 20px; 
  font-size: 16px;
  text-align: center;
  color: #555;
`;

const StyledModalText = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
`;

const StyledModalFooter = styled(Modal.Footer)`
  padding: 20px; 
  border-top: 1px solid #dee2e6;
  justify-content: center; 
`;

const StyledModalImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

export default GeneralManagePage;
