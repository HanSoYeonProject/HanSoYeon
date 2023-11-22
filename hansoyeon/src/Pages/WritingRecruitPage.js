import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const WritingRecruitPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [workSchedule, setWorkSchedule] = useState('');
    const [region, setRegion] = useState('');
    const [providers, setProviders] = useState('');
    const [money, setMoney] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('workSchedule', workSchedule);
        formData.append('region', region);
        formData.append('providers', providers);
        formData.append('money', money);
        formData.append('image', image || '');
        if (image) {
            formData.append('image', image);
        }

        try {
            const endpoint = 'http://localhost:8050/api/recruits';
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                // 데이터 업데이트 및 페이지 이동 로직
            } else {
                // 오류 처리 로직
            }
            navigate('/recruit'); // 글 올리기 성공 후 /recruit 페이지로 이동
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // 선택된 이미지 파일 저장
    };

    return (
        <div>
            <h2 style={{ marginLeft: '-10px', marginTop: '120px', fontWeight: 'bold' }}>글쓰기</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>제목</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>내용</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="내용"
                        style={{ width: '50%', height: '200px', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="workSchedule" style={{ display: 'block', marginBottom: '5px' }}>근무 일정</label>
                    <input
                        id="workSchedule"
                        type="text"
                        value={workSchedule}
                        onChange={(e) => setWorkSchedule(e.target.value)}
                        placeholder="근무 일정"
                        style={{ width: '50%', padding: '10px' }}
                    />
                    {/* 캘린더 아이콘 또는 팝업을 추가하여 일정 선택 기능을 구현할 수 있습니다. */}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="region" style={{ display: 'block', marginBottom: '5px' }}>지역</label>
                    <input
                        id="region"
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="지역"
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="providers" style={{ display: 'block', marginBottom: '5px' }}>제공자</label>
                    <input
                        id="providers"
                        type="text"
                        value={providers}
                        onChange={(e) => setProviders(e.target.value)}
                        placeholder="제공자"
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="money" style={{ display: 'block', marginBottom: '5px' }}>금액</label>
                    <input
                        id="money"
                        type="text"
                        value={money}
                        onChange={(e) => setMoney(e.target.value)}
                        placeholder="금액"
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="image" style={{ display: 'block', marginBottom: '5px' }}>사진 추가</label>
                    <input
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>글 올리기</button>
            </form>
        </div>
    );
};

export default WritingRecruitPage;