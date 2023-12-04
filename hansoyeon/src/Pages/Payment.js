import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    // 값 가져오기
    const { state } = useLocation();
    const [paymentData, setPaymentData] = useState(null);
    const [IMP, setIMP] = useState(null);
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    const handlePayment = () => {
        // 가맹점 식별
        const { IMP } = window;

        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: 100, // 결제 금액
            name: "한소연 매칭서비스 금액",
            buyer_name: state.fetchedUser.companyName,
            buyer_email: state.fetchedUser.providerEmail,
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
    }, []);

    // 결제 성공 여부
    const callback = async (response, paymentData) => {
        const { success, error_msg } = response;
        if (success) {
            alert("결제 성공");
            if (paymentData) {
                try {
                    await axios.get(`http://localhost:8050/api/saveClass`, {
                        params: {
                            email: String(paymentData.buyer_email),
                            company: String(paymentData.buyer_name),
                            amount: String(paymentData.amount),
                            merchant_uid: String(paymentData.merchant_uid), //주문번호
                            apply_num: String(response.apply_num), //
                        },
                    }).then((res) => {
                        console.log("서버로 부터 받는 데이터: ", res.data);
                        if (res.data !== "400") {
                            navigate("/");
                        } else {
                            alert("해당 URI는 사용자 정보와 맞지 않습니다. ");
                        }
                    });
                } catch (error) {
                    console.error("서버에 요청하는 동안 오류 발생, error");
                }
            } else {
                console.error("결제 정보가 부족합니다.");
            }
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
        console.log(response);
    };

    return (
        <>
            {handlePayment()};
        </>
    );
};

const Container = styled.div`
  display: flex;
  background-color: green;
  height: 100vh;
  width: 100%;
  justify-content: flex-end;
`;

const PayButton = styled.button`
  display: flex;
  background-color: orange;
  height: 100px;
  width: 50%;
`;

export default Payment;
