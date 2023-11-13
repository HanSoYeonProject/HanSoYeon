import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MemberSignUpPage from "./MemberSignupPage";

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

    return <div>Google 인증 중...</div>;
};

export default GoogleLoginPage;
