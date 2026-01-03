import { type ReactNode, useEffect} from "react";
import { userAuth } from "../context/autenticacao";
import { Navigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { supabase } from "./supabase-client";


interface Props {
    children: ReactNode
}

export default function RotaPrivada({ children }: Props) {
    const { session, loading, buscarUser } = userAuth();
    
    useEffect(() => {
        if (!loading && session) {
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
                                    console.log('teste')
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
            <ClipLoader className='self-center' color='#000' loading size={35} />
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
