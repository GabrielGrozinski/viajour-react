import { useState, useEffect } from "react";
import '../../styles/produtos/viagens-de-natal.css';
import MenuLateral from "../../components/menu-lateral";
import anuncio from '../../assets/imagens/anuncio1.png';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';

interface Viagem {
  id: number;
  destino: string;
  custo: string;
  tipo: string;
  categoria: "nacional" | "internacional";
  descricao: string;
  img: string;
}

const viagens: Viagem[] = [
  {
    id: 1,
    destino: "Gramado - RS",
    custo: "R$ 5.200",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/11/18/18/35/hamburg-3823819_1280.jpg",
    descricao: "Praças iluminadas, feiras natalinas e muito chocolate quente nas montanhas gaúchas.",
  },
  {
    id: 2,
    destino: "Penedo - RJ",
    custo: "R$ 4.100",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2020/12/20/10/01/christmas-tree-5846564_1280.jpg",
    descricao: "Clima europeu no Brasil: muita decoração, pousadas aconchegantes e comidas típicas.",
  },
  {
    id: 3,
    destino: "Curitiba - PR",
    custo: "R$ 3.600",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/11/24/02/05/christmas-lights-3834926_1280.jpg",
    descricao: "Iluminações, mercados e restaurantes especiais para celebrar o Natal em família.",
  },
  {
    id: 4,
    destino: "Nova York - EUA",
    custo: "US$ 2.900",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/12/29/19/19/marketplace-4727905_1280.jpg",
    descricao: "Natal nas ruas de Manhattan: shows, patinação no gelo e vitrines icônicas.",
  },
  {
    id: 5,
    destino: "Disneylândia - EUA",
    custo: "US$ 3.400",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/08/29/09/26/disney-2692578_1280.jpg",
    descricao: "Magia total: espetáculos temáticos, desfiles e momentos com personagens para todas as idades.",
  },
  {
    id: 6,
    destino: "Viena - Áustria",
    custo: "€ 2.500",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2022/01/24/16/29/horses-6963914_1280.jpg",
    descricao: "Mercados tradicionais, concertos natalinos e atmosfera clássica europeia.",
  },
  {
    id: 7,
    destino: "Campos do Jordão - SP",
    custo: "R$ 2.800",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/05/03/10/29/prague-7171444_1280.jpg",
    descricao: "Clima de serra, chocolates, fondue e ruas enfeitadas — perfeito para um Natal romântico.",
  },
  {
    id: 8,
    destino: "Bonito - MS",
    custo: "R$ 3.200",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2022/05/03/20/12/prague-7172597_1280.jpg",
    descricao: "Natureza exuberante, rios cristalinos e passeios outdoor para relaxar no Natal.",
  },
  {
    id: 9,
    destino: "Foz do Iguaçu - PR",
    custo: "R$ 2.900",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/09/07/02/25/city-4457801_1280.jpg",
    descricao: "Cataratas imponentes e vistas espetaculares, ideal para quem busca aventura e natureza.",
  },
  {
    id: 10,
    destino: "Natal - RN",
    custo: "R$ 2.400",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/12/15/14/55/czech-republic-4697278_1280.jpg",
    descricao: "Praias e clima tropical, perfeito para um Natal com mar e tranquilidade.",
  },
  {
    id: 11,
    destino: "Salvador - BA",
    custo: "R$ 2.700",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/11/21/20/34/philadelphia-4643451_1280.jpg",
    descricao: "Cultura e festas com alto astral, saboreie a culinária baiana durante as festas.",
  },
  {
    id: 12,
    destino: "Manaus - AM",
    custo: "R$ 3.100",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2014/02/10/00/37/santiago-263235_1280.jpg",
    descricao: "Explore a floresta amazônica, cruzeiros e experiências culturais únicas no Natal.",
  },
  {
    id: 13,
    destino: "Fernando de Noronha - PE",
    custo: "R$ 6.800",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2018/05/31/04/59/cities-3443208_1280.jpg",
    descricao: "Ilhas paradisíacas com praias de água cristalina – o Natal ideal para quem ama mar e tranquilidade.",
  },
  {
    id: 14,
    destino: "Morro de São Paulo - BA",
    custo: "R$ 3.500",
    tipo: "Viagem de Natal",
    categoria: "nacional",
    img: "https://cdn.pixabay.com/photo/2019/10/25/09/09/city-4576421_1280.jpg",
    descricao: "Praias calmas e festas locais, ótimo destino para descansar e curtir com amigos.",
  },
  {
    id: 15,
    destino: "Lisboa - Portugal",
    custo: "€ 1.200",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2014/11/21/17/23/new-york-540807_1280.jpg",
    descricao: "Ruas históricas e iluminação mágica: descubra tradições natalinas em bairros pitorescos.",
  },
  {
    id: 16,
    destino: "Paris - França",
    custo: "€ 1.650",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/10/30/15/21/travel-2902737_1280.jpg",
    descricao: "Mercados encantadores, cafés e vitrines decoradas — um Natal cheio de charme europeu.",
  },
  {
    id: 17,
    destino: "Londres - Reino Unido",
    custo: "£ 1.450",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/10/15/12/50/prague-5656740_1280.jpg",
    descricao: "Tradição, teatros e rotas históricas — perfeito para celebrar o Natal com cultura e estilo.",
  },
  {
    id: 18,
    destino: "Tóquio - Japão",
    custo: "¥ 330.000",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2019/04/04/17/58/road-4103334_1280.jpg",
    descricao: "Iluminações moderníssimas, delícias culinárias e experiências urbanas únicas no Natal.",
  },
  {
    id: 19,
    destino: "Sydney - Austrália",
    custo: "US$ 3.900",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2013/12/28/13/14/sidney-234714_1280.jpg",
    descricao: "Natal de verão: praias, eventos ao ar livre e fogos de artifício à beira-mar.",
  },
  {
    id: 20,
    destino: "Bali - Indonésia",
    custo: "US$ 1.900",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2017/08/29/21/39/snow-2694971_1280.jpg",
    descricao: "Relaxamento em praias tropicais, templos e resorts perfeitos para celebrar com calma.",
  },
  {
    id: 21,
    destino: "Cidade do Cabo - África do Sul",
    custo: "US$ 1.350",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/05/31/20/02/city-view-1427730_1280.jpg",
    descricao: "Paisagens costeiras deslumbrantes, vinhos regionais e uma combinação de cultura e natureza.",
  },
  {
    id: 22,
    destino: "Reykjavik - Islândia",
    custo: "€ 1.950",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2013/10/04/21/13/san-diego-190898_1280.jpg",
    descricao: "Auroras boreais, paisagens geladas e vilarejos pitorescos para um Natal mágico.",
  },
  {
    id: 23,
    destino: "Vancouver - Canadá",
    custo: "US$ 2.100",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2016/08/10/19/11/los-angeles-1584089_1280.jpg",
    descricao: "Montanhas nevadas próximas e uma cidade vibrante — perfeito para combinar esqui e urbanismo.",
  },
  {
    id: 24,
    destino: "Roma - Itália",
    custo: "€ 1.500",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2025/03/31/21/30/italy-9505450_1280.jpg",
    descricao: "História, gastronomia e presépios nas praças — um Natal cercado por arte e tradição.",
  },
  {
    id: 25,
    destino: "Praga - República Tcheca",
    custo: "€ 1.100",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/01/25/19/14/paris-4793200_1280.jpg",
    descricao: "Mercados medievais, praças iluminadas e charme arquitetônico para um Natal inesquecível.",
  },
  {
    id: 26,
    destino: "Dubai - Emirados Árabes",
    custo: "US$ 2.400",
    tipo: "Viagem de Natal",
    categoria: "internacional",
    img: "https://cdn.pixabay.com/photo/2020/03/11/14/32/burj-khalifa-4922317_1280.jpg",
    descricao: "Luxo, grandes shoppings e eventos modernos — um Natal com experiências exclusivas.",
  },
];

const SliderCustomizado = styled(Slider)({
  color: "#1d4ed8",
  height: 2.5,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    border: '2px solid #1d4ed8',
    boxShadow: '0 0 6px rgba(0,0,0,0.3)'
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: '#ddd'
  }
});


export default function ViagensNatal() {
  const [filtro, setFiltro] = useState<"nacional" | "internacional">("nacional");
  const [largura, setLargura] = useState(window.innerWidth);
  const [value, setValue] = useState([1000, 5000])

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  function expandirMargem() {
    window.document.getElementById('container')?.classList.toggle('menu-lateral-expandido');
    window.document.getElementById('header')?.classList.toggle('menu-lateral-expandido');
  }

  const viagensFiltradas = viagens.filter((v) => v.categoria === filtro);

return (
  <div id="body" className="viagens-natalinas-screen">
    <MenuLateral expandirMargem={expandirMargem}/>
    <header id="header" className="viagens-natalinas-screen">
      {/* Filtros */}
      <h1 className="viagens-natalinas-screen">ViaJour</h1>
      <h1 className="titulo viagens-natalinas-screen">
        🎄 Viagens de Natal
        <p className="subtitulo viagens-natalinas-screen">
          Explore destinos perfeitos para passar o Natal. Previsão de custo para 7 dias.
        </p>
      </h1>
      <div className="filtros viagens-natalinas-screen">
        <div className="filtro-busca viagens-natalinas-screen">
            <button
              onClick={() => setFiltro("internacional")}
              className={`btn-filtro ${filtro === "internacional" ? "btn-ativo" : ""} viagens-natalinas-screen`}
            >
              Viagens internacionais
            </button>
            <hr className="hr-vertical viagens-natalinas-screen" />
            <button
              onClick={() => setFiltro("nacional")}
              className={`btn-filtro ${filtro === "nacional" ? "btn-ativo" : ""} viagens-natalinas-screen`}
            >
              Viagens nacionais
            </button>
          <div className="icone viagens-natalinas-screen"><i className="fa-solid fa-magnifying-glass viagens-natalinas-screen"></i></div>
        </div>

        <div className="filtro-preco viagens-natalinas-screen">
          <div className="custo-estimado viagens-natalinas-screen">
            <h2>Custo estimado</h2>
            <h3>R$ {value[0]} - {value[1]} </h3>
          </div>
          <SliderCustomizado value={value} onChange={(_, newValue) => { if (Array.isArray(newValue)) setValue(newValue)}} valueLabelDisplay="auto" min={0} max={15000} />
        </div>
      </div>
    </header>
    <hr className="hr-lateral viagens-natalinas-screen" />
    <main id="container" className="pagina-natal viagens-natalinas-screen">
      {/* Cards */}
      <div className="lista-viagens viagens-natalinas-screen">
        {viagensFiltradas.map((v) => (
          <div
            key={v.id}
            className="card-viagem viagens-natalinas-screen"
          >
            {v.img && (
              <img
                src={v.img}
                alt={v.destino}
                className="card-img viagens-natalinas-screen"
              />
            )}
            <div className="card-info viagens-natalinas-screen">
              <div className="viagens-natalinas-screen">
                <h2 className="card-titulo viagens-natalinas-screen">{v.destino}</h2>
                <p className="card-descricao viagens-natalinas-screen">{v.descricao}</p>
                <p className="card-custo viagens-natalinas-screen">
                  Custo estimado (7 dias):{" "}
                  <span className="viagens-natalinas-screen">{v.custo}</span>
                </p>
              </div>
              <span className="tag-natalina viagens-natalinas-screen">
                {v.tipo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
    {largura >= 1024 && (
      <div style={{backgroundImage: `url(${anuncio})`}} className="imagem-desktop viagens-natalinas-screen">
      </div>
    )}
  </div>
);

}
