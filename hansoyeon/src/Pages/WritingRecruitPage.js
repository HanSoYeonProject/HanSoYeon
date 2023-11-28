import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const WritingRecruitPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [region, setRegion] = useState('');
    const [providers, setProviders] = useState('');
    const [money, setMoney] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleInputContent = (e) => {
        setContent(e.target.value);
    };
    const handleImageChange = async (e) => {
        // 이미지 선택 시
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 이미지를 base64로 인코딩
        let base64Image = '';
        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image);

            // Promise를 사용하기 위해 await를 사용하려면 handleImageChange도 async 함수여야 합니다.
            base64Image = await new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        }

        // 이미지를 포함한 recruitnewspost 객체 생성
        const recruitnewspost = {
            title,
            content,
            startDate,
            endDate,
            region,
            providers,
            money,
            image: base64Image, // 이미지를 추가
        };
        console.log("Form Data:", {
            title,
            content,
            region,
            providers,
            money,
            startDate,
            endDate,
            image
        });
        // 서버에 전송
        try {
            const response = await axios.post(
                'http://localhost:8050/api/createRecruitment',
                recruitnewspost,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                console.log(response.data);
                // 글 작성 성공 시, 페이지를 이동
                navigate('/recruit');
            } else {
                console.error(`Http 오류! 상태 코드: ${response.status}`);
            }
        } catch (error) {
            console.log('API 요청 중 오류 발생: ', error);
        }
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
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용"
                        style={{ width: '50%', height: '200px', padding: '10px' }}
                    />
                </div>

                {/* 시작일 입력 필드 */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="startDate" style={{ display: 'block', marginBottom: '5px' }}>시작일</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>

                {/* 종료일 입력 필드 */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="endDate" style={{ display: 'block', marginBottom: '5px' }}>종료일</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ width: '50%', padding: '10px' }}
                    />
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
