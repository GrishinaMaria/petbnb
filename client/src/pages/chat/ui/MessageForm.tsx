/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from '../../../ui/icons/SendIcon';

export default function MessageForm({ submitHandler, socketRef }) {
  const [input, setInput] = useState('');
  const changeHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.send(JSON.stringify({ type: 'TYPING_FROM_CLIENT' }));

    const time = setTimeout(() => {
      socket.send(JSON.stringify({ type: 'STOP_TYPING_FROM_CLIENT' }));
    }, 1000);

    return () => { clearTimeout(time); };
  }, [input]);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler(input);
        setInput('');
      }}
    >
      <InputGroup className="mb-3">
        <Form.Control placeholder="Your message" value={input} onChange={changeHandler} />
        <InputGroup.Text id="basic-addon2">
          <Button variant="outline-primary" type="submit">
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
