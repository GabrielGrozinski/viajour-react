import { useState, useEffect, useRef, useMemo } from "react";
import '../../styles/produtos/viagens-de-sete-dias.css';
import MenuLateral from "../../components/menu-lateral";
import MenuVertical from "../../components/menu-vertical";
import AnuncioDesktop from "../../components/anuncio-desktop";
import AnuncioMobile from "../../components/anuncio-mobile";
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import CardViagem from "../../components/cardViagem";
import { supabase } from "../../auth/supabase-client";
import { ClipLoader } from 'react-spinners';


interface Viagem {
  id: string;
  destination: string;
  cost: string;
  gross_cost: number;
  type: string;
  nationality: "nacional" | "internacional";
  description: string;
  img: string;
  keywords: string[];
}

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


export default function ViagensSeteDias() {
  const [loading, setLoading] = useState<boolean>(true);
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [mostrarCard, setMostrarCard] = useState<boolean>(false);
  const [trip_id, setViagemAtual] = useState<string>('');
  const [filtro, setFiltro] = useState<"nacional" | "internacional">("nacional");
  const [pesquisaAtiva, setPesquisaAtiva] = useState<boolean>(false);
  const [pesquisaAtual, setPesquisaAtual] = useState<string>('');
  const [largura, setLargura] = useState(window.innerWidth);
  const [value, setValue] = useState([1000, 10000]);
  const [menuExpandidoH1, setMenuExpandidoH1] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrip = async () => {
      const {data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('type', 'Viagem Barata');
      
      if (error) {
        console.error('Houve um erro ao buscar as viagens: ', error);
      } else if (data) {
        setLoading(false);
        setViagens(data);
      }
    }

    fetchTrip();
  }, []);

  const viagensFiltradasCusto = useMemo(() =>
    viagens.filter((v) => v.gross_cost >= value[0] && v.gross_cost <= value[1])
  , [value, viagens]);

  const viagensFiltradasTextoDigitado = useMemo(() => 
    viagensFiltradasCusto.filter((v) =>
      v.keywords.some(keyword => formatarString(keyword).includes(pesquisaAtual))
    ),
  [pesquisaAtual, viagensFiltradasCusto]);

  const viagensFiltradas = useMemo(
    () => viagensFiltradasTextoDigitado.filter((v) => v.nationality === filtro),
    [viagensFiltradasTextoDigitado, filtro]
  );

  // Paginação / infinite scroll
  const PAGE_SIZE = 12;
  const [itemsToShow, setItemsToShow] = useState<Viagem[]>(() => viagensFiltradas.slice(0, PAGE_SIZE));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset pagination when the filtered results change
  useEffect(() => {
    setItemsToShow(viagensFiltradas.slice(0, PAGE_SIZE));
  }, [viagensFiltradas]);

  // Infinite-scroll: observe sentinel and append next PAGE_SIZE
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setItemsToShow((prev: Viagem[]) => {
          if (prev.length >= viagensFiltradas.length) return prev;
          const nextCount = Math.min(prev.length + PAGE_SIZE, viagensFiltradas.length);
          return viagensFiltradas.slice(0, nextCount);
        });
      }
    }, { root: null, rootMargin: '300px', threshold: 0.1 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [sentinelRef, viagensFiltradas.length]);

  // Header adaptado para mobile
  const [scroll_do_user, setScroll_do_user] = useState<boolean>(false);
  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scroll = window.scrollY;
          setScroll_do_user(scroll > 105);
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const header = window.document.getElementById('header');
    const main = window.document.getElementById('container');
    if (!header || !main) return;
    if (mostrarCard) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      header.style.pointerEvents = 'none';
      main.style.pointerEvents = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      header.style.pointerEvents = 'auto';
      main.style.pointerEvents = 'auto';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      header.style.pointerEvents = 'auto';
      main.style.pointerEvents = 'auto';
    };
  }, [mostrarCard]);

  function ativarPesquisa() {
    window.document.getElementById('searchViagem')?.classList.toggle('ativado');
    setPesquisaAtiva((valorAtual) => !valorAtual);
  }

  function expandirMargem() {
    setMostrarCard(false);
    window.document.getElementById('container')?.classList.toggle('menu-lateral-expandido');
    window.document.getElementById('header')?.classList.toggle('menu-lateral-expandido');
    setMenuExpandidoH1(!menuExpandidoH1);
  }

  function formatarString(texto: string) {
    return texto
    .toLocaleLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "");
  }

  function scrollToHeader() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  

return (
  <div id="body" className="viagens-de-sete-dias-screen">
    {largura >= 1024 ? (
      <MenuLateral expandirMargem={expandirMargem}/>
    ) : 
    (
      <MenuVertical />
    )
    }

    {mostrarCard && (
      <CardViagem
      trip_id={trip_id}
      key="card-viagem"
      setMostrarCard={setMostrarCard}/>
    )}

    <header id="header" className="viagens-de-sete-dias-screen">
      {/* Filtros */}
      {largura >= 1024 && !menuExpandidoH1 && (
        <h1 className="viagens-de-sete-dias-screen">ViaJour</h1>
      )}
      <h1 className={`titulo viagens-de-sete-dias-screen ${largura < 1024 && scroll_do_user ? 'sumir' : 'aparecer'}`}>
        🗺️ Viagens de 7 Dias
        <p className="subtitulo viagens-de-sete-dias-screen">
          Explore destinos perfeitos para passar o Natal. Previsão de custo para 7 dias.
        </p>
      </h1>
      <div className="filtros viagens-de-sete-dias-screen">
        <div onMouseLeave={() => {
          if (largura >= 1024) {
            if (pesquisaAtiva) {ativarPesquisa()}
          } else return;
          }}
          style={{backgroundColor: pesquisaAtiva ? '#1d4ed8' : ''}} className="filtro-busca viagens-de-sete-dias-screen">
          <input onChange={(event) => {
            scrollToHeader();
            const textoDigitado = event.target.value;
            const textoFormatado = formatarString(textoDigitado);
            setPesquisaAtual(textoFormatado)}} placeholder="Boa viagem!" type="text" className="viagens-de-sete-dias-screen" name="searchViagem" id="searchViagem"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                ativarPesquisa();
              }
            }} />
          
          {!pesquisaAtiva && (
          <>
            <button
              id="btn-viagem-internacional"
              onClick={() => {setFiltro("internacional"); scrollToHeader()}}
              className={`btn-filtro ${filtro === "internacional" ? "btn-ativo" : ""} viagens-de-sete-dias-screen`}
            >
              Viagens internacionais
            </button>
            <hr id="hr-btn-viagem" className="hr-vertical viagens-de-sete-dias-screen" />
            <button
              id="btn-viagem-nacional"
              onClick={() => {setFiltro("nacional"); scrollToHeader()}}
              className={`btn-filtro ${filtro === "nacional" ? "btn-ativo" : ""} viagens-de-sete-dias-screen`}
            >
              Viagens nacionais
            </button>
          </>
          )}

          <div onMouseEnter={() => {
            if (largura >= 1024) {
              if (!pesquisaAtiva) {ativarPesquisa()} 
            } else return;
            }}
            onClick={() => {
              if (largura < 1024) {
                ativarPesquisa(); 
              } else return;
            }}
            className="icone viagens-de-sete-dias-screen">
            <i className="fa-solid fa-magnifying-glass viagens-de-sete-dias-screen"></i>
            </div>
        </div>

        <div className="filtro-preco viagens-de-sete-dias-screen">
          <div className="custo-estimado viagens-de-sete-dias-screen">
            <h2>Custo estimado</h2>
            <h3>R$ {value[0]} - {value[1]} </h3>
          </div>
          <SliderCustomizado step={100} value={value} onChange={(_, newValue) => {
             if (Array.isArray(newValue)) {
              setValue(newValue);
              scrollToHeader();
             } else return;
             }} 
            valueLabelDisplay="auto" min={0} max={25000} />
        </div>
      </div>
    </header>
    
    <main id="container" className="pagina-natal viagens-de-sete-dias-screen">
      {/* Cards */}
      <div className="lista-viagens viagens-de-sete-dias-screen">
        {itemsToShow.map((v) => (
          <div
            key={v.id}
            style={{filter: mostrarCard ? 'blur(1.5px)' : ''}}
            onClick={() => {
              setViagemAtual(v.id);
              setMostrarCard(true);
              if (window.pageYOffset < 120) {
                window.scrollTo({
                  top: 120,
                  behavior: 'smooth',
                });
              }
            }}
            className="card-viagem viagens-de-sete-dias-screen"
          >
            {v.img && (
              <img
                src={v.img}
                alt={v.destination}
                className="card-img viagens-de-sete-dias-screen"
              />
            )}
            <div className="card-info viagens-de-sete-dias-screen">
              <div className="viagens-de-sete-dias-screen">
                <h2 className="card-titulo viagens-de-sete-dias-screen">{v.destination}</h2>
                <p className="card-descricao viagens-de-sete-dias-screen">{v.description}</p>
                <p className="card-custo viagens-de-sete-dias-screen">
                  Custo estimado (7 dias):{" "}
                  <span className="viagens-de-sete-dias-screen">{v.cost}</span>
                </p>
              </div>
              <span className="tag-natalina viagens-de-sete-dias-screen">
                {v.type}
              </span>
            </div>
          </div>
        ))}
        {/* sentinel for infinite scroll */}
        <div ref={sentinelRef} style={{height: 1}} aria-hidden />

        {/* loader / status */}
        {itemsToShow.length < viagensFiltradas.length ? (
          <div className="loader-carregando viagens-de-sete-dias-screen">Carregando mais viagens...</div>
        ) : (
          <div className="loader-fim viagens-de-sete-dias-screen">{loading ? <ClipLoader className='self-center' color='#000' loading size={35} /> : itemsToShow.length === 0 ? 'Nenhuma viagem encontrada' : 'Você chegou ao fim'}</div>
        )}
      </div>
    </main>
    
    {largura >= 1024 ? (
      <AnuncioDesktop isTelaDeViagens={true} />
    ) : (
      <AnuncioMobile/>
    )}

  </div>
);

}
