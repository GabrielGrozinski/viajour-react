import { useState, useMemo, useRef, useEffect } from "react";
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
}

const opcoesTipo = [
    { value: "turismo", label: "Turismo" },
    { value: "compras", label: "Compras" },
    { value: "trabalho", label: "Trabalho" },
];

export default function MonteSuaAventura() {
  const [destino, setDestino] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [quantidadeDias, setQuantidadeDias] = useState<number>(1);
  const [largura, setLargura] = useState(window.innerWidth);
  const [dias, setDias] = useState<DiaRoteiro[]>([]);
  const inputRefData = useRef<HTMLInputElement | null>(null);
  const pickerRef = useRef<any>(null);
  const [tema, setTema] = useState<"dark" | "normal">(
    (localStorage.getItem("tema") as "dark" | "normal") || "normal"
  );

  const fundoAtual = useMemo(() => {
    return tema === 'dark' ? fundoDark : fundo;
  }, [tema])

  const customStyles = {
    control: (base: any) => ({
        ...base,
        backgroundColor: tema === "dark" ? "#2a2a2a" : "white",
        borderColor: tema === "dark" ? "#555" : "#ccc",
        color: tema === "dark" ? "#eee" : "#333",
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: tema === "dark" ? "#333" : "white",
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected
        ? (tema === "dark" ? "#6c63ff" : "#6c63ff")
        : state.isFocused
        ? (tema === "dark" ? "#444" : "#eee")
        : (tema === "dark" ? "#333" : "white"),
        
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
      })
    );

    setDias(novosDias);
  };

  useEffect(() => {
    const bodyCorpo = window.document.getElementById('body');
    bodyCorpo?.classList.toggle("dark", tema === "dark");
    localStorage.setItem("tema", tema);
  }, [tema]);

  function mudarTema() {
    setTema(prev => (prev === "dark" ? "normal" : "dark"));
  }

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  const atualizarDia = (id: number, campo: keyof DiaRoteiro, valor: any) => {
    setDias((prev) =>
      prev.map((dia) =>
        dia.id === id ? { ...dia, [campo]: valor } : dia
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
          onChange: (selectedDates, dateStr) => {
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

return (
  <div
    id="body" 
    style={{backgroundImage: `url(${fundoAtual})`}} 
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

            <label className="sua-aventura-screen">Adicionar nota?</label>
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
                  value={dia.nota}
                  onChange={(e) => {
                    atualizarDia(dia.id, "nota", e.target.value);
                    autoResize(e);
                  }}
                  className="sua-aventura-screen"
                />
              </>
            )}

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
