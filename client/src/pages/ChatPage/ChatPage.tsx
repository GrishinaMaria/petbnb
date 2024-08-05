import React from "react";
import { Box, Button, Container, FormControl, HStack, Heading, Input, InputGroup, InputRightElement, Text, VStack, Divider, Avatar, Tooltip, useColorModeValue } from '@chakra-ui/react';
//import UserContext from '../../contexts/UserContext';
// import { DotOnlineIcon, SendIcon } from '../../../ui/icons';
import useChat from '../../hooks/useChat';
import ChatComponent from '../chat/ui/ChatComponent';
import UsersList from '../chat/ui/UsersList';
import { useAppSelector } from '../../redux/hooks';

// Основной компонент ChatPage
export default function ChatPage() {
// const { user: loggedUser } = useContext(UserContext);
const { user: loggedUser } = useAppSelector((store) => store.userSlice);
const { messages, users, typing, submitMessage, socketRef } = useChat();
  
const cardBg = useColorModeValue("gray.100", "gray.800");
const textColor = useColorModeValue("black", "whiteAlpha.900");

return (
  <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center">
          <Heading py={4} size="2xl" color={textColor}>
              Чат
          </Heading>
          <Box
              w="full"
              p={4}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="xl"
          >
              <HStack spacing={4} align="flex-start">
                  <Box w="25%" p={4}>
                      <UsersList
                          users={users.filter(
                              (el) => el.id !== loggedUser.id
                          )}
                      />
                  </Box>
                  <Divider orientation="vertical" />
                  <Box w="75%" p={4}>
                      <ChatComponent
                          submitHandler={submitMessage}
                          messages={messages}
                          loggedUser={loggedUser}
                          socketRef={socketRef}
                      />
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