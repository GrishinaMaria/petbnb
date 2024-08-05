import React from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
// import { HStack } from '@chakra-ui/react';

export default function MessagesList({ messages, loggedUser }) {
  console.log("MessagesList  MessagesList:")
  return (
    <Stack>
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
