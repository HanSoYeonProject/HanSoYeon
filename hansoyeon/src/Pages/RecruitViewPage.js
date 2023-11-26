import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'; // useNavigate 훅 추가
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from "axios";

const RecruitViewPage = ( props ) => {
    const { id } = useParams();
    const [isCompanyUser, setIsCompanyUser] = useState(false);
    const navigate = useNavigate(); // navigate 함수 초기화
    const [recruitments, setRecruitments] = useState([]);

    //상세 페이지 불러오는 함수
    const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(`http://localhost:8050/api/recruitments/${id}`)
            if (response.status !== 200 ) {
                throw new Error('Failed to fetch announcement content');
            }
            const data = response.data;
            setRecruitments(data);
            console.log('Announcement Content: ', data);
        } catch (error) {
            console.error('Error fetching announcement content: ', error);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, [id]);

    return (
        <Container>
            <h3></h3>
        </Container>
    );
};

export default RecruitViewPage;