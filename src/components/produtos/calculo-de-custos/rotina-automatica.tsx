import { useEffect, useRef, useState } from "react";
import './rotina-automatica.css';

export default function RotinaAutomatica({ setRotina }: any) {
  const [largura, setLargura] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  // --- Estados principais ---
  const [duration, setDuration] = useState(7);
  const [budget, setBudget] = useState("3.000,00");
  const [tipo, setTipo] = useState<"economica" | "intermediaria" | "conforto">("intermediaria");

  // --- Referências das barras ---
  const transpRef = useRef<HTMLSpanElement>(null);
  const alimRef   = useRef<HTMLSpanElement>(null);
  const hospRef   = useRef<HTMLSpanElement>(null);
  const diveRef   = useRef<HTMLSpanElement>(null);

  // --- Referências dos textos ---
  const pTranspRef = useRef<HTMLDivElement>(null);
  const pAlimRef   = useRef<HTMLDivElement>(null);
  const pHospRef   = useRef<HTMLDivElement>(null);
  const pDiveRef   = useRef<HTMLDivElement>(null);

  // --- Distribuições como no seu script ---
  const distributions = {
    intermediaria: { transporte: 0.25, alimentacao: 0.25, hospedagem: 0.25, diversao: 0.25 },
    economica:     { transporte: 0.3,  alimentacao: 0.3,  hospedagem: 0.30, diversao: 0.10 },
    conforto:      { transporte: 0.2,  alimentacao: 0.20, hospedagem: 0.2,  diversao: 0.4 }
  };

  const distAtual = distributions[tipo];

  // --- Atualiza as barras visualmente ---
  function updateBars() {
    const t = Math.round(distAtual.transporte * 100);
    const a = Math.round(distAtual.alimentacao * 100);
    const h = Math.round(distAtual.hospedagem * 100);
    const d = Math.round(distAtual.diversao * 100);

    if (transpRef.current) transpRef.current.style.width = `${t}%`;
    if (alimRef.current)   alimRef.current.style.width   = `${a}%`;
    if (hospRef.current)   hospRef.current.style.width   = `${h}%`;
    if (diveRef.current)   diveRef.current.style.width   = `${d}%`;

    if (pTranspRef.current) pTranspRef.current.innerText = `${t}%`;
    if (pAlimRef.current)   pAlimRef.current.innerText   = `${a}%`;
    if (pHospRef.current)   pHospRef.current.innerText   = `${h}%`;
    if (pDiveRef.current)   pDiveRef.current.innerText   = `${d}%`;
  }

  // Atualiza barras sempre que tipo mudar
  useEffect(() => {
    updateBars();
  }, [tipo]);

  // Ao carregar (set inicial)
  useEffect(() => {
    updateBars();
  }, []);

  // --- Lógica do botão gerar rotina ---
  function gerarRotina() {
    const dias = duration || 1;

    const budgetNumber = Number(
      budget.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "")
    ) || 0;

    const totalPorDia = budgetNumber / Math.max(1, dias);
    const rotina = [];

    for (let i = 1; i <= dias; i++) {
      rotina.push({
        dia: i,
        transporte: Math.round(totalPorDia * distAtual.transporte * 100) / 100,
        alimentacao: Math.round(totalPorDia * distAtual.alimentacao * 100) / 100,
        hospedagem: Math.round(totalPorDia * distAtual.hospedagem * 100) / 100,
        total: Math.round(totalPorDia * 100) / 100,
      });
    }

    console.log("Rotina gerada:", {
      dias,
      budget: budgetNumber,
      tipo,
      dist: distAtual,
      rotina
    });

    alert("Rotina gerada! Veja no console.");
  }

  const tema = (localStorage.getItem("tema") as "dark" | "normal") ||"normal"
  ;


  useEffect(() => {
    if (!tema) return;
    if (tema === 'dark') {
      window.document.getElementById('container')?.classList.add('dark');
    } else {
      window.document.getElementById('container')?.classList.remove('dark');
    }
  }, []);

  return (
    <>
      
      {largura < 1024 && (
          <div id="btn-rotinas" className="rotina-automatica-component">
            <button onClick={() => setRotina('rotina-manual')} id="btn-rotina-manual" className="rotina-automatica-component">Rotina Manual</button>
            <button onClick={() => setRotina('rotina-automatica')} id="btn-rotina-automatica" className="rotina-automatica-component">Rotina Automática</button>
          </div>
        
      )}
      <h2 id="gen-title" className="title rotina-automatica-component">
          Gerador Automático de Rotina de Gastos
      </h2>
      <p className="desc rotina-automatica-component">
        Crie automaticamente uma rotina de gastos completa com base no seu orçamento e perfil de viagem.
      </p>

      <form
      className="field-grid rotina-automatica-component"
      onSubmit={(e) => e.preventDefault()}
      >
        <div className="rotina-automatica-component">
            <label className="field-label rotina-automatica-component" htmlFor="duration">
            Duração da viagem (dias)
            </label>
            <input
            id="duration"
            type="number"
            min={1}
            className="rotina-automatica-component"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            />
        </div>

        <div className="rotina-automatica-component">
            <label className="field-label rotina-automatica-component" htmlFor="budget">
            Orçamento total da viagem (R$)
            </label>
            <input
            id="budget"
            type="text"
            inputMode="numeric"
            className="rotina-automatica-component"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            />
        </div>

        <div className="rotina-automatica-component">
            <label className="field-label rotina-automatica-component">
            Tipo de viagem
            </label>

            <div
            className="radio-group rotina-automatica-component"
            role="radiogroup"
            aria-label="Tipo de viagem"
            >
            <label className="radio rotina-automatica-component">
                <input
                type="radio"
                name="tipo"
                value="economica"
                className="rotina-automatica-component"
                checked={tipo === "economica"}
                onChange={() => setTipo("economica")}
                />
                <span className="label-text rotina-automatica-component">Econômica</span>
            </label>

            <label className="radio rotina-automatica-component">
                <input
                type="radio"
                name="tipo"
                value="intermediaria"
                className="rotina-automatica-component"
                checked={tipo === "intermediaria"}
                onChange={() => setTipo("intermediaria")}
                />
                <span className="label-text rotina-automatica-component">Intermediária</span>
            </label>

            <label className="radio rotina-automatica-component">
                <input
                type="radio"
                name="tipo"
                value="conforto"
                className="rotina-automatica-component"
                checked={tipo === "conforto"}
                onChange={() => setTipo("conforto")}
                />
                <span className="label-text rotina-automatica-component">Conforto</span>
            </label>
            </div>
        </div>

        {/* DISTRIBUIÇÃO */}
        <div className="rotina-automatica-component">
            <label className="field-label rotina-automatica-component">
            Distribuição por categoria
            </label>

            <div className="dist rotina-automatica-component">
            <div className="item rotina-automatica-component">
                <div className="meta rotina-automatica-component">Transporte</div>
                <div className="progress-wrapper rotina-automatica-component">
                <div className="progress rotina-automatica-component" data-key="transporte">
                    <span className="rotina-automatica-component" ref={transpRef}></span>
                </div>
                </div>
                <div className="percent rotina-automatica-component" ref={pTranspRef}>0%</div>
            </div>

            <div className="item rotina-automatica-component">
                <div className="meta rotina-automatica-component">Alimentação</div>
                <div className="progress-wrapper rotina-automatica-component">
                <div className="progress rotina-automatica-component" data-key="alimentacao">
                    <span className="rotina-automatica-component" ref={alimRef}></span>
                </div>
                </div>
                <div className="percent rotina-automatica-component" ref={pAlimRef}>0%</div>
            </div>

            <div className="item rotina-automatica-component">
                <div className="meta rotina-automatica-component">Hospedagem</div>
                <div className="progress-wrapper rotina-automatica-component">
                <div className="progress rotina-automatica-component" data-key="hospedagem">
                    <span className="rotina-automatica-component" ref={hospRef}></span>
                </div>
                </div>
                <div className="percent rotina-automatica-component" ref={pHospRef}>0%</div>
            </div>

            <div className="item rotina-automatica-component">
                <div className="meta rotina-automatica-component">Diversão</div>
                <div className="progress-wrapper rotina-automatica-component">
                <div className="progress rotina-automatica-component" data-key="diversao">
                    <span className="rotina-automatica-component" ref={diveRef}></span>
                </div>
                </div>
                <div className="percent rotina-automatica-component" ref={pDiveRef}>0%</div>
            </div>
            </div>
        </div>

        <div id="container-gerar" className="rotina-automatica-component">
            <button
            type="button"
            className="generate rotina-automatica-component"
            onClick={gerarRotina}
            >
            Gerar rotina automaticamente
            </button>
            <p className="hint rotina-automatica-component">
            Ao gerar, os dias serão criados automaticamente e preenchidos com valores proporcionais.
            </p>
        </div>

      </form>

    </>

  );
}
