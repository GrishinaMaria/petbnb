import React from 'react';
import { Stack } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
// import { HStack } from '@chakra-ui/react';

export default function MessagesList({ messages, loggedUser }) {
  console.log("MessagesList  MessagesList:")
  return (
    <Stack spacing={4}>
      {messages.map((message) => (
        <ChatMessage
          message={message}
          key={message.id}
          loggedUser={loggedUser}
        />
      ))}
    </Stack>
  );
}
