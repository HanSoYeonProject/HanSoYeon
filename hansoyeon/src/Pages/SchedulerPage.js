import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../stores';
import defaultProfilePic from '../imgs/default_profile.png';
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SchedulerPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {user, setUser} = useUserStore();
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState({});

    const [eventTitle, setEventTitle] = useState('');
    const [eventContent, setEventContent] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);

    const [friends, setFriends] = useState([]);
    const [matchings, setMatchings] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [selectedFriendName, setSelectedFriendName] = useState(null);
    const [friendSchedule, setFriendSchedule] = useState([]);



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
                fetchFriends(fetchedUser.userId)
            }).catch(error => {
                // 토큰이 유효하지 않은 경우
                console.error("Token verification failed:", error);
                handleLogout();
            });
        }
    }, []);

    const fetchFriends = (userId) => {
        axios.get(`http://localhost:8050/api/friendships/friends?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then(response => {
            if (Array.isArray(response.data.data)) {
                setFriends(response.data.data);
            } else {
                console.error("Expected an array for friends, but got:", response.data.data);
                setFriends([]);
            }
        }).catch(error => {
            console.error("Error fetching friends:", error);
            setFriends([]);
        });
    };

    useEffect(() => {
        if (user && cookies.token) {
            fetchMatchings(user.userId);
        }
    }, [user]);

    const fetchMatchings = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/matchings/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            const acceptedMatchings = response.data.data.filter(matching => matching.status === "ACCEPTED").map(matching => ({
                ...matching,
                recruitment: {
                    ...matching.recruitment,
                    startDate: matching.recruitment.jobStartDate,
                    endDate: matching.recruitment.jobEndDate,
                    jobStartDate: new Date(matching.recruitment.jobStartDate),
                    jobEndDate: new Date(matching.recruitment.jobEndDate)
                }
            }));
            console.log(acceptedMatchings)
            setMatchings(acceptedMatchings);
        } catch (error) {
            console.error("Error fetching matchings:", error);
        }
    };

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const onChange = (newDate) => {
        setDate(newDate);

        const formattedDate = new Date(newDate.setHours(0, 0, 0, 0)); // Remove time part for comparison
        const filteredEvents = matchings.filter(matching => {
            const startDate = new Date(matching.recruitment.jobStartDate.setHours(0, 0, 0, 0));
            const endDate = new Date(matching.recruitment.jobEndDate.setHours(0, 0, 0, 0));
            return formattedDate >= startDate && formattedDate <= endDate;
        });

        setSelectedDateEvents(filteredEvents);
    };
    const isDateInRange = (date, startDate, endDate) => {
        const start = new Date(startDate.setHours(0, 0, 0, 0));
        const end = new Date(endDate.setHours(0, 0, 0, 0));
        const current = new Date(date.setHours(0, 0, 0, 0));

        return current >= start && current <= end;
    };

    const renderCellContent = ({ date, view }) => {
        const isMatchingDate = matchings.some(matching => {
            return isDateInRange(date, matching.recruitment.jobStartDate, matching.recruitment.jobEndDate);
        });

        return (
            <CellContent>
                {isMatchingDate ? <CircleMarker /> : <br />}
            </CellContent>
        );
    };

    const handleJobView = (jobId) => {
        navigate(`/recruit/${jobId}`);
    };

    const handleFriendClick = async (friendId, friendName) => {
        setSelectedFriend(friendId);
        setSelectedFriendName(friendName)
        fetchFriendMatchings(friendId)
        setIsModalOpen(true);
    };

    const fetchFriendMatchings = async (friendId) => {
        try {
            const response = await axios.get(`http://localhost:8050/api/matchings/user/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });
            const acceptedMatchings = response.data.data.filter(matching => matching.status === "ACCEPTED").map(matching => ({
                ...matching,
                recruitment: {
                    ...matching.recruitment,
                    startDate: matching.recruitment.jobStartDate,
                    endDate: matching.recruitment.jobEndDate,
                    jobStartDate: new Date(matching.recruitment.jobStartDate),
                    jobEndDate: new Date(matching.recruitment.jobEndDate)
                }
            }));
            const currentDate = new Date();
            const validMatchings = acceptedMatchings.filter(matching => {
                const startDate = new Date(matching.recruitment.startDate);
                return startDate >= currentDate;
            });
            setFriendSchedule(validMatchings);
        } catch (error) {
            console.error("Error fetching matchings:", error);
        }
    };

    const FriendSchedulerModal = ({ isOpen, onClose, schedule }) => {
        if (!isOpen) return null;

        return (
            <ModalBackdrop>
                <ModalContent>
                    <h2>{selectedFriendName}의 스케줄</h2>
                    <MatchingList>
                        {friendSchedule.map(matching => (
                            <MatchingItem
                                key={matching.matchingId}
                                onClick={() => handleJobView(matching.recruitment.jobId)}
                            >
                                <JobTitle>{matching.recruitment.jobTitle}</JobTitle>
                                <JobTitle>{matching.recruitment.startDate} ~ {matching.recruitment.endDate}</JobTitle>
                            </MatchingItem>
                        ))}
                    </MatchingList>
                    <Button onClick={onClose}>닫기</Button>
                </ModalContent>
            </ModalBackdrop>
        );
    };

    return (
        <MainContainer>
            <Container>
                <h1>스케줄러</h1>
                <StyledCalendar
                    onChange={onChange}
                    value={date}
                    tileContent={renderCellContent}
                />
            </Container>
            <EventList>
                <h2>일정 목록</h2>
                <MatchingList>
                    {selectedDateEvents.map(matching => (
                        <MatchingItem
                            key={matching.matchingId}
                            onClick={() => handleJobView(matching.recruitment.jobId)}
                        >
                            <JobTitle>{matching.recruitment.jobTitle}</JobTitle>
                            <JobTitle>{matching.recruitment.startDate} ~ {matching.recruitment.endDate}</JobTitle>
                        </MatchingItem>
                    ))}
                </MatchingList>
                <FriendsList>
                    <h2>친구 목록</h2>
                    {friends.map((friend, index) => (
                        <Friend key={index} onClick={() => handleFriendClick(friend.userId, friend.userName)}>
                            <FriendName>{friend.userName}({friend.userId})</FriendName>
                        </Friend>
                    ))}
                </FriendsList>
            </EventList>
            <FriendSchedulerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                schedule={friendSchedule}
            />
        </MainContainer>

    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 800px;

  .react-calendar__tile {
    max-height: 120px;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
  }
`;

const CellContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleMarker = styled.div`
  width: 10px;
  height: 10px;
  background-color: gray;
  border-radius: 50%;
  margin-top: 5px;
`;

const MainContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: start;
    padding: 20px;
`;

const EventList = styled.div`
    width: 30%; // Adjust width as needed
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 20px;
`;

const FriendsList = styled.div`
    width: 100%;
    padding: 20px;
    margin-top: 20px;
    border-top: 1px solid #ccc;
`;

const Friend = styled.div`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    // Add more styling as needed
`;

const FriendName = styled.h3`
    margin: 0;
    // Add more styling as needed
`;

const MatchingList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MatchingItem = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

const JobTitle = styled.h5`
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Ensure it's above other content
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 60%; // Adjust as needed
  max-width: 800px; // Adjust as needed
  z-index: 1001; // Ensure it's above the backdrop
`;

const Button = styled.button`
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

const EventItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;


export default SchedulerPage;