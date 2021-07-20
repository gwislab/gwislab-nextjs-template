import Head from 'next/head';
import Image from 'next/image';

import styles from '../src/assets/styles/scss/home.module.scss';

export default function Home({ toggleTheme }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Gwislab Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org"> Gwislab Next.js Customised!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}>
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
          <button
            className={styles.card}
            onClick={toggleTheme}
            style={{ fontSize: 20, textAlign: 'center', cursor: 'pointer', color: 'black' }}>
            Toggle Theme
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          <span className={styles.logo} style={{ marginTop: -45 }}>
            <Image src="/logo.png" alt="Vercel Logo" width={72} height={50} />
          </span>
          GwisLab Customised
        </a>
      </footer>
    </div>
  );
}
