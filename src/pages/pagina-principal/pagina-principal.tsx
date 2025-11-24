import { useState } from "react";
import MenuAberto from "./menu-aberto";
import MenuFechado from "./menu-fechado";

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <>
      {menuAberto 
        ? <MenuAberto fechar={() => setMenuAberto(false)} />
        : <MenuFechado abrir={() => setMenuAberto(true)} />
      }
    </>
  )
}
