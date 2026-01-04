import { useEffect } from 'react';
import '../styles/login.css';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { userAuth } from '../context/autenticacao';


export default function LoginLayout() {
    const { avisoErro, condicaoInputs } = userAuth();

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
    
    
return (
    <main className='cadastro-screen' id="imagem">
        <AnimatePresence mode="wait">
            {condicaoInputs && avisoErro && (
                <motion.div
                key="aviso-inputs"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3}}
                style={{padding: '0px 8px'}}
                className="
                    fixed top-[2%] pointer-events-none left-1/2 translate-x-[-50%] min-h-10 min-w-auto z-1 text-center flex justify-center items-center bg-red-500 rounded-md shadow-[0px_0px_2px_#0000002a] text-slate-100 text-shadow-[1px_1px_1px_#0000001a]
                "
                >
                {avisoErro}
                </motion.div>
            )}
        </AnimatePresence>
        <Outlet/>
    </main>
);
}