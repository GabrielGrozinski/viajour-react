import {useState} from 'react';
import anuncioHorizontal from '../assets/imagens/anuncio.png';
export default function AnuncioMobile() {
    const [adOpen, setAdOpen] = useState<boolean>(false);

    return (
        <div 
        style={{backgroundImage: !adOpen ? `url(${anuncioHorizontal})` : ''}}
        className={`
        fixed bg-cover bg-no-repeat bg-center bottom-0 left-1/2 -translate-x-1/2 z-1 min-w-[300px] max-w-[900px] overflow-hidden transition-all duration-300 ease-in-out rounded-t-xl
        ${!adOpen ? "h-20 shadow-[0_-12px_40px_rgba(0,0,0,0.25)]" : 
        "h-[22px] bg-white shadow-[0_-8px_25px_rgba(0,0,0,0.18)]"
        }
        `}>

          <i 
          onClick={() => setAdOpen(!adOpen)}
          className={`fa-solid ${!adOpen ? 'fa-caret-down text-white translate-y-[-50%]' : 'fa-caret-up text-slate-900'}  absolute cursor-pointer top-[5%] right-1/2 translate-x-[50%] text-shadow-[1px_1px_1px_#0000002a] text-2xl`}></i>

          <p className={`${adOpen && 'hidden'} absolute bottom-[10%] left-[5%] text-white text-[8px] text-shadow-[1px_1px_1px_#2222226a]`}>Precos por pessoa, sujeito à disponibilidade. Taxas inclusas</p>

          <div style={{padding: '3px 7px'}} className={`${adOpen && 'hidden'} absolute top-[5%] text-[8px] right-[7.5%] translate-x-[50%] rounded-md bg-amber-300 text-slate-800`}>
            40% off
          </div>

        </div>
    )
};
