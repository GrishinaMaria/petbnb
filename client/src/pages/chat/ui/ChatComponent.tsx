import React from 'react';
//import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
// import { HStack } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";

export default function ChatComponent({
  submitHandler, messages, loggedUser, socketRef,
}) {
  console.log('ChatComponent')
  return (
    <Box overflowY="auto">
      <MessagesList messages={messages} loggedUser={loggedUser} />
      <MessageForm submitHandler={submitHandler} socketRef={socketRef} />
    </Box>
  );
}

 

 