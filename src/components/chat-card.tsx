import { useState, useRef } from "react";
import iconeChat from '../assets/imagens/icone-chat.png';


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
  | 'confirmar-topico'
  | 'confirmar-site'


export default function ChatCard() {
    const [abrirCard, setAbrirCard] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
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
                'O plano gratuito é gratuito. Ele oferece acesso limitado.'
            ],
            Aventureiro: [
                'O plano aventureiro é o segundo mais caro. Possui benefícios intermediários.'
            ],
            Viajante: [
                'O plano viajante é o mais caro. Libera todas as funcionalidades.'
            ]
            },
            respostaPadraoTerciaria: 'Deseja tirar outra dúvida sobre as assinaturas?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Produtos do site',
            opcaoSecundaria: [
                'Roteiro automático',
                'Calculadora de Custos',
                'Viagens de Natal'
            ],
            respostasSecundarias: [
                'O ViaJour oferece ferramentas inteligentes para planejar e organizar suas viagens.',
                'Escolha um dos produtos abaixo para saber mais:'
            ],
            respostasTerciarias: {
                'Roteiro automático': [
                    'O Roteiro automático gera um roteiro personalizado para suas viagens utilizando Inteligência Artificial, levando em conta destino, tempo disponível e preferências.'
                ],
                'Calculadora de Custos': [
                    'A Calculadora de Custos gera gráficos dinâmicos sobre seus gastos de viagem.',
                    'Você pode inserir gastos diários como hospedagem, alimentação, diversão e outros, acompanhando tudo em tempo real.'
                ],
                'Viagens de Natal': [
                    'Viagens de Natal é um acervo especial de roteiros temáticos.',
                    'Inclui, por exemplo, um roteiro completo para uma viagem de Natal para a Disney, com atrações, datas e dicas.'
                ]
            },
            respostaPadraoTerciaria: 'Deseja conhecer outro produto do site?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Dicas de viagem',
            opcaoSecundaria: [
                'Planejamento',
                'Bagagem',
                'Economia',
                'Segurança'
            ],
            respostasSecundarias: [
                'Viajar bem começa com boas escolhas antes e durante a viagem.',
                'Selecione uma categoria de dicas para saber mais:'
            ],
            respostasTerciarias: {
                'Planejamento': [
                    'Pesquise sobre o destino, clima e documentos necessários antes de viajar.',
                    'Monte um roteiro flexível para aproveitar melhor o tempo.'
                ],
                'Bagagem': [
                    'Leve apenas o essencial e prefira malas leves para facilitar a locomoção.',
                    'Sempre tenha uma troca de roupas e itens importantes na bagagem de mão.'
                ],
                'Economia': [
                    'Planeje seus gastos com antecedência e evite compras por impulso durante a viagem.',
                    'Use aplicativos para comparar preços de hospedagem e transporte.'
                ],
                'Segurança': [
                    'Mantenha seus documentos e objetos de valor sempre em locais seguros.',
                    'Evite expor itens caros e fique atento ao ambiente ao seu redor.'
                ]
            },
            respostaPadraoTerciaria: 'Deseja ver mais alguma dica de viagem?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Documentação e vistos',
            opcaoSecundaria: [
                'Documentos básicos',
                'Passaporte',
                'Vistos',
                'Vacinas e requisitos'
            ],
            respostasSecundarias: [
                'Antes de viajar, é essencial conferir toda a documentação exigida pelo destino.',
                'Escolha um tópico para saber mais:'
            ],
            respostasTerciarias: {
                'Documentos básicos': [
                    'Verifique se seu RG ou passaporte estão válidos para o período da viagem.',
                    'Alguns destinos aceitam apenas documentos emitidos há menos de 10 anos.'
                ],
                'Passaporte': [
                    'Muitos países exigem que o passaporte tenha validade mínima de 6 meses.',
                    'Confira também se há páginas em branco suficientes para carimbos.'
                ],
                'Vistos': [
                    'Alguns países exigem visto de entrada, enquanto outros permitem entrada como turista.',
                    'Consulte sempre as regras oficiais do país de destino antes de viajar.'
                ],
                'Vacinas e requisitos': [
                    'Alguns destinos exigem comprovante de vacinação, como a febre amarela.',
                    'Verifique também requisitos sanitários ou formulários obrigatórios.'
                ]
            },
            respostaPadraoTerciaria: 'Deseja tirar outra dúvida sobre documentação?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Moedas e câmbio',
            opcaoSecundaria: [
                'Moeda local',
                'Câmbio e casas de câmbio',
                'Cartões e pagamentos',
                'Dicas de economia'
            ],
            respostasSecundarias: [
                'Entender a moeda e as formas de pagamento do destino ajuda a evitar imprevistos.',
                'Escolha um tópico para saber mais:'
            ],
            respostasTerciarias: {
                'Moeda local': [
                    'Pesquise qual é a moeda oficial do destino antes de viajar.',
                    'Em alguns países, o uso de dinheiro em espécie ainda é bastante comum.'
                ],
                'Câmbio e casas de câmbio': [
                    'Compare taxas em diferentes casas de câmbio antes de trocar dinheiro.',
                    'Evite trocar grandes quantias em aeroportos, onde as taxas costumam ser mais altas.'
                ],
                'Cartões e pagamentos': [
                    'Cartões de crédito e débito internacionais são amplamente aceitos em muitos destinos.',
                    'Avise seu banco sobre a viagem para evitar bloqueios por segurança.'
                ],
                'Dicas de economia': [
                    'Leve uma combinação de dinheiro e cartões para maior segurança.',
                    'Acompanhe a cotação da moeda com antecedência para escolher o melhor momento para trocar.'
                ]
            },
            respostaPadraoTerciaria: 'Deseja saber mais alguma dica sobre moedas e câmbio?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Regras de bagagem',
            opcaoSecundaria: [
                'Bagagem de mão',
                'Bagagem despachada',
                'Itens proibidos',
                'Dicas importantes'
            ],
            respostasSecundarias: [
                'As regras de bagagem podem variar conforme a companhia aérea e o tipo de passagem.',
                'Escolha um tópico para saber mais:'
            ],
            respostasTerciarias: {
                'Bagagem de mão': [
                    'Normalmente, a bagagem de mão possui limite de peso e dimensões específicas.',
                    'Líquidos devem estar em frascos de até 100ml e acondicionados em saco plástico transparente.'
                ],
                'Bagagem despachada': [
                    'O limite de peso da bagagem despachada varia conforme a tarifa contratada.',
                    'Exceder o peso permitido pode gerar cobrança adicional.'
                ],
                'Itens proibidos': [
                    'Objetos cortantes, inflamáveis e substâncias perigosas não são permitidos na bagagem.',
                    'Consulte sempre a lista oficial da companhia aérea antes de viajar.'
                ],
                'Dicas importantes': [
                    'Identifique sua mala com nome e contato.',
                    'Evite despachar objetos de valor, como eletrônicos e documentos.'
                ]
            },
            respostaPadraoTerciaria: 'Deseja saber mais alguma regra de bagagem?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Política de cancelamento',
            opcaoSecundaria: [
                'Planos e assinaturas',
                'Reservas e serviços',
                'Prazos',
                'Reembolsos'
            ],
            respostasSecundarias: [
                'As políticas de cancelamento variam conforme o tipo de serviço contratado.',
                'Escolha uma opção para entender melhor:'
            ],
            respostasTerciarias: {
                'Planos e assinaturas': [
                    'Assinaturas podem ser canceladas a qualquer momento, respeitando as regras do plano ativo.',
                    'Benefícios permanecem disponíveis até o fim do período contratado.'
                ],
                'Reservas e serviços': [
                    'O cancelamento de reservas pode estar sujeito às regras do fornecedor.',
                    'Sempre verifique as condições específicas antes de confirmar uma compra.'
                ],
                'Prazos': [
                    'Alguns cancelamentos precisam ser solicitados com antecedência mínima.',
                    'Após o prazo, podem ser aplicadas taxas ou não haver reembolso.'
                ],
                'Reembolsos': [
                    'Reembolsos, quando aplicáveis, são processados conforme o método de pagamento utilizado.',
                    'O prazo para crédito pode variar de acordo com a instituição financeira.'
                ]
            },
            respostaPadraoTerciaria: 'Deseja saber mais sobre a política de cancelamento?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
        },
        {
            opcaoPrimaria: 'Suporte e atendimento',
            opcaoSecundaria: [
                'Canais de atendimento',
                'Horários de suporte',
                'Problemas técnicos',
                'Sugestões e feedback'
            ],
            respostasSecundarias: [
                'Estamos aqui para ajudar você da melhor forma possível.',
                'Escolha uma opção para saber como entrar em contato ou resolver seu problema:'
            ],
            respostasTerciarias: {
                'Canais de atendimento': [
                    'Você pode entrar em contato pelo chat do site, e-mail ou formulário de suporte.',
                    'Cada canal é indicado para diferentes tipos de solicitação.'
                ],
                'Horários de suporte': [
                    'O atendimento funciona em horário comercial, de segunda a sexta.',
                    'Respostas por e-mail podem levar até 24 horas úteis.'
                ],
                'Problemas técnicos': [
                    'Caso encontre erros ou falhas, tente atualizar a página ou limpar o cache.',
                    'Se o problema persistir, entre em contato com o suporte informando o máximo de detalhes possível.'
                ],
                'Sugestões e feedback': [
                    'Sua opinião é muito importante para nós.',
                    'Sugestões e feedbacks ajudam a melhorar continuamente a experiência no site.'
                ]
            },
            respostaPadraoTerciaria: 'Deseja tirar outra dúvida com nosso suporte?',
            opcaoTerciaria: ['Sim', 'Não'],
            ultimaResposta: 'Deseja tirar outra dúvida sobre o site?',
            ultimaOpcao: ['Sim', 'Não']
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
    <>
        {!abrirCard && (
            <div
            className="fixed bottom-[1%] right-[1%] h-30 w-30">
                <img
                onClick={() => setAbrirCard(true)}
                className="cursor-pointer transition-all duration-300 animate-pulse hover:animate-none"
                src={iconeChat} alt="icone-chat" />
            </div>
        )}
        <main
            ref={cardRef}
            hidden = {!abrirCard}
            style={{ 
                padding: '22px 16px 10px 16px',
                scrollbarColor: '#3b82f6 #bfdbfe',
            }}
            className={`fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 min-h-2/3 max-h-2/3 w-3/4 rounded-xl shadow-[0px_0px_3px_#0000002a] bg-blue-300 flex flex-col gap-4 xl:min-h-[500px] xl:max-h-[500px] xl:w-80 xl:bottom-[1%] xl:right-[1%] xl:translate-y-0 xl:translate-x-0`}
        >
            <i 
            onClick={() => setAbrirCard(false)}
            className="fa-solid fa-chevron-down fixed top-0 left-1/2 -translate-x-1/2 text-lg text-white text-shadow-[1px_1px_1px_#0000004a] cursor-pointer"></i>
            {/* HEADER */}
            <section
            style={{ padding: '10px' }}
            className="min-h-10 bg-white border-b border-zinc-400 shrink-0 rounded-lg"
            >
            <h1
                style={{ fontFamily: 'Majesty'}}
                className="font-medium text-xl text-center"
            >
                Chat Auxiliar
            </h1>
            </section>

            <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            {/* MENSAGENS */}
            <section
                style={{ padding: '0px 4px' }}
                className="flex flex-col gap-4"
            >
                {opcoesRespostas.map((resposta: respostas) => (
                <article
                    key={resposta.id}
                    style={
                    resposta.isUser
                        ? { marginLeft: '10%', padding: 6 }
                        : { marginRight: '10%', padding: 6 }
                    }
                    className={`bg-${
                    resposta.isUser ? 'blue-600' : 'white'
                    } shadow-[0px_0px_3px_#0000002a] min-h-5 h-auto col-[1/3] rounded-xl flex items-center justify-center`}
                >
                    <span
                    className={`text-${
                        resposta.isUser ? 'white' : 'slate-900'
                    } text-sm text-center text-shadow-[1px_1px_1px_#0000001a]`}
                    >
                    {resposta.resposta}
                    </span>
                </article>
                ))}

                {loading.loadingAtivo && (
                <article
                    style={
                    loading.isLoadingUser
                        ? { marginLeft: '10%', padding: 6 }
                        : { marginRight: '10%', padding: 6 }
                    }
                    className={`bg-${
                    loading.isLoadingUser ? 'blue-600' : 'white'
                    } shadow-[0px_0px_3px_#0000002a] min-h-5 h-auto col-[1/3] rounded-xl flex items-center justify-center`}
                >
                    <span
                    className={`text-${
                        loading.isLoadingUser ? 'white' : 'slate-900'
                    } animate-bounce text-sm text-shadow-[1px_1px_1px_#0000001a]`}
                    >
                    ...
                    </span>
                </article>
                )}
            </section>

    {/* OPÇÕES */}
    <section
    style={{ padding: 12 }}
    className="flex items-start gap-2 flex-wrap"
    >
    {/* INÍCIO */}
    {etapaChat === 'inicio' &&
        opcoesPerguntas.map((opcao: Opcoes, index: number) => (
        <article
            key={index}
            onClick={() => {
            setOpcaoAtiva(opcao)
            adicionarRespostas(opcao.opcaoPrimaria, true)

            setTimeout(() => {
                opcao.respostasSecundarias?.forEach((resposta: string) =>
                adicionarRespostas(resposta, false)
                )
            }, 4000)

            setEtapaChat('opcao-secundaria')
            }}
            style={{ padding: '6px 8px' }}
            className="bg-white/90 cursor-pointer transition-colors duration-300 text-sm shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3 border border-sky-900 cursor-pointe active:bg-blue-400 active:text-white active:text-shadow-[1px_1px_1px_#2222221a]"
        >
            {opcao.opcaoPrimaria}
        </article>
        ))
    }

    {/* OPÇÕES SECUNDÁRIAS */}
    {etapaChat === 'opcao-secundaria' &&
        opcaoAtiva?.opcaoSecundaria.map((opcao: string, index: number) => (
        <article
            key={index}
            onClick={() => {
            adicionarRespostas(opcao, true)

            const { respostasEspecificas, respostaPadrao } =
                getRespostasTerciarias(opcaoAtiva, opcao)

            respostasEspecificas.forEach((resposta, i) => {
                setTimeout(() => {
                adicionarRespostas(resposta, false)
                }, 3000 * (i + 1))
            })

            if (respostaPadrao) {
                setTimeout(() => {
                adicionarRespostas(respostaPadrao, false)
                setEtapaChat('confirmar-topico')
                }, 3000)
                
            }
            }}
            style={{ padding: '6px 8px' }}
            className="bg-white/90 text-sm shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3 border border-sky-900 cursor-pointer active:bg-blue-400 active:text-white active:text-shadow-[1px_1px_1px_#2222221a]"
        >
            {opcao}
        </article>
        ))
    }

    {/* CONFIRMAR ASSINATURAS */}
    {etapaChat === 'confirmar-topico' &&
        opcaoAtiva?.opcaoTerciaria?.map((opcao: string, index: number) => (
        <article
            key={index}
            onClick={() => {
            adicionarRespostas(opcao, true)

            if (opcao === 'Sim') {
                setEtapaChat('opcao-secundaria')
            } else {
                adicionarRespostas(opcaoAtiva.ultimaResposta ?? '', false)
                setEtapaChat('confirmar-site')
            }
            }}
            style={{ padding: '6px 8px' }}
            className="bg-white/90 text-sm shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3 border border-sky-900 cursor-pointer active:bg-blue-400 active:text-white active:text-shadow-[1px_1px_1px_#2222221a]"
        >
            {opcao}
        </article>
        ))
    }

    {/* CONFIRMAR SITE */}
    {etapaChat === 'confirmar-site' &&
        opcaoAtiva?.ultimaOpcao?.map((opcao: string, index: number) => (
        <article
            key={index}
            onClick={() => {
            adicionarRespostas(opcao, true)

            if (opcao === 'Sim') {
                setOpcaoAtiva(null);
                setEtapaChat('inicio');
            } else {
                setEtapaChat('inicio');
                setAbrirCard(false);
                setTimeout(() => {
                    setOpcoesRespostas((prev) => prev.filter((elemento) => elemento.id <= 2));
                }, 1500)
            }
            }}
            style={{ padding: '6px 8px' }}
            className="bg-white/90 text-sm shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3 border border-sky-900 cursor-pointer active:bg-blue-400 active:text-white active:text-shadow-[1px_1px_1px_#2222221a]"
        >
            {opcao}
        </article>
        ))
    }
    </section>
            </div>
        </main>
    </>
    )
}
