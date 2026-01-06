import { useEffect } from 'react';
import '../styles/login.css';
import { Outlet, useNavigate } from 'react-router-dom';
import MensagemModal from '../components/mensagem-modal';
import { userAuth } from '../context/autenticacao';
import TelaLoading from '../components/tela-loading';


export default function LoginLayout() {
  const navigate = useNavigate();
  const { session, loading } = userAuth();

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
            <MensagemModal/>
            <Outlet/>
        </main>
    );
  }
}