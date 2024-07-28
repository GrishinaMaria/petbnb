import List from '../../components/List/List';
import styles from './HomePage.module.css';
import Form from '../../components/Form/Form';
import Counter from '../../components/Counter/Counter';

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <Counter />

      <Form />
      <List />
    </div>
  );
}
