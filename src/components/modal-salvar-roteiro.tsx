import { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/modal.css";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    onOpen: (nomeRoteiro: string) => void;
}

export function RoteiroModal({ open, onClose, onOpen }: Props) {
  if (!open) return null;
  const [nomeRoteiro, setNomeRoteiro] = useState<string>('');
  const [outlineOriginal, setOutlineOriginal] = useState<string>('');
  const [borderOriginal, setBorderOriginal] = useState<string>('');

  const handleError = () => {
    const elemento = document.getElementById('script-id');
    if (elemento) {
        setOutlineOriginal(elemento.style.outline);
        setBorderOriginal(elemento.style.border);
        elemento.style.outline = '1px solid #ef4444';
        elemento.style.border = '1px solid #ef4444';
        elemento.focus();
    }
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
            <X/>
        </button>

        <h2 className="text-xl">Salvar como roteiro</h2>
        <p className="font-light">Escolha um nome para seu roteiro:</p>

        <input
          type="text"
          id="script-id"
          onClick={() => {
            const elemento = document.getElementById('script-id');
            if (elemento) {
                elemento.style.border = borderOriginal;
                elemento.style.outline = outlineOriginal;
            }
          }}
          onChange={(e) => setNomeRoteiro(e.currentTarget.value)}
          style={{padding: 8, marginTop: 14}}
          className='border border-slate-900 rounded-lg min-w-3/4'
          placeholder="Viagem da Disney"
        />

        <div className="modal-actions">
          <button className="cursor-pointer" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="cursor-pointer" 
            onClick={() => 
                nomeRoteiro ? onOpen(nomeRoteiro) 
                : 
                handleError()
            }>
            Salvar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement

  );
}
