import { useEffect } from 'react';
import styles from './List.module.css';
import MainCard from '../Card/MainCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchEntries } from '../../redux/thunkActions';
import { Spinner } from '@chakra-ui/react';
import { Entry } from '../../types/statesTypes';

export default function List() {
  const { isLoading, entries } = useAppSelector((store) => store.entrySlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spinner
          thickness='5px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : (
        <div className={styles.wrapper}>
          {entries.length
            ? entries?.map((entry:Entry) => <MainCard key={entry.id} entry={entry} />)
            : null}
        </div>
      )}
    </>
  );
}
