import { useState, useMemo, useRef, useEffect } from "react";
import "../../styles/produtos/sua-aventura.css";
import fundo from '../../assets/imagens/fundo.png';
import fundoDark from '../../assets/imagens/fundo-dark.png';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import "flatpickr/dist/themes/airbnb.css";
import Select from "react-select";


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

  return (
    <div style={{backgroundImage: largura >= 1024 ? `url(${fundoAtual})` : 'none'}} className="aventura-container">
      <h1 className="titulo">Monte sua Aventura</h1>

      {/* Dados iniciais */}
      <div className="card">
        <label>Destino da viagem:</label>
        <input
          type="text"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        <label>Data de início:</label>
        <input
          ref={inputRefData}
          type="text"
          placeholder="Selecione uma data"
        />

        <label>Quantidade de dias:</label>
        <input
          type="number"
          min={1}
          value={quantidadeDias}
          onChange={(e) => setQuantidadeDias(Number(e.target.value))}
        />

        <button className="btn-gerar" onClick={gerarDias}>
          Gerar roteiro
        </button>
      </div>

      {/* Dias */}
      <div className="dias-container">
        {dias.map((dia) => (
          <div key={dia.id} className="card">
            <h2>Dia {dia.id}</h2>

            <label>Tipo do dia:</label>
            <Select
            styles={customStyles}
            options={opcoesTipo}
            value={opcoesTipo.find((opt) => opt.value === dia.tipo)}
            onChange={(opcao) => atualizarDia(dia.id, "tipo", opcao?.value)}
            />

            <label>Adicionar nota?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={!dia.adicionarNota}
                  onChange={() =>
                    atualizarDia(dia.id, "adicionarNota", false)
                  }
                />
                Não
              </label>
              <label>
                <input
                  type="radio"
                  checked={dia.adicionarNota}
                  onChange={() =>
                    atualizarDia(dia.id, "adicionarNota", true)
                  }
                />
                Sim
              </label>
            </div>

            {dia.adicionarNota && (
              <>
                <label>Nota do dia:</label>
                <textarea
                  value={dia.nota}
                  onChange={(e) => {
                    atualizarDia(dia.id, "nota", e.target.value);
                    autoResize(e);
                  }}
                />
              </>
            )}
          </div>
        ))}

        {dias.length > 0 && (
          <button className="btn-salvar">Salvar roteiro</button>
        )}
      </div>
    </div>
  );
}
