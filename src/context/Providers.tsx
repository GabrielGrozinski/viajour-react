import type { ReactNode } from "react";
import AutenticacaoProvider from "./autenticacao";
import TemaProvider from "./TemaContext";
// import OutrosContextos aqui

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <AutenticacaoProvider>
      <TemaProvider>
        {children}
      </TemaProvider>
    </AutenticacaoProvider>
  );
}
