import {useState} from 'react';
import anuncioVertical from '../assets/imagens/anuncio-3.png';
import anuncioHorizontal from '../assets/imagens/anuncio.png';
export default function AnuncioDesktop() {
    const [adOpen, setAdOpen] = useState<boolean>(false);

    return (
      <>
        <div style={{backgroundImage: `url(${anuncioVertical})`}} 
        className="
        fixed right-[1%] top-[50%] translate-y-[-50%]
        bg-cover bg-center bg-no-repeat cursor-pointer
        col-3 row-span-full
        min-w-[200px] min-h-[550px] max-w-[200px] max-h-[550px]
        "
        >
          <span 
          className=
          "bg-blue-400 absolute cursor-pointer shadow-[0px_0px_1px_#2222225a] top-[-3%] text-shadow-[1px_1px_1px_#2222222a] text-white text-center max-w-[200px] min-w-[200px]"
          >
              Remover Anúncio
          </span>

          <p className='absolute text-[0.7em] bottom-[1%] min-w-full text-center text-neutral-100'>Sujeito à disponibilidade. Consulte condições</p>

          <div style={{padding: '2px 5px'}} className='absolute top-[3%] right-[4%] rounded-md bg-amber-300 text-sm text-slate-800'>
            40% off
          </div>

          <div style={{padding: '4px 4px'}} className='absolute top-[79%] right-[50%] translate-x-[50%] rounded-md min-w-[50%] text-center text-lg bg-blue-400 text-slate-50 text-shadow-[1px_1px_1px_#0000004a]'>
            Ver ofertas
          </div>

          <h1 className='absolute top-[60%] right-1/2 translate-x-[50%] text-center min-w-full text-white font-bold text-shadow-[1px_1px_1px_#0000005a]'>
            Descubra lugares incríveis!
          </h1>

          <h2 className='absolute top-[66%] right-1/2 translate-x-[50%] text-center min-w-full text-white text-sm text-shadow-[0px_0px_1px_#0000006a]'>
            Roteiros e ferramentas exclusivas!
          </h2>
        </div>
        {/* Anuncio-Desktop-Lateral */}

        <div 
        style={{backgroundImage: !adOpen ? `url(${anuncioHorizontal})` : ''}}
        className={`
        fixed bg-cover bg-no-repeat bg-center bottom-0 left-1/2 -translate-x-1/2 z-1 min-w-[900px] max-w-[900px] overflow-hidden transition-all duration-300 ease-in-out rounded-t-xl
        ${!adOpen ? "h-[230px] shadow-[0_-12px_40px_rgba(0,0,0,0.25)]" : 
        "h-[30px] bg-white shadow-[0_-8px_25px_rgba(0,0,0,0.18)]"
        }
        `}>

          <i 
          onClick={() => setAdOpen(!adOpen)}
          className={`fa-solid ${!adOpen ? 'fa-caret-down text-white translate-y-[-50%]' : 'fa-caret-up text-slate-900'}  absolute cursor-pointer top-[5%] right-1/2 translate-x-[50%] text-shadow-[1px_1px_1px_#0000002a] text-4xl`}></i>

          <p className={`${adOpen && 'hidden'} absolute bottom-[5%] left-[5%] text-white text-shadow-[1px_1px_1px_#2222226a]`}>Precos por pessoa, sujeito à disponibilidade. Taxas inclusas</p>

          <div style={{padding: '3px 7px'}} className={`${adOpen && 'hidden'} absolute top-[5%] right-[5%] translate-x-[50%] rounded-md bg-amber-300 text-slate-800`}>
            40% off
          </div>

        </div>
        {/* Anuncio-Desktop-Rodapé */}
      </>
    )
};
