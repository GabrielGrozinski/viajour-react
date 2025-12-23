import type { ReactNode } from "react";
import { createContext, useState, useContext } from "react";

interface Props {
    children: ReactNode
}

interface AutenticacaoContextType {
    email: string,
    setEmail: (value: string) => void,
    senha: string,
    setSenha: (value: string) => void,
    session: undefined,
    setSession: (value: any) => void
}

export const AutenticacaoContext = createContext<AutenticacaoContextType>({
    email: '',
    setEmail: () => '',
    senha: '',
    setSenha: () => '',
    session: undefined,
    setSession: () => {}
});

export default function Autenticacao({ children }: Props) {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [session, setSession] = useState<any>(undefined);

    return (
        <AutenticacaoContext.Provider value={{email, setEmail, senha, setSenha, session, setSession}}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

export const AuthUser = () => {
    return useContext(AutenticacaoContext);
}
