export default function Assinaturas() {
  // LISTA GLOBAL DE TODAS AS FEATURES (9 no total)
  const todasAsFeatures = [
    "Acesso limitado",
    "Busca por viagens",
    "Suporte básico",
    "Acesso ilimitado",
    "Sem anúncios",
    "Ferramentas de I.A",
    "Usuários ilimitados",
    "Viagens exclusivas",
    "Acesso antecipado a ferramentas",
  ];

  const planos = [
    {
      id: 1,
      titulo: "Gratuito",
      preco: "0",
      desc: "A boa opção para quem está começando e quer testar nossa plataforma.",
      corFundo: "#e3ffe9",
      corBadge: "#b0f5c4",
      corTitulo: "#3e6b45",
      botao: "#3fa26b",
      botaoHover: "#2a764a",
      featuresLiberadas: [
        "Acesso limitado",
        "Busca por viagens",
        "Suporte básico",
      ],
    },
    {
      id: 2,
      titulo: "Aventureiro",
      preco: "5",
      desc: "Esse plano é ideal para quem viaja ativamente ou busca extrair o melhor delas.",
      corFundo: "#ecf0ff",
      corBadge: "#bed6fb",
      corTitulo: "#425675",
      botao: "#6558d3",
      botaoHover: "#4133B7",
      featuresLiberadas: [
        "Acesso limitado",
        "Busca por viagens",
        "Suporte básico",
        "Acesso ilimitado",
        "Sem anúncios",
        "Ferramentas de I.A",
      ],
    },
    {
      id: 3,
      titulo: "Viajante",
      preco: "20",
      desc: "Perfeito para aqueles que têm sangue de viajante!",
      corFundo: "#fff3e0",
      corBadge: "#ffd7a3",
      corTitulo: "#8a5623",
      botao: "#e08a1e",
      botaoHover: "#b86d16",
      featuresLiberadas: [
        "Acesso limitado",
        "Busca por viagens",
        "Suporte básico",
        "Acesso ilimitado",
        "Sem anúncios",
        "Ferramentas de I.A",
        "Usuários ilimitados",
        "Viagens exclusivas",
        "Acesso antecipado a ferramentas",
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {planos.map((plano) => (
        <main
          key={plano.id}
          className="shadow-[0_30px_30px_-25px_rgba(0,38,255,0.205)] bg-white text-[#697e91] max-w-[300px] rounded-2xl"
        >
          <div
            style={{ padding: 20, paddingTop: 40, background: plano.corFundo }}
            className="items-center relative rounded-xl"
          >
            {/* Pricing */}
            <span
              style={{ padding: 8, background: plano.corBadge }}
              className="absolute flex items-center text-xl font-semibold px-[0.75em] rounded-[99em_0_0_99em] right-0 top-0"
            >
              <span style={{ color: plano.corTitulo }}>
                ${plano.preco}
                <small className="text-[#707a91] text-[0.75em]">/ m</small>
              </span>
            </span>

            {/* Title */}
            <p
              className="font-semibold text-xl"
              style={{ color: plano.corTitulo }}
            >
              {plano.titulo}
            </p>

            {/* Description */}
            <p style={{ marginBottom: 8 }}>{plano.desc}</p>

            {/* Features */}
            <ul className="flex flex-col gap-2">
              {todasAsFeatures.map((feat, idx) => {
                const desbloqueada = plano.featuresLiberadas.includes(feat);
                return (
                  <li key={idx} className="flex items-center gap-2">
                    
                    {/* Ícone */}
                    {desbloqueada ? (
                      <span className="bg-[#1FCAC5] inline-flex items-center justify-center text-white w-5 h-5 rounded-full">
                        ✓
                      </span>
                    ) : (
                      <span className="bg-red-200 inline-flex items-center justify-center text-red-600 w-5 h-5 rounded-full">
                        ✕
                      </span>
                    )}

                    {/* Nome da feature */}
                    <span
                      className={
                        desbloqueada ? "" : "opacity-50 line-through"
                      }
                    >
                      {feat}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Button */}
            <div
              style={{ marginTop: 20 }}
              className="w-full flex items-center justify-end"
            >
              <a
                href="#"
                style={{ background: plano.botao }}
                className="text-white font-medium text-lg text-center w-full no-underline px-[0.75em] rounded-md border-0 outline-0 hover:brightness-90"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = plano.botaoHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = plano.botao)
                }
              >
                Choose plan
              </a>
            </div>
          </div>
        </main>
      ))}
    </div>
  );
}
