import {useState} from 'react';
import anuncio from '../assets/imagens/anuncio1.png';
export default function AnuncioDesktop() {
    const [adOpen, setAdOpen] = useState<boolean>(false);

    return (
      <>
        <div style={{backgroundImage: `url(${anuncio})`}} className="
        fixed right-[1%] top-[50%] translate-y-[-40%]
        bg-cover bg-no-repeat cursor-pointer
        col-3 row-span-full
        min-w-[200px] min-h-[550px] max-w-[200px] max-h-[550px]"
        >
            <span className='bg-blue-400 absolute cursor-pointer shadow-[0px_0px_1px_#2222225a] top-[-3%] text-shadow-[1px_1px_1px_#2222222a] text-white text-center max-w-[200px] min-w-[200px]'>
                Remover Anúncio
            </span>
        </div>
        {/* Anuncio-Desktop-Lateral */}

        <div className={`
        fixed bottom-0 left-1/2 -translate-x-1/2 z-1
        w-full max-w-[900px] bg-white overflow-hidden
        ${!adOpen ? "h-[230px] shadow-[0_-12px_40px_rgba(0,0,0,0.25)]" : 
        "h-[50px] shadow-[0_-8px_25px_rgba(0,0,0,0.18)]"
        }
        transition-all duration-300 ease-in-out rounded-t-xl
        `}>
          <div className="w-full h-[60px] cursor-pointer flex justify-center items-start
         bg-white relative" onClick={() => setAdOpen(!adOpen)}>
            <span className="text-[28px] text-[#444] transition duration-300 ease-in-out">{!adOpen ? "▼" : "▲"}</span>
          </div>

          <div className="w-full h-[200px] p-3 flex justify-center items-center">
            <img
              className="max-w-[90%] max-h-[90px] rounded-xl"
              src="https://static.stands4.com/images/symbol/2848_bing-search-logo.png"
              alt="Ad"
            />
          </div>
        </div>
        {/* Anuncio-Desktop-Rodapé */}
      </>
    )
};
