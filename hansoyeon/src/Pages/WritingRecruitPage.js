import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";

const WritingRecruitPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [region, setRegion] = useState('');
    const [address, setAddress] = useState('');
    const [providers, setProviders] = useState('');
    const [money, setMoney] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();

    useEffect(() => {
        if (cookies.token) {
            axios.get('http://localhost:8050/api/auth/currentCompany', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }).then(response => {
                console.log(cookies.token)
                // 토큰이 유효한 경우
                const fetchedUser = response.data;
                console.log(fetchedUser)
                setUser(fetchedUser);
            }).catch(error => {
                // 토큰이 유효하지 않은 경우
                console.error("Token verification failed:", error);
                handleLogout();
            });
        }
    }, []);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        if (user && cookies.token) {
            setProviders(user.providerId)
        }
    }, [user]);


    const handleInputTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleInputContent = (e) => {
        setContent(e.target.value);
    };
    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
    };
    const handleImageChange = async (e) => {
        // 이미지 선택 시
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('profileImage', image);

            const response = await axios.post(
                'http://localhost:8050/api/uploadProfileImage',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // 이미지를 포함한 recruitnewspost 객체 생성
            const recruitnewspost = {
                title,
                content,
                startDate,
                endDate,
                region: selectedRegion,
                address,
                providers,
                money,
                image: response.data.imageUrl, // 이미지를 추가
            };
            console.log("Form Data:", {
                title,
                content,
                region: selectedRegion,
                address,
                providers,
                money,
                startDate,
                endDate,
                image: response.data.imageUrl
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
        } catch (error) {
            console.log('이미지 업로드 중 오류 발생: ', error);
        }
    };


    const regions = ["서울특별시", "인천광역시", "대전광역시", "광주광역시",
        "대구광역시", "부산광역시", "경기도", "강원도", "충청북도",
        "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];

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
                    <select
                        id="region"
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        style={{ width: '50%', padding: '10px' }}
                    >
                        <option value="">시/도 선택</option>
                        {regions.map((region, index) => (
                            <option key={index} value={region}>{region}</option>
                        ))}
                    </select>
                </div>
                {/*상세주소 */}
                <div style={{ marginBottom: '20px' }}>
                   <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>상세주소</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="상세주소"
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="providers" style={{ display: 'block', marginBottom: '5px' }}>제공자</label>
                    <input
                        id="providers"
                        type="text"
                        value={user.providerId}
                        placeholder="제공자"
                        style={{ width: '50%', padding: '10px' }}
                        readOnly={true}
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
