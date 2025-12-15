import { useState, useContext, useRef, useEffect } from "react";
import { TemaContext } from "../../context/TemaContext";
import "../../styles/produtos/destino-certo.css";
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
import AnuncioMobile from "../../components/anuncio-mobile";
import { AnimatePresence, motion } from 'framer-motion';


interface ViagemRoteiro {
    destino: string,
    inicio: string,
    quantDias: number,
    tipo: string,
    custoViagem: number[] | string,
    quantViajantes: number,
    preferencias: string[],
}

const opcoesTipo = [
  { value: 'turismo', label: 'Turismo' },
  { value: 'compras', label: 'Compras' },
  { value: 'trabalho', label: 'Trabalho' },
];

const opcoesCusto = [
  { value: 'minimo-possivel', label: 'Mínimo Possível' },
  { value: 'pouco', label: 'Pouco' },
  { value: 'moderadamente', label: 'Moderadamente' },
  { value: 'muito', label: 'Muito' },
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

export default function DestinoCerto() {
  const { dark } = useContext(TemaContext);
  const [condicaoInputs, setCondicaoInputs] = useState<boolean>(false);
  const [avisoErro, setAvisoErro] = useState<string>('');
  const [trocaValores, setTrocaValores] = useState<boolean>(false);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [largura, setLargura] = useState(window.innerWidth);
  const [viagem, setViagem] = useState<ViagemRoteiro>({
    destino: '',
    inicio: '',
    quantDias: 0,
    tipo: '',
    quantViajantes: 0,
    custoViagem: [0, 0],
    preferencias: [''], 
  });
  const inputRefData = useRef<HTMLInputElement | null>(null);
  const pickerRef = useRef<any>(null);

  const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: dark ? state.hasValue ? '#6c63ff' : "#e2e8f0" : state.hasValue ? '#6c63ff' : "white",
        borderColor: dark ? "#555" : "#ccc",
    }),
    singleValue: (base: any, state: any) => ({
      ...base,
      color: state.hasValue ? '#f1f5f9' : ''
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
  const [valorViagem, setValorViagem] = useState<number[]>([0, 0]);

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

  function definirValoresViagem(novoValor: number, indice: number) {
    let copiaAtualizarViagem = [...valorViagem];
    copiaAtualizarViagem[indice] = novoValor;
    atualizarViagem("custoViagem", copiaAtualizarViagem);
    setValorViagem(prev => {
      let copia = [...prev];
      copia[indice] = novoValor;
      return copia;
    });
  }

  function verificarInputs() {
    setCondicaoInputs(false);

    setTimeout(() => {
      Object.entries(viagem).forEach(([key, value]) => {
        if (!trocaValores && key === "custoViagem") {
          if (value[0] > value[1] || !value[0] || !value[1]) {
            setCondicaoInputs(true);
            setAvisoErro(`${value[0] > value[1] ? 'O valor mínimo é maior que o valor máximo.' : 'Defina um valor mínimo e máximo.'}`);
            setTimeout(() => setCondicaoInputs(false), 3000);
          }
        }
        if (!value || value[0] === '') {
          setCondicaoInputs(true);
          switch (key) {
            case "destino":
              setAvisoErro('');
              break;
            case "inicio": 
              setAvisoErro('');
              break;
            case "quantDias":
              setAvisoErro('Escolha quantos dias sua viagem terá.');
              break;
            case "tipo":
              setAvisoErro('Defina o tipo da sua viagem.');
              break;
            case "quantViajantes":
              setAvisoErro('Escolha quantas pessoas irão viajar com você.');
              break;
            case "custoViagem":
              setAvisoErro('Defina o custo da sua viagem.');
              break;
            case "preferencias":
              setAvisoErro('Defina ao menos uma preferência');
              break;
          }
          setTimeout(() => setCondicaoInputs(false), 3000);
        }
      });
    }, 350);
  }

  useEffect(() => {
    if (trocaValores) {
      return atualizarViagem("custoViagem", '');
    } else {
      return atualizarViagem("custoViagem", [0, 0]);
    }
  }, [trocaValores]);

return (
  <div
    id="body" 
    style={{backgroundImage: dark ? `url(${fundoDark})` : `url(${fundo})`}} 
    className="destino-certo-screen"
  >
    <AnimatePresence mode="wait">
      {condicaoInputs && avisoErro && (
        <motion.div
          key="aviso-inputs"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.5}}
          className="aviso destino-certo-screen"
        >
         {avisoErro}
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

    <h1 className="titulo destino-certo-screen">Destino Certo</h1>

    {/* Dados iniciais */}
    <main className="destino-certo-screen">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          }} 
        className="card destino-certo-screen">
        <div>
          <label htmlFor="destino-viagem" className="destino-certo-screen">Destino da viagem:</label>
          <input
            placeholder="Escolha um destino"
            id="destino-viagem"
            required
            className="destino-certo-screen"
            type="text"
            value={viagem?.destino}
            onChange={(opcao) => atualizarViagem("destino", opcao.target.value)}
          />
        </div>

        <div>
          <label htmlFor="data-viagem" className="destino-certo-screen">Data de início:</label>
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
            className="destino-certo-screen"
            onChange={(opcao) => atualizarViagem("inicio", opcao.target.value)}
          />
        </div>

        <div>
          <label htmlFor="quant-dias" className="destino-certo-screen">Quantidade de dias:</label>
          <input
            placeholder="Selecione entre 1-14 dias"
            type="number"
            min={1}
            max={14}
            id="quant-dias"
            value={viagem?.quantDias > 0 ? viagem?.quantDias : ''}
            className="destino-certo-screen"
            onChange={(opcao) => atualizarViagem("quantDias", Number(opcao.target.value))}
          />
        </div>

        <div>
          <label htmlFor="tipo-viagem" className="destino-certo-screen">Tipo da viagem:</label>
          <Select
            placeholder="Selecione o tipo da sua viagem"
            inputId="tipo-viagem"
            styles={customStyles}
            options={opcoesTipo}
            value={opcoesTipo.find((opcao) => opcao.value === viagem?.tipo) || null}
            onChange={(opcao: any) => atualizarViagem("tipo", opcao?.value)}
            className="destino-certo-screen"
          />
        </div>

        <div>
          <label htmlFor="quant-pessoas" className="destino-certo-screen">Quantidade de pessoas na viagem (incluindo você):</label>
          <input
            placeholder="Escolha entre 1-30"
            type="number"
            min={1}
            max={30}
            id="quant-pessoas"
            value={viagem?.quantViajantes > 0 ? viagem?.quantViajantes : ''}
            className="destino-certo-screen"
            onChange={(opcao) => atualizarViagem("quantViajantes", Number(opcao.target.value))}
          />
        </div>

        {trocaValores ? (
          <div>
            <h2 style={{fontSize: '1.05em'}} className="valor-titulo destino-certo-screen">
                Escolha quanto você pretende gastar na sua viagem
            </h2>
            <label htmlFor="custo-viagem" className="destino-certo-screen"></label>
            <Select
              placeholder="Selecione um valor"
              inputId="custo-viagem"
              styles={customStyles}
              options={opcoesCusto}
              value={opcoesCusto.find((opcao) => opcao.value === viagem?.custoViagem) || null}
              onChange={(opcao: any) => atualizarViagem("custoViagem", opcao?.value)}
              className="destino-certo-screen"
            />
            <a 
              style={{marginTop: 20}} 
              className={`${dark ? 'text-blue-500' : 'text-blue-700'} text-shadow-[1px_1px_1px_#0000001a] flex justify-center`}
            >
              <h3 className="cursor-pointer" 
                onClick={() => setTrocaValores(!trocaValores)}
                >
                Usar valores literais
              </h3>
            </a>
          </div>
        ) : (
        <div>
          <h2 style={{fontSize: '1.05em'}} className="valor-titulo destino-certo-screen">
              Escolha um valor mínimo e máximo para sua viagem
          </h2>
          <div style={{marginBottom: 12}} className="flex justify-between gap-2">
            <input 
            onChange={(e) => definirValoresViagem(Number(e.target.value), 0)} className="max-w-1/2 text-slate-100"
            min={0}
            placeholder="Mínimo" 
            type="number" 
            name="valorMinimo" 
            id="valorMinimo" 
            />

            <input 
            onChange={(e) => definirValoresViagem(Number(e.target.value), 1)} className="max-w-1/2 text-slate-100" 
            placeholder="Máximo"
            min={0} 
            type="number" 
            name="valorMaximo" 
            id="valorMaximo" 
            />
          </div>

          <a className={`${dark ? 'text-blue-500' : 'text-blue-700'} text-shadow-[1px_1px_1px_#0000001a] flex justify-center`}><h3 className="cursor-pointer" onClick={() => setTrocaValores(!trocaValores)}>Usar valores subjetivos</h3></a>
        </div>
        )}
        
        <div>
          <h2 className="preferencias-titulo destino-certo-screen">Escolha até três preferências</h2>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              {opcoesPreferencia.map((item: string, index: number) => (
              <input
                  type="button"
                  onClick={() => {
                  if (viagem?.preferencias.includes(item)) {
                      let preferenciaViagemDesmarcada = viagem?.preferencias.filter((preferencia: string) => preferencia !== item);
                      preferenciaViagemDesmarcada = preferenciaViagemDesmarcada.length === 0 ? [''] : preferenciaViagemDesmarcada;
                      atualizarViagem("preferencias", preferenciaViagemDesmarcada);
                  } else {
                      if (viagem?.preferencias.length === 4) return;
                      const preferenciasAtuais = viagem.preferencias[0] === '' ? [item] : [...viagem?.preferencias!, item];
                      atualizarViagem("preferencias", preferenciasAtuais);
                  }
                  }}
                  className="opcoes-preferencia destino-certo-screen"
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
        </div>

        <div>
          <label htmlFor="btn-montar-aventura" className="destino-certo-screen"></label>
          <input onClick={() => verificarInputs()} className="btn-montar destino-certo-screen" id="btn-montar-aventura" type="submit" value="Montar Aventura" />
        </div>
      </form>

    </main>

    {largura >= 1024 ? (
      <AnuncioDesktop isTelaDeViagens={false} />
    ) : (
      <AnuncioMobile/>
    )}
  </div>
);

}
