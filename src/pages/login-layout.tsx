import { useEffect } from 'react';
import '../styles/login.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { userAuth } from '../context/autenticacao';
import TelaLoading from '../components/tela-loading';
import { Check, X  } from "lucide-react";


export default function LoginLayout() {
  const navigate = useNavigate();
  const { avisoErro, condicaoInputs, avisoSucesso, session, loading } = userAuth();

  const arrayDeImagens = [
    'https://cdn.pixabay.com/photo/2017/08/17/20/05/disney-2652684_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/08/16/02/00/california-adventure-3609467_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/03/25/08/26/radiator-springs-racers-2173028_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/02/17/08/23/giraffe-2073609_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/10/19/12/14/train-3758523_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/08/01/20/13/girl-1561989_1280.jpg',
    'https://cdn.pixabay.com/photo/2020/01/16/22/18/cayo-levantado-4771933_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/04/10/18/43/beach-4117816_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/11/25/19/43/forest-4652886_1280.jpg'
  ];

  function mostrarImagemAleatoria() {
        const imagem = document.getElementById('imagem');
        if (!imagem) return;
        const numeroAleatorio = Math.floor(Math.random() * arrayDeImagens.length);
        imagem.style.backgroundImage = `url(${arrayDeImagens[numeroAleatorio]})`;
  }

  useEffect(() => {
    mostrarImagemAleatoria();
    const interval = setInterval(() => {
        mostrarImagemAleatoria();
    }, 4000);
    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    if (session) {
      navigate('/principal');
    }
  }, [session]);

  if (loading) {
    return (
      <TelaLoading />
    )
  } else {
    return (
        <main className='cadastro-screen' id="imagem">
            <AnimatePresence mode="wait">
                {(avisoSucesso || avisoErro) && condicaoInputs && (
                    <motion.div
                    key="aviso-inputs"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.3}}
                    style={{padding: '4px 10px'}}
                    className='
                        fixed top-[2%] right-[3%] min-h-15 h-auto min-w-30 max-w-1/4 z-1 text-center flex justify-center items-center bg-gray-100 rounded-md shadow-[0px_0px_4px_#0000004a] text-slate-100 text-shadow-[1px_1px_1px_#0000001a]
                    '
                    >
                    {avisoSucesso ? (
                        <span style={{padding: '3px 3.2px 2px 2.8px'}} className="bg-green-500 rounded-full">
                            <Check size={20} />
                        </span>
                    ) : (
                        <span style={{padding: '2.4px 2.3px 2px 2px'}} className="bg-red-500 rounded-full">
                            <X size={20} />
                        </span>
                    )}
                    <h2 style={{margin: '2px 50px 2px 8px'}} className='text-slate-800 text-shadow-[1px_1px_1px_#0000001a]'>
                        {avisoSucesso ? avisoSucesso : avisoErro}
                    </h2>

                        <X size={16} className="absolute cursor-pointer text-gray-600 top-[3.5%] right-[1%] hover:text-red-400" />

                    </motion.div>
                )}
            </AnimatePresence>
            <Outlet/>
        </main>
    );
  }
}