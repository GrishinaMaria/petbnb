import styles from './MainCard.module.css';
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { Entry } from '../../types/statesTypes';
import { useAppDispatch } from '../../redux/hooks';
import { fetchDelEntry } from '../../redux/thunkActions';

type MainCardProps = {
  entry: Entry;
};

export default function MainCard({ entry }: MainCardProps) {
  const dispatch = useAppDispatch();

  const deleteHandler = async (): Promise<void> => {
    dispatch(fetchDelEntry(entry.id));
  };

  return (
    <div className={styles.wrapper}>
      <Card bgColor='#313133' className={styles.container} maxW='sm'>
        <CardBody className={styles.body}>
          <Stack mt='3' spacing='3'>
            <Heading size='md'>{entry?.name}</Heading>
            <Text>{entry?.description}</Text>
          </Stack>
          <Stack mt='3' spacing='3'>
            <Avatar name={entry?.name} />
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Подробнее
            </Button>
            <Popover placement='top'>
              <PopoverTrigger>
                <Button variant='ghost' colorScheme='blue'>
                  Удалить
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  Вы действительно хотите удалить запись?
                </PopoverHeader>
                <PopoverBody>
                  <Button
                    onClick={deleteHandler}
                    variant='ghost'
                    colorScheme='blue'
                  >
                    Удалить
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}
