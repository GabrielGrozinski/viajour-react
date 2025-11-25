import { useEffect, useState } from "react";
import MenuLateral from "../../components/menu-lateral";
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
    <div id="body" className="body-menu-fechado menu-fechado-screen">
        <header id="header" className="header-fechado menu-fechado-screen">
            <i onClick={() => abrir()} id="menu-icone" className="fa-solid fa-bars menu-fechado-screen" />
            <h1 className="logo menu-fechado-screen">ViaJour</h1>
            <section id="container-moeda-e-idioma-desktop" className="menu-fechado-screen">
                <article className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/br.png"
                        width={30}
                        height={22}
                        alt="Brazil"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">BR - BRL</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/pt.png"
                        width={30}
                        height={22}
                        alt="Portugal"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">PT - EUR</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/us.png"
                        width={30}
                        height={22}
                        alt="Estados Unidos"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">US - USD</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/es.png"
                        width={30}
                        height={22}
                        alt="Espanha"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">ES - EUR</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/uy.png"
                        width={30}
                        height={22}
                        alt="Uruguai"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">UY - UYU</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/ar.png"
                        width={30}
                        height={22}
                        alt="Argentina"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">AR - ARS</p>
                </article>
                <article className="idiomas-e-moedas-itens-desktop menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/fr.png"
                        width={30}
                        height={22}
                        alt="França"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">FR - EUR</p>
                </article>
                <article id="moeda-item" className="menu-fechado-screen">
                    <img
                        src="https://flagcdn.com/w2560/br.png"
                        width={30}
                        height={22}
                        alt="Brazil"
                        className="menu-fechado-screen"
                    />
                    <p className="menu-fechado-screen">PT | BRL</p>
                </article>
            </section>
            <i id="user-icone" className="fa-solid fa-user user-btn menu-fechado-screen" />
        </header>
        {largura > 1024 && (
            <MenuLateral />
        )}
        <section className="stats-card menu-fechado-screen">
            <div id="item-money" className="stat-item menu-fechado-screen">
                <i className="fa-solid fa-sack-dollar menu-fechado-screen" />
                <div className="desc menu-fechado-screen">
                    <span className="value menu-fechado-screen">R$ 1.440,52</span>
                    <br className="menu-fechado-screen" />
                    <span className="label menu-fechado-screen">Economizado com o ViaJour</span>
                </div>
            </div>

            <div id="item-date" className="stat-item menu-fechado-screen">
                <i className="fa-solid fa-hourglass-end menu-fechado-screen" />
                <div className="desc menu-fechado-screen">
                    <span className="value menu-fechado-screen">13 dias</span>
                    <br className="menu-fechado-screen" />
                    <span className="label menu-fechado-screen">Economizado com o ViaJour</span>
                </div>
            </div>
        </section>

        <main id="main-fechado" className="main-fechado menu-fechado-screen">
            <div className="icones menu-fechado-screen">
                <i className="fa-solid fa-map-location-dot menu-fechado-screen" />
                <h4 className="menu-fechado-screen">Roteiros automáticos</h4>
            </div>
            <div className="icones menu-fechado-screen">
                <i className="fa-solid fa-location-dot menu-fechado-screen" />
                <h4 className="menu-fechado-screen">Escolha qualquer lugar!</h4>
            </div>
            <div className="icones menu-fechado-screen">
                <i className="fa-solid fa-earth-americas menu-fechado-screen" />
                <h4 className="menu-fechado-screen">Viagens para o mundo todo!</h4>
            </div>
            <div className="icones menu-fechado-screen">
                <i className="fa-solid fa-plane-up menu-fechado-screen" />
                <h4 className="menu-fechado-screen">Suas viagens</h4>
            </div>
            <div className="icones menu-fechado-screen">
                <i className="fa-solid fa-star menu-fechado-screen" />
                <h4 className="menu-fechado-screen">Promoções</h4>
            </div>
            <div className="icones menu-fechado-screen">
                <i className="fa-solid fa-heart menu-fechado-screen" />
                <h4 className="menu-fechado-screen">Viagens festivas</h4>
            </div>
            <div className="desc-app menu-fechado-screen">
                <p className="menu-fechado-screen">
                    Tenha a melhor <br className="menu-fechado-screen" /> experiencia no app
                </p>
                <button className="btn-instalar-app menu-fechado-screen">Baixar agora</button>
                <img className="baixar-app menu-fechado-screen" src="/imagens/celular-icone.png" alt="" />
            </div>
        </main>
    </div>
);

}
