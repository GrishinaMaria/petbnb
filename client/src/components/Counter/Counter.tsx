import { Button } from '@chakra-ui/react';
import { useState } from 'react';

export default function Counter() {
const [count, setCount] = useState<number>(0)

  const incrementHandler = () => {
    setCount((prev) => prev + 1)
  };

  const decrementHandler = () => {
    setCount((prev) => prev - 1)
  };

  return (
    <>
      <h3>Используем контекст и редьюсер</h3>
      <div style={{ margin: '20px' }}>
        <Button onClick={decrementHandler}>-</Button>
        <span style={{ margin: '10px 10px' }}>{count}</span>
        <Button onClick={incrementHandler}>+</Button>
      </div>
    </>
  );
}
