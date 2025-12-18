import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/pagina-inicial.css';
import { AnimatePresence, motion } from 'framer-motion';
import BotaoTema from "../components/botao-tema";
import iconeAventura from '../assets/imagens/icone-monte-sua-aventura.png';
import iconeRoteiro from '../assets/imagens/icone-roteiro-automatico.png';
import iconeCalculator from '../assets/imagens/icone-calculator.png';
import iconeNatal from '../assets/imagens/icone-viagens-de-natal.png';


interface Produtos {
  imagem: string,
  titulo: string,
  subtitulo: string
}

export default function Teste() {
  const produtosExibicao: Produtos[] = [
    {
      imagem: iconeNatal,
      titulo: 'Viagens de Natal',
      subtitulo: 'Tenha acesso gratuito a milhares de roteiros personalizados para viajar no Natal!'
    },
    {
      imagem: iconeCalculator,
      titulo: 'Calculator',
      subtitulo: 'Com o Calculator, ficou muito mais fácil de separar os gastos da sua viagem!'
    },
    {
      imagem: iconeAventura,
      titulo: 'Monte sua Aventura',
      subtitulo: 'Quer controlar cada detalhe da sua viagem e deixá-la mais organizada? com a ferramente Monte sua Aventura, você pode!'
    },
    {
      imagem: iconeRoteiro,
      titulo: 'Roteiro Automático',
      subtitulo: 'Use nossa ferramente de I.A para criar um roteito inteiro para a sua viagem em segundos!'
    },
  ]

  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [produtosMobile, setProdutosMobile] = useState(false);
  const [produtosDesktop, setProdutosDesktop] = useState(false);

return (
  <div 
  id="body" 
  className="pagina-inicial-screen">
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
            <BotaoTema/>
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
      <AnimatePresence mode="wait">
        {produtosDesktop && (
          <motion.div
            key="produtos-desktop"
            transition={{duration: 0.3}}
            initial={{opacity: 0}}
            animate={{opacity: 100}}
            exit={{opacity: 0}}
            onMouseLeave={() => setProdutosDesktop(false)}
            id="produtos-desktop-container"
            className="pagina-inicial-screen"
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
          </motion.div>
        )}
      </AnimatePresence>

      <i
        className="fa-solid fa-bars pagina-inicial-screen"
        id="menu-icone"
        onClick={() => setMenuAberto(true)}
      ></i>

      <h1 className="pagina-inicial-screen">
        Descubra, Planeje, Viaje com <br /> ViaJour
      </h1>
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

      <section id="produtos-section" className="pagina-inicial-screen">
        {produtosExibicao.map((produto: Produtos, index: number) => (
          <article key={index} className={`flex flex-col xl:items-center xl:gap-12 xl:${index === 0 || index === 2 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div>
                <h1>{produto.titulo}</h1>
                <p>{produto.subtitulo}</p>
              </div>
              <img className="xl:max-h-130 xl:max-w-130" style={{marginTop: 2, marginBottom: 52}} src={produto.imagem} alt="imagem-produto" />
          </article>
        ))}
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
  </div>
);

}
