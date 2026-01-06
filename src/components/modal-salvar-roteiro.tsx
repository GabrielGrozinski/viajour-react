import { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/modal.css";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function RoteiroModal({ open, onClose }: Props) {
  if (!open) return null;
  const [nomeRoteiro, setNomeRoteiro] = useState<string>('');

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
          style={{padding: 8, marginTop: 14}}
          className="border border-slate-900 rounded-xl min-w-2/3"
          placeholder="Viagem da Disney"
        />

        <div className="modal-actions">
          <button className="cursor-pointer" onClick={onClose}>
            Cancelar
          </button>
          <button className="cursor-pointer" onClick={() => onClose}>
            Salvar
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement

  );
}
