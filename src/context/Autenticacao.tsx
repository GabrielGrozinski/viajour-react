import { useEffect, type ReactNode } from "react";
import { createContext, useState, useContext } from "react";
import { supabase } from "../auth/supabase-client";
import type { Session, User } from '@supabase/supabase-js';


interface Props {
    children: ReactNode
}

interface AutenticacaoContextType {
    avisoErro: string,
    avisoSucesso: string,
    loading: boolean,
    setAvisoErro: (value: string) => void,
    setAvisoSucesso: (value: string) => void,
    condicaoInputs: boolean,
    setCondicaoInputs: (value: boolean) => void,
    session: Session | null,
    setSession: React.Dispatch<React.SetStateAction<Session | null>>,
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
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
    logarGoogle: () => void,
    buscarUser: (value: User) => Promise<{
        success: boolean;
        error?: any;
        skipped?: boolean;
    }>,
    alterarAssinatura: (month: number, plan_id: number, provider: string) => Promise<{
        success: boolean;
        error?: any;
    }>;
    
}

export const AutenticacaoContext = createContext<AutenticacaoContextType>({} as AutenticacaoContextType);

export default function AutenticacaoProvider({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [condicaoInputs, setCondicaoInputs] = useState<boolean>(false);
    const [avisoErro, setAvisoErro] = useState<string>('');
    const [avisoSucesso, setAvisoSucesso] = useState<string>('');
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);

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
            
            return { success: true, data };
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

    // Logar Google
    const logarGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
            redirectTo: 'https://gabrielgrozinski.github.io/viajour-react/#/principal'
            }
        });

        if (error) {
            console.error(error);
        }
    }

    // Buscar User
    const buscarUser = async (user: User) => {
        if (!user) return {success: false};

        const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();
        if (error && error.code !== 'PGRST116') {
            console.error('Erro ao verificar usuário', error);
            return { success: false, error };
        }

        if (data) {
            // Usuário já existe, não precisa criar
            console.log('Usuário já existe, pulando criação.');
            return { success: true, skipped: true };
        }

        // User database
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                name: 
                    user.user_metadata?.full_name ??
                    user.user_metadata.name ??
                    user.email?.split('@')[0],
                avatar_url: 
                    user.user_metadata?.avatar_url ??
                    'https://cdn.pixabay.com/photo/2020/05/11/15/38/tom-5158824_1280.png',
                email: user.email,
                phone: user.phone?? '',
                number_of_companions: 0,
                number_of_travels: 0,
                type_of_traveler: '',
                travel_profile: '',
                travel_cost: '',
                travel_preferences: [''],
                saved_money: '0.000,00',
                saved_time: '0 days',
            },
            {
                onConflict: 'id',
                ignoreDuplicates: true,
            }
            );

        // User Subscription
        const period_start = new Date();
        const period_end = new Date(period_start);
        period_end.setMonth(period_end.getMonth() + 1);

        const { error: subscriptionError } = await supabase
            .from('subscription')
            .insert({
                user_id: user.id,
                plan_id: 1,
                status: 'expired',
                current_period_start: period_start.toISOString(),
                current_period_end: period_end.toISOString(),
                provider: '',
            }
            );

        if (profileError) {
            console.error('Houve um erro ao criar o banco de dados do usuário', profileError);
            return {success: false, profileError};
        }

        if (subscriptionError) {
            console.error('Houve um erro ao criar o banco de dados de assinatura do usuário', subscriptionError);
            return {success: false, subscriptionError};
        }
        return {success: true};
    }

    // Alterar Assinatura
    const alterarAssinatura = async (month: number, plan_id: number, provider: string) => {
        const period_start = new Date();
        const period_end = new Date(period_start);
        period_end.setMonth(period_end.getMonth() + month);

        const { error } = await supabase
            .from('subscription')
            .insert({
                user_id: user?.id,
                plan_id,
                status: plan_id !== 1 ? 'active' : 'expired',
                current_period_start: period_start,
                current_period_end: period_end,
                provider,
            });
        
        if (error) {
            console.error('Houve um erro', error);
            return { success: false, error };
        }

        return { success: true }

    }

    useEffect(() => {
        supabase.auth.getSession()
        .then(({ data: { session } }) => setSession(session))
        .catch(({ error }) => console.error('Houve um erro ao buscar a session', error))
        .finally(() => setLoading(false));

        supabase.auth.getUser()
        .then(({data: {user}}) => setUser(user))
        .catch(({ error }) => console.error('Houve um erro ao buscar o user', error))
        .finally(() => setLoading(false));

        const { data: { subscription } } =
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
                if (session) setUser(session.user);
            });

        return () => subscription.unsubscribe();
    }, []);


    return (
        <AutenticacaoContext.Provider value={{
            loading,
            condicaoInputs,
            setCondicaoInputs,
            avisoErro,
            setAvisoErro,
            avisoSucesso,
            setAvisoSucesso,
            session, 
            setSession,
            user,
            setUser, 
            cadastroNovoUser, 
            deslogarUsuario,
            logarUser,
            logarGoogle,
            buscarUser,
            alterarAssinatura
            }}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

export const userAuth = () => {
    return useContext(AutenticacaoContext);
}
