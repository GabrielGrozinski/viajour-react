import { HashRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from './pages/pagina-inicial';
import Cadastro from './pages/cadastro';
import PaginaPrincipal from "./pages/pagina-principal/pagina-principal";
import CalculoDeCustos from "./pages/produtos/calculo-de-custos";
import ViagensNatal from "./pages/produtos/viagens-de-natal";
import ViagensRomanticas from "./pages/produtos/viagens-romanticas";
import ViagensSeteDias from "./pages/produtos/viagens-de-sete-dias";
import MonteSuaAventura from "./pages/produtos/sua-aventura";
import ViagensBaratas from "./pages/produtos/viagens-baratas";

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<PaginaPrincipal />} />
        <Route path="/calculo-de-custos" element={<CalculoDeCustos />} />
        <Route path="/viagens-de-natal" element={<ViagensNatal />} />
        <Route path="/viagens-romanticas" element={<ViagensRomanticas />} />
        <Route path="/viagens-de-sete-dias" element={<ViagensSeteDias />} />
        <Route path="/monte-sua-aventura" element={<MonteSuaAventura />} />
        <Route path="/viagens-baratas" element={<ViagensBaratas />} />
      </Routes>
    </HashRouter>
  );
}
