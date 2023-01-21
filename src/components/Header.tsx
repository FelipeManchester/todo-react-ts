import React from 'react';
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

  return (
    <header className={styles.header}>
      <h1>{date}</h1>
    </header>
  );
};

export default Header;
