import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import MenuVertical from "../../components/menu-vertical";
import MenuLateral from "../../components/menu-lateral";
import "../../styles/produtos/calculo-de-custos.css";
import RotinaAutomatica from "../../components/produtos/calculo-de-custos/rotina-automatica"; 
import anuncio1 from '../../assets/imagens/anuncio1.png';
import fundo from '../../assets/imagens/fundo.png';
import fundoDark from '../../assets/imagens/fundo-dark.png';

type Dia = {
  transporte: string;
  hospedagem: string;
  alimentacao: string;
};

export default function CalculoDeCustos() {
  const [dias, setDias] = useState<Dia[]>([
    { transporte: '', hospedagem: '', alimentacao: '' }
  ]);
  const [largura, setLargura] = useState(window.innerWidth);
  const [rotinaAtual, setRotina] = useState<'rotina-manual' | 'rotina-automatica'> ('rotina-manual');

  const [tema, setTema] = useState<"dark" | "normal">(
    (localStorage.getItem("tema") as "dark" | "normal") || "normal"
  );

  const corLabel = useMemo(() => {
    return tema === "dark" ? "lightgray" : "gray";
  }, [tema]);

  const fundoAtual = useMemo(() => {
    return tema === 'dark' ? fundoDark : fundo;
  }, [tema])

  const LIMITE_GRAFICO = 7;
  const LIMITE_MAX_DIAS = 14;

  // Tipagem correta para gráficos
  const grafico1 = useRef<Chart | null>(null);
  const grafico2 = useRef<Chart | null>(null);
  const graficoCategorias = useRef<Chart | null>(null);

  // Tipagem correta para canvas
  const canvas1 = useRef<HTMLCanvasElement | null>(null);
  const canvas2 = useRef<HTMLCanvasElement | null>(null);
  const canvasCategorias = useRef<HTMLCanvasElement | null>(null);

  // Tema
  useEffect(() => {
    const bodyCorpo = window.document.getElementById('body');
    bodyCorpo?.classList.toggle("dark", tema === "dark");
    localStorage.setItem("tema", tema);
  }, [tema]);

  function mudarTema() {
    setTema(prev => (prev === "dark" ? "normal" : "dark"));
  }

  // Adicionar dia
  function adicionarDia() {
    if (dias.length >= LIMITE_MAX_DIAS) {
      alert("Limite máximo atingido!");
      return;
    }

    if (dias.length === 7) {
      window.document.getElementById('grafico-dia-1')?.classList.add('grafico-extra');
    }

    setDias(prev => [
      ...prev,
      { transporte: '', hospedagem: '', alimentacao: '' }
    ]);
  }

  function removerDia(index: number) {
    if (dias.length === 1) return; // impede remover tudo

    if (dias.length <= 8) {
      window.document.getElementById('grafico-dia-1')?.classList.remove('grafico-extra');
    }

    setDias(prev => prev.filter((_, i) => i !== index));
  }

  // Atualiza valores
  function atualizarValor(
    index: number,
    campo: keyof Dia,
    valor: string
  ) {
    const novo = [...dias];
    novo[index][campo] = valor;
    setDias(novo);
  }

  // Atualiza gráficos
  useEffect(() => {
    if (!corLabel) return;
    const labels1: string[] = [];
    const valores1: number[] = [];

    const labels2: string[] = [];
    const valores2: number[] = [];

    let totalTransporte = 0;
    let totalHospedagem = 0;
    let totalAlimentacao = 0;

    dias.forEach((dia, i) => {
      const subtotal =
        Number(dia.transporte || 0) +
        Number(dia.hospedagem || 0) +
        Number(dia.alimentacao || 0);

      if (i < LIMITE_GRAFICO) {
        labels1.push(`Dia ${i + 1}`);
        valores1.push(subtotal);
      } else {
        labels2.push(`Dia ${i + 1}`);
        valores2.push(subtotal);
      }

      totalTransporte += Number(dia.transporte);
      totalHospedagem += Number(dia.hospedagem);
      totalAlimentacao += Number(dia.alimentacao);
    });

    // Gráfico 1
    if (grafico1.current) grafico1.current.destroy();

    if (canvas1.current) {
      grafico1.current = new Chart(canvas1.current, {
        type: "bar",
        data: {
          labels: labels1,
          datasets: [
            {
              label: "Total por Dia (R$)",
              data: valores1,
              backgroundColor: "#4f46e5"
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: corLabel
              }
            }
        },
        scales: {
            x: {
              ticks: {
                color: corLabel
              }
            },
        }}
      });
    }

    // Gráfico 2
    if (grafico2.current) grafico2.current.destroy();

    if (labels2.length > 0 && canvas2.current) {
      grafico2.current = new Chart(canvas2.current, {
        type: "bar",
        data: {
          labels: labels2,
          datasets: [
            {
              label: "Total por Dia (R$)",
              data: valores2,
              backgroundColor: "#4f46e5"
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: corLabel
              }
            }
        },
        scales: {
            x: {
              ticks: {
                color: corLabel
              }
            },
        }}
      });
    }

    // Gráfico Categorias
    if (graficoCategorias.current) graficoCategorias.current.destroy();

    if (canvasCategorias.current) {
      graficoCategorias.current = new Chart(canvasCategorias.current, {
        type: "pie",
        data: {
          labels: ["Transporte", "Hospedagem", "Alimentação"],
          datasets: [
            {
              data: [
                totalTransporte,
                totalHospedagem,
                totalAlimentacao
              ],
              backgroundColor: ["#2563eb", "#16a34a", "#ea580c"],
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: corLabel
              }
            }
          }
        }
      });
    }
  }, [dias, tema]);

  const totalGeral = dias.reduce(
    (acc, d) => acc + 
    Number(d.transporte || 0) + 
    Number(d.hospedagem || 0) + 
    Number(d.alimentacao || 0),
    0
  );

  useEffect(() => {
    const handleResize = () => setLargura(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  function expandirMargem() {
    const graficosDesktop = window.document.getElementById('graficos-desktop');
    graficosDesktop?.classList.toggle('menu-lateral-expandido');
  }


return (
  <div id="body" style={{backgroundImage: largura >= 1024 ? `url(${fundoAtual})` : 'none'}} className="calculo-de-custos-screen">
    {largura < 1024 ?
    (<MenuVertical />)
    :
    (
    <>
      <div className="menu-em-cima">
      </div>
      <MenuLateral expandirMargem={expandirMargem} />
    </>
    )
    }
    {largura >= 1024 && (
      <div id="graficos-desktop" className="graficos calculo-de-custos-screen">
              <div id="grafico-dia-1" className="grafico-dia calculo-de-custos-screen">
                  <h3 className="calculo-de-custos-screen">Gastos por dia</h3>
                  <canvas ref={canvas1} className="calculo-de-custos-screen"></canvas>
              </div>
              {dias.length > LIMITE_GRAFICO && (
                  <div id="grafico-dia-2" className="grafico-dia calculo-de-custos-screen">
                  <h3 className="calculo-de-custos-screen">Gastos por dia (continuação)</h3>
                  <canvas ref={canvas2} className="calculo-de-custos-screen"></canvas>
                  </div>
              )}
              <div id="grafico-final" className="calculo-de-custos-screen">
                  <h3 className="calculo-de-custos-screen">Gastos por categoria</h3>
                  <canvas ref={canvasCategorias} className="calculo-de-custos-screen"></canvas>
              </div>

              {rotinaAtual === 'rotina-manual' && (
                <section className="container-gerar-rotina calculo-de-custos-screen">
                  <h1>Gerador Automático de Rotina de Gastos</h1>
                  <p>Crie automaticamente uma rotina de gastos completa com base no seu orçamento e perfil de viagem.</p>
                  <button onClick={() => setRotina('rotina-automatica')}>
                    Gerar rotina automaticamente
                  </button>
                </section>
              )}

              {rotinaAtual === 'rotina-automatica' && (
                <section id="section-rotina-automatica" className="container-gerar-rotina calculo-de-custos-screen">
                  <h1>Gerador Manual de Rotina de Gastos</h1>
                  <p>Crie você mesmo uma rotina de gastos completa com base no seu orçamento e perfil de viagem.</p>
                  <button onClick={() => setRotina('rotina-manual')}>
                    Gerar rotina manualmente
                  </button>
                </section>
              )}
      </div>
    )}

    <main className="calculo-de-custos-screen">
      
      <div id="container" className="container calculo-de-custos-screen">
        {rotinaAtual === 'rotina-manual' ? (
          <>
            {largura < 1024 && (
              <div id="btn-rotinas" className="calculo-de-custos-screen">
                <button onClick={() => setRotina('rotina-manual')} id="btn-rotina-manual" className="calculo-de-custos-screen">Rotina Manual</button>
                <button onClick={() => setRotina('rotina-automatica')} id="btn-rotina-automatica" className="calculo-de-custos-screen">Rotina Automática</button>
              </div>
            )}

            <h2 onClick={mudarTema} style={{ cursor: "pointer" }} className="calculo-de-custos-screen">
              Calculadora de Custos da Viagem
            </h2>

            <div className="dias-container calculo-de-custos-screen">
              {dias.map((dia, index) => {
                const subtotal =
                  Number(dia.transporte || 0) +
                  Number(dia.hospedagem || 0) +
                  Number(dia.alimentacao || 0);

                return (
                  <div key={index} className="dia calculo-de-custos-screen">
                    <div className="dia-header calculo-de-custos-screen">
                      Dia {index + 1}
                      {dias.length > 1 && (
                        <span
                          className="btn-remover-dia calculo-de-custos-screen"
                          onClick={() => removerDia(index)}
                        >
                          <i className="fa-solid fa-xmark calculo-de-custos-screen"></i>
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Transporte (R$)"
                      value={dia.transporte}
                      onChange={e =>
                        atualizarValor(index, "transporte", e.target.value)
                      }
                      className="calculo-de-custos-screen"
                    />

                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Hospedagem (R$)"
                      value={dia.hospedagem}
                      onChange={e =>
                        atualizarValor(index, "hospedagem", e.target.value)
                      }
                      className="calculo-de-custos-screen"
                    />

                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Alimentação (R$)"
                      value={dia.alimentacao}
                      onChange={e =>
                        atualizarValor(index, "alimentacao", e.target.value)
                      }
                      className="calculo-de-custos-screen"
                    />

                    <div className="subtotal calculo-de-custos-screen">
                      Total do dia: R$ {subtotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              id="btn-adicionar-dias"
              className={`${dias.length >= LIMITE_MAX_DIAS ? "desativado" : ""} calculo-de-custos-screen`}
              onClick={adicionarDia}
              disabled={dias.length >= LIMITE_MAX_DIAS}
            >
              + Adicionar dia
            </button>

            <div id="total" className="calculo-de-custos-screen">
              Custo total da viagem:
              <br className="calculo-de-custos-screen" />
              <span className="total calculo-de-custos-screen">
                R$ {totalGeral.toFixed(2)}
              </span>
            </div>

            {largura < 1024 && (
              <div className="graficos calculo-de-custos-screen">
                <div className="grafico-dia calculo-de-custos-screen">
                  <h3 className="calculo-de-custos-screen">Gastos por dia</h3>
                  <canvas ref={canvas1} className="calculo-de-custos-screen"></canvas>
                </div>

                {dias.length > LIMITE_GRAFICO && (
                  <div className="grafico-dia calculo-de-custos-screen">
                    <h3 className="calculo-de-custos-screen">Gastos por dia (continuação)</h3>
                    <canvas ref={canvas2} className="calculo-de-custos-screen"></canvas>
                  </div>
                )}

                <div id="grafico-final" className="calculo-de-custos-screen">
                  <h3 className="calculo-de-custos-screen">Gastos por categoria</h3>
                  <canvas ref={canvasCategorias} className="calculo-de-custos-screen"></canvas>
                </div>
              </div>
            )}
          </>
        ) : (
          <RotinaAutomatica setRotina={setRotina} />
        )}
      </div>
    
      {largura >= 1024 && (
          <div style={{backgroundImage: `url(${anuncio1})`}} className="imagem-desktop calculo-de-custos-screen">
          </div>
      )}
    </main>

    {largura < 1024 && (
      <footer className="calculo-de-custos-screen">
        <div style={{backgroundImage: `url(${anuncio1})`}} className="imagem calculo-de-custos-screen">
        </div>
      </footer>
    )}

  </div>
);


}

/* 

*/