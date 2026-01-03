import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLateral from "../../components/menu-lateral";
import '../../styles/pagina-principal/menu-fechado.css';
import imagemCelular from '../../assets/imagens/celular-icone.png';
import ChatCard from "../../components/chat-card";


interface Moeda {
    id: string,
    img: string,
    alt: string,
    label: string
}


export default function MenuFechado({ abrir }: {abrir: () => void}) {
  const navigate = useNavigate();
  const [largura, setLargura] = useState(window.innerWidth);
  const topicos = [
    {
        icone: 'fa-solid fa-map-location-dot',
        texto: 'Roteiros Automáticos'
    },
    {
        icone: 'fa-solid fa-location-dot',
        texto: 'Escolha qualquer lugar!'
    },
    {
        icone: 'fa-solid fa-earth-americas',
        texto: 'Viagens para o mundo todo!'
    },
    {
        icone: 'fa-solid fa-plane-up',
        texto: 'Suas viagens'
    },
    {
        icone: 'fa-solid fa-star',
        texto: 'Promoções'
    },
    {
        icone: 'fa-solid fa-heart',
        texto: 'Viagens festivas'
    },
  ];
  const idiomasEMoedas: Moeda[] = [
    {
        id: 'br',
        img: 'https://flagcdn.com/w2560/br.png',
        alt: 'Brazil',
        label: 'PT - BRL',
    },
    {
        id: 'pt',
        img: 'https://flagcdn.com/w2560/pt.png',
        alt: 'Portugal',
        label: 'PT - EUR',
    },
    {
        id: 'us',
        img: 'https://flagcdn.com/w2560/us.png',
        alt: 'Estados Unidos',
        label: 'EN - USD',
    },
    {
        id: 'es',
        img: 'https://flagcdn.com/w2560/es.png',
        alt: 'Espanha',
        label: 'ES - EUR',
    },
    {
        id: 'uy',
        img: 'https://flagcdn.com/w2560/uy.png',
        alt: 'Uruguai',
        label: 'ES - UYU',
    },
    {
        id: 'ar',
        img: 'https://flagcdn.com/w2560/ar.png',
        alt: 'Argentina',
        label: 'ES - ARS',
    },
    {
        id: 'fr',
        img: 'https://flagcdn.com/w2560/fr.png',
        alt: 'França',
        label: 'FR - EUR',
    },
  ];
  const [moedaAtual, setMoedaAtual] = useState<Moeda>({
    id: 'br',
    img: 'https://flagcdn.com/w2560/br.png',
    alt: 'Brazil',
    label: 'BR - BRL'
  });

  useEffect(() => {
    const moedaAtualStorage = localStorage.getItem('moeda_e_idioma');
    if (!moedaAtualStorage) {
        localStorage.setItem('moeda_e_idioma', 'br');
    } else {
        const moeda_e_idioma_salvo: Moeda[] = idiomasEMoedas.filter((item) => item.id === moedaAtualStorage);
        setMoedaAtual(moeda_e_idioma_salvo[0]);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function expandirMargem() {
    const header = window.document.getElementById('header');
    const main = window.document.getElementById('main-fechado');
    header?.classList.toggle('menu-lateral-expandido');
    main?.classList.toggle('menu-lateral-expandido');
  }

return (
    <div id="body" className="body-menu-fechado menu-fechado-screen">
        <header id="header" className="header-fechado menu-fechado-screen">
            <i onClick={() => abrir()} id="menu-icone" className="fa-solid fa-bars menu-fechado-screen" />
            <h1 className="logo menu-fechado-screen">ViaJour</h1>
            <section id="container-moeda-e-idioma-desktop" className="menu-fechado-screen">
                {idiomasEMoedas.map((idioma_e_moeda) => (
                    <article
                    onClick={() => {
                        setMoedaAtual(idioma_e_moeda);
                        localStorage.setItem('moeda_e_idioma', idioma_e_moeda.id);
                    }} 
                    key={idioma_e_moeda.id} className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src={idioma_e_moeda.img}
                        width={30}
                        height={22}
                        alt={idioma_e_moeda.alt}
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">{idioma_e_moeda.label}</p>
                </article>
                ))}
                <article id="moeda-item" className="menu-fechado-screen">
                    <img
                        src={moedaAtual.img}
                        width={30}
                        height={22}
                        alt={moedaAtual.alt}
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">{moedaAtual.label}</p>
                </article>
            </section>
            <i onClick={() => navigate('/usuario')} id="user-icone" className="fa-solid fa-user user-btn menu-fechado-screen" />
        </header>
        {largura > 1024 && (
            <MenuLateral expandirMargem={expandirMargem} />
        )}
        <section className="stats-card menu-fechado-screen">
            <div id="item-money" className="stat-item menu-fechado-screen">
                <abbr title="Dinheiro"><i className="fa-solid fa-sack-dollar menu-fechado-screen" /></abbr>
                <div className="desc menu-fechado-screen">
                    <span className="value menu-fechado-screen">R$ 1.440,52</span>
                    <br className="menu-fechado-screen" />
                    <span className="label menu-fechado-screen">Economizado com o ViaJour</span>
                </div>
            </div>

            <div id="item-date" className="stat-item menu-fechado-screen">
                <abbr title="Tempo"><i className="fa-solid fa-hourglass-end menu-fechado-screen" /></abbr>
                <div className="desc menu-fechado-screen">
                    <span className="value menu-fechado-screen">13 dias</span>
                    <br className="menu-fechado-screen" />
                    <span className="label menu-fechado-screen">Economizado com o ViaJour</span>
                </div>
            </div>
        </section>

        <main id="main-fechado" className="main-fechado menu-fechado-screen">
            {topicos.map((topico, index) => (
                <div key={index} className="icones menu-fechado-screen">
                    <i className={`${topico.icone} menu-fechado-screen`} />
                    <h4 className="menu-fechado-screen">{topico.texto}</h4>
                </div>
            ))}

            <div className="desc-app menu-fechado-screen">
                <p className="menu-fechado-screen">
                    Tenha a melhor <br className="menu-fechado-screen" /> experiencia no app
                </p>
                <button className="btn-instalar-app menu-fechado-screen">Baixar agora</button>
                <img className="baixar-app menu-fechado-screen" src={imagemCelular} alt="imagem-baixar-app" />
            </div>
        </main>
        <ChatCard/>
    </div>
);

}
