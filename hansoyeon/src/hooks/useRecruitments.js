import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRecruitments = () => {
    const [recruitments, setRecruitments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecruitments = async () => {
            setIsLoading(true);
            try {
                const currentDate = new Date();
                const response = await axios.get('http://localhost:8050/api/recruitments');
                const validRecruits = response.data.filter(recruitment => {
                    const startDate = new Date(recruitment.startDate);
                    return startDate >= currentDate;
                }).reverse();
                setRecruitments(validRecruits);
            } catch (error) {
                console.error('Error fetching recruitments:', error);
                // 에러 처리 로직 추가
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecruitments();
    }, []);

    return { recruitments, isLoading };
};
