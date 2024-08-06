import { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchLogoutUser } from '../../redux/thunkActions';
import { Search2Icon } from '@chakra-ui/icons';
import { Avatar, Button } from '@chakra-ui/react';

export default function Navbar() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await dispatch(fetchLogoutUser());
    setAccessToken('');
  };

  return (
    <nav className={styles.wrapper}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          PETBNB
        </Link>
      </div>
      <div className={styles.center}>
        <Link to="/search" className={styles.searchLink}>
          Найти петситтера
          <Search2Icon className={styles.searchIcon} />
        </Link>
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link to={`/account/${user.role}`} className={styles.userLink}>
              <Avatar
                size="md"
                bg="#00A3C4"
                src={user.photo}
                name={user.username}
              />
            </Link>
            <Button
              colorScheme="cyan"
              variant="outline"
              onClick={logoutHandler}
            >
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button colorScheme="cyan" variant="solid">
                Войти
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="cyan" variant="outline">
                Регистрация
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
