import { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import "../styles/modal.css";
import { X } from "lucide-react";
import { supabase } from "../auth/supabase-client";
import { userAuth } from "../context/autenticacao";
import { ClipLoader } from "react-spinners";


interface values_calculator {
  name: string;
  days: number;
  days_cost: number[];
  total_cost: number;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onOpen: (daysCost: values_calculator) => void;
}

export function ModalCalculator({ open, onClose, onOpen }: Props) {
  if (!open) return null;
  const { user, setCondicaoInputs, setAvisoErro } = userAuth();
  const [nomeCalculator, setNomeCalculator] = useState<string>('');
  const [calculators, setCalculators] = useState<values_calculator[] | null>(null);
  const [calculatorEscolhido, setCalculatorEscolhido] = useState<values_calculator>({
    name: '',
    days: 0,
    days_cost: [0],
    total_cost: 0
  });

  useEffect(() => {
    async function fetchCalculator() {
      const { data, error } = await supabase
        .from('calculator')
        .select('name, days, days_cost, total_cost')
        .eq('user_id', user?.id);

      if (error) {
        console.error('Houve um erro al buscar os Calculators salvos: ', error);
        setCondicaoInputs(true);
        setAvisoErro('Houve um erro al buscar os Calculators salvos.');
      }
      if (data) setCalculators(data);
    }

    fetchCalculator();
  }, []);

  function formatarString(texto: string) {
    return texto
    .toLocaleLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "");
  }

  const calculatorsFiltrados = useMemo(() => {
    if (!calculators) return;

    const newCalculators = calculators.filter((calculator: values_calculator) => formatarString(calculator.name).includes(nomeCalculator));

    return newCalculators;

  }, [nomeCalculator, calculators]);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <main
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <nav style={{padding: 24}} className="bg-gray-100">
          <button className="modal-close" onClick={onClose}>
              <X/>
          </button>
          <h2 className="text-xl">Calculator</h2>
          <p className="font-light">Seus cálculos recentes</p>
          <input
            type="text"
            id="script-id"
            onChange={(e) => setNomeCalculator(formatarString(e.currentTarget.value))}
            style={{padding: 8, marginTop: 14}}
            className='border border-slate-900 rounded-lg min-w-3/4'
            placeholder="Viagem da Disney"
          />
        </nav>
        <hr className="border-neutral-200" />
        <div style={{padding: '24px 12px'}} className="overflow-y-auto max-h-60 flex flex-col gap-4">
          {(calculators === undefined || calculators === null) ? (
            <div style={{marginTop: 14}} className="flex justify-center">
              <ClipLoader color="000" size={30}/>
            </div>
          ) : calculatorsFiltrados?.length === 0 ? (
            <h2 style={{marginTop: 6, marginBottom: -6}} className="text-gray-700">
              Não foi encontrado nenhum Calculator.
            </h2>
          ) : (
            calculatorsFiltrados?.map((calculator: values_calculator, index) => (
              <section
              onClick={() => setCalculatorEscolhido(calculator)} 
              key={index} 
              style={{padding: 6, backgroundColor: calculatorEscolhido === calculator ? 'rgba(255, 223, 0, 0.12)' : '', border: calculatorEscolhido === calculator ? '2px solid #FFD234' : ''}} 
              className={`flex max-h-80 min-w-3/4 min-h-20 bg-neutral-50 shadow-[1px_1px_1px_#0000002a] rounded-lg items-center justify-between transition-colors duration-200 ${calculator === calculatorEscolhido ? '' : 'hover:bg-gray-200 cursor-pointer'}`}>
                
                <div className="flex flex-col items-start">
                  <h1 style={{ padding: '4px 8px'}} className="text-sm">
                    {calculator.name}
                  </h1>
                  <h2 style={{padding: '4px 6px', marginLeft: 2}} className="bg-neutral-200 shadow-[1px_1px_1px_#0000002a] rounded-md text-center text-slate-900 text-sm">
                    {calculator.days} dias
                  </h2>
                </div>

                  <h2 className="text-green-900 text-sm">
                    R${Math.floor(calculator.total_cost/calculator.days)}/dia
                  </h2>
              </section>
            ))
          )
          }
        </div>

        <div className="modal-actions">
          <button className="cursor-pointer" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="cursor-pointer" 
            onClick={() => onOpen(calculatorEscolhido) 
            }>
            Salvar
          </button>
        </div>
      </main>
    </div>,
    document.getElementById("modal-root") as HTMLElement

  );
}
