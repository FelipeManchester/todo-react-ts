import { useEffect, useState } from 'react';

import styles from './Footer.module.css';

const Footer = () => {
  const [data, setData] = useState<any | null>(null);

  async function newQuote() {
    try {
      const res = await fetch('https://api.quotable.io/random');
      const { statusCode, statusMessage, ...data } = await res.json();
      if (!res.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      console.error(error);
      setData({ content: 'Sorry, something went wrong. Try to refresh' });
    }
  }

  useEffect(() => {
    newQuote();
  }, []);

  if (!data) return null;

  return (
    <footer className={styles.footer}>
      <h3>"{data.content}"</h3>
      <cite>- {data.author}</cite>
      <div className={styles.links}>
        <p>
          Feito por
          <a
            href="https://felipemanchester.github.io/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            Felipe Manchester
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
