import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Divider,
  Avatar,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
//import UserContext from '../../contexts/UserContext';
// import { DotOnlineIcon, SendIcon } from '../../../ui/icons';
import useChat from '../../hooks/useChat';
import ChatComponent from '../chat/ui/ChatComponent';
import UsersList from '../chat/ui/UsersList';
import { useAppSelector } from '../../redux/hooks';
import axiosInstance from '../../axiosInstance';

// Основной компонент ChatPage
export default function ChatPage() {
  // const { user: loggedUser } = useContext(UserContext);
  const { user: loggedUser } = useAppSelector((store) => store.userSlice);
  const {
    messages,
    users,
    typing,
    submitMessage,
    sendToUser,
    setSendToUser,
    socketRef,
  } = useChat();

  const showMessage = messages.filter(
    (mes) => mes.to === loggedUser.id || mes.authorId === loggedUser.id,
  );
  const userSendMessage = [];
  const addId = [];
  showMessage.forEach((item) => {
    if (!addId.includes(item.authorId) && item.authorId !== loggedUser.id) {
      console.log(item);
      userSendMessage.push({
        id: item.authorId,
        username: item.User?.username || 'Пользователь',
        photo: null,
      });
      addId.push(item.authorId);
    }
  });

  const cardBg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('black', 'whiteAlpha.900');

  const [sitters, setSitters] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/petsitter/all`)
      .then((res) => {
        setSitters(res.data.allSitters);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
        <Heading py={4} size="2xl" color={textColor}>
          Чат
        </Heading>
        <Box w="full" p={4} bg={cardBg} borderRadius="lg" boxShadow="xl">
          <HStack spacing={4} align="flex-start">
            <Box w="25%" p={4}>
              {loggedUser?.role === 'owner' && (
                <UsersList
                  users={sitters}
                  setSelectUser={setSendToUser}
                  selectUser={sendToUser}
                />
              )}
              {loggedUser?.role === 'sitter' && (
                <UsersList
                  users={userSendMessage}
                  setSelectUser={setSendToUser}
                  selectUser={sendToUser}
                />
              )}
            </Box>
            <Divider orientation="vertical" />
            <Box w="75%" p={4}>
              {loggedUser?.role === 'owner' && (
                <ChatComponent
                  submitHandler={submitMessage}
                  messages={messages.filter(
                    (mes) =>
                      (mes.to === sendToUser &&
                        mes.authorId === loggedUser.id) ||
                      (mes.authorId === sendToUser && mes.to === loggedUser.id),
                  )}
                  loggedUser={loggedUser}
                  socketRef={socketRef}
                />
              )}
              {loggedUser?.role === 'sitter' && (
                <ChatComponent
                  submitHandler={submitMessage}
                  messages={showMessage.filter(
                    (mes) =>
                      (mes.to === sendToUser &&
                        mes.authorId === loggedUser.id) ||
                      (mes.authorId === sendToUser && mes.to === loggedUser.id),
                  )}
                  loggedUser={loggedUser}
                  socketRef={socketRef}
                />
              )}
              {typing && typing.id !== loggedUser.id && (
                <Text mt={2} color={textColor}>
                  {typing.username} печатает...
                </Text>
              )}
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
