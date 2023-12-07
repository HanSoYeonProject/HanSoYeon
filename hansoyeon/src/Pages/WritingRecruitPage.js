import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUserStore} from "../stores";

const WritingRecruitPage = () => {
    const [title, setTitle] = useState('');
    const [schedule, setSchedule] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [background, setBackground] = useState('');
    const [morning, setMorning] = useState('');
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [need, setNeed] = useState('');
    const [region, setRegion] = useState('');
    const [content, setContent] = useState('');
    const [second, setSecond] = useState('');
    const [third, setThird] = useState('');
    const [address, setAddress] = useState('');
    const [providers, setProviders] = useState('');
    const [money, setMoney] = useState('');
    const [image, setImage] = useState([]);
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
    const handleImageChange = (e) => {
        // 파일 선택 시
        setImage([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            for (let i = 0; i< image.length; i++) {
                formData.append('profileImages', image[i]);
            }
            console.log(image)

            const response = await axios.post(
                'http://localhost:8050/api/uploadProfileImages',
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
                schedule,
                content,
                second,
                third,
                background,
                morning,
                lunch,
                dinner,
                need,
                startDate,
                endDate,
                region: selectedRegion,
                address,
                providers,
                money,
                image: response.data.imageUrls, // 이미지를 추가
            };
            console.log("Form Data:", {
                title,
                schedule,
                content,
                second,
                third,
                background,
                morning,
                lunch,
                dinner,
                need,
                region: selectedRegion,
                address,
                providers,
                money,
                startDate,
                endDate,
                image: response.data.imageUrls
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
            <h2 style={{marginTop: '120px', fontWeight: '500',fontSize: '48px', fontFamily:'omyu_pretty', justifyContent:"center", display:"flex",width:"55%"}}>글쓰기</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px',fontSize: '20px' }}>제목</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목"
                        style={{ width: '50%', padding: '10px' }}
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
                    <label htmlFor="content" style={{ display: 'block', marginBottom: '5px' }}>첫 날</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '50%', height: '100px', padding: '10px'}}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="second" style={{ display: 'block', marginBottom: '5px' }}>잠시 동안</label>
                    <textarea
                        id="second"
                        value={second}
                        onChange={(e) => setSecond(e.target.value)}
                        style={{ width: '50%', height: '150px', padding: '10px'}}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="third" style={{ display: 'block', marginBottom: '5px' }}>마지막 날</label>
                    <textarea
                        id="third"
                        value={third}
                        onChange={(e) => setThird(e.target.value)}
                        style={{ width: '50%', height: '100px', padding: '10px'}}
                    />
                </div>
                {/* 한소연 모집배경 */}
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="background" style={{display: 'block', marginBottom: '5px' }}>한소연 모집배경</label>
                    <textarea
                        id="background"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>

                {/* 한소연 모집 일정 */}
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="schedule" style={{display: 'block', marginBottom: '5px' }}>도움 내용</label>
                    <textarea
                        id="schedule"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                        style={{ width: '50%', padding: '10px' }}
                    />
                </div>

                {/*조식*/}
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="morning" style={{ display: 'block', marginBottom: '5px' }}>식사제공(조식)</label>
                    <textarea
                        id="morning"
                        value={morning}
                        onChange={(e) => setMorning(e.target.value)}
                        style={{ width: '50%',padding: '10px'}}
                    />
                </div>
                {/*점심*/}
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="lunch" style={{ display: 'block', marginBottom: '5px' }}>식사제공(점심)</label>
                    <textarea
                        id="lunch"
                        value={lunch}
                        onChange={(e) => setLunch(e.target.value)}
                        style={{ width: '50%',padding: '10px'}}
                    />
                </div>
                {/*저녁*/}
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="dinner" style={{ display: 'block', marginBottom: '5px' }}>식사제공(저녁)</label>
                    <textarea
                        id="dinner"
                        value={dinner}
                        onChange={(e) => setDinner(e.target.value)}
                        style={{ width: '50%',padding: '10px'}}
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
                    <label htmlFor="need" style={{ display: 'block', marginBottom: '5px' }}>소지품, 복장</label>
                    <input
                        id="need"
                        type="text"
                        value={need}
                        onChange={(e) => setNeed(e.target.value)}
                        placeholder="소지품, 복장"
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
                        placeholder="King"
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
                        multiple
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>글 올리기</button>
            </form>
        </div>
    );
};



export default WritingRecruitPage;
