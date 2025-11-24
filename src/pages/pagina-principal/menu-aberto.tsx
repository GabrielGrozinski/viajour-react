export default function MenuAberto({route}: any) {
    const {fechar} = route.params;

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
    <>
        <header className="header-aberto">
            <i
            onClick={() => fechar()}
            id="fechar-icone"
            className="fa-solid fa-xmark"
            />
            <h1 className="logo">ViaJour</h1>
            <article onClick={() => mostrarMoedas()} id="moeda-item">
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