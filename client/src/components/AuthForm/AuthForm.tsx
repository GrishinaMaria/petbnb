import { ChangeEvent, FormEvent, useState } from 'react';
// import styles from './AuthForm.module.css';
import {
  Input,
  Button,
  Heading,
  Select,
  Flex,
  Image,
  Link as ChakraLink,
  Box,
} from '@chakra-ui/react';
import { setAccessToken } from '../../axiosInstance';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAuthUser } from '../../redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

type Inputs = {
  username?: string;
  email: string;
  password: string;
  role: string;
};

type AuthFormProps = {
  title: string;
  type: 'signin' | 'signup';
};

export default function AuthForm({ title, type = 'signin' }: AuthFormProps) {
  const [inputs, setInputs] = useState<Inputs>({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //! Типизация ивента
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAuthUser({ inputs, type }))
      .then(unwrapResult)
      .then((result) => {
        setAccessToken(result.accessToken);
      });
    navigate('/');
  };

  return (
    <Flex
      // minH="1000vh"
      // minW="100vw"
      align="center"
      justify="center"
      mt="50px"
      w="100%"
    >
      <Flex direction="row" m="70px">
        <Box
          flex="1"
          borderTopLeftRadius="16px"
          borderBottomLeftRadius="16px"
          overflow="hidden"
          boxShadow="lg"
        >
          <img
            src="https://i.pinimg.com/564x/aa/a2/59/aaa2597050b0d98b8a7244c833f4b272.jpg"
            alt="Auth"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Box
          as="form"
          onSubmit={submitHandler}
          p="8"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          flex="1"
          maxW="460px"
        >
          <Heading as="h3" mb="6">
            {title}
          </Heading>

          {type === 'signin' && (
            <>
              <Input
                onChange={changeHandler}
                type="email"
                name="email"
                value={inputs?.email}
                placeholder="Введите email"
                mb="4"
              />
              <Input
                onChange={changeHandler}
                type="password"
                name="password"
                value={inputs?.password}
                placeholder="Введите пароль"
                mb="4"
              />
            </>
          )}

          {type === 'signup' && (
            <>
              <Input
                onChange={changeHandler}
                name="username"
                value={inputs?.username}
                placeholder="Ваше имя"
                mb="4"
              />
              <Input
                onChange={changeHandler}
                type="email"
                name="email"
                value={inputs?.email}
                placeholder="Email"
                mb="4"
              />
              <Input
                onChange={changeHandler}
                type="password"
                name="password"
                value={inputs?.password}
                placeholder="Пароль"
                mb="4"
              />
              <Select
              colorScheme="cyan"
                onChange={changeHandler}
                value={inputs.role}
                name="role"
                placeholder="Буду пользоваться как ..."
                mb="4"
              >
                <option value="owner">Владелец питомца</option>
                <option value="sitter">Петситтер</option>
              </Select>
            </>
          )}

          <Button
            type="submit"
            bg="#00B5D8"
            color="white"
            _hover={{ bg: '#00A3C4' }}
            rounded="md"
            width="full"
          >
            {type === 'signin' ? 'Вход' : 'Регистрация'}
          </Button>

          <Flex justify="space-between" mt="4">
            {type === 'signup' ? (
              <ChakraLink as={RouterLink} to="/signin" color="#00A3C4">
                Уже есть аккаунт? Войти
              </ChakraLink>
            ) : (
              <ChakraLink as={RouterLink} to="/signup" color="#00A3C4">
                Нет аккаунта? Зарегистрироваться
              </ChakraLink>
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
