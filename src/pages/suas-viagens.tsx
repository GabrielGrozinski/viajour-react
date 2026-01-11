import { useState, useEffect, useRef, useMemo } from "react";
import "../styles/suas-viagens.css";
import MenuLateral from "../components/menu-lateral";
import MenuVertical from "../components/menu-vertical";
import AnuncioDesktop from "../components/anuncio-desktop";
import AnuncioMobile from "../components/anuncio-mobile";
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
import CardViagem from "../components/cardViagem";
import { supabase } from "../auth/supabase-client";
import { ClipLoader } from 'react-spinners';
import { userAuth } from "../context/autenticacao";


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
  color: "#34d399",
  height: 2.5,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: 'white',
    border: '2px solid #34d399',
    boxShadow: '0 0 6px rgba(0,0,0,0.3)'
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: '#ddd'
  }
});


export default function SuasViagens() {
  const { user, setCondicaoInputs, setAvisoErro } = userAuth();  
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
      const {data: favoriteTrips, error } = await supabase
        .from('favoritetrips')
        .select('trip_id')
        .eq('user_id', user?.id);
      
      if (error) {
        console.error('Houve um erro ao buscar as viagens favorias: ', error);

      } else if (favoriteTrips.length > 0) {
        const novos = favoriteTrips.map((trip) => trip.trip_id)
        console.log('favorites', favoriteTrips)
        const { data: trips, error } = await supabase
            .from('trips')
            .select('*')
            .in('id', novos);

        if (error) {
            console.error('Houve um erro ao recuperar as viagens favoritadas: ', error);
        }
        console.log('trips', trips)

        if (trips) setViagens(trips);

      } else if (favoriteTrips.length === 0) {
        setCondicaoInputs(true);
        setAvisoErro('Você não tem nenhuma viagem salva.')
      }
      setLoading(false);
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


  function ativarPesquisa() {
    window.document.getElementById('searchViagem')?.classList.toggle('ativado');
    setPesquisaAtiva((valorAtual) => !valorAtual);
  }

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
    <div id="body" className="suas-viagens-screen">
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

      <header id="header" className="suas-viagens-screen">
        {/* Filtros */}
        {largura >= 1024 && !menuExpandidoH1 && (
          <h1 className="suas-viagens-screen">ViaJour</h1>
        )}
        <h1 className={`titulo suas-viagens-screen ${largura < 1024 && scroll_do_user ? 'sumir' : 'aparecer'}`}>
          🛂 Suas Viagens
          <p className="subtitulo suas-viagens-screen">
            O lugar onde suas viagens favoritas ficam salvas!
          </p>
        </h1>
        <div className="filtros suas-viagens-screen">
          <div onMouseLeave={() => {
            if (largura >= 1024) {
              if (pesquisaAtiva) {ativarPesquisa()}
            } else return;
            }}
            style={{backgroundColor: pesquisaAtiva ? '#34d399' : ''}} className="filtro-busca suas-viagens-screen">
            <input onChange={(event) => {
              scrollToHeader();
              const textoDigitado = event.target.value;
              const textoFormatado = formatarString(textoDigitado);
              setPesquisaAtual(textoFormatado)}} placeholder="Bons descontos!" type="text" className="suas-viagens-screen" name="searchViagem" id="searchViagem"
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
                className={`btn-filtro ${filtro === "internacional" ? "btn-ativo" : ""} suas-viagens-screen`}
              >
                Viagens internacionais
              </button>
              <hr id="hr-btn-viagem" className="hr-vertical suas-viagens-screen" />
              <button
                id="btn-viagem-nacional"
                onClick={() => {setFiltro("nacional"); scrollToHeader()}}
                className={`btn-filtro ${filtro === "nacional" ? "btn-ativo" : ""} suas-viagens-screen`}
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
              className="icone suas-viagens-screen">
              <i className="fa-solid fa-magnifying-glass suas-viagens-screen"></i>
              </div>
          </div>

          <div className="filtro-preco suas-viagens-screen">
            <div className="custo-estimado suas-viagens-screen">
              <h2>Custo estimado</h2>
              <h3>R$ {value[0]} - {value[1]} </h3>
            </div>
            <SliderCustomizado step={100} value={value} onChange={(_, newValue) => {
              if (Array.isArray(newValue)) {
                setValue(newValue);
                scrollToHeader();
              } else return;
              }} 
              valueLabelDisplay="auto" min={0} max={filtro === 'nacional' ? 4000 : 10000} />
          </div>
        </div>
      </header>
      
      <main id="container" className="pagina-natal suas-viagens-screen">
        {/* Cards */}
          <div className="lista-viagens suas-viagens-screen">
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
                className="card-viagem suas-viagens-screen"
              >
                {v.img && (
                  <img
                    src={v.img}
                    alt={v.destination}
                    className="card-img suas-viagens-screen"
                  />
                )}
                <div className="card-info suas-viagens-screen">
                  <div className="suas-viagens-screen">
                    <h2 className="card-titulo suas-viagens-screen">{v.destination}</h2>
                    <p className="card-descricao suas-viagens-screen">{v.description}</p>
                    <p className="card-custo suas-viagens-screen">
                      Custo estimado (7 dias):{" "}
                      <span className="suas-viagens-screen">{v.cost}</span>
                    </p>
                  </div>
                  <span className="tag-natalina suas-viagens-screen">
                    {v.type}
                  </span>
                </div>
              </div>
            ))}
            {/* sentinel for infinite scroll */}
            <div ref={sentinelRef} style={{height: 1}} aria-hidden />

            {/* loader / status */}
            {itemsToShow.length < viagensFiltradas.length ? (
              <div className="loader-carregando suas-viagens-screen">Carregando mais viagens...</div>
            ) : (
              <div className="loader-fim suas-viagens-screen">{loading ? <ClipLoader className='self-center' color='#000' loading size={35} /> : itemsToShow.length === 0 ? 'Nenhuma viagem encontrada' : 'Você chegou ao fim'}</div>
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
