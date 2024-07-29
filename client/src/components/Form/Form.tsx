import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Form.module.css';
import { Input, Button } from '@chakra-ui/react';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAddEntry } from '../../redux/thunkActions';
import { Inputs } from '../../types/types';


export default function Form() {
  const dispatch = useAppDispatch();

  const [inputs, setInputs] = useState<Inputs>({ name: '', description: '' });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchAddEntry(inputs));
    setInputs({ name: '', description: '' });
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>Добавь своего кита:</h3>
      <div className={styles.inputs}>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='name'
          value={inputs.name}
          placeholder='Имя'
        />
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='description'
          value={inputs.description}
          placeholder='Описание'
        />
      </div>
      <div className={styles.btns}>
        <Button type='submit' colorScheme='blue'>
          Создать
        </Button>
      </div>
    </form>
  );
}
