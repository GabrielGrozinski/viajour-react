import '../styles/login.css'
import { useNavigate } from 'react-router-dom';
import { userAuth } from '../context/autenticacao';
import { useState, type FormEvent } from 'react';
import { ClipLoader } from 'react-spinners';
import { supabase } from '../auth/supabase-client';


export default function TelaCadastro() {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const navigate = useNavigate();
    const { cadastroNovoUser, logarGoogle, buscarUser } = userAuth();

    const handleCadastro = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await cadastroNovoUser(email, senha);

            if (result?.success) {
                const user = await buscarUser();
                if (user) {
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
                        });

                    // User Subscription
                    const today = new Date();
                    const a_month_later = new Date(today);
                    a_month_later.setMonth(a_month_later.getMonth() + 1);
 
                    const { error: subscriptionError } = await supabase
                        .from('subscription')
                        .upsert({
                            user_id: user.id,
                            plan_id: 1,
                            status: 'Expired',
                            current_period_start: today.toISOString(),
                            current_period_end: a_month_later.toISOString(),
                            provider: '',
                        });

                    if (profileError) {
                        console.error('Houve um erro ao criar o banco de dados do usuário', profileError);
                    }

                    if (subscriptionError) {
                        console.error('Houve um erro ao criar o banco de dados de assinatura do usuário', subscriptionError);
                    }

                    // Redirecionamento
                    navigate('/principal');
                }
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="form-container cadastro-screen">
            <p className="title cadastro-screen">ViaJour</p>
            <form className="form cadastro-screen">
                <input
                onChange={(e) => setEmail((e.currentTarget.value).toLocaleLowerCase())} 
                type="email" 
                className="input cadastro-screen" 
                placeholder="Email" />
                <input
                onChange={(e) => setSenha((e.currentTarget.value).toLocaleLowerCase())} 
                type="password"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCadastro(e);
                }}
                className="input cadastro-screen" 
                placeholder="Senha" />
                {!loading ? (
                    <input
                    onClick={(e) => handleCadastro(e)}
                    value="Cadastrar"
                    type='button'
                    className="form-btn cadastro-screen"/>
                ) : (
                    <ClipLoader className='self-center' color='#000' loading size={35} />
                )
                }

            </form>
            <p className="sign-up-label cadastro-screen">
                Já tem uma conta?
                <span
                onClick={() => navigate('/login')}
                className="sign-up-link cadastro-screen">
                    Faça login
                </span>
            </p>
            <div className="buttons-container cadastro-screen">
                <button
                onClick={() => logarGoogle()} 
                className="gsi-material-button">
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" className="block;">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        </div>
                        <span className="gsi-material-button-contents">Sign up with Google</span>
                        <span className="hidden">Sign up with Google</span>
                    </div>
                </button>
                {/* Google */}

                <button
                onClick={() => false} 
                className="gsi-material-button apple-button">
                    <div className="gsi-material-button-state"></div>

                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="block"
                        >
                            <path d="M16.365 1.43c0 1.14-.45 2.2-1.22 3.01-.82.86-2.14 1.53-3.36 1.43-.15-1.1.38-2.25 1.13-3.04.82-.86 2.24-1.5 3.45-1.4zm3.63 16.1c-.29.67-.63 1.29-1.03 1.86-.55.8-1 1.35-1.35 1.66-.55.5-1.14.76-1.77.78-.45 0-1-.12-1.64-.36-.65-.24-1.25-.36-1.8-.36-.58 0-1.2.12-1.88.36-.68.24-1.22.37-1.64.39-.6.03-1.2-.25-1.8-.82-.38-.33-.85-.9-1.44-1.72-.63-.86-1.15-1.86-1.56-3-.44-1.23-.66-2.42-.66-3.57 0-1.32.28-2.45.84-3.4.44-.75 1.02-1.34 1.75-1.78.73-.44 1.52-.67 2.36-.68.46 0 1.06.14 1.8.42.74.28 1.21.42 1.41.42.15 0 .66-.16 1.52-.48.82-.3 1.5-.42 2.06-.36 1.52.12 2.66.72 3.42 1.8-1.36.82-2.03 1.98-2.01 3.47.01 1.16.43 2.12 1.26 2.88.38.36.8.64 1.27.84-.1.29-.21.57-.33.85z" />
                        </svg>
                        </div>

                        <span className="gsi-material-button-contents">
                        Sign up with Apple
                        </span>
                        <span className="hidden">Sign up with Apple</span>
                    </div>
                </button>
                {/* Apple */}
            </div>
        </div>
    )
}