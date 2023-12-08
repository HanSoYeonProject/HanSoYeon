import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import banner2 from "../imgs/banner2.png";
import {useUserStore} from "../stores";
const Payment = () => {
    // 값 가져오기
    const { state } = useLocation();
    const [paymentData, setPaymentData] = useState(null);
    const [money, setMoney] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [fetchedUser, setFetchedUser] = useState();
    const [IMP, setIMP] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const navigate = useNavigate();
    const userType = cookies.userType;

    const levels = [
        {price: 100, order: 1},
        {price: 120, order: 2},
        {price: 130, order: 3},
        {price: 140, order: 4},
        {price: 150, order: 5},
        {price: 160, order: 6}
    ]

    const handlePayment = (order) => {
        const selectedPrice = levels.find((level) => level.order === order)?.price;

        // 가맹점 식별
        const { IMP } = window;

        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: selectedPrice,
            name: "한소연 매칭서비스 금액",
            buyer_name: user.companyName,
            buyer_email: user.providerEmail,
        };

        IMP.request_pay(data, (response) => callback(response, data));
    };
    // 결제창 띄우는 기능
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
        script.async = true;

        script.onload = () => {
            setIMP(window.IMP);
            window.IMP.init("imp64486410");
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

        if (cookies.token) {
            axios.get('http://localhost:8050/api/auth/currentCompany', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }).then(response => {
                // 토큰이 유효한 경우
                const fetchedUser = response.data;
                setUser(fetchedUser)
            }).catch(error => {
                // 토큰이 유효하지 않은 경우
                console.error("Token verification failed:", error);
                handleLogout();
            });
        }
    }, []);

    useEffect(() => {
        fetchCompanyPayments(user.providerEmail)
    }, [user]);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    // 결제 성공 여부
    const callback = async (response, paymentData) => {
        const { success, error_msg } = response;
        if (success) {
            alert("결제 성공");
            if (paymentData) {
                try {
                    const paid = new Date(response.paid_at * 1000);

                    console.log(paid);
                    let pointsEarned;

                    if (paymentData.amount === 100) {
                        pointsEarned = 100;
                    }
                    else if (paymentData.amount === 120) {
                        pointsEarned = 550;
                    }
                    else if (paymentData.amount === 130) {
                        pointsEarned = 1200;
                    }
                    await axios.post(`http://localhost:8050/api/payment/saveClass`, {
                        email: String(paymentData.buyer_email),     //회사이메일
                        company: String(paymentData.buyer_name),    // 회사이름
                        amount: paymentData.amount,    //구매 가격
                        merchant_uid: String(paymentData.merchant_uid), //주문번호
                        apply_num: String(response.apply_num), //신용카드 승인번호
                        paid_at: paid, //결제시간
                        points: pointsEarned //적립된 포인트 추가

                    }).then((res) => {
                        console.log("서버로 부터 받는 데이터: ", res.data);
                        if (res.data !== "400") {
                            fetchCompanyPayments(paymentData.buyer_email);
                        }
                    });
                    const updatedPoints = money && money.length > 0 ? money[0].points + pointsEarned : pointsEarned;
                    setMoney([{ points: updatedPoints }]);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.error("결제 정보가 부족합니다.");
            }
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
        console.log(response);
    };


    // 해당 기업 결제 포인트
    const fetchCompanyPayments = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/payment/company/${email}`);
            const pointPayments = response.data;
            console.log(pointPayments);
            setMoney(pointPayments);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <TitleContainer>
                <Title>
                    결제 (현재 포인트: {money && money.length > 0 ? money[0].points : 0} Point)
                </Title>
            </TitleContainer>
            <NormalContainer>
                <NormalCenter>
                    <NormalMain>
                        <NormalTitle>
                            <h2>일반</h2>
                            <h3> (공고 전용)</h3>
                        </NormalTitle>
                        <NormalContent>
                            <NormalFirst>
                                <ImgContainer>
                                <img src={banner2}/>
                                </ImgContainer>
                                <h2>10000Point / 1만원</h2>
                                <Button onClick={() => handlePayment(1)}>결제</Button>
                            </NormalFirst>
                            <NormalFirst>
                                <ImgContainer>
                                    <img src={banner2}/>
                                </ImgContainer>
                                <h2>55000Point / 5만원</h2>
                                <Button onClick={() => handlePayment(2)}>결제</Button>
                            </NormalFirst>
                            <NormalFirst>
                                <ImgContainer>
                                    <img src={banner2}/>
                                </ImgContainer>
                                <h2>120000Point / 10만원</h2>
                                <Button onClick={() => handlePayment(3)}>결제</Button>
                            </NormalFirst>
                        </NormalContent>
                    </NormalMain>
                </NormalCenter>
            </NormalContainer>
            <NormalContainer>
                <NormalCenter>
                    <NormalMain>
                        <NormalTitle>
                            <h2>급여</h2>
                            <h3>(급여 전용)</h3>
                        </NormalTitle>
                        <NormalContent>
                        <NormalFirst>
                            <ImgContainer>
                                <img src={banner2}/>
                            </ImgContainer>
                            <h2>10만원</h2>
                            <Button onClick={() => handlePayment(4)}>결제</Button>
                        </NormalFirst>
                        <NormalFirst>
                            <ImgContainer>
                                <img src={banner2}/>
                            </ImgContainer>
                            <h2>50만원</h2>
                            <Button onClick={() => handlePayment(5)}>결제</Button>
                        </NormalFirst>
                        <NormalFirst>
                            <ImgContainer>
                                <img src={banner2}/>
                            </ImgContainer>
                            <h2>100만원</h2>
                            <Button onClick={() => handlePayment(6)}>결제</Button>
                        </NormalFirst>
                        </NormalContent>
                    </NormalMain>
                </NormalCenter>
            </NormalContainer>
            </Container>
    );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  
`;

const TitleContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: center;
  margin-top: 5rem;

`
const Title = styled.div`
  display: flex;
  width: 70%;
  height: 50px;
  font-size: 32px;
  font-weight: bold;
  align-items: center;
  margin-left: 3rem;
`
const NormalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    height: 300px;
    width: 100%;
`
const NormalCenter = styled.div`
  background-color: #f0f0f0;
  border-radius: 1rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  align-items: center;
`
const NormalMain = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  width: 100%;
`
const NormalTitle = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  font-size: 28px;
  font-weight: 600;
  align-items: center;
  margin-left: 2rem;
  
  h2 {
    font-size: 28px;
    font-weight: 600;
  }
  h3 {
    display: flex;
    font-size: 20px;
  }
`
const NormalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 230px;
`
const NormalFirst = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
  width: 30%;
  
  img {
    margin-top: 10px;
    width: 100%;
    height: 150px;
  }
  h2 {
    margin-top: 10px;
    font-size: 24px;
  }
  `
const ImgContainer = styled.div`
`
const FirstContainer = styled.div`
    background-color: black;
`
const Button = styled.button`
  display: flex;
  height: 30px;
  background-color: orange;
  width: 120px;
  font-size: 18px;
  border: 1px solid gray;
  border-radius: 5px;
  justify-content: center;
  margin-bottom: 10px;
`

export default Payment;