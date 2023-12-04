import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import styled from 'styled-components';
import defaultProfile from '../imgs/default_profile.png';
import approvalCheck from '../imgs/approvalCheck.png'

const CompanyManagePage = () => {
    const [companies, setCompanies] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showLicenseModal, setShowLicenseModal] = useState(false);

    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = () => {
        axios.get("http://localhost:8050/api/auth/allCompanies")
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    };

    const handleDeleteClick = (company) => {
        setCompanyToDelete(company);
        setShowDeleteConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (companyToDelete) {
            handleDelete(companyToDelete.providerId);
        }
        setShowDeleteConfirmModal(false);
    };

    const handleDelete = (providerId) => {
        axios.delete(`http://localhost:8050/api/auth/deleteProvider/${providerId}`)
            .then(response => {
                console.log("Delete success:", response);
                fetchCompanies();
            })
            .catch(error => {
                console.error("Error deleting provider:", error);
            });
        setShowDeleteConfirmModal(false);
    };


    const handleShowModal = (company) => {
        setSelectedCompany(company);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowLicenseModal = () => {
        setShowLicenseModal(true);
    };

    const handleCloseLicenseModal = () => {
        setShowLicenseModal(false);
    };

    const handleApprove = (providerId) => {
        axios.post(`http://localhost:8050/api/auth/approveProvider`, { providerId })
            .then(response => {
                console.log("Approval success:", response);
                fetchCompanies();
            })
            .catch(error => {
                console.error("Error approving provider:", error);
            });
        handleCloseModal();
    };

    const handleRevokeApproval = (providerId) => {
        axios.post(`http://localhost:8050/api/auth/revokeProviderApproval`, { providerId })
            .then(response => {
                console.log("Revoke approval success:", response);
                fetchCompanies(); // 회원 목록을 다시 불러와서 업데이트된 정보를 반영
            })
            .catch(error => {
                console.error("Error revoking provider approval:", error);
            });
        handleCloseModal();
    };

    return (
        <Container>
            <Header>기업회원 관리</Header>
            <StyledTable striped bordered hover>
                <thead>
                <tr>
                    <th>회원명</th>
                    <th>기업명</th>
                    <th>전화번호</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {companies.map(company => (
                    <tr key={company.providerId}>
                        <td>
                            <CompanyProfile onClick={() => handleShowModal(company)}>
                                {company.providerProfile === 'hansoyeon/src/imgs/default_profile.png' ?
                                    <>
                                        <img src={defaultProfile} alt="Profile" />
                                        <span>{company.providerName}</span>
                                    </>
                                    :
                                    <>
                                        <img src={company.providerProfile} alt="Profile" />
                                        <span>{company.providerName}</span>
                                    </>
                                }
                                {company.providerApproval === "true" ?
                                    <StyledLicenseCheckImage src={approvalCheck} alt="checkApproval"/>
                                    :
                                    null
                                }
                            </CompanyProfile>
                        </td>
                        <td>{company.companyName}</td>
                        <td>{company.companyTel}</td>
                        <td>
                            <StyledButton variant="danger" onClick={() => handleDeleteClick(company)}> 회원 삭제</StyledButton>
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
                    {selectedCompany && (
                        <>
                            {selectedCompany.providerProfile === 'hansoyeon/src/imgs/default_profile.png' ?
                                <>
                                    <StyledModalImage src={defaultProfile} alt="Profile" />
                                </>
                                :
                                <>
                                    <StyledModalImage src={selectedCompany.providerProfile} alt="Profile" />
                                </>
                            }
                            <StyledModalText>회원명: {selectedCompany.providerName}</StyledModalText>
                            <StyledModalText>이메일: {selectedCompany.providerEmail}</StyledModalText>
                            <StyledModalText>기업명: {selectedCompany.companyName}</StyledModalText>
                            <StyledModalText>회사 주소: {selectedCompany.companyAddress}</StyledModalText>
                            <StyledModalText>전화번호: {selectedCompany.companyTel}</StyledModalText>
                            <StyledModalText></StyledModalText>
                            <StyledModalLicenseImage
                                src={selectedCompany ? selectedCompany.companyLicense : ''}
                                alt="license"
                                onClick={handleShowLicenseModal}
                            />
                        </>
                    )}
                </StyledModalBody>
                <StyledModalFooter>
                    {selectedCompany && selectedCompany.providerApproval === 'false' ? (
                        <Button variant="primary" onClick={() => handleApprove(selectedCompany.providerId)}>권한 승인</Button>
                    ) : null}
                    {selectedCompany && selectedCompany.providerApproval === 'true' ? (
                        <Button variant="danger" onClick={() => handleRevokeApproval(selectedCompany.providerId)}>권한 취소</Button>
                    ) : null}
                    <Button variant="secondary" onClick={handleCloseModal}>닫기</Button>
                </StyledModalFooter>
            </StyledModal>
            <StyledModal
                show={showLicenseModal}
                onHide={handleCloseLicenseModal}
                size="lg"
                centered
            >
                <StyledModalBody>
                    {selectedCompany && (
                        <StyledModalBigLicenseImage
                            src={selectedCompany.companyLicense}
                            alt="License Full Size"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </StyledModalBody>
                <StyledModalFooter>
                    <Button variant="secondary" onClick={handleCloseLicenseModal}>닫기</Button>
                </StyledModalFooter>
            </StyledModal>
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

const StyledModalLicenseImage = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
`;

const StyledModalBigLicenseImage = styled.img`
  width: 300px;
  height: 300px;
`;

const StyledLicenseCheckImage = styled.img`
  margin-left: 5px;
  width: 15px;
  height: 15px;
`;


export default CompanyManagePage;
