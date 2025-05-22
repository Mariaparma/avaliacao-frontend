import { Card, Button } from "antd";
import Image from "next/image";
import styles from "./ArtistaCard.module.css";

export default function ArtistaCard({ artista, onClick }) {
  return (
    <Card
      className={styles.card}
      hoverable
      cover={
        <Image
          alt={artista.nome}
          src={artista.foto ? artista.foto : "/images/220.svg"}
          width={220}
          height={220}
          className={styles.image}
        />
      }
      actions={[
        <Button type="primary" onClick={onClick} key="ver-albuns">
          Ver Álbuns
        </Button>,
      ]}
    >
      <Card.Meta title={artista.nome} />
    </Card>
  );
}