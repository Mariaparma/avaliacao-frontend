
🎵 Artistas e Álbuns 🎶
Este é um projeto de front-end desenvolvido em React com Next.js que consome uma API para exibir uma lista de artistas e seus álbuns. O objetivo é proporcionar uma interface amigável e interativa para explorar informações sobre artistas e suas obras.

🚀 Funcionalidades
Listagem de Artistas: Exibe uma lista paginada de artistas.
Visualização de Álbuns: Ao clicar em um artista, um modal é exibido com os álbuns associados.
Paginação: Controle de exibição de artistas por página.
Carregamento com GIF: Exibe um GIF de carregamento enquanto os dados são buscados.
Cache com sessionStorage: Os dados são armazenados no cache para melhorar o desempenho.
Mensagens de Erro: Notificações amigáveis em caso de falha na requisição.

🛠️ Tecnologias Utilizadas
React: Biblioteca para construção de interfaces de usuário.
Next.js: Framework para renderização do lado do servidor e geração de páginas estáticas.
Ant Design: Biblioteca de componentes para estilização e layout.
Axios: Cliente HTTP para consumo da API.
React Toastify: Exibição de notificações.
CSS Modules: Estilização modular para componentes.

📂 Estrutura do Projeto

src/
  app/
    artistas/
      ArtistaCard.jsx        # Componente de card para exibir artistas
      ArtistaCard.module.css # Estilo do componente ArtistaCard
      page.jsx               # Página principal de artistas
      Artistas.module.css    # Estilo da página de artistas
  utils/
    sessionStorage.js        # Funções utilitárias para manipular sessionStorage
public/
  media/
    gif.gif                 # GIF de carregamento

🖼️ Demonstração
Página Inicial
Exibe uma lista de artistas com paginação.
Modal de Álbuns
Ao clicar em um artista, um modal é exibido com os álbuns associados.