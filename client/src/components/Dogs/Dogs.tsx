import { Button } from '@chakra-ui/react';
import { memo, useState } from 'react';
import useToggle from '../../hooks/useToogle';

const arr = [
  { id: 1, name: 'Шарик' },
  { id: 2, name: 'Тузик' },
  { id: 3, name: 'Палкан' },
];

//! React.memo
const Btn = memo(({ data }: { data: { id: number; name: string } }) => {
  console.log(`Я кнопка ${data.name}`);
  return (
    <button style={{ padding: '15px', margin: '20px' }}>{data.name}</button>
  );
});

export default function Dogs() {
  const [state, setState] = useState<boolean>(false);
  const [show, toggle] = useToggle();

  console.log(show, toggle);

  return (
    <div>
      <div>
        <p>{String(state)}</p>
        <Button onClick={() => setState((prev) => !prev)}>Click</Button>
        <Button onClick={() => toggle()}>Toggle</Button>
      </div>
      {show && (
        <div>
          {arr.map((el) => (
            <Btn data={el} key={el.id} />
          ))}
        </div>
      )}
    </div>
  );
}
