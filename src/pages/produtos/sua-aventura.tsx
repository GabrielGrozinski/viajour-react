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
import { userAuth } from "../../context/autenticacao";
import MensagemModal from "../../components/mensagem-modal";
import { ModalCalculator } from "../../components/modal-calculator-salvo";
import GenPdf from "../../components/gen-pdf";
import{ ClipLoader } from "react-spinners";


interface DiaRoteiro {
  id: number;
  dia: string;
  tipo: string;
  adicionarNota: boolean;
  nota: string;
  custoDia: number;
}

type TripDay = {
  dia: string;
  data: string;
  tipo: string;
  custo: number;
  notas: string[];
}

type TripData = {
  nomeViagem: string;
  dataInicial: string;
  dataFinal: string;
  duracaoDias: number;
  dias: TripDay[];
}

interface custoDosDias {
  id: number,
  custo: string,
}

interface values_calculator {
  name: string;
  days: number;
  days_cost: number[];
  total_cost: number;
}

const opcoesTipo = [
  { value: "turismo", label: "Turismo" },
  { value: "compras", label: "Compras" },
  { value: "trabalho", label: "Trabalho" },
];

export default function MonteSuaAventura() {
  const { dark } = useContext(TemaContext);
  const { setAvisoErro, setAvisoSucesso, setCondicaoInputs } = userAuth();
  const [viagemPDF, setViagemPDF] = useState<TripData>({
    nomeViagem: '',
    dataInicial: '',
    dataFinal: '',
    duracaoDias: 0,
    dias: [
      {
        dia: '',
        data: '',
        tipo: '',
        custo: 0,
        notas: ['']
      }
    ]
  });
  const [downloadPdf, setDownloadPdf] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [destino, setDestino] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [custoDia, setCustoDia] = useState<custoDosDias[]>([{ id: 1, custo: '' }]);
  const [quantidadeDias, setQuantidadeDias] = useState<number>(0);
  const [largura, setLargura] = useState(window.innerWidth);
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
      { length: quantidadeDias },
      (_, i) => ({
        id: i + 1,
        dia: `Dia ${i + 1}`,
        tipo: "turismo",
        adicionarNota: false,
        nota: "",
        custoDia: 0,
      })
    );

    const novosCustos: custoDosDias[] = Array.from(
      { length: quantidadeDias },
      (_, i) => ({
        id: i + 1,
        custo: ''
      })
    );

    setDias(novosDias);
    setCustoDia(novosCustos);
  };

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    const inputDia: HTMLInputElement | null = window.document.getElementById('quant-dias') as HTMLInputElement;

    function handleInputDia() {
      if (!inputDia) return;
      const max = inputDia.max;
      const min = inputDia.min;
      const value = inputDia.value;
      if (Number(max) < Number(value)) inputDia.value = String(max);
      if (Number(min) > Number(value)) inputDia.value = String(min);
    }

    inputDia?.addEventListener('input', handleInputDia);
    return () => inputDia.removeEventListener('input', handleInputDia);
  }, [])

  const atualizarDia = (id: number, campo: keyof DiaRoteiro, value: any) => {
    setDias((prev) =>
      prev.map((dia) =>
        dia.id === id ? { ...dia, [campo]: campo === 'custoDia' ? parseInt(value.replace(/\D/g, '')) : value } : dia
      )
    );
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

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.target.style.height = "auto";     // reseta
    e.target.style.height = `${e.target.scrollHeight}px`; // ajusta
  };

  function expandirMargem() {
    // Não faz nada, pois não é necessário expandir a margem.
  }

  function formatarCustoDia(custo: string) {
    // Remove tudo que não for número
    const numero = custo.replace(/\D/g, "");

    // Formata adicionando R$ no final
    return numero ? "R$ " + numero : "";
  }

  function handleChangeCusto(e: React.ChangeEvent<HTMLInputElement>, id_do_dia: Number) {

    setCustoDia((prev) => prev.map((c) => c.id === id_do_dia ? { ...c, custo: formatarCustoDia(e.target.value) } : c
    ));
  }

  function adicionarCustosAutomaticamente(calculatorEscolhido: values_calculator) {
    setModalShow(false);
    if (dias.length !== calculatorEscolhido.days) {
      const erroAtual =
        dias.length > calculatorEscolhido.days ?
          `Seu número de dias atual é maior que o número de dias do Calculator. Remova ${dias.length - calculatorEscolhido.days} dia${dias.length - calculatorEscolhido.days === 1 ? '' : 's'}.`
          :
          `Seu número de dias atual é menor que o número de dias do Calculator. Adicione ${calculatorEscolhido.days - dias.length} dia${calculatorEscolhido.days - dias.length > 1 ? 's' : ''}.`;
      setCondicaoInputs(true);
      setAvisoErro(erroAtual);
      return;
    }

    let custoDiaAutomatico = custoDia.slice();
    let diasAutomatico = dias.slice();
    for (let i = 0; i < custoDiaAutomatico.length; i++) {
      custoDiaAutomatico[i].custo =
        formatarCustoDia(calculatorEscolhido.days_cost[i].toString());

      diasAutomatico[i].custoDia =
        parseInt(calculatorEscolhido.days_cost[i].toString());
    }

    setCustoDia(custoDiaAutomatico);
    setDias(diasAutomatico);
    setCondicaoInputs(true);
    setAvisoSucesso('Seus custos foram adicionados com sucesso!');
  }

  function salvarTrip() {
    setLoading(true);
    const datasSeparadas = dataInicio.split("/");
    let dataFinal = (Number(datasSeparadas[0]) + 7).toString();
    dataFinal = `${dataFinal}/${datasSeparadas[1]}/${datasSeparadas[2]}`
    
    const data_dos_dias: string[] = [];

    for (let index = 0; index < dias.length; index++) {
      data_dos_dias.push(`${(Number(datasSeparadas[0]) + index).toString()}/${datasSeparadas[1]}/${datasSeparadas[2]}`);
    }

    const newDays: TripDay[] = [];

    dias.forEach((dia: DiaRoteiro, index) => {
      const notasArrumado = dia.nota.trim().split('.');
      let notasArrumado2 = notasArrumado.filter((nota) => nota !== '').map((nota) => {
        const n = nota.trim();
        const finais = [".", "?", "!", "%", "/"];
        const termina = finais.some(f => n.endsWith(f));
        return termina ? n : `${n}.`
      });

      newDays.push({
        dia: dia.dia,
        data: data_dos_dias[index],
        tipo: dia.tipo,
        custo: dia.custoDia || 0,
        notas: notasArrumado2
      });
    })

    setViagemPDF({
      nomeViagem: destino,
      dataInicial: dataInicio,
      dataFinal: dataFinal,
      duracaoDias: dias.length,
      dias: newDays
    });

    setTimeout(() => {
      setLoading(false);
      setDownloadPdf(true);
      console.log('viagem', viagemPDF)
    }, 3000);

  }


  return (
    <div
      id="body"
      style={{ backgroundImage: dark ? `url(${fundoDark})` : `url(${fundo})` }}
      className="sua-aventura-screen"
    >

      <MensagemModal />

      {largura >= 1024 ? (
        <MenuLateral expandirMargem={expandirMargem} />
      ) :
        (
          <MenuVertical />
        )
      }

      <h1 className="titulo sua-aventura-screen">Monte sua Aventura</h1>

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
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
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
          />

          <label htmlFor="quant-dias" className="sua-aventura-screen">Quantidade de dias:</label>
          <input
            placeholder="Selecione entre 1-14 dias"
            type="number"
            max={14}
            id="quant-dias"
            value={quantidadeDias > 0 ? quantidadeDias : ''}
            className="sua-aventura-screen"
            onChange={(e) => setQuantidadeDias(Number(e.target.value))}
          />

          <label htmlFor="btn-montar-aventura" className="sua-aventura-screen"></label>
          <input className="btn-montar sua-aventura-screen" id="btn-montar-aventura" type="submit" value="Montar Aventura" />
        </form>

        {/* Dias */}
        <div className="dias-container sua-aventura-screen">
          {dias.map((dia) => (
            <div key={dia.dia} className="card sua-aventura-screen">
              <abbr title="Usar valores salvos do Calculator.">
                <i
                  onClick={() => setModalShow(true)}
                  className="fa-solid fa-file-import absolute top-2 right-2 text-blue-500 text-shadow-[1px_1px_3px_#2222222a] text-xl cursor-pointer"></i>
              </abbr>
              <h2 className="sua-aventura-screen">Dia {dia.id}</h2>

              <label className="sua-aventura-screen">Tipo do dia:</label>
              <Select
                styles={customStyles}
                options={opcoesTipo}
                value={opcoesTipo.find((opt) => opt.value === dia.tipo)}
                onChange={(opcao) => atualizarDia(dia.id, "tipo", opcao?.value)}
                className="sua-aventura-screen"
              />

              <label
                id="label-anotacao" className="sua-aventura-screen">Adicionar nota?</label>
              <div className="radio-group sua-aventura-screen">
                <label className="sua-aventura-screen">
                  <input
                    type="radio"
                    checked={!dia.adicionarNota}
                    onChange={() =>
                      atualizarDia(dia.id, "adicionarNota", false)
                    }
                    className="sua-aventura-screen"
                  />
                  Não
                </label>
                <label className="sua-aventura-screen">
                  <input
                    type="radio"
                    checked={dia.adicionarNota}
                    onChange={() =>
                      atualizarDia(dia.id, "adicionarNota", true)
                    }
                    className="sua-aventura-screen"
                  />
                  Sim
                </label>
              </div>

              {dia.adicionarNota && (
                <>
                  <label className="sua-aventura-screen">Nota do dia:</label>
                  <textarea
                    placeholder="Adicione alguma informação importante para sua viagem aqui."
                    value={dia.nota}
                    onChange={(e) => {
                      atualizarDia(dia.id, "nota", e.target.value);
                      autoResize(e);
                    }}
                    className="sua-aventura-screen"
                  />
                </>
              )}

              <label htmlFor="custo-dias" className="sua-aventura-screen">Custo do dia:</label>
              <input
                type="Text"
                inputMode="numeric"
                pattern="[0-9]*"
                min={1}
                max={100000}
                id="custo-dias"
                value={custoDia[dia.id - 1].custo}
                placeholder={`Quanto você pretende gastar${largura < 1024 ? '?' : ' nesse dia?'}`}
                className="sua-aventura-screen"
                onChange={(e) => {
                  atualizarDia(dia.id, "custoDia", e.target.value);
                  handleChangeCusto(e, dia.id);
                }}
              />

              {dias.length > 0 && dias.length === dia.id && (
                loading ? 
                <div style={{marginTop: 14}} className="flex items-center justify-center">
                  <ClipLoader color="#000" size={30} />
                </div>
                :
                <button onClick={() => salvarTrip()} className="btn-salvar sua-aventura-screen">
                  Salvar aventura
                </button>
                
              )}
            </div>
          ))}
        </div>
      </main>
      
        <GenPdf 
            open={downloadPdf}
            trip={viagemPDF}
            onFinish={() => setDownloadPdf(false)}
        />

      <ModalCalculator
        open={modalShow}
        onClose={() => setModalShow(false)}
        onOpen={(calculatorEscolhido) => adicionarCustosAutomaticamente(calculatorEscolhido)}
      />

      {largura >= 1024 && (
        <AnuncioDesktop isTelaDeViagens={false} />
      )}
    </div>
  );

}
