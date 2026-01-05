import { useState, useEffect, useContext } from "react";
import { TemaContext } from "../context/TemaContext";
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from "../auth/supabase-client";
import { userAuth } from "../context/autenticacao";
import { ClipLoader } from "react-spinners";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';


interface Props {
    setMostrarCard: React.Dispatch<React.SetStateAction<boolean>>;
    trip_id: string;
}

interface Dia {
    id: string,
    desc: string,
    atividades: string[]
}

interface Viagem {
    nome: string,
    descricao: string,
    imagem: string,
    dias: Dia[]
}

export default function CardViagem({ setMostrarCard, trip_id }: Props) {
    const { user } = userAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const viagem: Viagem = {
        nome: "Disneylândia",
        descricao:
            "Uma experiência mágica de 7 dias na Disneylândia durante o Natal, com parques temáticos, compras, gastronomia especial e eventos exclusivos da época.",
        imagem:
            "https://cdn.pixabay.com/photo/2014/10/24/18/27/magic-kingdom-501634_1280.jpg",
        dias: [
            {
            id: "Dia 1 - 21 de Dezembro",
            desc: 'Boas-vindas a Orlando',
            atividades: [
                "Chegada em Orlando e check-in no hotel.",
                "Descanso leve para adaptação ao fuso horário.",
                "Passeio pelo Disney Springs para ambientação.",
                "Compras iniciais de souvenirs e roupas temáticas de Natal.",
                "Jantar no The Polite Pig ou Earl of Sandwich."
            ],
            },
            {
            id: "Dia 2 - 22 de Dezembro",
            desc: 'Magic Kingdom o dia todo',
            atividades: [
                "Dia inteiro no Magic Kingdom.",
                "Assistir à parada especial de Natal (Mickey’s Very Merry Christmas Parade).",
                "Explorar atrações clássicas com decoração natalina.",
                "Almoço no Casey’s Corner ou Columbia Harbour House.",
                "Encerrar o dia com o show de fogos natalino."
            ],
            },
            {
            id: "Dia 3 - 23 de Dezembro",
            desc: 'Passeio pelo EPCOT',
            atividades: [
                "Visita ao EPCOT.",
                "Passear pelos pavilhões dos países com festivais de Natal.",
                "Experimentar comidas típicas do Festival of the Holidays.",
                "Assistir ao Candlelight Processional.",
                "Jantar no Via Napoli ou Le Cellier."
            ],
            },
            {
            id: "Dia 4 - 24 de Dezembro",
            desc: 'Compras e um pouco de diversão',
            atividades: [
                "Manhã livre para descanso ou piscina do hotel.",
                "Compras de última hora no Disney Springs ou lojas dos parques.",
                "Visita ao Hollywood Studios.",
                "Assistir aos shows temáticos e decoração especial.",
                "Jantar especial de véspera de Natal (reserva recomendada)."
            ],
            },
            {
            id: "Dia 5 - 25 de Dezembro🎄",
            desc: 'Feliz Natal!',
            atividades: [
                "Café da manhã tranquilo no hotel ou character breakfast.",
                "Troca de presentes ou momento pessoal de celebração.",
                "Visita ao Magic Kingdom, tradicionalmente muito animado no Natal.",
                "Fotos com árvores de Natal e personagens temáticos.",
                "Almoço especial em restaurante temático (Be Our Guest ou Crystal Palace).",
                "Assistir aos fogos e shows especiais do dia 25."
            ],
            },
            {
            id: "Dia 6 - 26 de Dezembro",
            desc: 'Animal Kingdom o dia todo',
            atividades: [
                "Visita ao Animal Kingdom.",
                "Explorar o Pandora – The World of Avatar.",
                "Passeio pelo parque com clima mais tranquilo e natural.",
                "Almoço no Satu’li Canteen ou Flame Tree Barbecue.",
                "Retorno antecipado ao hotel para descanso."
            ],
            },
            {
            id: "Dia 7 - 27 de Dezembro",
            desc: 'Compras finais e volta pra casa',
            atividades: [
                "Manhã livre para compras finais.",
                "Revisitar o parque favorito ou Disney Springs.",
                "Comprar lembranças de Natal e presentes.",
                "Almoço leve e organização das malas.",
                "Check-out e retorno para casa."
            ],
            },
        ],
    };
    const [largura, setLargura] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setLargura(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const { dark } = useContext(TemaContext);
    const [viagemFavoritada, setViagemFavoritada] = useState<boolean>(false);

const generatePdf = async () => {
  try {
    const root = document.getElementById("pdf-root");
    if (!root) return;

    // 1️⃣ Renderiza tudo em um único canvas
    const canvas = await html2canvas(root, {
      scale: 3.5,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // 2️⃣ Define a largura fixa do PDF
    const PDF_WIDTH = 210; // mm (ex: largura A4)
    const pdfHeight = (canvas.height * PDF_WIDTH) / canvas.width;

    // 3️⃣ Cria PDF com ALTURA DINÂMICA
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [PDF_WIDTH, pdfHeight],
    });

    // 4️⃣ Adiciona a imagem UMA ÚNICA VEZ
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      PDF_WIDTH,
      pdfHeight
    );

    pdf.save("roteiro-viagem.pdf");
  } catch (error) {
    console.error("Houve um erro ao gerar o PDF", error);
  }
};



    useEffect(() => {
        const fetchFavorite = async () => {
            const { data, error } = await supabase
                .from('favoritetrips')
                .select('*')
                .eq('user_id', user?.id)
                .eq('trip_id', trip_id)

            if (error) {
                console.error('Houve um erro ao procurar se a viagem já foi favoritada', error);
            }

            if (data && data.length > 0) {
                console.log('data', data);
                setViagemFavoritada(true);
            }

            setLoading(false);
        }

        fetchFavorite();
    }, []);

    const handleFavorite = async () => {
        setLoading(true);
        const { error } = await supabase
            .from('favoritetrips')
            .insert({
                trip_id,
                user_id: user?.id
            });

        if (error) {
            console.error('Houve um erro ao favoritar a viagem', error);
        } else {
            setViagemFavoritada(true);
        }
        setLoading(false);
    }

    return (
        <>
            <div
            id="pdf-root"
            style={{
                position: "fixed",
                top: "-9999px",
                left: "-9999px",
                width: "1120px",
                backgroundColor: '#f0f9ff'
            }}
            >
                <h1 
                    style={{fontFamily: 'Majesty', marginBottom: 6, padding: '0px 2px'}} 
                    className={`text-center tracking-wider text-4xl`}
                >
                    {viagem.nome}
                </h1>
                <p 
                    style={{marginBottom: 20, padding: '0px 8px', color: dark ? 'rgba(209,213,219,0.8)' : '#4b5563'}} 
                    className='text-center text-xl'
                >
                    {viagem.descricao}
                </p>
                {viagem.dias.map((dia, index) => (
                    <div
                    style={{
                        margin: "30px 10px",
                        backgroundColor: "rgba(0,0,0,0.08)", // sombra fake
                        borderRadius: 14,
                        padding: 2,
                    }}
                    >
                    <div
                        style={{
                        padding: "10px 10px 2px 10px",
                        backgroundColor: "#f9fafb",
                        borderRadius: 12,
                        }}
                        className="rounded-xl"
                        key={index}
                    >
                        <h2
                        style={{ color: "#1e293b" }}
                        className="text-center text-2xl font-normal"
                        >
                        {dia.id}
                        </h2>

                        <h3
                        style={{ marginTop: "-4px" }}
                        className="text-center font-light text-xl"
                        >
                        {dia.desc}
                        </h3>

                        <ol style={{ marginBottom: 20, marginTop: 10 }}>
                        {dia.atividades.map((atividade, index) => (
                            <li
                            key={index}
                            style={{
                                margin: "3px 4px",
                                color: "#0c4a6e",
                                textShadow: "1px 1px 2px #0000002a",
                            }}
                            className="relative before:content-['•'] before:mr-1 text-xl"
                            >
                            {atividade}
                            </li>
                        ))}
                        </ol>
                    </div>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.main
                    key="card-viagem"
                    id="card-viagem"
                    initial={{opacity: 0, y: -40}}
                    animate={{opacity: 100, y: 0}}
                    exit={{opacity: 0, y: 0}}
                    transition={{duration: 0.3}}
                    style={{
                        minWidth: largura >= 1024 ? 'calc((100% - 4vw - 200px)*0.9 - 48px)' : largura > 768 ? 'calc(68% - 48px)' : 'calc(88% - 48px)',
                        maxWidth: largura >= 1024 ? 'calc((100% - 4vw - 200px)*0.9 - 48px)' : largura > 768 ? 'calc(68% - 48px)' : 'calc(88% - 48px)',
                        maxHeight: '60vh',
                        left: largura >= 1024 ? 'calc(0% + 4vw + 24px + (100% - 4vw - 200px)*0.05)' : largura > 768 ? 'calc(16% + 24px)' : 'calc(6% + 24px)',
                        top: 'calc(50vh - 30vh)',
                        backgroundColor: dark ? '#0f1724' : '#ffffff' // bg-slate-900 / bg-white
                    }}
                    className={`fixed rounded-md z-2 overflow-y-auto scroll-smooth shadow-[0px_0px_3px_#0000009a] min-h-[350px] h-auto grid grid-rows-[200px_1fr] sm:grid-rows-[300px_1fr] lg:grid-rows-1 lg:grid-cols-2 lg:overflow-y-hidden `}>
                        {loading ? (
                            <ClipLoader className="absolute top-[2%] lg:-translate-x-1/2 lg:text-2xl left-[2%]" color="#000" loading size={25} />
                        ) : (
                            <i
                            id="icone-estrela"
                            onClick={() => handleFavorite()}
                            style={{ color: '#fbbf24' }} // text-amber-400
                            className={`${viagemFavoritada ? 'fa-solid' : 'fa-regular'} fa-star absolute z-1 text-shadow-[1px_1px_1px_#0000003a] top-[2%] left-[2%] cursor-pointer lg:-translate-x-1/2 lg:text-2xl`}
                            >
                            </i>
                        )}
                        <i
                        id="icone-x" 
                        onClick={() => setMostrarCard(false)}
                        style={{ right: largura >= 1024 ? 'calc(2% + 15px)' : '', color: '#f87171' }} // text-red-400
                        className="fa-solid fa-xmark absolute z-1 text-shadow-[1px_1px_1px_#0000003a] top-[2%] right-[2%] cursor-pointer lg:translate-x-1/2 lg:text-2xl"></i>

                        <div
                        id="pdf-image-wrapper"
                        className="min-h-full max-h-full row-1 lg:col-1"
                        >
                            <img
                            src="https://cdn.pixabay.com/photo/2014/10/24/18/27/magic-kingdom-501634_1280.jpg"
                            alt="imagem-card"
                            loading="lazy"
                            style={{objectPosition: 'center'}}
                            className="w-full h-[200px] sm:h-[300px] lg:h-full lg:max-h-full object-cover block"
                            />
                        </div>
                        <section style={{paddingTop: 6, paddingBottom: largura >= 1024 ? '' : 12, padding: largura >= 1024 ? 40 : '', marginLeft: largura >= 1024 ? 15 : ''}} className="row-2 lg:row-1 lg:col-2 lg:overflow-y-auto">
                            <h1 
                            style={{fontFamily: 'Majesty', padding: '0px 2px', color: dark ? '#ffffff' : undefined}} 
                            className={`text-center tracking-wider text-lg  lg:text-3xl`}>
                                {viagem.nome}
                            </h1>
                            <p 
                            style={{marginBottom: 20, padding: '0px 8px', color: dark ? 'rgba(209,213,219,0.8)' : '#4b5563'}} 
                            className={`text-center text-sm `}>
                                {viagem.descricao}
                            </p>
                            {viagem.dias.map((dia, index) => (
                                <div
                                style={{padding: '10px 10px 2px 10px', margin: '30px 10px', backgroundColor: dark ? '#1f2937' : '#f9fafb'}} // bg-slate-800 / bg-neutral-50
                                className={`rounded-xl shadow-[0px_0px_5px_#0000004a] `}
                                key={index}>
                                    <h2 
                                    style={{color: dark ? '#f1f5f9' : '#1e293b'}} // text-slate-100 / text-slate-800
                                    className={`text-center text-lg font-normal `}
                                    >
                                        {dia.id}
                                    </h2>

                                    <h3 style={{marginTop: '-4px', color: dark ? 'rgba(241,245,249,0.9)' : undefined}} className={`text-center font-light `}>
                                        {dia.desc}
                                    </h3>

                                    <ol
                                    style={{marginBottom: 20, marginTop: 10}}
                                    >
                                        {dia.atividades.map((atividade, index) => (
                                            <li 
                                            key={index}
                                            style={{margin: '3px 4px', color: dark ? '#dbeafe' : '#0c4a6e'}} // before/text colors adjusted to inline
                                            className={`text-shadow-[1px_1px-1px_#0000002a] text-sm relative before:content-['•'] before:mr-1 `}>
                                                {atividade}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ))}
                            <button style={{padding: 4, marginTop: -10, marginBottom: 5, backgroundColor: '#3b82f6', color: 'rgba(255,255,255,0.95)'}} className=" scale-90 text-lg  text-shadow-[1px_1px_1px_#0000002a] rounded-md cursor-pointer transition-transform duration-300 active:scale-88 max-h-14 row-2 w-full">
                                Procurar reservas para essa viagem
                            </button>
                            <button
                            onClick={() => generatePdf()}
                            style={{padding: 4, marginBottom: largura > 1024 ? 0 : 10, backgroundColor: '#10b981', color: 'rgba(255,255,255,0.95)'}} 
                            className=" scale-90 text-lg  text-shadow-[1px_1px_1px_#0000002a] rounded-md cursor-pointer transition-transform duration-300 active:scale-88 max-h-14 row-2 w-full">
                                Baixar o roteiro dessa viagem em pdf
                            </button>
                        </section>

                </motion.main>
            </AnimatePresence>
        </>
    );
}


/*
            <motion.main
            key="card-viagem"
            id="card-viagem"
            initial={{opacity: 0, y: -40}}
            animate={{opacity: 100, y: 0}}
            exit={{opacity: 0, y: 0}}
            transition={{duration: 0.3}}
            style={{
                minWidth: largura >= 1024 ? 'calc((100% - 4vw - 200px)*0.9 - 48px)' : largura > 768 ? 'calc(68% - 48px)' : 'calc(88% - 48px)',
                maxWidth: largura >= 1024 ? 'calc((100% - 4vw - 200px)*0.9 - 48px)' : largura > 768 ? 'calc(68% - 48px)' : 'calc(88% - 48px)',
                maxHeight: '60vh',
                left: largura >= 1024 ? 'calc(0% + 4vw + 24px + (100% - 4vw - 200px)*0.05)' : largura > 768 ? 'calc(16% + 24px)' : 'calc(6% + 24px)',
                top: 'calc(50vh - 30vh)',
            }}
            className={`fixed rounded-md z-2 overflow-y-auto scroll-smooth shadow-[0px_0px_3px_#0000009a] min-h-[350px] h-auto grid grid-rows-[200px_1fr] sm:grid-rows-[300px_1fr] lg:grid-rows-1 lg:grid-cols-2 lg:overflow-y-hidden ${dark ? 'bg-slate-900' : 'bg-white'}
            `}>
                {loading ? (
                    <ClipLoader className="absolute top-[2%] lg:-translate-x-1/2 lg:text-2xl left-[2%]" color="#000" loading size={25} />
                ) : (
                    <i
                    onClick={() => handleFavorite()}
                    className={`${viagemFavoritada ? 'fa-solid' : 'fa-regular'} fa-star absolute z-1 text-amber-400 text-shadow-[1px_1px_1px_#0000003a] top-[2%] left-[2%] cursor-pointer lg:-translate-x-1/2 lg:text-2xl`}
                    >
                    </i>
                )}
                <i 
                onClick={() => setMostrarCard(false)}
                style={{right: largura >= 1024 ? 'calc(2% + 15px)' : ''}}
                className="fa-solid fa-xmark absolute z-1 text-red-400 text-shadow-[1px_1px_1px_#0000003a] top-[2%] right-[2%] cursor-pointer lg:translate-x-1/2 lg:text-2xl"></i>

                <div
                className="min-h-full max-h-full row-1 lg:col-1"
                >
                    <img
                    src="https://cdn.pixabay.com/photo/2014/10/24/18/27/magic-kingdom-501634_1280.jpg"
                    alt="imagem-card"
                    loading="lazy"
                    style={{objectPosition: 'center'}}
                    className="w-full h-[200px] sm:h-[300px] lg:h-full lg:max-h-full object-cover block"
                    />
                </div>
                <section style={{paddingTop: 6, paddingBottom: largura >= 1024 ? '' : 12, padding: largura >= 1024 ? 40 : '', marginLeft: largura >= 1024 ? 15 : ''}} className="row-2 lg:row-1 lg:col-2 lg:overflow-y-auto">
                    <h1 
                    style={{fontFamily: 'Majesty', padding: '0px 2px'}} 
                    className={`text-center tracking-wider text-lg ${dark ? 'text-white' : ''} lg:text-3xl`}>
                        {viagem.nome}
                    </h1>
                    <p 
                    style={{marginBottom: 20, padding: '0px 8px'}} 
                    className={`text-center text-sm ${dark ? 'text-neutral-300/80' : 'text-gray-600'}`}>
                        {viagem.descricao}
                    </p>
                    {viagem.dias.map((dia, index) => (
                        <div
                        style={{padding: '10px 10px 2px 10px', margin: '30px 10px'}}
                        className={`rounded-xl shadow-[0px_0px_5px_#0000004a] ${dark ? 'bg-slate-800' : 'bg-neutral-50'}`}
                        key={index}>
                            <h2 
                            className={`text-center text-lg font-normal ${dark ? 'text-slate-100' : 'text-slate-800'}`}
                            >
                                {dia.id}
                            </h2>

                            <h3 style={{marginTop: '-4px'}} className={`text-center font-light ${dark ? 'text-slate-100/90' : ''}`}>
                                {dia.desc}
                            </h3>

                            <ol
                            style={{marginBottom: 20, marginTop: 10}}
                            >
                                {dia.atividades.map((atividade, index) => (
                                    <li 
                                    key={index}
                                    style={{margin: '3px 4px'}}
                                    className={`text-shadow-[1px_1px-1px_#0000002a] text-sm relative before:content-['•'] before:mr-1 ${dark ? 'before:text-slate-100 text-blue-100' : 'before:text-slate-700 text-sky-900'} `}>
                                        {atividade}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                    <button style={{padding: 4, marginTop: -10, marginBottom: 5}} className="bg-blue-500 scale-90 text-lg text-white/95 text-shadow-[1px_1px_1px_#0000002a] rounded-md cursor-pointer transition-transform duration-300 active:scale-88 max-h-14 row-2 w-full">
                        Procurar reservas para essa viagem
                    </button>
                    <button
                    onClick={() => generatePdf()}
                    style={{padding: 4, marginBottom: largura > 1024 ? 0 : 10}} 
                    className="bg-green-500 scale-90 text-lg text-white/95 text-shadow-[1px_1px_1px_#0000002a] rounded-md cursor-pointer transition-transform duration-300 active:scale-88 max-h-14 row-2 w-full">
                        Baixar o roteiro dessa viagem em pdf
                    </button>
                </section>

            </motion.main>

*/