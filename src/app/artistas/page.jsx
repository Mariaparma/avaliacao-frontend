"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import ArtistaCard from "./ArtistaCard";
import styles from "./Artistas.module.css";


const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Artistas() {
  const [data, setData] = useState({
    artistas: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    artista: null,
    albuns: null,
    loading: false,
  });

  useEffect(() => {
    const fetchArtistas = async () => {
      const cached = sessionStorage.getItem("artistasData");
      if (cached) {
        setData({ artistas: JSON.parse(cached), loading: false, current: 1, pageSize: 5 });
        return;
      }

      try {
        const { data: artistas } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/artistas`,
          {
            headers: HEADERS,
          }
        );
        sessionStorage.setItem("artistasData", JSON.stringify(artistas));
        setData({ artistas, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar artistas");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchArtistas();
  }, []);

  const openModal = async (artista) => {
    setModalInfo({ visible: true, artista, albuns: null, loading: true });

    const cacheKey = `albuns_${artista.id}`;
    const cached =  setModalInfo.getItem(cacheKey);
    if (cached) {
      setModalInfo((m) => ({ ...m, albuns: JSON.parse(cached), loading: false }));
      return;
    }

    try {
      const { data: albuns } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/albuns/${artista.id}`,
        {
          headers: HEADERS,
        }
      );
      setModalInfo.setItem(cacheKey, JSON.stringify(albuns));
      setModalInfo((m) => ({ ...m, albuns, loading: false }));
    } catch {
      toast.error("Erro ao carregar álbuns.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedArtistas = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.artistas.slice(start, start + data.pageSize);
  };

  return (
    <div>
      
      <header className={styles.header}>
        <h1>🎵 Artistas e Álbuns 🎶</h1>
        <p>Explore os artistas e seus álbuns favoritos!</p>
      </header>

      
      <Pagination
        current={data.current}
        pageSize={data.pageSize}
        total={data.artistas.length}
        onChange={(page, size) =>
          setData((d) => ({ ...d, current: page, pageSize: size }))
        }
        showSizeChanger
        pageSizeOptions={["5", "10", "100"]}
      />

      {data.loading ? (
        <div style={{ display: "flex", justifyContent: "center", margin: 40 }}>
          <Image
            src="/media/gif.gif"
            width={300}
            height={200}
            alt="Loading"
          />
        </div>
      ) : (
        <div className={styles.cardsContainer}>
          {paginatedArtistas().map((artista) => (
            <ArtistaCard
              key={artista.id}
              artista={artista}
              onClick={() => openModal(artista)}
            />
          ))}
        </div>
      )}

      
      <Modal
        title={`Álbuns de ${modalInfo.artista?.name_artista}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            artista: null,
            albuns: null,
            loading: false,
          })
        }
        footer={null}
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.albuns ? (
          <div className={styles.albunsInfo}>
            {modalInfo.albuns.map((album) => (
              <div key={album.id}>
                <p>
                  <span className={styles.label}>Título:</span> {album.titulo}
                </p>
                <p>
                  <span className={styles.label}>Ano:</span> {album.ano}
                </p>
                <p>
                  <span className={styles.label}>Gênero:</span> {album.genero}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Nenhum álbum encontrado.</p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}