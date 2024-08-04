import React from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';

export default function ChatComponent({
  submitHandler, messages, loggedUser, socketRef,
}) {
  return (
    <Stack>
      <MessagesList messages={messages} loggedUser={loggedUser} />
      <MessageForm submitHandler={submitHandler} socketRef={socketRef} />
    </Stack>
  );
}
