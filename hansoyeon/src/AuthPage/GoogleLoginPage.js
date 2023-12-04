import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MemberSignUpPage from "./MemberSignupPage";
import Footer from "../Components/Footer";
import styled from 'styled-components';

const GoogleLoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');
        console.log(code)

        if (code) {
            axios.post('http://localhost:8050/api/auth/google', { code })
                .then(response => {
                    navigate('/memberRegister', { state: { email: response.data.email } });
                })
                .catch(error => console.error(error));
        }
    }, [location, navigate]);

    return (
        <Container>
            Google 인증 중...
            <Footer />
        </Container>
    );
};

const Container = styled.div`
  min-height: 100vh; /* Set minimum height to 100% of the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default GoogleLoginPage;
