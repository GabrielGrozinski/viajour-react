import { useEffect, type ReactNode } from "react";
import { createContext, useState, useContext } from "react";
import { supabase } from "../auth/supabase-client";
import type { Session } from '@supabase/supabase-js';


interface Props {
    children: ReactNode
}

interface AutenticacaoContextType {
    avisoErro: string,
    setAvisoErro: (value: string) => void,
    condicaoInputs: boolean,
    setCondicaoInputs: (value: boolean) => void,
    session: Session | null,
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    cadastroNovoUser: (email: string, senha: string) => 
        Promise<{
            success: boolean;
            data: any;
            error?: any;
        } | undefined>,
    logarUser: (email: string, senha: string) => 
        Promise<{
            success: boolean;
            data: any;
            error?: any;
        } | undefined>,
    deslogarUsuario: () => void,
    loading: boolean
}

export const AutenticacaoContext = createContext<AutenticacaoContextType>({} as AutenticacaoContextType);

export default function AutenticacaoProvider({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [condicaoInputs, setCondicaoInputs] = useState<boolean>(false);
    const [avisoErro, setAvisoErro] = useState<string>('');
    const [session, setSession] = useState<Session | null>(null);

    // Cadastro
    const cadastroNovoUser = async (email: string, senha: string) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: senha
            });

            if (error) {
                console.error("Houve um erro ao cadastrar o usuário: ", error);
                return { success: false, data, error };
            }
            return { success: true, data};
        } catch (error) {
            console.error("Houve um erro: ", error);
        }
    }

    // Logar
    const logarUser = async (email: string, senha: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha
            });

            if (error) {
                console.error("Houve um erro ao fazer login: ", error);
                return { success: false, data, error};
            }
            console.log("Logim bem-sucedido: ", data);
            return { success: true, data};
        } catch (error) {
            console.error("Houve um erro: ", error);
        }
    }

    // Deslogar
    const deslogarUsuario = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Houve um erro ao deslogar o usuário: ", error);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setLoading(false);
            setSession(session);
        });

        const { data: {subscription } } =
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });

        return () => subscription.unsubscribe();
    }, []);


    return (
        <AutenticacaoContext.Provider value={{
            loading,
            session, 
            setSession, 
            cadastroNovoUser, 
            deslogarUsuario,
            logarUser,
            condicaoInputs,
            setCondicaoInputs,
            avisoErro,
            setAvisoErro
            }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

export const userAuth = () => {
    return useContext(AutenticacaoContext);
}
