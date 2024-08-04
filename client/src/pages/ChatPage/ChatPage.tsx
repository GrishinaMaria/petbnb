import React, {
  useContext,
} from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import useChat from '../../hooks/useChat';
import ChatComponent from './chat/ui/ChatComponent';
import UsersList from './chat/ui/UsersList';

export default function ChatPage() {
  const { user: loggedUser } = useContext(UserContext);

  
  const {
    messages, users, typing, submitMessage, socketRef,
  } = useChat();

  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={6}>
          <h1 className="p-2 display-3">Chat</h1>
        </Col>
      </Row>
      <Card className="p-4">
        <Row>
          <Col xs={2}>
            <UsersList users={users.filter((el) => el.id !== loggedUser.id)} />
          </Col>
          <Col xs={10}>
            <ChatComponent
              submitHandler={submitMessage}
              messages={messages}
              loggedUser={loggedUser}
              socketRef={socketRef}
            />
            {typing && typing.id !== loggedUser.id && `${typing.username} is typing...`}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
