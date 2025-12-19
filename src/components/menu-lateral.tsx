import '../styles/menu-lateral.css';
import { useNavigate } from 'react-router-dom';
import BotaoTema from './botao-tema';


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
                <abbr title="Início"><i onClick={() => navigate('/principal')} className="fa-solid fa-house"></i></abbr>
                <abbr title="Usuário"><i onClick={() => navigate('/usuario')} className="fa-solid fa-circle-user"></i></abbr>
                <div id='temas' className="menu-lateral-component">
                    <BotaoTema/>
                </div>
            </div>

            <div className="div-instrucoes menu-lateral-component" id="div-ferramentas-ia-desktop">
            <i className="fa-solid fa-robot menu-lateral-component" /> Ferramentas de I.A
            </div>

            <article onClick={() => navigate('/roteiro-automatico')} className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-chess menu-lateral-component" />
                <p className="menu-lateral-component">Roteiro Automático</p>
            </a>
            </article>

            <article onClick={() => navigate('/destino-certo')} className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-plane menu-lateral-component" />
                <p className="menu-lateral-component">Destino Certo</p>
            </a>
            </article>

            <div className="div-instrucoes menu-lateral-component" id="div-custos-desktop">
            <i className="fa-solid fa-dollar-sign menu-lateral-component" /> Custos
            </div>

            <article onClick={() => navigate('/calculo-de-custos')}  className="itens-do-viajour-desktop menu-lateral-component">
            <a className="menu-lateral-component">
                <i className="fa-solid fa-hand-holding-dollar menu-lateral-component" />
                <p className="menu-lateral-component">Calculator</p>
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
