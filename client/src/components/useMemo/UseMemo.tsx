import { Button } from '@chakra-ui/react';
import { useMemo, useState } from 'react';

const fib = (num: number): number => {
  if (num < 2) return num;
  return fib(num - 2) + fib(num - 1);
};

export default function UseMemo() {
  const [valueFib, setValue] = useState<number>(20);
  const [test, setTest] = useState<boolean>(false);

  const result = useMemo(() => fib(valueFib), [valueFib]);

  return (
    <>
      <h4>
        Испоьзуем useMemo, для предотвращения пересчета значения функции
        <br />
        при перерендере компонента, если результат функции не поменялся
      </h4>
      <hr />
      <span>{test ? 'TRUE' : 'FALSE'}</span>
      <hr />
      <span>{valueFib}</span>
      <hr />
      <span>{result}</span>
      <Button onClick={() => setValue(valueFib + 1)}>+</Button>
      <Button onClick={() => setValue(valueFib - 1)}>-</Button>
      <Button onClick={() => setTest(!test)}>Тык!</Button>
    </>
  );
}
