import { useState, useContext } from "react";
import { TemaContext } from "../context/TemaContext";
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    setMostrarCard: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function CardViagem({ setMostrarCard }: Props) {
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

    const { dark } = useContext(TemaContext);
    const [viagemFavoritada, setViagemFavoritada] = useState<boolean>(false);


    return (
        <AnimatePresence mode="wait">
            <motion.main
            key="card-viagem"
            initial={{opacity: 0, y: -40}}
            animate={{opacity: 100, y: 0}}
            exit={{opacity: 0, y: 0}}
            transition={{duration: 0.3}}
            style={{
                minWidth: 'calc(88% - 48px)',
                maxWidth: 'calc(88% - 48px)',
                maxHeight: '60vh',
                left: 'calc(6% + 24px)',
                top: 'calc(50vh - 30vh)',
                paddingBottom: 10,
            }}
            className={`fixed rounded-md z-2 overflow-y-auto scroll-smooth shadow-[0px_0px_3px_#0000004a] min-h-[350px] h-auto grid grid-rows-[200px_1fr] ${dark ? 'bg-slate-900' : 'bg-white'}
            
            `}>
                <i
                onClick={() => setViagemFavoritada(!viagemFavoritada)}
                className={`fa-${viagemFavoritada ? 'solid' : 'regular'} fa-star absolute z-1 text-amber-400 text-shadow-[1px_1px_1px_#0000003a] top-[2%] left-[2%] cursor-pointer`}
                >
                </i>

                <i 
                onClick={() => setMostrarCard(false)}
                className="fa-solid fa-xmark absolute z-1 text-red-400 text-shadow-[1px_1px_1px_#0000003a] top-[2%] right-[2%] cursor-pointer"></i>
                <div
                className="min-h-full row-1"
                >
                    <img
                    src="https://cdn.pixabay.com/photo/2014/10/24/18/27/magic-kingdom-501634_1280.jpg"
                    alt="imagem-card"
                    loading="lazy"
                    style={{objectPosition: 'center'}}
                    className="w-full h-[200px] object-cover block"
                    />
                </div>
                <section style={{paddingTop: 6}} className="row-2">
                    <h1 
                    style={{fontFamily: 'Majesty', padding: '0px 2px'}} 
                    className={`text-center tracking-wider text-lg ${dark ? 'text-white' : ''}`}>
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
                                    className={`text-shadow-[1px_1px-1px_#0000002a] text-sm relative before:content-['•'] before:mr-1 ${dark ? 'before:text-slate-100 text-blue-100' : 'before:text-slate-700 text-sky-800'} `}>
                                        {atividade}
                                    </li>
                                ))}

                            </ol>
                        </div>
                    ))}
                </section>

                <button style={{padding: 4, marginTop: -10}} className="bg-blue-500 scale-90 text-lg text-white/95 text-shadow-[1px_1px_1px_#0000002a] rounded-md cursor-pointer transition-transform duration-300 active:scale-85">
                    Procurar reservas para essa viagem
                </button>
            </motion.main>
        </AnimatePresence>
    );
}
