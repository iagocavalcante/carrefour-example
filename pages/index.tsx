import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [data, setData] = useState<any>(null);
  const [cep, setCep] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const searchCep = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.get("./api/search-cep?cep=01001000");
      console.log(data);
      setData(data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <input
            type="text"
            placeholder="Digite o CEP"
            onInput={(e) => {
              console.log(e.target.value);
              setCep(e.target.value);
            }}
          />
          <button onClick={() => searchCep()}>Buscar</button>
        </div>

        <div className={styles.grid}>
          {loading && <p>Carregando...</p>}
          {error && <p>Erro ao buscar o CEP</p>}
          {data && (
            <>
              <p>CEP: {cep}</p>
              <ul>
                {data.map((item: any, index: number) => (
                  <li key={item.id}>
                    <p>{index}</p>
                    <ul>
                      {item.sellers.map((seller: any) => (
                        <li key={seller.id}>{seller.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
