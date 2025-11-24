import '../styles/pagina-main.css';

export default function PaginaMain() {
    
    
    return (
<>
  <header className="header-fechado">
    <i onclick="mostrarMenu()" id="menu-icone" className="fa-solid fa-bars" />
    <h1 className="logo">ViaJour</h1>
    <section id="container-moeda-e-idioma-desktop">
      <article className="idiomas-e-moedas-itens-desktop">
        <img
          src="https://flagcdn.com/w2560/br.png"
          width={30}
          height={22}
          alt="Brazil"
        />
        <p>BR - BRL</p>
      </article>
      <article className="idiomas-e-moedas-itens-desktop">
        <img
          src="https://flagcdn.com/w2560/pt.png"
          width={30}
          height={22}
          alt="Portugal"
        />
        <p>PT - EUR</p>
      </article>
      <article className="idiomas-e-moedas-itens-desktop">
        <img
          src="https://flagcdn.com/w2560/us.png"
          width={30}
          height={22}
          alt="Estados Unidos"
        />
        <p>US - USD</p>
      </article>
      <article className="idiomas-e-moedas-itens-desktop">
        <img
          src="https://flagcdn.com/w2560/es.png"
          width={30}
          height={22}
          alt="Espanha"
        />
        <p>ES - EUR</p>
      </article>
      <article className="idiomas-e-moedas-itens-desktop">
        <img
          src="https://flagcdn.com/w2560/uy.png"
          width={30}
          height={22}
          alt="Uruguai"
        />
        <p>UY - UYU</p>
      </article>
      <article className="idiomas-e-moedas-itens-desktop">
        <img
          src="https://flagcdn.com/w2560/ar.png"
          width={30}
          height={22}
          alt="Argentina"
        />
        <p>AR - ARS</p>
      </article>
      <article className="idiomas-e-moedas-itens-desktop">
        <img
          src="https://flagcdn.com/w2560/fr.png"
          width={30}
          height={22}
          alt="França"
        />
        <p>FR - EUR</p>
      </article>
      <article id="moeda-item">
        <img
          src="https://flagcdn.com/w2560/br.png"
          width={30}
          height={22}
          alt="Brazil"
        />
        <p>PT | BRL</p>
      </article>
    </section>
    <i id="user-icone" className="fa-solid fa-user user-btn" />
  </header>

  <aside>
    <i
      onclick="expandirMenu()"
      id="menu-icone-aside"
      className="fa-solid fa-bars"
    />
    <div id="div-menu-fechado">
      <i id="instrucao-1" className="fa-solid fa-robot" />
      <i id="instrucao-2" className="fa-solid fa-dollar-sign" />
      <i id="instrucao-3" className="fa-solid fa-pen-to-square" />
    </div>
    <div className="div-instrucoes" id="div-ferramentas-ia-desktop">
      <i className="fa-solid fa-robot" /> Ferramentas de I.A
    </div>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-chess" />
        <p>Roteiro Automático</p>
      </a>
    </article>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-brain" />
        <p>Chat Auxiliar</p>
      </a>
    </article>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-cart-flatbed-suitcase" />
        <p>Busca Paraíso</p>
      </a>
    </article>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-plane" />
        <p>Viagem Certa</p>
      </a>
    </article>
    <div className="div-instrucoes" id="div-custos-desktop">
      <i className="fa-solid fa-dollar-sign" /> Custos
    </div>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-hand-holding-dollar" />
        <p>Cálculo de Custos</p>
      </a>
    </article>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-regular fa-lightbulb" />
        <p>Viagens Baratas</p>
      </a>
    </article>
    <div className="div-instrucoes" id="div-planejamento-pessoal-desktop">
      <i className="fa-solid fa-pen-to-square" /> Planejamento Pessoal
    </div>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-icons" />
        <p>Monte sua Aventura</p>
      </a>
    </article>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-regular fa-hourglass" />
        <p>Viagens de 7 dias</p>
      </a>
    </article>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-heart" />
        <p>Viagens Românticas</p>
      </a>
    </article>
    <article id="roteiro-automatico" className="itens-do-viajour-desktop">
      <a href="">
        <i className="fa-solid fa-gift" />
        <p>Viagens de Natal</p>
      </a>
    </article>
  </aside>

  <section className="stats-card">
    <div id="item-money" className="stat-item">
      <i className="fa-solid fa-sack-dollar" />
      <div className="desc">
        <span className="value">R$ 1.440,52</span>
        <br />
        <span className="label">Economizado com o ViaJour</span>
      </div>
    </div>
    <div id="item-date" className="stat-item">
      <i className="fa-solid fa-hourglass-end" />
      <div className="desc">
        <span className="value">13 dias</span>
        <br />
        <span className="label">Economizado com o ViaJour</span>
      </div>
    </div>
  </section>

  <main className="main-fechado">
    <div className="icones">
      <i className="fa-solid fa-map-location-dot" />
      <h4>Roteiros automáticos</h4>
    </div>
    <div className="icones">
      <i className="fa-solid fa-location-dot" />
      <h4>Escolha qualquer lugar!</h4>
    </div>
    <div className="icones">
      <i className="fa-solid fa-earth-americas" />
      <h4>Viagens para o mundo todo!</h4>
    </div>
    <div className="icones">
      <i className="fa-solid fa-plane-up" />
      <h4>Suas viagens</h4>
    </div>
    <div className="icones">
      <i className="fa-solid fa-star" />
      <h4>Promoções</h4>
    </div>
    <div className="icones">
      <i className="fa-solid fa-heart" />
      <h4>Viagens festivas</h4>
    </div>
    <div className="desc-app">
      <p>
        Tenha a melhor <br /> experiencia no app
      </p>
      <button className="btn-instalar-app">Baixar agora</button>
      <img src="../../imagens/celular-icone.png" alt="" />
    </div>
  </main>

  <header className="header-aberto">
    <i
      onclick="mostrarMenu()"
      id="fechar-icone"
      className="fa-solid fa-xmark"
    />
    <h1 className="logo">ViaJour</h1>
    <article onclick="mostrarMoedas()" id="moeda-item">
      <img
        src="https://flagcdn.com/w2560/br.png"
        width={30}
        height={22}
        alt="Brazil"
      />
      <p>
        PT | BRL <span id="seta-moeda">&gt;</span>
      </p>
    </article>
  </header>

  <section id="container-moeda-e-idioma">
    <h2>Idiomas e moedas</h2>
    <article className="idiomas-e-moedas-itens">
      <img
        src="https://flagcdn.com/w2560/br.png"
        width={30}
        height={22}
        alt="Brazil"
      />
      <p>Português - BRL</p>
    </article>
    <article className="idiomas-e-moedas-itens">
      <img
        src="https://flagcdn.com/w2560/pt.png"
        width={30}
        height={22}
        alt="Portugal"
      />
      <p>Português - EUR</p>
    </article>
    <article className="idiomas-e-moedas-itens">
      <img
        src="https://flagcdn.com/w2560/us.png"
        width={30}
        height={22}
        alt="Estados Unidos"
      />
      <p>English - USD</p>
    </article>
    <article className="idiomas-e-moedas-itens">
      <img
        src="https://flagcdn.com/w2560/es.png"
        width={30}
        height={22}
        alt="Espanha"
      />
      <p>Español - EUR</p>
    </article>
    <article className="idiomas-e-moedas-itens">
      <img
        src="https://flagcdn.com/w2560/uy.png"
        width={30}
        height={22}
        alt="Uruguai"
      />
      <p>Español - UYU</p>
    </article>
    <article className="idiomas-e-moedas-itens">
      <img
        src="https://flagcdn.com/w2560/ar.png"
        width={30}
        height={22}
        alt="Argentina"
      />
      <p>Español - ARS</p>
    </article>
    <article className="idiomas-e-moedas-itens">
      <img
        src="https://flagcdn.com/w2560/fr.png"
        width={30}
        height={22}
        alt="França"
      />
      <p>Français - EUR</p>
    </article>
  </section>

  <hr id="hr-header-main" />

  <section id="section-instrucoes">
    <div id="div-ferramentas-ia">
      <i className="fa-solid fa-robot" /> Ferramentas de I.A
    </div>
    <div id="div-custos">
      <i className="fa-solid fa-dollar-sign" /> Custos
    </div>
    <div id="div-planejamento-pessoal">
      <i className="fa-solid fa-pen-to-square" /> Planejamento Pessoal
    </div>
  </section>

  <main className="main-aberto">
    <article className="itens-do-viajour itens-ia">
      <a href="">
        <i className="fa-solid fa-chess icones-referencia" />
        <p>Roteiro Automático</p>
        <i className="fa-solid fa-robot icones-ia" />
      </a>
    </article>
    <article className="itens-do-viajour itens-ia">
      <a href="">
        <i className="fa-solid fa-brain icones-referencia" />
        <p>Chat Auxiliar</p>
        <i className="fa-solid fa-robot icones-ia" />
      </a>
    </article>
    <article className="itens-do-viajour itens-ia">
      <a href="">
        <i className="fa-solid fa-cart-flatbed-suitcase icones-referencia" />
        <p>Busca Paraíso</p>
        <i className="fa-solid fa-robot icones-ia" />
      </a>
    </article>
    <article className="itens-do-viajour itens-ia">
      <a href="">
        <i className="fa-solid fa-plane icones-referencia" />
        <p>Viagem Certa</p>
        <i className="fa-solid fa-robot icones-ia" />
      </a>
    </article>
    {/*Itens I.A*/}
    <article className="itens-do-viajour itens-custo">
      <a href="produtos/calculo-de-custos.html">
        <i className="fa-solid fa-hand-holding-dollar icones-referencia" />
        <p>Cálculo de Custos</p>
        <i className="fa-solid fa-dollar-sign icones-custo" />
      </a>
    </article>
    <article className="itens-do-viajour itens-custo">
      <a href="">
        <i className="fa-regular fa-lightbulb icones-referencia" />
        <p>Viagens Baratas</p>
        <i className="fa-solid fa-dollar-sign icones-custo" />
      </a>
    </article>
    {/*Itens Custos*/}
    <article className="itens-do-viajour itens-planejamento">
      <a href="">
        <i className="fa-solid fa-icons icones-referencia" />
        <p>Monte sua Aventura</p>
        <i className="fa-regular fa-pen-to-square icones-planejamento" />
      </a>
    </article>
    <article className="itens-do-viajour itens-planejamento">
      <a href="">
        <i className="fa-regular fa-hourglass icones-referencia" />
        <p>Viagens de 7 dias</p>
        <i className="fa-regular fa-pen-to-square icones-planejamento" />
      </a>
    </article>
    <article className="itens-do-viajour itens-planejamento">
      <a href="">
        <i className="fa-solid fa-heart icones-referencia" />
        <p>Viagens Românticas</p>
        <i className="fa-regular fa-pen-to-square icones-planejamento" />
      </a>
    </article>
    <article className="itens-do-viajour itens-planejamento">
      <a href="">
        <i className="fa-solid fa-gift icones-referencia" />
        <p>Viagens de Natal</p>
        <i className="fa-regular fa-pen-to-square icones-planejamento" />
      </a>
    </article>
    {/*Itens Planejamento*/}
  </main>
</>

    )
}