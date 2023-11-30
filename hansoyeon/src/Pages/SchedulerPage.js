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

    const handleLogout = () => {
        removeCookie('token');
        setUser(null);
        navigate("/");
    };

    const onChange = (newDate) => {
        setDate(newDate);
        setSelectedEvent(events[newDate.toISOString().split('T')[0]] || '');
        setSelectedDateEvents(Object.entries(events).filter(([key, value]) => key.startsWith(newDate.toISOString().split('T')[0])));
    };

    const handleSaveEvent = () => {
        const formattedDate = date.toISOString().split('T')[0];
        setEvents({
            ...events,
            [formattedDate]: { title: eventTitle, content: eventContent }
        });
        setEventTitle('');
        setEventContent('');
    };

    const renderCellContent = ({ date, view }) => {
        const formattedDate = date.toISOString().split('T')[0];
        return (
            <CellContent>
                {events[formattedDate] ?
                    <CircleMarker />
                    :
                    <br/>
                }
            </CellContent>
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
                <Input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="제목"
                />
                <Input
                    type="text"
                    value={eventContent}
                    onChange={(e) => setEventContent(e.target.value)}
                    placeholder="내용"
                />
                <Button onClick={handleSaveEvent}>저장</Button>
            </Container>
            <EventList>
                <h2>일정 목록</h2>
                {selectedDateEvents.map(([key, event], index) => (
                    <div key={index}>
                        <strong>{event.title}</strong>
                        <p>{event.content}</p>
                    </div>
                ))}
                <FriendsList>
                    <h2>친구 목록</h2>
                    {friends.map((friend, index) => (
                        <Friend key={index}>
                            <FriendName>{friend.userName}</FriendName>
                        </Friend>
                    ))}
                </FriendsList>
            </EventList>
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
    flex-direction: column; // Change to column to stack items vertically
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

const Input = styled.input`
  margin: 10px;
`;

const Button = styled.button`
  margin: 10px;
`;

const EventDisplay = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
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

export default SchedulerPage;