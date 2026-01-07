import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/* =======================
   TIPOS
======================= */

type TripDay = {
  dia: string;
  data: string;
  tipo: string;
  custo: number;
  notas: string[];
};

type TripData = {
  nomeViagem: string;
  dataInicial: string;
  dataFinal: string;
  duracaoDias: number;
  dias: TripDay[];
};

interface GenPdfProps {
  open: boolean;
  trip: TripData;
  onFinish?: () => void;
}

/* =======================
   COMPONENTE
======================= */

export default function GenPdf({ open, trip, onFinish }: GenPdfProps) {
  useEffect(() => {
    if (!open) return;

    const generatePdf = async () => {
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-99999px";
      container.style.top = "0";
      container.style.width = "1120px";
      container.style.background = "#fff";
      container.style.padding = "32px";

      document.body.appendChild(container);

      const root = createRoot(container);
      root.render(<PDFContent trip={trip} />);

      // espera render + fontes
      await new Promise((r) => setTimeout(r, 120));

      try {
        const canvas = await html2canvas(container, {
          scale: 3,
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const PDF_WIDTH = 210;
        const pdfHeight = (canvas.height * PDF_WIDTH) / canvas.width;

        const pdf = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: [PDF_WIDTH, pdfHeight],
        });

        pdf.addImage(imgData, "PNG", 0, 0, PDF_WIDTH, pdfHeight);
        pdf.save("roteiro-viagem.pdf");
      } catch (err) {
        console.error("Erro ao gerar PDF:", err);
      } finally {
        root.unmount();
        document.body.removeChild(container);
        onFinish?.();
      }
    };

    generatePdf();
  }, [open, trip, onFinish]);

  // 🚨 NÃO RENDERIZA NADA
  return null;
}

/* =======================
   PDF CONTENT
======================= */

function PDFContent({ trip }: { trip: TripData }) {
  const total = trip.dias.reduce((acc, d) => acc + d.custo, 0);

  return (
    <>
      <h1
        className="text-center font-bold tracking-wide text-3xl"
        style={{ marginBottom: "16px" }}
      >
        ROTEIRO DE VIAGEM
      </h1>

      <div
        className="border-t border-b text-sm"
        style={{ paddingTop: "16px", paddingBottom: "16px" }}
      >
        <p><strong>NOME DA VIAGEM:</strong> {trip.nomeViagem}</p>
        <p><strong>PERÍODO:</strong> {trip.dataInicial} – {trip.dataFinal}</p>
        <p><strong>DURAÇÃO:</strong> {trip.duracaoDias} dias</p>
      </div>

      <h2
        className="text-center text-xl font-semibold"
        style={{ marginTop: "32px", marginBottom: "12px" }}
      >
        RESUMO GERAL
      </h2>

      <table className="w-full text-lg border border-[#aaa]">
        <tbody>
          {trip.dias.map((d, i) => (
            <tr key={i} className="border-b border-[#ddd]">
              <td style={{ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "12px" }}>
                {d.dia}
              </td>
              <td
                className="text-right"
                style={{ paddingTop: "8px", paddingBottom: "8px", paddingRight: "12px" }}
              >
                R$ {d.custo.toFixed(2).replace(".", ",")}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td
              className="font-bold"
              style={{ paddingTop: "8px", paddingBottom: "8px", paddingLeft: "12px" }}
            >
              TOTAL GERAL
            </td>
            <td
              className="font-bold text-right"
              style={{ paddingTop: "8px", paddingBottom: "8px", paddingRight: "12px" }}
            >
              R$ {total.toFixed(2).replace(".", ",")}
            </td>
          </tr>
        </tfoot>
      </table>

      <h2
        className="text-center text-xl font-semibold"
        style={{ marginTop: "40px", marginBottom: "12px" }}
      >
        DETALHES DOS DIAS
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm"
        style={{ marginBottom: "40px" }}
      >
        {trip.dias.map((d, i) => (
          <DayCard
            key={i}
            dia={`${d.dia} – ${d.data} (${d.tipo})`}
            custo={`R$ ${d.custo.toFixed(2).replace(".", ",")}`}
            notas={d.notas}
          />
        ))}
      </div>

      <p
        className="text-center text-sm tracking-wide"
        style={{ marginTop: "40px" }}
      >
        FIM DO DOCUMENTO
      </p>
    </>
  );
}

/* =======================
   DAY CARD
======================= */

function DayCard({
  dia,
  custo,
  notas,
}: {
  dia: string;
  custo: string;
  notas: string[];
}) {
  return (
    <div className="border-t border-[#ddd]" style={{ paddingTop: "8px" }}>
      <p className="font-semibold text-lg">{dia}</p>
      <p className="font-medium text-lg">💸 Custo estimado: {custo}</p>

      <p className="font-semibold text-lg" style={{ marginTop: "4px" }}>
        Notas do dia:
      </p>

      {notas.length === 0 ? (
        <p className="text-[#666] text-lg">— (nenhuma anotação)</p>
      ) : (
        <ul className="ml-4 list-disc">
          {notas.map((n, i) => (
            <li key={i} className="before:content-['•'] before:mr-1 list-none text-lg">{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

