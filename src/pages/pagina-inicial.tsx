import {useState, useRef, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import '../styles/pagina-inicial.css';

export default function Teste() {
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
    <div
      id="menu-pressionado"
      className={
        menuAberto
          ? "aberto pagina-inicial-screen"
          : "pagina-inicial-screen"
      }
    >
      <i
        id="botao-fechar"
        className="fa-solid fa-xmark pagina-inicial-screen"
        onClick={() => setMenuAberto(false)}
      ></i>

      <div className="cadastro pagina-inicial-screen">
        <button
          onClick={() => navigate("/cadastro")}
          id="cadastrar"
          className="pagina-inicial-screen"
        >
          Cadastrar
        </button>
        <button
          onClick={() => navigate("/cadastro")}
          id="login"
          className="pagina-inicial-screen"
        >
          Login
        </button>
      </div>

      <section id="topicos" className="pagina-inicial-screen">
        <div
          onClick={() => setProdutosMobile(!produtosMobile)}
          id="produtos-container"
          className="pagina-inicial-screen"
        >
          <h3
            className={
              produtosMobile ?
              "aberto pagina-inicial-screen" :
              "pagina-inicial-screen"
            }
            id="produtos-tag"
          >
            Produtos
          </h3>
          <p
            className={
              produtosMobile ?
              "aberto pagina-inicial-screen" :
              "pagina-inicial-screen"
            }
            id="sinal-icone"
          >
            &gt;
          </p>
        </div>

        <article
          className={
            produtosMobile ?
            "aberto pagina-inicial-screen" :
            "pagina-inicial-screen"
          }
          id="produtos-a-mostrar"
        >
          <div className="produtos-unicos pagina-inicial-screen">
            <i className="fa-solid fa-wand-magic-sparkles pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Roteiro Automático</h3>
          </div>

          <div className="produtos-unicos pagina-inicial-screen">
            <i className="fa-solid fa-pen-to-square pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Cálculo de Custos</h3>
          </div>

          <div className="produtos-unicos pagina-inicial-screen">
            <i className="fa-solid fa-camera-retro pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Monte sua Aventura</h3>
          </div>
        </article>

        <h3 className="pagina-inicial-screen">Documentação</h3>
        <h3 className="pagina-inicial-screen">Preço</h3>
        <h3 className="pagina-inicial-screen">Contato</h3>

        <hr className="pagina-inicial-screen" />

        <article id="tema-container" className="pagina-inicial-screen">
          <h3 className="pagina-inicial-screen">Tema</h3>
          <div id="temas" className="pagina-inicial-screen">
            <i
              className="fa-solid fa-moon pagina-inicial-screen"
              onClick={() => setTemaEscuro(true)}
            ></i>
            <i
              className="fa-solid fa-sun pagina-inicial-screen"
              onClick={() => setTemaEscuro(false)}
            ></i>
          </div>
        </article>
      </section>
    </div>

    {/* HEADER */}
    <header
      id="header"
      className={
        menuAberto
          ? "fechado pagina-inicial-screen"
          : "pagina-inicial-screen"
      }
      onMouseLeave={() => setProdutosDesktop(false)}
    >
      <i className="fa-solid fa-plane pagina-inicial-screen" id="aviao-icone"></i>

      <h2 className="pagina-inicial-screen">
        <i className="fa-solid fa-plane pagina-inicial-screen" id="aviao-icone-desktop"></i>
        ViaJour
      </h2>

      <section className="pagina-inicial-screen">
        <article
          className="topicos-desktop pagina-inicial-screen"
          id="produto-desktop-tag"
          onMouseEnter={() => setProdutosDesktop(true)}
        >
          Produtos <span id="seta-desktop" className="pagina-inicial-screen">&gt;</span>
        </article>

        <h3 className="topicos-desktop pagina-inicial-screen" onMouseEnter={() => setProdutosDesktop(false)}>Documentação</h3>
        <h3 className="topicos-desktop pagina-inicial-screen" onMouseEnter={() => setProdutosDesktop(false)}>Preço</h3>
        <h3 className="topicos-desktop pagina-inicial-screen" onMouseEnter={() => setProdutosDesktop(false)}>Contato</h3>
      </section>

      <nav onMouseEnter={() => setProdutosDesktop(false)} className="pagina-inicial-screen">
        <h3 className="cadastro-desktop pagina-inicial-screen" onClick={() => navigate('/cadastro')} id="l-desktop">Fazer Login</h3>
        <h3 className="cadastro-desktop pagina-inicial-screen" onClick={() => navigate('/cadastro')} id="c-desktop">Cadastrar</h3>
      </nav>
      {/* Produtos Desktop Dropdown */}
      <div
        onMouseLeave={() => setProdutosDesktop(false)}
        id="produtos-desktop-container"
        className={
          produtosDesktop
            ? "container-ativado pagina-inicial-screen"
            : "pagina-inicial-screen"
        }
      >
        <h2 className="pagina-inicial-screen">Ferramentas I.A</h2>

        <div className="produtos-pai pagina-inicial-screen">
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-wand-magic-sparkles pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Roteiro Automático</h3>
          </div>
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-wand-magic-sparkles pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Chat Auxiliar</h3>
          </div>
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-wand-magic-sparkles pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Busca Paraíso</h3>
          </div>
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-wand-magic-sparkles pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Viagem Certa</h3>
          </div>
        </div>

        {/* Custos */}
        <h2 className="pagina-inicial-screen">Custos</h2>
        <div id="custo" className="produtos-pai pagina-inicial-screen">
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-pen-to-square pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Cálculo de Custos</h3>
          </div>
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-pen-to-square pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Viagens Baratas</h3>
          </div>
        </div>

        {/* Planejamento */}
        <h2 className="pagina-inicial-screen">Planejamento</h2>
        <div id="planejamento" className="produtos-pai pagina-inicial-screen">
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-camera-retro pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Monte sua Aventura</h3>
          </div>
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-camera-retro pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Viagens de 7 dias</h3>
          </div>
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-camera-retro pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Viagens Românticas</h3>
          </div>
          <div className="pagina-inicial-screen">
            <i className="fa-solid fa-camera-retro pagina-inicial-screen"></i>
            <h3 className="pagina-inicial-screen">Viagens de Natal</h3>
          </div>
        </div>
      </div>

      <i
        className="fa-solid fa-bars pagina-inicial-screen"
        id="menu-icone"
        onClick={() => setMenuAberto(true)}
      ></i>

      <h1 className="pagina-inicial-screen">
        Descubra, Planeje, Viaje com <br /> ViaJour
      </h1>

      <div id="temas-desktop" className="pagina-inicial-screen">
        <i className="fa-solid fa-moon pagina-inicial-screen" onClick={() => setTemaEscuro(true)}></i>
        <i className="fa-solid fa-sun pagina-inicial-screen" onClick={() => setTemaEscuro(false)}></i>
      </div>
    </header>

    {/* MAIN */}
    <main id="main" className={menuAberto ? "fechado pagina-inicial-screen" : "pagina-inicial-screen"}>
      <section
        className="imagem pagina-inicial-screen"
      ></section>

      <section className="imagem-desktop pagina-inicial-screen">
        <article id="imagem-1" className="pagina-inicial-screen"></article>
        <article id="imagem-2" className="pagina-inicial-screen"></article>
        <article id="imagem-3" className="pagina-inicial-screen"></article>
      </section>

      <section id="servicos-section" className="pagina-inicial-screen">
        <article className="servicos-article pagina-inicial-screen" id="servico-1" ref={servico1Ref} tabIndex={0}>
          <div className="descricao pagina-inicial-screen">
            <h2 className="pagina-inicial-screen">Roteiro Automático</h2>
            <h3 className="pagina-inicial-screen">Gratuito</h3>
            <p className="pagina-inicial-screen">Descubra novos destinos sem esforço...</p>
            <button className="botao-servicos pagina-inicial-screen" onClick={() => retomarFoco('servico-1')}>Preparar</button>
          </div>
          <article className="servico-imagens pagina-inicial-screen" id="servico-roteiro-automatico"></article>
        </article>

        <article className="servicos-article pagina-inicial-screen" id="servico-2" ref={servico2Ref} tabIndex={0}>
          <div className="descricao pagina-inicial-screen">
            <h2 className="pagina-inicial-screen">Cálculo de Custos</h2>
            <h3 className="pagina-inicial-screen">Gratuito</h3>
            <p className="pagina-inicial-screen">Tenha controle total do seu orçamento...</p>
            <button className="botao-servicos pagina-inicial-screen" onClick={() => retomarFoco('servico-2')}>Ver custos</button>
          </div>
          <article className="servico-imagens pagina-inicial-screen" id="servico-calculo-custos"></article>
        </article>

        <article className="servicos-article pagina-inicial-screen" id="servico-3" ref={servico3Ref} tabIndex={0}>
          <div className="descricao pagina-inicial-screen">
            <h2 className="pagina-inicial-screen">Monte sua Aventura</h2>
            <h3 className="pagina-inicial-screen">Gratuito</h3>
            <p className="pagina-inicial-screen">Crie o seu próprio caminho!</p>
            <button className="botao-servicos pagina-inicial-screen" onClick={() => retomarFoco('servico-3')}>Começar</button>
          </div>
          <article className="servico-imagens pagina-inicial-screen" id="servico-sua-aventura"></article>
        </article>
      </section>
    </main>
    {/* FOOTER */}
    <footer id="footer" className={menuAberto ? "fechado pagina-inicial-screen" : "pagina-inicial-screen"}>
      <h2 className="pagina-inicial-screen">Siga-nos</h2>

      <div className="rodape pagina-inicial-screen">
        <div className="imagem-rodape pagina-inicial-screen" id="imagem-rodape-1"></div>
        <div className="imagem-rodape pagina-inicial-screen" id="imagem-rodape-2"></div>
        <div className="imagem-rodape pagina-inicial-screen" id="imagem-rodape-3"></div>
        <div className="imagem-rodape pagina-inicial-screen" id="imagem-rodape-4"></div>
      </div>

      <nav className="pagina-inicial-screen">
        <h3 className="pagina-inicial-screen">
          Descubra o mundo conosco <strong><span id="Viajour" className="pagina-inicial-screen">Viajour</span></strong><br />
          Descubra, Planeje, Viaje
        </h3>
        <ul className="pagina-inicial-screen">
          <li className="pagina-inicial-screen">
            <i className="fa-brands fa-instagram pagina-inicial-screen"></i>
          </li>
          <li className="pagina-inicial-screen">
            <i className="fa-brands fa-youtube pagina-inicial-screen"></i>
          </li>
          <li className="pagina-inicial-screen">
            <i className="fa-brands fa-facebook pagina-inicial-screen"></i>
          </li>
          <li className="pagina-inicial-screen">
            <i className="fa-brands fa-x-twitter pagina-inicial-screen"></i>
          </li>
        </ul>
      </nav>
    </footer>
  </>
);

}
