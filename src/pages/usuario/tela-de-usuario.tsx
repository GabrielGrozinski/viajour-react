import "../../styles/usuario/tela-de-usuario.css";
import { useState, useEffect, useContext, useMemo } from 'react';
import { TemaContext } from "../../context/TemaContext";
import { NavLink, Outlet } from "react-router-dom";
import MenuLateral from "../../components/menu-lateral";
import MenuVertical from "../../components/menu-vertical";

interface Topicos {
    nome: string,
    url: string,
    telaGeral: boolean,
    topicoEspecifico: string
}

const topicosPadrao: Topicos[] = [
        {
            nome: 'Geral',
            url: '',
            telaGeral: true,
            topicoEspecifico: '#',
        },
        {
            nome: 'Autenticação',
            url: 'autenticacao',
            telaGeral: false,
            topicoEspecifico: '#',
        },
        {
            nome: 'Métodos de Pagamento',
            url: 'metodos-de-pagamento',
            telaGeral: false,
            topicoEspecifico: '#',
        },
        {
            nome: 'Assinaturas',
            url: 'assinaturas',
            telaGeral: false,
            topicoEspecifico: '#',
        },
]

export default function TelaDeUsuario() {
    const topicos: Topicos[] = [
        {
            nome: 'Geral',
            url: '',
            telaGeral: true,
            topicoEspecifico: '#',
        },
        {
            nome: 'Autenticação',
            url: 'autenticacao',
            telaGeral: false,
            topicoEspecifico: '#',
        },
        {
            nome: 'Métodos de Pagamento',
            url: 'metodos-de-pagamento',
            telaGeral: false,
            topicoEspecifico: '#',
        },
        {
            nome: 'Assinaturas',
            url: 'assinaturas',
            telaGeral: false,
            topicoEspecifico: '#',
        },
        {
            nome: 'Nome',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'nomeInput',
        },
        {
            nome: 'Avatar',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'imageInput',
        },
        {
            nome: 'Celular',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'telefoneInput',
        },
        {
            nome: 'Perfil de Viagens',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'perfil-viagem-Input',
        },
        {
            nome: 'Número de Acompanhantes',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'quantidade-de-pessoas-Input',
        },
        {
            nome: 'Número de Viagens',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'numero-de-viagens-Input',
        },
        {
            nome: 'Tipo de Viajante',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'tipo-viajante-Input',
        },
        {
            nome: 'Custo de Viagens',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'custo-viagens-Input',
        },
        {
            nome: 'Preferência de Viagens',
            url: '',
            telaGeral: true,
            topicoEspecifico: 'preferencia-viagens-Input',
        },
        {
            nome: 'Email',
            url: 'autenticacao',
            telaGeral: false,
            topicoEspecifico: 'emailInput',
        },
        {
            nome: 'Senha',
            url: 'autenticacao',
            telaGeral: false,
            topicoEspecifico: 'senhaInput',
        },
        {
            nome: 'Adicionar Cartão',
            url: 'metodos-de-pagamento',
            telaGeral: false,
            topicoEspecifico: 'adicionar-cartao',
        },
        {
            nome: 'Plano Gratuito',
            url: 'assinaturas',
            telaGeral: false,
            topicoEspecifico: 'plano-gratuito',
        },
        {
            nome: 'Plano Aventureiro',
            url: 'assinaturas',
            telaGeral: false,
            topicoEspecifico: 'plano-aventureiro',
        },
        {
            nome: 'Plano Viajante',
            url: 'assinaturas',
            telaGeral: false,
            topicoEspecifico: 'plano-viajante',
        },

    ];
    const [textoDigitado, setTextoDigitado] = useState<string>('');
    const [topicoEscolhido, setTopicoEscolhido] = useState<string>('');
    const [destacar, setDestacar] = useState<string>('');
    const [largura, setLargura] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setLargura(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    const { dark } = useContext(TemaContext);

    const topicosFiltrados = useMemo(() => {
        if (textoDigitado === '') {
           return topicosPadrao; 
        } else {
            return topicos.filter((topico: Topicos) => formatarString(topico.nome).includes(textoDigitado));
        } 
    }, [textoDigitado]);

    useEffect(() => {
        function handleScroll() {
            window.requestAnimationFrame(() => {
                const scroll = window.scrollY;
                if (largura >= 1024) {
                    if (scroll > 120) {
                        window.document.getElementById('barra-topico')?.classList.add('barra-fixa');
                        window.document.getElementById('icone-buscar')?.classList.add('barra-fixa');
                    } else {
                        window.document.getElementById('barra-topico')?.classList.remove('barra-fixa');
                        window.document.getElementById('icone-buscar')?.classList.remove('barra-fixa');
                    }
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

    function verificarTopico(topicoPadrao: string) {
        if (topicoPadrao === 'Geral' || topicoPadrao === 'Métodos de Pagamento' || topicoPadrao === 'Assinaturas' || topicoPadrao === 'Autenticação') {
            return true;
        } else return false;
    }

    function expandirMargem() {
        const body = window.document.getElementById('body');
        body?.classList.toggle('menu-expandido');
    }


    return (
        <div id="body" className="tela-de-usuario-screen">
            {largura >= 1024 ? (
                <MenuLateral expandirMargem={expandirMargem}/>
            ) : (
                <div className="testando"><MenuVertical/></div>
            )}
            <header className="header tela-de-usuario-screen">
                <h1 className="titulo tela-de-usuario-screen">Configurações de Usuário</h1>
                {largura < 1024 && (
                    <aside id="barra-topico" className="tela-de-usuario-screen">
                        <div className="tela-de-usuario-screen container-buscar">
                            {!textoDigitado && (
                                <i id="icone-buscar" className="fa-solid fa-magnifying-glass tela-de-usuario-screen"></i>
                            )}
                            <input onChange={(event) => setTextoDigitado(formatarString(event.target.value))} type="text" placeholder="Buscar" name="btn-buscar" id="btn-buscar" className="btn-buscar tela-de-usuario-screen"/>
                        </div>
                            
                        <ul className="lista-topicos tela-de-usuario-screen">
                            {topicosFiltrados.map((topico: Topicos, index: number) => {
                                const isTopicoPadrao = verificarTopico(topico.nome);
                                    
                                return (
                                    <li onClick={() => setTopicoEscolhido(topico.topicoEspecifico)} key={index} className="topicos tela-de-usuario-screen">
                                        <NavLink
                                            onClick={() => setDestacar(topico.nome)}
                                            style={({isActive}) => 
                                            ({
                                            color: 
                                            !dark ? isTopicoPadrao ? isActive ? '#18181b' : '#737373' : destacar === topico.nome ? '#18181b' : '#737373' : isTopicoPadrao ? isActive ? '#f5f5f4' : '#a8a29e9a' : destacar === topico.nome ? '#f5f5f4' : '#a8a29e9a'
                                            })} 
                                            to={topico.url} end={topico.telaGeral}>{topico.nome}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </aside>
                )}
            </header>
            <hr className="tela-de-usuario-screen" />
            {largura >= 1024 && (
                <aside id="barra-topico" className="tela-de-usuario-screen">
                    <div className="tela-de-usuario-screen container-buscar">
                        {!textoDigitado && (
                            <i id="icone-buscar" className="fa-solid fa-magnifying-glass tela-de-usuario-screen"></i>
                        )}
                        <input onChange={(event) => setTextoDigitado(formatarString(event.target.value))} type="text" placeholder="Buscar" name="btn-buscar" id="btn-buscar" className="btn-buscar tela-de-usuario-screen"/>
                    </div>
                        
                    <ul className="lista-topicos tela-de-usuario-screen">
                        {topicosFiltrados.map((topico: Topicos, index: number) => {
                            const isTopicoPadrao = verificarTopico(topico.nome);
                                
                            return (
                                <li onClick={() => setTopicoEscolhido(topico.topicoEspecifico)} key={index} className="topicos tela-de-usuario-screen">
                                    <NavLink
                                        onClick={() => setDestacar(topico.nome)}
                                        style={({isActive}) => 
                                        ({
                                        color: 
                                        !dark ? isTopicoPadrao ? isActive ? '#18181b' : '#737373' : destacar === topico.nome ? '#18181b' : '#737373' : isTopicoPadrao ? isActive ? '#f5f5f4' : '#a8a29e9a' : destacar === topico.nome ? '#f5f5f4' : '#a8a29e9a'
                                        })} 
                                        to={topico.url} end={topico.telaGeral}>{topico.nome}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </aside>
            )}
            <main className="container tela-de-usuario-screen">
                <Outlet context={{topicoEscolhido, textoDigitado}} />
            </main>
            <footer className="rodape tela-de-usuario-screen">
                footer
            </footer>
        </div>
    )
}
