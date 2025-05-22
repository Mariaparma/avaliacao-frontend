"use client";
import styles from "./Home.module.css";
import { Button, Card, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <div className={styles.backgroundGradient}>
      <Card hoverable className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/mariafoto.jpeg"
            alt="Foto da Maria"
            fill
            className={styles.image}
            priority
          />
        </div>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Maria Eduarda da Silva Parma
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          2TDS1
        </Typography.Paragraph>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          Instrutores Thiago Ferreira e Marcelo Carboni
        </Typography.Paragraph>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          Atividade Avaliativa de Front-End
        </Typography.Paragraph>
        <h2 className={styles.textTitle}>Bem-vindo à minha API!</h2>
        <ul className={styles.text}>
          <li>
            Minha API está relacionada com o meu projeto de BACK-END que tem a entidade Artistas que está relacionada com a minha outra entidade Albuns.
          </li>
        </ul>
        <Link href="/artistas" prefetch>
        <Button
  type="primary"
  className={styles.customButton}
  style={{ marginTop: 16, width: "100%" }}
>
  Acessar os Artistas e Albuns 🎤
</Button>
        </Link>
      </Card>
    </div>
  );
}
