import '../../styles/pagina-principal/menu-aberto.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface Moeda {
    id: string,
    img: string,
    alt: string,
    label: string,
    value: string,
}


export default function MenuAberto({ fechar }: {fechar: () => void}) {
    const navigate = useNavigate();
    const idiomasEMoedas: Moeda[] = [
    {
        id: 'pt-br',
        img: 'https://flagcdn.com/w2560/br.png',
        alt: 'Brazil',
        label: 'Português - BRL',
        value: 'PT - BRL'
    },
    {
        id: 'pt-pt',
        img: 'https://flagcdn.com/w2560/pt.png',
        alt: 'Portugal',
        label: 'Português - EUR',
        value: 'PT - EUR'
    },
    {
        id: 'en-us',
        img: 'https://flagcdn.com/w2560/us.png',
        alt: 'Estados Unidos',
        label: 'English - USD',
        value: 'EN - USD'
    },
    {
        id: 'es-es',
        img: 'https://flagcdn.com/w2560/es.png',
        alt: 'Espanha',
        label: 'Español - EUR',
        value: 'ES - EUR'
    },
    {
        id: 'es-uy',
        img: 'https://flagcdn.com/w2560/uy.png',
        alt: 'Uruguai',
        label: 'Español - UYU',
        value: 'ES - UYU'
    },
    {
        id: 'es-ar',
        img: 'https://flagcdn.com/w2560/ar.png',
        alt: 'Argentina',
        label: 'Español - ARS',
        value: 'ES - ARS'
    },
    {
        id: 'fr-fr',
        img: 'https://flagcdn.com/w2560/fr.png',
        alt: 'França',
        label: 'Français - EUR',
        value: 'FR - EUR'
    },
    ];
    const itensMenu = [
    // I.A
    {
        rota: '/roteiro-automatico',
        classeArticle: 'itens-do-viajour itens-ia menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-chess',
        texto: 'Roteiro Automático',
        iconeDireita: 'fa-solid fa-robot',
        classeIconeDireita: 'icones-ia',
    },
    {
        rota: './chat-auxiliar',
        classeArticle: 'itens-do-viajour itens-ia menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-brain',
        texto: 'Chat Auxiliar',
        iconeDireita: 'fa-solid fa-robot',
        classeIconeDireita: 'icones-ia',
    },
    {
        rota: '/destino-certo',
        classeArticle: 'itens-do-viajour itens-ia menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-plane',
        texto: 'Destino Certo',
        iconeDireita: 'fa-solid fa-robot',
        classeIconeDireita: 'icones-ia',
    },

    // Custos
    {
        rota: '/calculo-de-custos',
        classeArticle: 'itens-do-viajour itens-custo menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-hand-holding-dollar',
        texto: 'Calculator',
        iconeDireita: 'fa-solid fa-dollar-sign',
        classeIconeDireita: 'icones-custo',
    },
    {
        rota: '/viagens-baratas',
        classeArticle: 'itens-do-viajour itens-custo menu-aberto-screen',
        iconeEsquerda: 'fa-regular fa-lightbulb',
        texto: 'Viagens Baratas',
        iconeDireita: 'fa-solid fa-dollar-sign',
        classeIconeDireita: 'icones-custo',
    },

    // Planejamento
    {
        rota: '/monte-sua-aventura',
        classeArticle: 'itens-do-viajour itens-planejamento menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-icons',
        texto: 'Monte sua Aventura',
        iconeDireita: 'fa-regular fa-pen-to-square',
        classeIconeDireita: 'icones-planejamento',
    },
    {
        rota: '/viagens-de-sete-dias',
        classeArticle: 'itens-do-viajour itens-planejamento menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-mountain-city',
        texto: 'Viagens de 7 dias',
        iconeDireita: 'fa-regular fa-pen-to-square',
        classeIconeDireita: 'icones-planejamento',
    },
    {
        rota: '/viagens-romanticas',
        classeArticle: 'itens-do-viajour itens-planejamento menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-heart',
        texto: 'Viagens Românticas',
        iconeDireita: 'fa-regular fa-pen-to-square',
        classeIconeDireita: 'icones-planejamento',
    },
    {
        rota: '/suas-viagens',
        classeArticle: 'itens-do-viajour itens-planejamento menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-passport',
        texto: 'Suas Viagens',
        iconeDireita: 'fa-regular fa-pen-to-square',
        classeIconeDireita: 'icones-planejamento',
    },
    {
        rota: '/viagens-de-natal',
        classeArticle: 'itens-do-viajour itens-planejamento menu-aberto-screen',
        iconeEsquerda: 'fa-solid fa-gift',
        texto: 'Viagens de Natal',
        iconeDireita: 'fa-regular fa-pen-to-square',
        classeIconeDireita: 'icones-planejamento',
    }
    ];
    const [moedaAtual, setMoedaAtual] = useState<Moeda>({
        id: 'pt-br',
        img: 'https://flagcdn.com/w2560/br.png',
        alt: 'Brazil',
        label: 'Português - BRL',
        value: 'PT - BRL'
    });

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
    <div id="body" className="body-menu-aberto menu-aberto-screen">
        <header id="header" className="header-aberto menu-aberto-screen">
            <i
            onClick={() => fechar()}
            id="fechar-icone"
            className="fa-solid fa-xmark menu-aberto-screen"
            />
            <h1 className="logo menu-aberto-screen">ViaJour</h1>
            <article onClick={() => mostrarMoedas()} id="moeda-item" className="menu-aberto-screen">
                <img
                    src={moedaAtual.img}
                    width={30}
                    height={22}
                    alt={moedaAtual.alt}
                    className="menu-aberto-screen"
                />
                <p className="menu-aberto-screen">
                    {moedaAtual.value} <span id="seta-moeda" className="menu-aberto-screen">&gt;</span>
                </p>
            </article>
        </header>

        <section id="container-moeda-e-idioma" className="menu-aberto-screen">
            <h2 className="menu-aberto-screen">Idiomas e moedas</h2>
            {idiomasEMoedas.map((idioma_e_moeda) => (
                <article
                onClick={() => {
                    setMoedaAtual(idioma_e_moeda);
                    mostrarMoedas();
                }}
                key={idioma_e_moeda.id} 
                className="idiomas-e-moedas-itens menu-aberto-screen">
                    <img
                        src={idioma_e_moeda.img}
                        width={30}
                        height={22}
                        alt={idioma_e_moeda.alt}
                        className="menu-aberto-screen"
                    />
                    <p className="menu-aberto-screen">{idioma_e_moeda.label}</p>
                </article>
            ))}

        </section>

        <hr id="hr-header-main" className="menu-aberto-screen" />

        <section id="section-instrucoes" className="menu-aberto-screen">
            <div id="div-ferramentas-ia" className="menu-aberto-screen">
            <i className="fa-solid fa-robot menu-aberto-screen" /> <span className='menu-aberto-screen'>Ferramentas de I.A</span>
            </div>
            <div id="div-custos" className="menu-aberto-screen">
            <i className="fa-solid fa-dollar-sign menu-aberto-screen" /> <span className="menu-aberto-screen">Custos</span>
            </div>
            <div id="div-planejamento-pessoal" className="menu-aberto-screen">
            <i className="fa-solid fa-pen-to-square menu-aberto-screen" /> <span className="menu-aberto-screen">Planejamento Pessoal</span>
            </div>
        </section>

        <main className="main-aberto menu-aberto-screen">
            {itensMenu.map((item, index) => (
                <article 
                key={index} 
                onClick={() => navigate(item.rota)} 
                className={`${item.classeArticle}`}>
                <a className="menu-aberto-screen">
                    <i className={`${item.iconeEsquerda} icones-referencia menu-aberto-screen`} />
                    <p className="menu-aberto-screen">{item.texto}</p>
                    <i className={`${item.iconeDireita} ${item.classeIconeDireita} menu-aberto-screen`} />
                </a>
                </article>
            ))}
        </main>
    </div>
)
}
