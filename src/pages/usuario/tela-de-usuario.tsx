import "../../styles/usuario/tela-de-usuario.css";
import { useState, useEffect } from 'react';
import { NavLink, Outlet } from "react-router-dom";

interface Topicos {
    
}

export default function TelaDeUsuario() {
    const [topicos, setTopicos] = useState<any>([]);
    const [textoDigitado, setTextoDigitado] = useState<string>('');

    useEffect(() => {
        function handleScroll() {
            window.requestAnimationFrame(() => {
                const scroll = window.scrollY;
                if (scroll > 120) {
                    window.document.getElementById('barra-topico')?.classList.add('barra-fixa');
                    window.document.getElementById('icone-buscar')?.classList.add('barra-fixa');
                } else {
                    window.document.getElementById('barra-topico')?.classList.remove('barra-fixa');
                    window.document.getElementById('icone-buscar')?.classList.remove('barra-fixa');
                }
            })
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div id="body" className="tela-de-usuario-screen">
            <header className="header tela-de-usuario-screen">
                <h1 className="titulo tela-de-usuario-screen">Configurações de Usuário</h1>
            </header>
            <hr className="tela-de-usuario-screen" />
            <aside id="barra-topico" className="tela-de-usuario-screen">
                <div className="tela-de-usuario-screen container-buscar">
                    {!textoDigitado && (
                        <i id="icone-buscar" className="fa-solid fa-magnifying-glass tela-de-usuario-screen"></i>
                    )}
                    <input onChange={(texto) => setTextoDigitado(texto.target.value)} type="text" placeholder="Buscar" name="btn-buscar" id="btn-buscar" className="btn-buscar tela-de-usuario-screen"/>
                </div>
                    
                <ul className="lista-topicos tela-de-usuario-screen">
                    <li className="topicos tela-de-usuario-screen">
                        <NavLink style={({isActive}) => ({
                            fontWeight: isActive ? 500 : '',
                            color: isActive ? '#18181b' : '#737373',
                        })} to="" end>Geral</NavLink>
                    </li>
                    <li className="topicos tela-de-usuario-screen">
                        <NavLink style={({isActive}) => ({
                            fontWeight: isActive ? 500 : '',
                            color: isActive ? '#18181b' : '#737373',
                            textShadow: '1px 1px 1px #0000001a',
                        })} to="autenticacao">Autenticação</NavLink>
                    </li>
                    <li className="topicos tela-de-usuario-screen">
                        <NavLink style={({isActive}) => ({
                            fontWeight: isActive ? 500 : '',
                            color: isActive ? '#18181b' : '#737373',
                            textShadow: '1px 1px 1px #0000001a',
                        })} to="metodos-de-pagamento">Métodos de Pagamento</NavLink>
                    </li>
                    <li className="topicos tela-de-usuario-screen">
                        <NavLink style={({isActive}) => ({
                            fontWeight: isActive ? 500 : '',
                            color: isActive ? '#18181b' : '#737373',
                            textShadow: '1px 1px 1px #0000001a',
                        })} to="assinaturas">Assinaturas</NavLink>
                    </li>
                </ul>
            </aside>
            <main className="container tela-de-usuario-screen">
                <Outlet />
            </main>
            <footer className="rodape tela-de-usuario-screen">
                footer
            </footer>
        </div>
    )
}