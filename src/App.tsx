import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from './pages/pagina-inicial';
import Cadastro from './pages/cadastro';
import PaginaPrincipal from "./pages/pagina-principal/pagina-principal";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/principal" element={<PaginaPrincipal />} />
      </Routes>
    </BrowserRouter>
  );
}
