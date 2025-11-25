import "../styles/menu-lateral.css"

export default function MenuLateral() {
    function expandirMenu() {
        const asideAberto = window.document.querySelector('aside');
        if (asideAberto) {
            asideAberto.classList.toggle('ativado');
        }
    }
    
    return (
        <aside className="menu-lateral">
            <i
            onClick={() => expandirMenu()}
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
    );
}