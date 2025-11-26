import '../styles/menu-vertical.css';
import { useNavigate } from 'react-router-dom';


export default function MenuVertical({ expandirMargem }: {expandirMargem: () => void}) {
    const navigate = useNavigate();

    function expandirMenu() {
        const asideAberto = window.document.querySelector('aside');
        asideAberto?.classList.toggle('menu-expandido');
        expandirMargem();
        
    }
    
    return (
        <aside onMouseEnter={expandirMenu} onMouseLeave={expandirMenu} className="menu-lateral menu-vertical-component">

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-chess menu-vertical-component" />
                <p className="menu-vertical-component">Roteiro Automático</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-brain menu-vertical-component" />
                <p className="menu-vertical-component">Chat Auxiliar</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-cart-flatbed-suitcase menu-vertical-component" />
                <p className="menu-vertical-component">Busca Paraíso</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-plane menu-vertical-component" />
                <p className="menu-vertical-component">Viagem Certa</p>
            </a>
            </article>

            <article onClick={() => navigate('/calculo-de-custos')} id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-hand-holding-dollar menu-vertical-component" />
                <p className="menu-vertical-component">Cálculo de Custos</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-regular fa-lightbulb menu-vertical-component" />
                <p className="menu-vertical-component">Viagens Baratas</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-icons menu-vertical-component" />
                <p className="menu-vertical-component">Monte sua Aventura</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-mountain-city menu-vertical-component" />
                <p className="menu-vertical-component">Viagens de 7 dias</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-heart menu-vertical-component" />
                <p className="menu-vertical-component">Viagens Românticas</p>
            </a>
            </article>

            <article id="roteiro-automatico" className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-gift menu-vertical-component" />
                <p className="menu-vertical-component">Viagens de Natal</p>
            </a>
            </article>
            
        </aside>
    );
}