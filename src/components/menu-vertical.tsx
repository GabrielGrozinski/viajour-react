import '../styles/menu-vertical.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';


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
        <h1 onClick={(e) => {e.stopPropagation(); ativarMenu();}} id='titulo' className='menu-vertical-component'>
            <span>ViaJour</span>
            <i className="fa-solid fa-bars"></i>
            </h1>
        
        <aside ref={ref_barra} id='barra-vertical' className="menu-lateral menu-vertical-component">

            <article  className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-chess menu-vertical-component" />
                <p className="menu-vertical-component">Roteiro Automático</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-brain menu-vertical-component" />
                <p className="menu-vertical-component">Chat Auxiliar</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-cart-flatbed-suitcase menu-vertical-component" />
                <p className="menu-vertical-component">Busca Paraíso</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-solid fa-plane menu-vertical-component" />
                <p className="menu-vertical-component">Viagem Certa</p>
            </a>
            </article>

            <article onClick={() => navigate('/calculo-de-custos')}  className="itens-do-viajour-desktop menu-vertical-component">
            <a className="menu-vertical-component">
                <i className="fa-solid fa-hand-holding-dollar menu-vertical-component" />
                <p className="menu-vertical-component">Cálculo de Custos</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
                <i className="fa-regular fa-lightbulb menu-vertical-component" />
                <p className="menu-vertical-component">Viagens Baratas</p>
            </a>
            </article>

            <article  className="itens-do-viajour-desktop menu-vertical-component">
            <a href="" className="menu-vertical-component">
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