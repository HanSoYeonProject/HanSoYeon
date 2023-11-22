import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const RecruitPage = () => {
    const [recruits, setRecruits] = useState([]);
    const [isCompanyUser, setIsCompanyUser] = useState(false);
    const navigate = useNavigate(); // navigate 함수 초기화

    useEffect(() => {
        fetch("http://localhost:8050/api/recruits")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not");
                }
                return response.json();
            })
            .then((data) => {
                    setRecruits(data)
                    console.log('recruits', data)
                }
            )
            .catch(error => console.error("Fetch error:", error));
        setIsCompanyUser(true); // 임시로 기업 사용자 상태를 true로 설정
    }, []);

    const handleWriteClick = () => {
        navigate('/recruit/write');
    };

    const handleRecruitClick = (recruitId) => {

        navigate(`/recruit/${recruitId}`); // 글 상세 페이지로 이동


    };

    return (
        <Container>
            <Row className="justify-content-start mt-3">
                <Col md={2}>
                    <h2 style={{ fontWeight: 'bold' }}>모집 일정</h2>
                </Col>
            </Row>
            <Row className="justify-content-start">
                <Col md={2}>
                    <p style={{ fontSize: 'small' }}>앞으로의 일정</p>
                </Col>
                <Col md={{span: 2, offset :6} }>
                    {isCompanyUser && (
                        <button onClick={handleWriteClick} style={{ fontWeight: 'bold' }}>글쓰기</button>
                    )}
                </Col>
            </Row>

            {/* 모집일정 리스트*/}
            <Row>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                    {recruits.map((recruit, index) => (
                        <div style={{ padding:'5px' }}>
                            <Card onClick={() => handleRecruitClick(recruit.id)} style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title> {recruit.jobTitle} </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"> {recruit.jobStartDate} </Card.Subtitle>
                                    <Card.Text>
                                        {recruit.jobContent}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}

                </div>
            </Row>
        </Container>
    );
};

export default RecruitPage;