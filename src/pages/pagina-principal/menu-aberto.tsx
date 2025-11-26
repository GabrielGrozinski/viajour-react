import '../../styles/pagina-principal/menu-aberto.css';

export default function MenuAberto({ fechar }: {fechar: () => void}) {

    function mostrarMoedas() {
        const moedasContainer = window.document.getElementById('container-moeda-e-idioma');
        const setaMoeda = window.document.getElementById('seta-moeda');
        const moedaItem = window.document.getElementById('moeda-item');
        if (moedasContainer && setaMoeda && moedaItem) {
            moedasContainer.classList.toggle('ativado');
            setaMoeda.classList.toggle('ativado');
            moedaItem.classList.toggle('ativado');
        }
    }

return (
    <div id="body" className="body-menu-aberto menu-aberto-screen">
        <header id="header" className="header-aberto menu-aberto-screen">
            <i
            onClick={() => fechar()}
            id="fechar-icone"
            className="fa-solid fa-xmark menu-aberto-screen"
            />
            <h1 className="logo menu-aberto-screen">ViaJour</h1>
            <article onClick={() => mostrarMoedas()} id="moeda-item" className="menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/br.png"
                width={30}
                height={22}
                alt="Brazil"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">
                PT | BRL <span id="seta-moeda" className="menu-aberto-screen">&gt;</span>
            </p>
            </article>
        </header>

        <section id="container-moeda-e-idioma" className="menu-aberto-screen">
            <h2 className="menu-aberto-screen">Idiomas e moedas</h2>
            <article className="idiomas-e-moedas-itens menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/br.png"
                width={30}
                height={22}
                alt="Brazil"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">Português - BRL</p>
            </article>
            <article className="idiomas-e-moedas-itens menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/pt.png"
                width={30}
                height={22}
                alt="Portugal"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">Português - EUR</p>
            </article>
            <article className="idiomas-e-moedas-itens menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/us.png"
                width={30}
                height={22}
                alt="Estados Unidos"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">English - USD</p>
            </article>
            <article className="idiomas-e-moedas-itens menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/es.png"
                width={30}
                height={22}
                alt="Espanha"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">Español - EUR</p>
            </article>
            <article className="idiomas-e-moedas-itens menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/uy.png"
                width={30}
                height={22}
                alt="Uruguai"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">Español - UYU</p>
            </article>
            <article className="idiomas-e-moedas-itens menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/ar.png"
                width={30}
                height={22}
                alt="Argentina"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">Español - ARS</p>
            </article>
            <article className="idiomas-e-moedas-itens menu-aberto-screen">
            <img
                src="https://flagcdn.com/w2560/fr.png"
                width={30}
                height={22}
                alt="França"
                className="menu-aberto-screen"
            />
            <p className="menu-aberto-screen">Français - EUR</p>
            </article>
        </section>

        <hr id="hr-header-main" className="menu-aberto-screen" />

        <section id="section-instrucoes" className="menu-aberto-screen">
            <div id="div-ferramentas-ia" className="menu-aberto-screen">
            <i className="fa-solid fa-robot menu-aberto-screen" /> <span className='menu-aberto-screen'>Ferramentas de I.A</span>
            </div>
            <div id="div-custos" className="menu-aberto-screen">
            <i className="fa-solid fa-dollar-sign menu-aberto-screen" /> <span className="menu-aberto-screen">Custos</span>
            </div>
            <div id="div-planejamento-pessoal" className="menu-aberto-screen">
            <i className="fa-solid fa-pen-to-square menu-aberto-screen" /> <span className="menu-aberto-screen">Planejamento Pessoal</span>
            </div>
        </section>

        <main className="main-aberto menu-aberto-screen">
            <article className="itens-do-viajour itens-ia menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-solid fa-chess icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Roteiro Automático</p>
                <i className="fa-solid fa-robot icones-ia menu-aberto-screen" />
            </a>
            </article>
            <article className="itens-do-viajour itens-ia menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-solid fa-brain icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Chat Auxiliar</p>
                <i className="fa-solid fa-robot icones-ia menu-aberto-screen" />
            </a>
            </article>
            <article className="itens-do-viajour itens-ia menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-solid fa-cart-flatbed-suitcase icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Busca Paraíso</p>
                <i className="fa-solid fa-robot icones-ia menu-aberto-screen" />
            </a>
            </article>
            <article className="itens-do-viajour itens-ia menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-solid fa-plane icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Viagem Certa</p>
                <i className="fa-solid fa-robot icones-ia menu-aberto-screen" />
            </a>
            </article>
            {/*Itens I.A*/}
            <article className="itens-do-viajour itens-custo menu-aberto-screen">
            <a href="produtos/calculo-de-custos.html" className="menu-aberto-screen">
                <i className="fa-solid fa-hand-holding-dollar icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Cálculo de Custos</p>
                <i className="fa-solid fa-dollar-sign icones-custo menu-aberto-screen" />
            </a>
            </article>
            <article className="itens-do-viajour itens-custo menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-regular fa-lightbulb icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Viagens Baratas</p>
                <i className="fa-solid fa-dollar-sign icones-custo menu-aberto-screen" />
            </a>
            </article>
            {/*Itens Custos*/}
            <article className="itens-do-viajour itens-planejamento menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-solid fa-icons icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Monte sua Aventura</p>
                <i className="fa-regular fa-pen-to-square icones-planejamento menu-aberto-screen" />
            </a>
            </article>
            <article className="itens-do-viajour itens-planejamento menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-regular fa-hourglass icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Viagens de 7 dias</p>
                <i className="fa-regular fa-pen-to-square icones-planejamento menu-aberto-screen" />
            </a>
            </article>
            <article className="itens-do-viajour itens-planejamento menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-solid fa-heart icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Viagens Românticas</p>
                <i className="fa-regular fa-pen-to-square icones-planejamento menu-aberto-screen" />
            </a>
            </article>
            <article className="itens-do-viajour itens-planejamento menu-aberto-screen">
            <a href="" className="menu-aberto-screen">
                <i className="fa-solid fa-gift icones-referencia menu-aberto-screen" />
                <p className="menu-aberto-screen">Viagens de Natal</p>
                <i className="fa-regular fa-pen-to-square icones-planejamento menu-aberto-screen" />
            </a>
            </article>
            {/*Itens Planejamento*/}
        </main>
    </div>
)

}