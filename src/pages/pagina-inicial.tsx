import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pagina-inicial.css'

export default function PaginaInicial() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [produtosMobile, setProdutosMobile] = useState(false);
  const [produtosDesktop, setProdutosDesktop] = useState(false);
  const [temaEscuro, setTemaEscuro] = useState(() => {
    const temaSalvo = localStorage.getItem('tema');
    return temaSalvo === 'escuro';
  });

  const servico1Ref = useRef<HTMLElement>(null);
  const servico2Ref = useRef<HTMLElement>(null);
  const servico3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle('escuro', temaEscuro);
    localStorage.setItem('tema', temaEscuro ? 'escuro' : 'claro');
  }, [temaEscuro]);

  const retomarFoco = (id: string) => {

    setTimeout(() => {
      if (id === 'servico-1') servico1Ref.current?.focus();
      if (id === 'servico-2') servico2Ref.current?.focus();
      if (id === 'servico-3') servico3Ref.current?.focus();
    }, 0);
  }

  return (
    <>
      {/* MENU MOBILE */}
      <div id="menu-pressionado" className={menuAberto ? "aberto" : ""}>
        <i
          id="botao-fechar"
          className="fa-solid fa-xmark"
          onClick={() => setMenuAberto(false)}
        ></i>

        <div className="cadastro">
          <button onClick={() => navigate('/cadastro')} id="cadastrar">Cadastrar</button>
          <button onClick={() => navigate('/cadastro')} id="login">Login</button>
        </div>

        <section id="topicos">
          <div onClick={() => setProdutosMobile(!produtosMobile)} id="produtos-container">
            <h3 id="produtos-tag" className={produtosMobile ? "aberto" : ""}>Produtos</h3>
            <p id="sinal-icone" className={produtosMobile ? "aberto" : ""}>&gt;</p>
          </div>

          <article id="produtos-a-mostrar" className={produtosMobile ? "aberto" : ""}>
            <div className="produtos-unicos">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <h3>Roteiro Automático</h3>
            </div>

            <div className="produtos-unicos">
              <i className="fa-solid fa-pen-to-square"></i>
              <h3>Cálculo de Custos</h3>
            </div>

            <div className="produtos-unicos">
              <i className="fa-solid fa-camera-retro"></i>
              <h3>Monte sua Aventura</h3>
            </div>
          </article>

          <h3>Documentação</h3>
          <h3>Preço</h3>
          <h3>Contato</h3>

          <hr />

          <article id="tema-container">
            <h3>Tema</h3>
            <div id="temas">
              <i
                className="fa-solid fa-moon"
                onClick={() => setTemaEscuro(true)}
              ></i>
              <i
                className="fa-solid fa-sun"
                onClick={() => setTemaEscuro(false)}
              ></i>
            </div>
          </article>
        </section>
      </div>

      {/* HEADER */}
      <header
        id="header"
        className={menuAberto ? "fechado" : ""}
        onMouseLeave={() => setProdutosDesktop(false)}
      >
        <i id="aviao-icone" className="fa-solid fa-plane"></i>
        <h2><i id="aviao-icone-desktop" className="fa-solid fa-plane"></i> ViaJour</h2>

        <section>
          <article
            id="produto-desktop-tag"
            className={`topicos-desktop ${produtosDesktop ? "azul-ativado" : ""}`}
            onMouseEnter={() => setProdutosDesktop(true)}
          >
            Produtos <span id="seta-desktop" className={produtosDesktop ? "seta-virada" : ""}>&gt;</span>
          </article>

          <h3 className="topicos-desktop" onMouseEnter={() => setProdutosDesktop(false)}>Documentação</h3>
          <h3 className="topicos-desktop" onMouseEnter={() => setProdutosDesktop(false)}>Preço</h3>
          <h3 className="topicos-desktop" onMouseEnter={() => setProdutosDesktop(false)}>Contato</h3>
        </section>

        <nav onMouseEnter={() => setProdutosDesktop(false)}>
          <h3 onClick={() => navigate('/cadastro')} id="l-desktop" className="cadastro-desktop">Fazer Login</h3>
          <h3 onClick={() => navigate('/cadastro')} id="c-desktop" className="cadastro-desktop">Cadastrar</h3>
        </nav>

        <div onMouseLeave={() => setProdutosDesktop(false)} id="produtos-desktop-container" className={produtosDesktop ? "container-ativado" : ""}>
          <h2>Ferramentas I.A</h2>
          <div className="produtos-pai" id="ferramentas-ia">
            <div><i className="fa-solid fa-wand-magic-sparkles"></i><h3>Roteiro Automático</h3></div>
            <div><i className="fa-solid fa-wand-magic-sparkles"></i><h3>Chat Auxiliar</h3></div>
            <div><i className="fa-solid fa-wand-magic-sparkles"></i><h3>Busca Paraíso</h3></div>
            <div><i className="fa-solid fa-wand-magic-sparkles"></i><h3>Viagem Certa</h3></div>
          </div>
          {/* Ferramentas-ia */}

          <h2>Custos</h2>
          <div className="produtos-pai" id="custo">
              <div>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <h3>Cálculo de Custos</h3>
              </div>
              <div>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <h3>Viagens Baratas</h3>
              </div>
          </div>
          {/* Custos */}

          <h2>Planejamento</h2>
          <div className="produtos-pai" id="planejament">
              <div>
                  <i className="fa-solid fa-camera-retro"></i>
                  <h3>Monte sua Aventura</h3>
              </div>
              <div>
                  <i className="fa-solid fa-camera-retro"></i>
                  <h3>Viagens de 7 dias</h3>
              </div>
              <div>
                  <i className="fa-solid fa-camera-retro"></i>
                  <h3>Viagens Românticas</h3>
              </div>
              <div>
                  <i className="fa-solid fa-camera-retro"></i>
                  <h3>Viagens de Natal</h3>
              </div>
          </div>
          {/* Planejamento */}
        </div>

        <i id="menu-icone" className="fa-solid fa-bars" onClick={() => setMenuAberto(true)}></i>

        <h1>Descubra, Planeje, Viaje com <br /> ViaJour</h1>

        <div id="temas-desktop">
          <i className="fa-solid fa-moon" onClick={() => setTemaEscuro(true)}></i>
          <i className="fa-solid fa-sun" onClick={() => setTemaEscuro(false)}></i>
        </div>
      </header>

      {/* MAIN */}
      <main id="main" className={menuAberto ? "fechado" : ""}>
        <section className="imagem"></section>
        <section className="imagem-desktop">
            <article id="imagem-1"></article>
            <article id="imagem-2"></article>
            <article id="imagem-3"></article>
        </section>
        <section id="servicos-section">

          <article id="servico-1" ref={servico1Ref} className="servicos-article" tabIndex={0}>
            <div className="descricao">
              <h2>Roteiro Automático</h2>
              <h3>Gratuito</h3>
              <p>Descubra novos destinos sem esforço. Nosso sistema cria roteiros personalizados com base nas suas preferências, otimizando tempo, custo e experiências únicas. Planejar uma viagem nunca foi tão simples e prazeroso.</p>
              <button onClick={() => retomarFoco('servico-1')} className="botao-servicos">
                Preparar
              </button>
            </div>
            <article id="servico-roteiro-automatico" className="servico-imagens">
            </article>
          </article>

          <article id="servico-2" ref={servico2Ref} className="servicos-article" tabIndex={0}>
            <div className="descricao">
              <h2>Cálculo de Custos</h2>
              <h3>Gratuito</h3>
              <p>Tenha controle total do seu orçamento de viagem. O cálculo de custos analisa transporte, hospedagem e alimentação, mostrando o valor estimado de cada etapa. Assim, você pode viajar tranquilo e sem surpresas.</p>
              <button onClick={() => retomarFoco('servico-2')} className="botao-servicos">
                Ver custos
              </button>
            </div>
            <article id="servico-calculo-custos" className="servico-imagens"></article>
          </article>

          <article id="servico-3" ref={servico3Ref} className="servicos-article" tabIndex={0}>
            <div className="descricao">
              <h2>Monte sua Aventura</h2>
              <h3>Gratuito</h3>
              <p>Crie o seu próprio caminho! Escolha os lugares, atividades e experiências que mais combinam com você. Monte sua Aventura transforma suas ideias em um roteiro dinâmico, interativo e feito sob medida.</p>
              <button onClick={() => retomarFoco('servico-3')} className="botao-servicos">
                Começar
              </button>
            </div>
            <article id="servico-sua-aventura" className="servico-imagens"></article>
          </article>

        </section>
      </main>

      {/* FOOTER */}
      <footer id="footer" className={menuAberto ? "fechado" : ""}>
        <h2>Siga-nos</h2>
        <div className="rodape">
            <div id="imagem-rodape-1" className="imagem-rodape"></div>
            <div id="imagem-rodape-2" className="imagem-rodape"></div>
            <div id="imagem-rodape-3" className="imagem-rodape"></div>
            <div id="imagem-rodape-4" className="imagem-rodape"></div>
        </div>
        <nav>
          <h3>Descubra o mundo conosco <br></br> <strong><span id="Viajour">Viajour</span></strong> <br></br> Descubra, Planeje, Viaje</h3>
          <ul>
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-youtube"></i></li>
            <li><i className="fa-brands fa-facebook"></i></li>
            <li><i className="fa-brands fa-x-twitter"></i></li>
          </ul>
        </nav>
      </footer>
    </>
  )
}
