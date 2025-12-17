import { useEffect, useState } from "react"


interface Opcoes {
  opcaoPrimaria: string,
  opcaoSecundaria: string[],
  respostasSecundarias?: string[],
  respostasTerciarias?: {
    [opcaoSecundaria: string]: string[]
  },
  respostaPadraoTerciaria?: string,
  opcaoTerciaria?: string[],
  ultimaResposta?: string,
  ultimaOpcao?: string[],
}


interface respostas {
    id: number,
    resposta: string,
    isUser: boolean,
}

interface Loading {
    loadingAtivo: boolean,
    isLoadingUser: boolean
}

type EtapaChat =
  | 'inicio'
  | 'opcao-secundaria'
  | 'confirmar-assinaturas'
  | 'confirmar-site'


export default function ChatCard() {
    const opcoesPerguntas: Opcoes[] = [
        {
            opcaoPrimaria: 'Assinaturas do site',
            opcaoSecundaria: ['Gratuito', 'Aventureiro', 'Viajante'],
            respostasSecundarias: [
                'Ao todo, existem três planos de assinatura no ViaJour:', 'Gratuito, Aventureiro, Viajante', 
                'Sobre qual você gostaria de saber?'
            ],
            respostasTerciarias: {
            Gratuito: [
                'O plano gratuito é gratuito.',
                'Ele oferece acesso limitado.'
            ],
            Aventureiro: [
                'O plano aventureiro é o segundo mais caro.',
                'Possui benefícios intermediários.'
            ],
            Viajante: [
                'O plano viajante é o mais caro.',
                'Libera todas as funcionalidades.'
            ]
            },
            respostaPadraoTerciaria: 'Deseja tirar outra dúvida sobre as assinaturas?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Produtos do site',
            opcaoSecundaria: ['']
        },
        {
            opcaoPrimaria: 'Dicas de viagem',
            opcaoSecundaria: ['']
        },
        {
            opcaoPrimaria: 'Documentação e vistos',
            opcaoSecundaria: ['']
        },
        {
            opcaoPrimaria: 'Moedas e câmbio',
            opcaoSecundaria: ['']
        },
        {
            opcaoPrimaria: 'Regras de bagagem',
            opcaoSecundaria: ['']
        },
        {
            opcaoPrimaria: 'Política de cancelamento',
            opcaoSecundaria: ['']
        },
        {
            opcaoPrimaria: 'Suporte e atendimento',
            opcaoSecundaria: ['']
        },  
    ];
    const [opcaoAtiva, setOpcaoAtiva] = useState<Opcoes | null>(null);
    const [loading, setLoading] = useState<Loading>({loadingAtivo: false, isLoadingUser: false});
    const [etapaChat, setEtapaChat] = useState<EtapaChat>('inicio')
    const [opcoesRespostas, setOpcoesRespostas] = useState<respostas[]>(
        [
            {
                id: 1,
                resposta: 'Olá! Sou o assistente virtual do ViaJour e estou aqui para te ajudar!',
                isUser: false,
            },
            {
                id: 2,
                resposta: 'Qual a sua dúvida?',
                isUser: false,
            },
        ]
    );
    const idiomas = [
        'Português',
        'English',
        'Español',
        'Français',
        '日本語',
        'Italiano'
    ]

    function adicionarRespostas(resposta: string, isUser: boolean) {
        setLoading((prev) => ({...prev, loadingAtivo: true, isLoadingUser: isUser}));

        setTimeout(() => {
            setOpcoesRespostas((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    resposta,
                    isUser
                }
            ]);

            setLoading((prev) => ({...prev, loadingAtivo: false, isLoadingUser: false}));
        }, 3000)
    }

    useEffect(() => {
        console.log('opcoes', opcoesRespostas)
    }, [opcoesRespostas]);

    function getRespostasTerciarias(
    opcao: Opcoes,
    opcaoSecundaria: string
    ) {
    const respostas = opcao.respostasTerciarias?.[opcaoSecundaria]

    return {
        respostasEspecificas: respostas ?? [],
        respostaPadrao: opcao.respostaPadraoTerciaria
    }
    }


    return (
        <main 
        className="min-h-2/3 h-auto w-3/4 rounded-xl shadow-[0px_0px_3px_#0000002a] bg-blue-300/80 overflow-y-auto flex flex-col gap-4">

            <section 
            style={{padding: '10px'}}
            className="min-h-10 bg-white border-b border-zinc-400">
                <h1
                style={{fontFamily: 'Majesty', marginTop: -6, marginBottom: 4}}
                className="font-medium text-xl text-center"
                >ViaJour</h1>
                <div 
                style={{rowGap: 6}}
                className="flex flex-wrap justify-between">
                    {idiomas.map((idioma: string, index: number) => (
                        <article
                        key={index} 
                        className="bg-white text-sm cursor-pointer shadow-[0px_0px_3px_#0000005a] rounded-lg h-6 min-w-[130px] flex items-center justify-center">
                            <h2>{idioma}</h2>
                        </article>
                    ))}
                </div>
            </section>

            <div className="flex-1 flex flex-col justify-between">
                <section
                style={{padding: '0px 4px'}}
                className="flex flex-col gap-4">
                    {opcoesRespostas.map((resposta: respostas) => (
                            <article
                            key={resposta.id}
                            style={resposta.isUser ? {marginLeft: '10%', padding: 6} : {marginRight: '10%', padding: 6}}
                            className={`bg-${resposta.isUser ? 'sky-400' : 'white'} shadow-[0px_0px_3px_#0000002a] min-h-[20px] h-auto col-[1/3] rounded-xl flex items-center justify-center`}>
                                <span className={`text-${resposta.isUser ? 'white' : 'slate-900'} text-sm text-center text-shadow-[1px_1px_1px_#0000001a]`}>
                                    {resposta.resposta}
                                </span>
                            </article>
                    ))}
                    {loading.loadingAtivo && (
                        <article
                        style={loading.isLoadingUser ? {marginLeft: '10%', padding: 6} : {marginRight: '10%', padding: 6}}
                        className={`bg-${loading.isLoadingUser ? 'sky-400' : 'white'} shadow-[0px_0px_3px_#0000002a] min-h-[20px] h-auto col-[1/3] rounded-xl flex items-center justify-center`}>
                            <span className={`text-${loading.isLoadingUser ? 'white' : 'slate-900'} animate-bounce text-sm text-shadow-[1px_1px_1px_#0000001a]`}>
                                ...
                            </span>
                        </article>
                    )}
                </section>

                <section style={{padding: 12}} className="flex items-start gap-2 flex-wrap">
                    {!opcaoAtiva ? (
                        opcoesPerguntas.map((opcao: Opcoes, index: number) => (
                            <article
                            onClick={() => {
                                setOpcaoAtiva(opcao);
                                adicionarRespostas(opcao.opcaoPrimaria, true);
                                setTimeout(() => {
                                    opcao.respostasSecundarias?.forEach((resposta: string) => adicionarRespostas(resposta, false));
                                }, 4000);
                                setEtapaChat('opcao-secundaria');
                            }}
                            key={index}
                            style={{padding: '6px 8px'}}
                            className="bg-white/90 cursor-pointer transition-colors duration-300 text-sm shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3 border border-sky-900 cursor-pointe active:bg-blue-400 active:text-white active:text-shadow-[1px_1px_1px_#2222221a]"
                            >
                                {opcao.opcaoPrimaria}
                            </article>
                        ))
                    ) : (
                        opcaoAtiva.opcaoSecundaria.map((opcao: string, index: number) => (
                            <article
                            onClick={() => {
                                // 1. mostra o clique do usuário
                                adicionarRespostas(opcao, true)

                                // 2. busca respostas corretas
                                const { respostasEspecificas, respostaPadrao } =
                                    getRespostasTerciarias(opcaoAtiva, opcao)

                                // 3. mostra respostas específicas
                                respostasEspecificas.forEach((resposta, index) => {
                                    setTimeout(() => {
                                    adicionarRespostas(resposta, false)
                                    }, 3000 * (index + 1))
                                })

                                // 4. mostra resposta padrão depois
                                if (respostaPadrao) {
                                    setTimeout(() => {
                                    adicionarRespostas(respostaPadrao, false)
                                    }, 3000 * (respostasEspecificas.length + 1))
                                }
                            }}
                            key={index}
                            style={{padding: '6px 8px'}}
                            className="bg-white/90 text-sm shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3 border border-sky-900 cursor-pointer active:bg-blue-400 active:text-white active:text-shadow-[1px_1px_1px_#2222221a]">
                                {opcao}
                            </article>  
                        ))
                    )}
                </section>
            </div>
        </main>
    )
}