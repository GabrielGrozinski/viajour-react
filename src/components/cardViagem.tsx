import { useState, useEffect } from "react";

interface Props {
    setMostrarCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardViagem({ setMostrarCard }: Props) {
    const [altura, setAltura] = useState(window.innerHeight);
    const [largura, setLargura] = useState(window.innerWidth);
    const [viagemFavoritada, setViagemFavoritada] = useState<boolean>(false);
    useEffect(() => {
        function handleResize() {
            setAltura(window.innerHeight);
            setLargura(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <main
        style={{
            minWidth: 'calc(98% - 48px)',
            maxWidth: 'calc(98% - 48px)',
            left: 'calc(1% + 24px)',
        }}
        className="fixed top-1/2 z-1 -translate-y-1/2 shadow-[0px_0px_3px_#0000004a] bg-white min-h-[300px] h-auto grid grid-rows-[200px_1fr]">
            <i
            onClick={() => setViagemFavoritada(true)}
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
                style={{objectFit: 'cover', objectPosition: 'center'}}
                className="min-w-full max-h-[200px]"
                />
            </div>
            <div style={{padding: '4px 10px 30px 10px'}} className="row-2">
                <h1 className="text-center">Disneylândia</h1>
                <p style={{marginBottom: 20}} className="text-center text-sm">
                    Magia total: espetáculos temáticos, desfiles e momentos com personagens para todas as idades.
                </p>
                <h2 className="text-center">1° dia</h2>
                <ol>
                    <li className="list-disc list-inside">
                        Ir pra disney
                    </li>
                </ol>
                <i 
                style={{bottom: 'calc(0% + 10px)', right: 'calc(0% + 5px)'}}
                className="fa-solid fa-hand-point-down animate-pulse absolute scale-x-[-1] text-blue-500 text-shadow-[1px_1px_1px_#0000002a]"></i>
            </div>
        </main>
    );
}
/* 
https://cdn.pixabay.com/photo/2014/10/24/18/27/magic-kingdom-501634_1280.jpg
*/