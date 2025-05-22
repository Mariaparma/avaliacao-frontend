import React from "react";
import { Card } from "antd";
import Image from "next/image";
import styles from "./ArtistaCard.module.css";

export default function ArtistaCard({ artista, onClick }) {
  return (
    <Card
      key={artista.id}
      className={styles.card}
      hoverable
      onClick={onClick}
      cover={
        <Image
          alt={artista.name_artista}
          src={artista.photo ? artista.photo : "/images/220.svg"}
          width={220}
          height={220}
        />
      }
    >
      <Card.Meta title={artista.name_artista} />
    </Card>
  );
}