import { useState, useContext, useRef, useEffect } from "react";
import { TemaContext } from "../../context/TemaContext";
import "../../styles/produtos/roteiro-automatico.css";
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
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';


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

const opcoesTipo = [
  { value: 'turismo', label: 'Turismo' },
  { value: 'compras', label: 'Compras' },
  { value: 'trabalho', label: 'Trabalho' },
];

const opcoesPreferencia = [
    'Neve',
    'Natureza',
    'Parques Temáticos',
    'Vida Noturna',
    'Shopping',
    'Cultura e História',
    'Gastronomia',
    'Resourt',
    'Praia',
    'Acampamento',
    'Tecnologia',
]

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
  const [viagem, setViagem] = useState<ViagemRoteiro>({
    destino: '',
    inicio: '',
    quantDias: 0,
    tipo: '',
    custoViagem: 0,
    quantViajantes: 0,
    preferencias: [''], 
  });
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
  const [valorViagem, setValorViagem] = useState([1000, 10000]);
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
    const inputDia: HTMLInputElement | null = window.document.getElementById('quant-dias') as HTMLInputElement;
    const inputPessoa: HTMLInputElement | null = window.document.getElementById('quant-pessoas') as HTMLInputElement;

    function handleInputDia() {
        if (!inputDia) return;
        const max = inputDia.max;
        const min = inputDia.min;
        const value = inputDia.value;
        if (Number(max) < Number(value)) inputDia.value = String(max);
        if (Number(min) > Number(value)) inputDia.value = String(min);
    }

    function handleInputPessoa() {
        if (!inputPessoa) return;
        const max = inputPessoa.max;
        const min = inputPessoa.min;
        const value = inputPessoa.value;
        if (Number(max) < Number(value)) inputPessoa.value = String(max);
        if (Number(min) > Number(value)) inputPessoa.value = String(min);
    }
    inputDia?.addEventListener('input', handleInputDia);
    inputPessoa?.addEventListener('input', handleInputPessoa);
    return () => {
        inputDia.removeEventListener('input', handleInputDia);
        inputPessoa.removeEventListener('input', handleInputPessoa);
    }
  }, [])

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
    className="roteiro-automatico-screen"
  >
    <AnimatePresence mode="wait">
      {condicaoCustos && (
        <motion.div
          key="aviso-custos"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5}}
          className="aviso roteiro-automatico-screen">
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

    <h1 className="titulo roteiro-automatico-screen">Roteiro Automático</h1>

    {/* Dados iniciais */}
    <main className="roteiro-automatico-screen">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          gerarDias();
          }} 
        className="card roteiro-automatico-screen">
        <label htmlFor="destino-viagem" className="roteiro-automatico-screen">Destino da viagem:</label>
        <input
          placeholder="Escolha um destino"
          id="destino-viagem"
          required
          className="roteiro-automatico-screen"
          type="text"
          value={viagem?.destino}
          onChange={(opcao) => atualizarViagem("destino", opcao.target.value)}
        />

        <label htmlFor="data-viagem" className="roteiro-automatico-screen">Data de início:</label>
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
          className="roteiro-automatico-screen"
          onChange={(opcao) => atualizarViagem("inicio", opcao.target.value)}
        />

        <label htmlFor="quant-dias" className="roteiro-automatico-screen">Quantidade de dias:</label>
        <input
          placeholder="Selecione entre 1-14 dias"
          type="number"
          min={1}
          max={14}
          id="quant-dias"
          value={viagem?.quantDias > 0 ? viagem?.quantDias : ''}
          className="roteiro-automatico-screen"
          onChange={(opcao) => atualizarViagem("quantDias", Number(opcao.target.value))}
        />

        <label htmlFor="tipo-viagem" className="roteiro-automatico-screen">Tipo da viagem:</label>
        <Select
          placeholder="Selecione o tipo da sua viagem"
          inputId="tipo-viagem"
          styles={customStyles}
          options={opcoesTipo}
          value={opcoesTipo.find((opcao) => opcao.value === viagem?.tipo) || null}
          onChange={(opcao: any) => atualizarViagem("tipo", opcao?.value)}
          className="roteiro-automatico-screen"
        />

        <label htmlFor="quant-pessoas" className="roteiro-automatico-screen">Quantidade de pessoas:</label>
        <input
          placeholder="Quantas pessoas vão viajar além de você?"
          type="number"
          min={0}
          max={30}
          id="quant-pessoas"
          value={viagem?.quantViajantes > 0 ? viagem?.quantViajantes : ''}
          className="roteiro-automatico-screen"
          onChange={(opcao) => atualizarViagem("quantViajantes", Number(opcao.target.value))}
        />

        <h2 style={{fontSize: '1.1em'}} className="valor-titulo roteiro-automatico-screen">
            Escolha um valor mínimo e máximo para sua viagem
        </h2>
        <SliderCustomizado step={100} value={valorViagem} onChange={(_, newValue) => {
            if (Array.isArray(newValue)) {
            setValorViagem(newValue);
            } else return;
            }} 
            valueLabelDisplay="auto" min={0} max={50000} 
        />
        <div className="w-full flex justify-between">
            <h3 className={`${dark ? 'text-slate-100' : ''}`}>{valorViagem[0]}</h3>
            <h3 className={`${dark ? 'text-slate-100' : ''}`}>{valorViagem[1]}</h3>
        </div>
        
        <h2 className="preferencias-titulo roteiro-automatico-screen">Escolha até três preferências</h2>
        <div className="flex flex-wrap gap-4">
            {opcoesPreferencia.map((item: string, index: number) => (
            <input
                type="button"
                onClick={() => {
                if (viagem?.preferencias.includes(item)) {
                    const preferenciaViagemDesmarcada = viagem?.preferencias.filter((preferencia: string) => preferencia !== item);
                    atualizarViagem("preferencias", preferenciaViagemDesmarcada);
                } else {
                    if (viagem?.preferencias.length === 4) return;
                    const preferenciasAtuais = [...viagem?.preferencias!, item];
                    atualizarViagem("preferencias", preferenciasAtuais);
                }
                }}
                className="opcoes-preferencia roteiro-automatico-screen"
                style={{
                backgroundColor: viagem?.preferencias.includes(item) ? '#9333ea' : '', 
                color: viagem?.preferencias.includes(item) ? '#f8fafc' : '#222222',
                cursor: viagem?.preferencias.includes(item) ? '' : viagem?.preferencias.length === 4 ? 'not-allowed' : 'pointer'
                }} 
                key={index}
                value={item}
            />
            ))}
        </div>

        <label htmlFor="btn-montar-aventura" className="roteiro-automatico-screen"></label>
        <input className="btn-montar roteiro-automatico-screen" id="btn-montar-aventura" type="submit" value="Montar Aventura" />
      </form>

    </main>

    {largura >= 1024 && (
      <AnuncioDesktop/>
    )}
  </div>
);

}
