import React from "react";
import Image from "next/image";
import styles from "./ArtistaCard.module.css";

export default function ArtistaCard({ artista, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <Image
        src="/media/220.svg" 
        alt={`Imagem de ${artista.name_artista}`}
        width={100}
        height={100}
        className={styles.image}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{artista.name_artista}</h3>
        <p className={styles.genre}>{artista.genero || "Gênero desconhecido"}</p>
      </div>
    </div>
  );
}