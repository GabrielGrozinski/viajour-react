import { useEffect, useState } from "react";
import MenuLateral from "../../components/menu-lateral";
import '../../styles/pagina-principal/media-query.css';
import '../../styles/pagina-principal/menu-fechado.css';

export default function MenuFechado({ abrir }: {abrir: () => void}) {
  const [largura, setLargura] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    return (
        <div id="body" className="body-menu-fechado">
            <header id="header" className="header-fechado">
                <i onClick={() => abrir()} id="menu-icone" className="fa-solid fa-bars" />
                <h1 className="logo">ViaJour</h1>
                <section id="container-moeda-e-idioma-desktop">
                <article className="idiomas-e-moedas-itens-desktop">
                    <img
                    src="https://flagcdn.com/w2560/br.png"
                    width={30}
                    height={22}
                    alt="Brazil"
                    />
                    <p>BR - BRL</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop">
                    <img
                    src="https://flagcdn.com/w2560/pt.png"
                    width={30}
                    height={22}
                    alt="Portugal"
                    />
                    <p>PT - EUR</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop">
                    <img
                    src="https://flagcdn.com/w2560/us.png"
                    width={30}
                    height={22}
                    alt="Estados Unidos"
                    />
                    <p>US - USD</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop">
                    <img
                    src="https://flagcdn.com/w2560/es.png"
                    width={30}
                    height={22}
                    alt="Espanha"
                    />
                    <p>ES - EUR</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop">
                    <img
                    src="https://flagcdn.com/w2560/uy.png"
                    width={30}
                    height={22}
                    alt="Uruguai"
                    />
                    <p>UY - UYU</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop">
                    <img
                    src="https://flagcdn.com/w2560/ar.png"
                    width={30}
                    height={22}
                    alt="Argentina"
                    />
                    <p>AR - ARS</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop">
                    <img
                    src="https://flagcdn.com/w2560/fr.png"
                    width={30}
                    height={22}
                    alt="França"
                    />
                    <p>FR - EUR</p>
                </article>
                <article id="moeda-item">
                    <img
                    src="https://flagcdn.com/w2560/br.png"
                    width={30}
                    height={22}
                    alt="Brazil"
                    />
                    <p>PT | BRL</p>
                </article>
                </section>
                <i id="user-icone" className="fa-solid fa-user user-btn" />
            </header>
            {largura > 1024 && (
                <MenuLateral />
            )}
            <section className="stats-card">
                <div id="item-money" className="stat-item">
                <i className="fa-solid fa-sack-dollar" />
                <div className="desc">
                    <span className="value">R$ 1.440,52</span>
                    <br />
                    <span className="label">Economizado com o ViaJour</span>
                </div>
                </div>

                <div id="item-date" className="stat-item">
                <i className="fa-solid fa-hourglass-end" />
                <div className="desc">
                    <span className="value">13 dias</span>
                    <br />
                    <span className="label">Economizado com o ViaJour</span>
                </div>
                </div>
            </section>
            
            <main id="main-fechado" className="main-fechado">
                <div className="icones">
                <i className="fa-solid fa-map-location-dot" />
                <h4>Roteiros automáticos</h4>
                </div>
                <div className="icones">
                <i className="fa-solid fa-location-dot" />
                <h4>Escolha qualquer lugar!</h4>
                </div>
                <div className="icones">
                <i className="fa-solid fa-earth-americas" />
                <h4>Viagens para o mundo todo!</h4>
                </div>
                <div className="icones">
                <i className="fa-solid fa-plane-up" />
                <h4>Suas viagens</h4>
                </div>
                <div className="icones">
                <i className="fa-solid fa-star" />
                <h4>Promoções</h4>
                </div>
                <div className="icones">
                <i className="fa-solid fa-heart" />
                <h4>Viagens festivas</h4>
                </div>
                <div className="desc-app">
                <p>
                    Tenha a melhor <br /> experiencia no app
                </p>
                <button className="btn-instalar-app">Baixar agora</button>
                <img className="baixar-app" src="/imagens/celular-icone.png" alt="" />
                </div>
            </main>
        </div>
    );
}
