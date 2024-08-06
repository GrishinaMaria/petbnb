/* eslint-disable no-unused-vars */
//! === 4 ===
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useAppSelector } from '../redux/hooks';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [sendToUser, setSendToUser] = useState(0);

  const [typing, setTyping] = useState(false);
  //!ПОНЯТЬ ДЛЯ ЧЕГО ЭТА ЗАПИСЬ
  const { user } = useAppSelector((store) => store.userSlice);
  console.log('useChat  users:********', user);
  const socketRef = useRef(null);

  useEffect(() => {
    console.log(messages, "messages **************" )
    axiosInstance(`${import.meta.env.VITE_API}/messages/${user.id}`).then(
      ({ data }) => setMessages(data),
    );
  }, [user]);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3100');
    const socket = socketRef.current;
    //console.log(socket)
    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
    console.log({type, payload}, "type***************************")
      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          setUsers(payload);
          break;

        case 'ADD_MESSAGE_FROM_SERVER':
          //console.log('ADD_MESSAGE_FROM_SERVER', payload);
          setMessages((prev) => [...prev, payload]);
          break;

        //! useEffect в MessageForm для установки и очистки елемента с выводом строки typing
        case 'CLIENT_TYPING_FROM_SERVER':
          setTyping(payload);
          break;

        case 'TYPING_FROM_SERVER_STOP':
          setTyping(false);
          break;

        default:
          break;
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const submitMessage = (input) => {
    if (!sendToUser) {
      alert('Выберите пользователя');
      return;
    }
    const socket = socketRef.current;

    socket.send(
      JSON.stringify({
        type: 'ADD_MESSAGE_FROM_CLIENT',
        payload: input,
        to: sendToUser,
      }),
    );
  };

  return {
    messages,
    users,
    typing,
    submitMessage,
    socketRef,
    setSendToUser,
    sendToUser,
  };
}


