import { HashRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from './pages/pagina-inicial';
import Cadastro from './pages/cadastro';
import PaginaPrincipal from "./pages/pagina-principal/pagina-principal";
import CalculoDeCustos from "./pages/produtos/calculo-de-custos";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/calc" element={<PaginaInicial />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<PaginaPrincipal />} />
        <Route path="/" element={<CalculoDeCustos />} />
      </Routes>
    </HashRouter>
  );
}
