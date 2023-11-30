import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';


const BlackListCompanyPage = () => {
    const navigate = useNavigate();
    const [blacklist, setBlacklist] = useState([]);
    const [providerId, setProviderId] = useState();

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { user, setUser } = useUserStore();

    const isLoggedIn = cookies.token && user;
    const userType = cookies.userType;

    useEffect(() => {
        if (cookies.token) {
            if (userType === 'company') {
                axios
                    .get('http://localhost:8050/api/auth/currentCompany', {
                        headers: {
                            Authorization: `Bearer ${cookies.token}`
                        }
                    })
                    .then((response) => {
                        const fetchedUser = response.data;
                        setUser(fetchedUser);
                    })
                    .catch((error) => {
                        console.error('토큰 검증 실패:', error);
                        handleLogout();
                    });
            } else {
                axios
                    .get('http://localhost:8050/api/auth/currentUser', {
                        headers: {
                            Authorization: `Bearer ${cookies.token}`
                        }
                    })
                    .then((response) => {
                        const fetchedUser = response.data;
                        setUser(fetchedUser);
                    })
                    .catch((error) => {
                        console.error('토큰 검증 실패:', error);
                        handleLogout();
                    });
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchBlacklist(user);
        }
    }, [user]);

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate('/');
    };

    const fetchBlacklist = (fetchUser) => {
        setProviderId(fetchUser.providerId);
        axios
            .get(`http://localhost:8050/api/blacklists/providerId?value=${providerId}`)
            .then((response) => {
                setBlacklist(response.data);
            })
            .catch((error) => {
                console.error('블랙리스트 불러오기 실패: ', error);
            });
    };

    const handleTabClick = (tabNumber) => {
        setProviderId(tabNumber);
    };

    return (
        <StyledContainer>
            <Title>블랙리스트</Title>
            <ListContainer>
                {blacklist.map((black) => (
                    <BlackListItem key={black.id}>
                        <UserHeader>
                            <UserAvatar src={black.user.userProfile} alt="User Avatar" />
                            <UserInfo>
                                <ItemTitle>{black.user.userId}</ItemTitle>
                                <ItemContent>{black.user.userName}</ItemContent>
                            </UserInfo>
                        </UserHeader>
                    </BlackListItem>
                ))}
            </ListContainer>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #fafafa;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BlackListItem = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const ItemContent = styled.div`
  color: #555;
`;

export default BlackListCompanyPage;