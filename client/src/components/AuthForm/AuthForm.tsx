import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AuthForm.module.css';
import { Input, Button, Select } from '@chakra-ui/react';
import { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAuthUser } from '../../redux/thunkActions';
import { unwrapResult } from '@reduxjs/toolkit';

type Inputs = {
  username?: string;
  email: string;
  password: string;
  role?: "owner" | "sitter",
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
    role: type === "signup" ? "owner" : undefined,
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
        if (inputs.role === "owner") {
          navigate("/account/owner");
      } else if (inputs.role === "sitter") {
          navigate("/account/sitter");
      } else {
          navigate("/");
      }
});
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
              <Select
              onChange={changeHandler}
              value={inputs.role}
              name="role"
              placeholder="роль"
              style={{backgroundColor: "#2D3748"}}
            >
              <option value="owner" style={{backgroundColor: "#4A5568"}}>owner</option>
              <option value="sitter" style={{backgroundColor: "#4A5568"}}>sitter</option>
            </Select>
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
