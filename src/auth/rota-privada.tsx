import { type ReactNode, useEffect, useRef} from "react";
import { userAuth } from "../context/autenticacao";
import { Navigate } from "react-router-dom";
import { supabase } from "./supabase-client";
import TelaLoading from "../components/tela-loading";


interface Props {
    children: ReactNode
}

export default function RotaPrivada({ children }: Props) {
    const { session, loading, buscarUser } = userAuth();
    const hasRun = useRef(false);
    
    useEffect(() => {
        if (!loading && session && !hasRun.current) {
            hasRun.current = true;
            supabase.auth.getUser()
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Erro ao buscar usuário', error);
                        return;
                    }
                    const user = data.user;
                    if (user) {
                        buscarUser(user)
                            .then(result => {
                                if (result.skipped) {
                                    return;
                                } else if (result.success) {
                                    console.log('Usuário criado com sucesso!');
                                } else {
                                    console.error('Houve um erro', result.error);
                                }
                            });
                    }
                });
        }
    }, [loading, session]);

    return (
        <>
        {loading ?
        <>
            <TelaLoading />
        </>
        :
        session ?
            <> 
                {children}
            </>
         : 
        <Navigate to="/login" />
        }
        </>
    );
}
