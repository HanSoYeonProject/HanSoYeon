import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';
import Footer from "../Components/Footer";


const BlackListCompanyPage = () => {
    const navigate = useNavigate();
    const [blacklist, setBlacklist] = useState([]);
    const [providerId, setProviderId] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchBlacklist = (fetchUser) => {
        const updatedProviderId = user.providerId;

        setProviderId(updatedProviderId);

        axios
            .get(`http://localhost:8050/api/blacklists/users?providerId=${updatedProviderId}`)
            .then((response) => {
                console.log(response.data);

                const blacklistData = response.data.data; // 'data' 필드를 추가하여 실제 블랙리스트 데이터를 가져옵니다.

                if (Array.isArray(blacklistData)) {
                    setBlacklist(blacklistData);
                } else {
                    console.error('데이터 형식이 배열이 아닙니다.');
                }
            })
            .catch((error) => {
                console.error('블랙리스트 불러오기 실패: ', error);
            });
    };


    const handleTabClick = (tabNumber) => {
        setProviderId(tabNumber);
    };

    const handleDelete = (blacklistId) => {
        console.log(user.providerId)
        console.log(blacklistId);

        // 삭제 API 호출
        axios
            .delete('http://localhost:8050/api/blacklists', {
                data: {
                    providerId: user.providerId,
                    userId: blacklistId
                }
            })
            .then((response) => {
                fetchBlacklist();
            })
            .catch((error) => {
                console.error("Error deleting blacklist: ", error);
            });
    };


    const handleAddUser = () => {
        openModal();
    };

    const UserAddModal = ({closeModal}) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
        const [selectedUser, setSelectedUser] = useState(null);

        const handleSearch = () => {
            axios
                .get(`http://localhost:8050/api/auth/users/search?search=${searchTerm}`)
                .then((response) => {
                    const filteredResults = response.data.filter(user => user.userId !== "admin");
                    setSearchResults(filteredResults);
                })
                .catch((error) => {
                    console.error('Failed to search users: ', error);
                });
        };

        const handleUserSelect = (user) => {
            setSelectedUser(user);
        };

        const handleAddUserToBlacklist = () => {
            if (selectedUser) {
                axios
                    .post(`http://localhost:8050/api/blacklists?providerId=${user.providerId}&userId=${selectedUser.userId}`)
                    .then((response) => {
                        console.log('User added to the blacklist:', selectedUser);
                        fetchBlacklist(user);
                        closeModal();
                    })
                    .catch((error) => {
                        console.error('Error adding user to the blacklist:', error);
                    });
            }
        };

        return (
            <ModalWrapper onClick={() => closeModal()}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <CloseButton onClick={() => closeModal()}>&times;</CloseButton>
                    <Title>사용자 추가</Title>
                    <UserSearchModal>
                        <input
                            type="text"
                            placeholder="아이디 입력"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>검색</button>
                    </UserSearchModal>

                    {searchResults.map((user) => (
                        <SearchResultItem key={user.userId} onClick={() => handleUserSelect(user)}>
                            {user.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                                <UserAvatar src={defaultProfilePic} alt="User Avatar" />
                                :
                                <UserAvatar src={user.userProfile} alt="User Avatar" />
                            }
                            <ItemTitle>{user.userId}</ItemTitle>
                            <ItemContent>{user.userName}</ItemContent>
                            <Add11Button onClick={handleAddUserToBlacklist}>추가</Add11Button>
                        </SearchResultItem>
                    ))}
                </ModalContent>
            </ModalWrapper>
        );
    };


    return (
        <StyledContainer>
            <Title>블랙리스트</Title>
            <ListContainer>
                <div style={{display:'flex', justifyContent:'center'}}>
                <AddButton onClick={handleAddUser}>추 가</AddButton>
                </div>
                {blacklist.map((black) => (
                    <BlackListItem key={black.id}>
                        <UserHeader>
                            {black.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                                <UserAvatar src={defaultProfilePic} alt="User Avatar" />
                                :
                                <UserAvatar src={black.userProfile} alt="User Avatar" />
                            }
                            <UserInfo>
                                <ItemTitle>{black.userId}</ItemTitle>
                                <ItemContent>{black.userName}</ItemContent>
                            </UserInfo>
                            <DeleteButton onClick={() => handleDelete(black.userId)}>삭제</DeleteButton>
                        </UserHeader>
                    </BlackListItem>
                ))}
            </ListContainer>
            {isModalOpen && (
                <UserAddModal closeModal={closeModal} />
            )}
            <StyledFooter>
                <Footer />
            </StyledFooter>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  color: #333;
  font-size: 40px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'omyu_pretty';
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%; // Adjust the width as per your layout
  margin: 0 auto; // Center align the container
`;

const BlackListItem = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserInfo = styled.div`
  flex-grow: 1;
  margin-right: 20px;
`;

const ItemTitle = styled.h3`
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
`;

const ItemContent = styled.p`
  font-size: 0.9em;
  color: #555;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const AddButton = styled.button`
  background-color: #aab5bd;
  color: white;
  border: none;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  margin-bottom: 20px;
  width: 500px;

  &:hover {
    background-color: #868e96;
  }
`;
const Add11Button = styled.button`
  background-color: #aab5bd;
  color: white;
  border: none;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 20px;
  width: 250px;

  &:hover {
    background-color: #868e96;
  }
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const UserSearchModal = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  input {
    padding: 8px;
    margin-bottom: 10px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

`;


const SelectedUserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const SelectedUserInfo = styled.div`
  flex: 1;
`;

const SearchResultItem = styled.div`
  background-color: #f8f9fa;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  margin-top: auto; 
`;

export default BlackListCompanyPage;