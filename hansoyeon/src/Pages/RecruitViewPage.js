import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'; // useNavigate 훅 추가
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const RecruitViewPage = () => {
    const { id} = useParams();
    console.log('idididid',id)

    //Todo id로 SELECT WHERE 조건 주기


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
            </Row>

            <Row className="justify-content-start">
                <Col>
                    가운데
                </Col>
            </Row>
        </Container>
    );
};

export default RecruitViewPage;