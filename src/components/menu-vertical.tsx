import '../styles/menu-vertical.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import BotaoTema from './botao-tema';


export default function MenuVertical() {
    const navigate = useNavigate();
    const ref_barra = useRef<any>(null);

    useEffect(() => {
        function handleClickFora(e: any) {
            if (ref_barra.current && !ref_barra.current.contains(e.target)) {
                ['titulo', 'barra-vertical'].forEach(id => {
                const el = document.getElementById(id);
                if (el?.classList.contains('menu-ativado')) {
                    el.classList.remove('menu-ativado');
                }
                });
            }
        }

        document.addEventListener("click", handleClickFora);

        return () => document.removeEventListener("click", handleClickFora);
    }, [])

    function ativarMenu() {
        window.document.getElementById('titulo')?.classList.add('menu-ativado');
        window.document.getElementById('barra-vertical')?.classList.add('menu-ativado');
    }
    
    return (
        <>
        <nav onClick={(e) => {e.stopPropagation(); ativarMenu();}} id='titulo' className='menu-vertical-component'>
            <span>ViaJour</span>
            <div className="tema menu-vertical-component"><BotaoTema/></div>
            <i onClick={() => navigate('/principal')} className="fa-solid fa-house"></i>
            <i className="fa-solid fa-bars"></i>
            <i onClick={() => navigate('/usuario')} className="fa-solid fa-circle-user"></i>
        </nav>
        
        <aside ref={ref_barra} id='barra-vertical' className="menu-lateral menu-vertical-component">

            <article onClick={() => navigate('/roteiro-automatico')} className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-chess menu-vertical-component" />
                <p className="menu-vertical-component">Roteiro Automático</p>
            </a>
            </article>

            <article onClick={() => navigate('./chat-auxiliar')} className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-brain menu-vertical-component" />
                <p className="menu-vertical-component">Chat Auxiliar</p>
            </a>
            </article>

            <article onClick={() => navigate('/destino-certo')} className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-plane menu-vertical-component" />
                <p className="menu-vertical-component">Destino Certo</p>
            </a>
            </article>

            <article onClick={() => navigate('/calculo-de-custos')}  className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-hand-holding-dollar menu-vertical-component" />
                <p className="menu-vertical-component">Cálculo de Custos</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-baratas')} className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-regular fa-lightbulb menu-vertical-component" />
                <p className="menu-vertical-component">Viagens Baratas</p>
            </a>
            </article>

            <article onClick={() => navigate('/monte-sua-aventura')} className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-icons menu-vertical-component" />
                <p className="menu-vertical-component">Monte sua Aventura</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-de-sete-dias')} className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-mountain-city menu-vertical-component" />
                <p className="menu-vertical-component">Viagens de 7 dias</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-romanticas')}   className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-heart menu-vertical-component" />
                <p className="menu-vertical-component">Viagens Românticas</p>
            </a>
            </article>

            <article onClick={() => navigate('/viagens-de-natal')}  className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-gift menu-vertical-component" />
                <p className="menu-vertical-component">Viagens de Natal</p>
            </a>
            </article>
            
        </aside>
        </>
    );
}