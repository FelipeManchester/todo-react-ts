// styles
import styles from './Header.module.css';
const Header = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  const date = today.toLocaleDateString('pt-BR', options);
  const firstLetter = date[0].toUpperCase();
  const restOfString = date.slice(1);
  const capitalFirstLetter = firstLetter + restOfString;

  return (
    <header className={styles.header}>
      <h1>{capitalFirstLetter}</h1>
    </header>
  );
};

export default Header;
