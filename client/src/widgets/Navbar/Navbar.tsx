import { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { fetchLogoutUser } from '../../redux/thunkActions';

export default function Navbar() {
  const user = useAppSelector((store) => store.userSlice.user);
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await dispatch(fetchLogoutUser());
    setAccessToken('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link to="/">На главную</Link>
      </div>
      <div className={styles.left}>
        <Link to="/hooks">Хуки</Link>
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link to="/">{user.username}</Link>
            <p className={styles.fake__link} onClick={logoutHandler}>
              Выйти
            </p>
          </>
        ) : (
          <>
            <Link to="/signin">Войти</Link>
            <Link to="/signup">Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
