import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';
import axios from "axios";

const FriendListPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const [friends, setFriends] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [searchUserId, setSearchUserId] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [showRequestModal, setShowRequestModal] = useState(false);
    const [sentRequests, setSentRequests] = useState([]); // 보낸 요청 목록
    const [receivedRequests, setReceivedRequests] = useState([]); // 받은 요청 목록

    useEffect(() => {
        if (cookies.token) {
            axios.get('http://localhost:8050/api/auth/currentUser', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            }).then(response => {
                console.log(cookies.token)
                // 토큰이 유효한 경우
                const fetchedUser = response.data;
                console.log(fetchedUser)
                setUser(fetchedUser);
                fetchFriends(fetchedUser.userId);
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

    const fetchFriends = (userId) => {
        axios.get(`http://localhost:8050/api/friends/${userId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(response => {
            console.log(response.data)
            setFriends(response.data);
        }).catch(error => {
            console.error("Error fetching friends:", error);
        });
    };

    const handleSearch = () => {
        axios.get(`http://localhost:8050/api/auth/users/search?search=${searchUserId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(response => {
            const filteredResults = response.data.filter(user => user.userId !== "admin");
            setSearchResults(filteredResults);
        }).catch(error => {
            console.error("Error searching users:", error);
        });
    };

    const handleAddFriend = (friendId) => {
        // 현재 사용자의 ID와 친구의 ID를 이용하여 친구 요청 보내기
        const requestBody = {
            userId: user.userId,  // 현재 로그인한 사용자의 ID
            friendId: friendId    // 추가할 친구의 ID
        };

        axios.post('http://localhost:8050/api/friends', requestBody, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(response => {
            alert("친구 요청을 보냈습니다"); // 성공 메시지 표시
        }).catch(error => {
            console.error("Error adding friend:", error);
            alert("친구 추가 실패"); // 실패 메시지 표시
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSearchUserId('');
        setSearchResults([]);
    };

    const fetchFriendRequests = () => {
        // 보낸 요청 목록을 불러오는 로직
        axios.get(`http://localhost:8050/api/friends/sentRequests/${user.userId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(response => {
            setSentRequests(response.data);
        }).catch(error => {
            console.error("Error fetching sent friend requests:", error);
        });

        // 받은 요청 목록을 불러오는 로직
        axios.get(`http://localhost:8050/api/friends/receivedRequests/${user.userId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(response => {
            setReceivedRequests(response.data);
        }).catch(error => {
            console.error("Error fetching received friend requests:", error);
        });
    };

    // 요청 목록 모달을 여는 함수
    const handleOpenRequestModal = () => {
        setShowRequestModal(true);
        fetchFriendRequests();
    };

    // 요청 목록 모달을 닫는 함수
    const handleCloseRequestModal = () => {
        setShowRequestModal(false);
    };

    const handleAcceptRequest = (friendId) => {
        const requestBody = {
            userId: friendId,
            friendId: user.userId
        };

        axios.put('http://localhost:8050/api/friends', requestBody, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        })
            .then(response => {
                alert("친구 요청이 수락되었습니다");
                const updatedReceivedRequests = receivedRequests.filter(request => request.userId !== friendId);
                setReceivedRequests(updatedReceivedRequests);
                fetchFriends(user.userId);

            })
            .catch(error => {
                console.error("Error accepting friend request:", error);
                alert("친구 요청 수락 실패");
            });
    };

    const handleDeleteFriend = (friendId) => {
        axios.delete(`http://localhost:8050/api/friends?userId=${user.userId}&friendId=${friendId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        })
            .then(response => {
                alert("친구가 삭제되었습니다");
                setFriends(friends.filter(friend => friend.userId !== friendId));
            })
            .catch(error => {
                console.error("Error deleting friend:", error);
                alert("친구 삭제 실패");
            });
    };


    return(
        <Container>
            <h1>친구 리스트</h1>
            <div>
                <Button onClick={() => setShowModal(true)}>친구 추가</Button>
                <Button onClick={handleOpenRequestModal}>요청 목록</Button>
            </div>
            <FriendsContainer>
                {friends.map((friend, index) => (
                    <Friend key={index}>
                        {friend.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                            <ProfilePic src={defaultProfilePic} alt="Profile" />
                            :
                            <ProfilePic src={friend.userProfile} alt="Profile" />
                        }
                        <UserName>{friend.userName}</UserName>
                        <UserId>({friend.userId})</UserId>
                        <DeleteButton onClick={() => handleDeleteFriend(friend.userId)}>삭제</DeleteButton>
                    </Friend>
                ))}
            </FriendsContainer>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <h2>친구 추가</h2>
                        <input
                            type="text"
                            placeholder="아이디 검색"
                            value={searchUserId}
                            onChange={(e) => setSearchUserId(e.target.value)}
                        />
                        <Button onClick={handleSearch}>검색</Button>
                        <Button onClick={handleCloseModal}>닫기</Button>
                        <SearchResults>
                            {searchResults.map((user, index) => (
                                <UserCard key={index}>
                                    {user.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                                        <ProfilePic src={defaultProfilePic} alt="Profile" />
                                        :
                                        <ProfilePic src={user.userProfile} alt="Profile" />
                                    }
                                    <UserInfo>
                                        <UserName>{user.userName}</UserName>
                                        <UserId>{user.userId}</UserId>
                                    </UserInfo>
                                    <AddFriendButton onClick={() => handleAddFriend(user.userId)}>친구 추가</AddFriendButton>
                                </UserCard>
                            ))}
                        </SearchResults>
                    </ModalContent>
                </Modal>
            )}
            {showRequestModal && (
                <Modal>
                    <ModalContent>
                        <h2>친구 요청 목록</h2>
                        <Section>
                            <SectionTitle>보낸 요청</SectionTitle>
                            {sentRequests.map((request, index) => (
                                <RequestItem key={index}>
                                    {request.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                                        <ProfileRequestPic src={defaultProfilePic} alt="Profile" />
                                        :
                                        <ProfileRequestPic src={request.userProfile} alt="Profile" />
                                    }
                                    <UserInfo>
                                        <UserName>{request.userName}</UserName>
                                        <UserId>{request.userId}</UserId>
                                    </UserInfo>
                                </RequestItem>
                            ))}
                        </Section>
                        <Divider />
                        <Section>
                            <SectionTitle>받은 요청</SectionTitle>
                            {receivedRequests.map((request, index) => (
                                <RequestItem key={index}>
                                    {request.userProfile === "hansoyeon/src/imgs/default_profile.png" ?
                                        <ProfileRequestPic src={defaultProfilePic} alt="Profile" />
                                        :
                                        <ProfileRequestPic src={request.userProfile} alt="Profile" />
                                    }
                                    <UserInfo>
                                        <UserName>{request.userName}</UserName>
                                        <UserId>{request.userId}</UserId>
                                    </UserInfo>
                                    <AcceptButton onClick={() => handleAcceptRequest(request.userId)}>수락</AcceptButton>
                                </RequestItem>
                            ))}
                        </Section>
                        <Button onClick={handleCloseRequestModal}>닫기</Button>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FriendsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const Friend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const SearchResults = styled.div`
    margin-top: 20px;
    // 스타일 정의
`;

const UserCard = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f3f3f3;
    border-radius: 8px;
`;

const ProfilePic = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserInfo = styled.div`
    margin-left: 10px;
    flex-grow: 1;
`;

const UserName = styled.h2`
  margin-top: 10px;
  font-size: 20px;
  color: #333;
`;

const UserId = styled.p`
  font-size: 16px;
  color: #666;
`;

const AddFriendButton = styled.button`
    padding: 5px 10px;
    background-color: #963;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
    margin-bottom: 10px;
`;

const Divider = styled.hr`
    border: 0;
    height: 1px;
    background-color: #ccc;
    margin: 20px 0;
`;

const RequestItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f3f3f3;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ProfileRequestPic = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`;

const AcceptButton = styled.button`
    padding: 5px 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto; // 오른쪽에 버튼 위치
`;

const DeleteButton = styled.button`
    padding: 5px 10px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px; // Add margin to separate it from user info
`;

export default FriendListPage;