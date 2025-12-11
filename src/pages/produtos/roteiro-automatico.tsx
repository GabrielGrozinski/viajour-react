import { useState, useContext, useRef, useEffect } from "react";
import { TemaContext } from "../../context/TemaContext";
import "../../styles/produtos/sua-aventura.css";
import fundo from '../../assets/imagens/fundo.png';
import fundoDark from '../../assets/imagens/fundo-dark.png';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import "flatpickr/dist/themes/airbnb.css";
import Select from "react-select";
import MenuLateral from "../../components/menu-lateral";
import MenuVertical from "../../components/menu-vertical";
import AnuncioDesktop from "../../components/anuncio-desktop";
import { AnimatePresence, motion } from 'framer-motion';


interface DiaRoteiro {
  id: number;
  tipo: string;
  adicionarNota: boolean;
  nota: string;
  custoDia: number;
}

interface ViagemRoteiro {
    destino: string,
    inicio: string,
    quantDias: number,
    tipo: string,
    custoViagem: number,
    quantViajantes: number,
    preferencias: string[],
}

const opcoesTipo = ['Turismo', 'Compras', 'Trabalho']

export default function RoteiroAutomatico() {
  const { dark } = useContext(TemaContext);
  let custosSalvos = [
    {
      id: 1,
      custo: '40'
    },
    {
      id: 2,
      custo: '22'
    },
    {
      id: 3,
      custo: '85'
    },
    {
      id: 4,
      custo: '120'
    }
  ]
  const [condicaoCustos, setCondicaoCustos] = useState<boolean>(false);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [largura, setLargura] = useState(window.innerWidth);
  const [viagem, setViagem] = useState<ViagemRoteiro>();
  const [dias, setDias] = useState<DiaRoteiro[]>([]);
  const inputRefData = useRef<HTMLInputElement | null>(null);
  const pickerRef = useRef<any>(null);

  const customStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: dark ? "#e2e8f0" : "white",
        borderColor: dark ? "#555" : "#ccc",
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: dark ? "#1e293b" : "white",
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected
        ? (dark ? "#6c63ff" : "#6c63ff")
        : state.isFocused
        ? (dark ? "#94a3b8" : "#eee")
        : (dark ? "#e2e8f0" : "white"),
        
    }),
  };

  const gerarDias = () => {
    const novosDias: DiaRoteiro[] = Array.from(
      { length: viagem?.quantDias! },
      (_, i) => ({
        id: i + 1,
        tipo: "turismo",
        adicionarNota: false,
        nota: "",
        custoDia: 0,
      })
    );

    setDias(novosDias);
  };

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  const atualizarViagem = (campo: keyof ViagemRoteiro, value: any) => {
    setViagem((prev) => ({
        ...prev!, [campo]: value
    }));
  };

  useEffect(() => {
    if (inputRefData.current) {
        flatpickr(inputRefData.current, {
          allowInput: true,
          dateFormat: 'd/m/Y',
          locale: Portuguese,
          defaultDate: dataInicio,
          onChange: (_, dateStr) => {
            setDataInicio(dateStr);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (pickerRef.current) {
        pickerRef.current.setDate(dataInicio, false);
    }
  }, [dataInicio]);

  function expandirMargem() {
    // Não faz nada, pois não é necessário expandir a margem.
  }

return (
  <div
    id="body" 
    style={{backgroundImage: dark ? `url(${fundoDark})` : `url(${fundo})`}} 
    className="sua-aventura-screen"
  >
    <AnimatePresence mode="wait">
      {condicaoCustos && (
        <motion.div
          key="aviso-custos"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5}}
          className="aviso sua-aventura-screen">
            {dias.length > custosSalvos.length ? `Seu número de dias atual é maior que o número de dias do Cálculo de Custos. Por favor, remova ${dias.length - custosSalvos.length} dia${dias.length - custosSalvos.length === 1 ? '' : 's'}.` : `Seu número de dias atual é menor que o número de dias do Cálculo de Custos. Por favor, adicione ${custosSalvos.length - dias.length} dia${custosSalvos.length - dias.length > 1 ? 's' : ''}.`}
        </motion.div>
      )}
    </AnimatePresence>

    {largura >= 1024 ? (
      <MenuLateral expandirMargem={expandirMargem}/>
    ) : 
    (
      <MenuVertical />
    )
    }

    <h1 className="titulo sua-aventura-screen">Roteiro Automático</h1>

    {/* Dados iniciais */}
    <main className="sua-aventura-screen">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          gerarDias();
          }} 
        className="card sua-aventura-screen">
        <label htmlFor="destino-viagem" className="sua-aventura-screen">Destino da viagem:</label>
        <input
          placeholder="Escolha um destino"
          id="destino-viagem"
          required
          className="sua-aventura-screen"
          type="text"
          value={viagem?.destino}
          onChange={(opcao) => atualizarViagem("destino", opcao.target.value)}
        />

        <label htmlFor="data-viagem" className="sua-aventura-screen">Data de início:</label>
        <input
          onInvalid={(e) => {
            if (e.currentTarget.id === 'data-viagem') {
            e.preventDefault();
            e.currentTarget.reportValidity();
            }
          }}
          id="data-viagem"
          required
          ref={inputRefData}
          type="text"
          placeholder="Selecione uma data"
          className="sua-aventura-screen"
          onChange={(opcao) => atualizarViagem("inicio", opcao.target.value)}
        />

        <label htmlFor="quant-dias" className="sua-aventura-screen">Quantidade de dias:</label>
        <input
          type="number"
          min={1}
          id="quant-dias"
          value={viagem?.quantDias}
          className="sua-aventura-screen"
          onChange={(opcao) => atualizarViagem("quantDias", Number(opcao.target.value))}
        />

        <label htmlFor="tipo-viagem" className="sua-aventura-screen">Tipo do dia:</label>
        <Select
            id="tipo-viagem"
            styles={customStyles}
            options={opcoesTipo}
            value={viagem?.tipo}
            onChange={(opcao) => atualizarViagem("tipo", opcao?.valueOf)}
            className="psua-aventura-screen"
        />

        <label htmlFor="btn-montar-aventura" className="sua-aventura-screen"></label>
        <input className="btn-montar sua-aventura-screen" id="btn-montar-aventura" type="submit" value="Montar Aventura" />
      </form>

    </main>

    {largura >= 1024 && (
      <AnuncioDesktop/>
    )}
  </div>
);

}
