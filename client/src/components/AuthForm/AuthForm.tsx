import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AuthForm.module.css';
import { Input, Button } from '@chakra-ui/react';
import { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAuthUser } from '../../redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';

type Inputs = {
  username?: string;
  email: string;
  password: string;
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
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>{title}</h3>
      <div className={styles.inputs}>
        {type === 'signin' && (
          <>
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="email"
              name="email"
              value={inputs?.email}
              placeholder="Эл.почта"
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="password"
              name="password"
              value={inputs?.password}
              placeholder="Пароль"
            />
          </>
        )}
        {type === 'signup' && (
          <>
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              name="username"
              value={inputs?.username}
              placeholder="Имя пользователя"
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="email"
              name="email"
              value={inputs?.email}
              placeholder="Эл.почта"
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="password"
              name="password"
              value={inputs?.password}
              placeholder="Пароль"
            />
          </>
        )}
      </div>
      <div className={styles.btns}>
        {type === 'signin' && (
          <Button type="submit" colorScheme="blue">
            Вход
          </Button>
        )}
        {type === 'signup' && (
          <Button type="submit" colorScheme="blue">
            Регистрация
          </Button>
        )}
      </div>
    </form>
  );
}
