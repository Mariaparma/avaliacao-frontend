"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Skeleton, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../utils/sessionStorage";

import styles from "./Artistas.module.css";
import ArtistaCard from "./ArtistaCard";

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
    album: null,
    loading: false,
  });

  useEffect(() => {
    const fetchArtistas = async () => {
      const cached = getSessionStorage("artistasData", []);
      if (cached.length > 0) {
        setData({ artistas: cached, loading: false, current: 1, pageSize: 5 });
        return;
      }

      try {
        const { data: artistas } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/artistas`,
          {
            headers: HEADERS,
          }
        );
        setSessionStorage("artistasData", artistas);
        setData({ artistas, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar artistas");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchArtistas();
  }, []);

  const openModal = async (artista) => {
    setModalInfo({ visible: true, artista, album: null, loading: true });

    const cacheKey = `album_${artista.id}`;
    const cached = getSessionStorage(cacheKey, null);
    if (cached) {
      setModalInfo((m) => ({ ...m, album: cached, loading: false }));
      return;
    }

    try {
      const { data: album } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/album/${artista.id}`,
        {
          headers: HEADERS,
        }
      );
      setSessionStorage(cacheKey, album);
      setModalInfo((m) => ({ ...m, album, loading: false }));
    } catch {
      toast.error("Erro ao carregar álbum.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedArtistas = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.artistas.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <h1>Lista de Artistas 🎤</h1>

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
          <Spin size="large" />
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
        title={modalInfo.artista ? `Álbuns de ${modalInfo.artista.nome}` : ""}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            artista: null,
            album: null,
            loading: false,
          })
        }
        footer={null}
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.album && modalInfo.album.length > 0 ? (
          <div className={styles.albunsInfo}>
            {modalInfo.album.map((alb) => (
              <div key={alb.id} className={styles.albumItem}>
                <strong>{alb.titulo}</strong>
                <p>Ano: {alb.ano}</p>
                <p>Gênero: {alb.genero}</p>
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