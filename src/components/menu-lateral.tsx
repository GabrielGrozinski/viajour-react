import '../styles/menu-lateral.css';
import { useNavigate } from 'react-router-dom';


export default function MenuLateral({ expandirMargem }: {expandirMargem: () => void}) {
    const navigate = useNavigate();

    function expandirMenu() {
        const asideAberto = window.document.querySelector('aside');
        if (asideAberto) {
            asideAberto.classList.toggle('ativado');
        }
    }
    
    return (
        <aside className="menu-lateral menu-lateral-component">
            <i
            onClick={() => {expandirMenu(); expandirMargem()}}
            id="menu-icone-aside"
            className="fa-solid fa-bars menu-lateral-component"
            />
            <div id="div-menu-fechado" className="menu-lateral-component">
            <i id="instrucao-1" className="fa-solid fa-robot menu-lateral-component" />
            <i id="instrucao-2" className="fa-solid fa-dollar-sign menu-lateral-component" />
            <i id="instrucao-3" className="fa-solid fa-pen-to-square menu-lateral-component" />
            </div>

            <div className="div-instrucoes menu-lateral-component" id="div-ferramentas-ia-desktop">
            <i className="fa-solid fa-robot menu-lateral-component" /> Ferramentas de I.A
            </div>

            <article  className="itens-do-viajour-desktop menu-lateral-component">
            <a href="" className="menu-lateral-component">
                <i className="fa-solid fa-chess menu-lateral-component" />
                <p className="menu-lateral-component">Roteiro Automático</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-lateral-component">
            <a href="" className="menu-lateral-component">
                <i className="fa-solid fa-brain menu-lateral-component" />
                <p className="menu-lateral-component">Chat Auxiliar</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-lateral-component">
            <a href="" className="menu-lateral-component">
                <i className="fa-solid fa-cart-flatbed-suitcase menu-lateral-component" />
                <p className="menu-lateral-component">Busca Paraíso</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-lateral-component">
            <a href="" className="menu-lateral-component">
                <i className="fa-solid fa-plane menu-lateral-component" />
                <p className="menu-lateral-component">Viagem Certa</p>
            </a>
            </article>

            <div className="div-instrucoes menu-lateral-component" id="div-custos-desktop">
            <i className="fa-solid fa-dollar-sign menu-lateral-component" /> Custos
            </div>

            <article onClick={() => navigate('/calculo-de-custos')}  className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-hand-holding-dollar menu-lateral-component" />
                <p className="menu-lateral-component">Cálculo de Custos</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-baratas')}  className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-regular fa-lightbulb menu-lateral-component" />
                <p className="menu-lateral-component">Viagens Baratas</p>
            </a>
            </article>

            <div className="div-instrucoes menu-lateral-component" id="div-planejamento-pessoal-desktop">
            <i className="fa-solid fa-pen-to-square menu-lateral-component" /> Planejamento Pessoal
            </div>

            <article onClick={() => navigate('/monte-sua-aventura')} className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-icons menu-lateral-component" />
                <p className="menu-lateral-component">Monte sua Aventura</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-de-sete-dias')} className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-mountain-city menu-lateral-component" />
                <p className="menu-lateral-component">Viagens de 7 dias</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-romanticas')}   className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-heart menu-lateral-component" />
                <p className="menu-lateral-component">Viagens Românticas</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-de-natal')}  className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-gift menu-lateral-component" />
                <p className="menu-lateral-component">Viagens de Natal</p>
            </a>
            </article>
        </aside>
    );
}
