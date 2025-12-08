import "../../styles/usuario/tela-de-usuario.css";
import { useState, useEffect, useMemo } from 'react';
import { NavLink, Outlet } from "react-router-dom";

interface Topicos {
    nome: string,
    url: string,
    telaGeral: boolean,
}

export default function TelaDeUsuario() {
    const topicos: Topicos[] = [
        {
            nome: 'Geral',
            url: '',
            telaGeral: true,
        },
        {
            nome: 'Autenticação',
            url: 'autenticacao',
            telaGeral: false,
        },
        {
            nome: 'Métodos de Pagamento',
            url: 'metodos-de-pagamento',
            telaGeral: false,
        },
        {
            nome: 'Assinaturas',
            url: 'assinaturas',
            telaGeral: false,
        },
    ];
    const [textoDigitado, setTextoDigitado] = useState<string>('');

    const topicosFiltrados = useMemo(() => {
        if (textoDigitado === '') {
           return topicos; 
        } else {
            return topicos.filter((topico: Topicos) => formatarString(topico.nome).includes(textoDigitado));
        } 
    }, [textoDigitado]);

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

    function formatarString(texto: string) {
    return texto
    .toLocaleLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "");
    }


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
                    <input onChange={(event) => setTextoDigitado(formatarString(event.target.value))} type="text" placeholder="Buscar" name="btn-buscar" id="btn-buscar" className="btn-buscar tela-de-usuario-screen"/>
                </div>
                    
                <ul className="lista-topicos tela-de-usuario-screen">
                    {topicosFiltrados.map((topico: Topicos, index: number) => (
                        <li key={index} className="topicos tela-de-usuario-screen">
                            <a href="#">
                                <NavLink style={({isActive}) => ({
                                    fontWeight: isActive ? 500 : 300,
                                    color: isActive ? '#18181b' : '#737373',
                                })} to={topico.url} end={topico.telaGeral}>{topico.nome}</NavLink>
                            </a>
                        </li>
                    ))}
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