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


interface DiaRoteiro {
  id: number;
  tipo: string;
  adicionarNota: boolean;
  nota: string;
  custoDia: number;
}

interface custoDosDias {
  id: number,
  custo: string,
}

const opcoesTipo = [
    { value: "turismo", label: "Turismo" },
    { value: "compras", label: "Compras" },
    { value: "trabalho", label: "Trabalho" },
];

export default function MonteSuaAventura() {
  const { dark, setDark } = useContext(TemaContext);
  const [destino, setDestino] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [custoDia, setCustoDia] = useState<custoDosDias[]>([{id: 1, custo: ''}]);
  const [quantidadeDias, setQuantidadeDias] = useState<number>(1);
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

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";     // reseta
    e.target.style.height = `${e.target.scrollHeight}px`; // ajusta
  };

  function expandirMargem() {
    // Não faz nada, pois não é necessário expandir a margem.
  }

  function handleChangeCusto(e: React.ChangeEvent<HTMLInputElement>, id_do_dia: Number) {
    // Remove tudo que não for número
    const numero = e.target.value.replace(/\D/g, "");

    // Formata adicionando R$ no final
    const formatado = numero ? "R$ " + numero : "";

    setCustoDia((prev) => prev.map((c) => c.id === id_do_dia ? { ...c, custo: formatado} : c
    ));
  }

  useEffect(() => {
    console.log(dias)
  }, [dias]);

return (
  <div
    id="body" 
    style={{backgroundImage: dark ? `url(${fundoDark})` : `url(${fundo})`}} 
    className="sua-aventura-screen"
  >
    {largura >= 1024 ? (
      <MenuLateral expandirMargem={expandirMargem}/>
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
          type="number"
          min={1}
          id="quant-dias"
          value={quantidadeDias}
          className="sua-aventura-screen"
          onChange={(e) => setQuantidadeDias(Number(e.target.value))}
        />

        <label htmlFor="btn-montar-aventura" className="sua-aventura-screen"></label>
        <input className="btn-montar sua-aventura-screen" id="btn-montar-aventura" type="submit" value="Montar Aventura" />
      </form>

      {/* Dias */}
      <div className="dias-container sua-aventura-screen">
        {dias.map((dia) => (
          <div key={dia.id} className="card sua-aventura-screen">
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

            <label htmlFor="custo-dias" className="sua-aventura-screen">Custo do dia</label>
            <input
              type="Text"
              min={1}
              max={100000}
              id="custo-dias"
              value={custoDia[dia.id - 1].custo}
              placeholder="Quanto você pretende gastar nesse dia?"
              className="sua-aventura-screen"
              onChange={(e) => {
                atualizarDia(dia.id, "custoDia", e.target.value);
                handleChangeCusto(e, dia.id);
              }}
            />

            {dias.length > 0 && dias.length === dia.id && (
              <button className="btn-salvar sua-aventura-screen">
                Salvar aventura
              </button>
            )}
          </div>
        ))}
      </div>
    </main>

    {largura >= 1024 && (
      <AnuncioDesktop/>
    )}
  </div>
);

}
