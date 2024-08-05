/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './MessageForm.module.css';
//import { Button, Form, InputGroup } from 'react-bootstrap';
//import SendIcon from '../../../widgets/icons/SendIcon';

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

    return () => {
      clearTimeout(time);
    };
  }, [input]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler(input);
        setInput('');
      }}
      className={styles.wrapper}
    >
      <div className={styles.inputs}>
        <Input
          onChange={changeHandler}
          borderColor="#3f3e3e"
          name="name"
          value={input}
        />
      </div>
      <div className={styles.btns}>
        <Button type="submit" colorScheme="blue">
          отправить
        </Button>
      </div>
    </form>
  );
}
