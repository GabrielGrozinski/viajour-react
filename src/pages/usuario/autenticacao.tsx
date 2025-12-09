import { useState, useContext, useEffect } from "react"
import { TemaContext } from "../../context/TemaContext";
import { useOutletContext } from "react-router-dom"

interface sub_topicos {
  id: number,
  identificador: string,
  titulo: string,
  paragrafo: string,
  inputTipo: string,
  inputId: string,
  placeHolderInput: string,
}

export default function Autenticacao() {
  const subTopicos: sub_topicos[] = [
    {
      id: 1,
      identificador: 'email',
      titulo: 'Email',
      paragrafo: 'O seu endereço de email padrão.',
      inputTipo: '',
      inputId: 'emailInput',
      placeHolderInput: 'gabrielgrozinski@gmail.com'
    },
    {
      id: 2,
      identificador: 'senha',
      titulo: 'Senha',
      paragrafo: 'Altere a sua senha.',
      inputTipo: 'Text',
      inputId: 'senhaInput',
      placeHolderInput: 'Não deixe os piratas roubarem sua senha!'
    },
  ];
  const { dark } = useContext(TemaContext);
  const [senha, setSenha] = useState<string>('');
  const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
  const [forcaDaSenha, setForcaDaSenha] = useState<any>(null);
  
  const { topicoEscolhido, textoDigitado }: any = useOutletContext();
  useEffect(() => {
    if (!topicoEscolhido) return;
    const elemento = document.getElementById(topicoEscolhido);
    if (!elemento) return;
    const posicao = elemento?.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({
      top: posicao,
      behavior: 'smooth'
    });
  }, [topicoEscolhido]);

  function highlight(text: string, search: string) {
    if (!search || search.trim() === "") return text;

    const regex = new RegExp(`(${search})`, "gi");

    return text.replace(
      regex,
      `<span style="color:#3b82f6; font-weight:800">$1</span>`
    );
  }

  function calcularForcaSenha(senha: string) {
    if (!senha || senha.length === 0) return null;
    const comprimento = senha.length;

    const temMinuscula = /[a-z]/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/.test(senha);

    // Sequências comuns proibidas
    const sequenciasFracas = [
      "12345", "123456", "abcdef", "qwerty", "password",
      "senha", "11111", "22222"
    ];

    const contemSequenciaFraca = sequenciasFracas.some(seq =>
      senha.toLowerCase().includes(seq)
    );

    let score = 0;

    // Pontuação
    if (temMinuscula) score++;
    if (temMaiuscula) score++;
    if (temNumero) score++;
    if (temEspecial) score++;

    // Comprimento
    if (comprimento >= 12) score++;
    else if (comprimento >= 8) score += 0.5;

    // Penalidade
    if (contemSequenciaFraca) score = Math.max(0, score - 2);

    let nivel = "Fraca";
    let cor = "#f87171";

    if (score >= 4) {
      nivel = "Forte";
      cor = "#4ade80";
    } else if (score >= 2.5) {
      nivel = "Média";
      cor = "#fbbf24";
    }

    return {
      score,
      nivel,
      cor,
      temMinuscula,
      temMaiuscula,
      temNumero,
      temEspecial,
      contemSequenciaFraca
    };
  }

    return (
      <main className="flex flex-col gap-6 min-h-full min-w-full">
        {subTopicos.map((subTopico: sub_topicos) => {
          const isCheckedButton = 
          subTopico.id === 2 ? senha.length < 23 && senha.length > 7 : false;

          return(
            <section 
              style={{padding: 12, backgroundColor: dark ? '#1c19172a' : '#fefeff'}} key={subTopico.id} className="flex relative flex-col gap-2 min-w-full min-h-[100px] bg-[#fefeff] border-l-4 border-l-amber-400 border border-[#a1a1aa] shadow-[0px_0px_3px_#2222221a] rounded-4xl rounded-l-xl" id={subTopico.identificador}>

              <h1
                style={{color: dark ? '#e7e5e4' : '#222222'}}
                className="text-xl font-medium"
                dangerouslySetInnerHTML={{
                  __html: highlight(subTopico.titulo, textoDigitado)
                }}
              />

              <p className="font-normal text-sm text-neutral-500">{subTopico.paragrafo}</p>

            {subTopico.id === 2 ? (
                <>
                    <button 
                        className={
                        `absolute right-0 top-0 -translate-x-1/3 translate-y-1/3 rounded-md  min-h-[30px] min-w-[50px] cursor-not-allowed text-center text-shadow-[1px_1px_1px_0000005a]
                        ${isCheckedButton ? 'bg-amber-500 cursor-pointer text-slate-100 pointer-events-auto' : dark ? 'bg-neutral-600/40 text-black/60' : 'bg-neutral-100 text-black/20'
                        }`}>
                        Salvar
                    </button>
                    <div className="relative w-full">
                      <input 
                          onChange={(event) => {
                          setSenha(event.target.value);
                          setForcaDaSenha(calcularForcaSenha(event.target.value));
                          }}
                          style={{padding: 6, marginTop: '14px'}}
                          placeholder={subTopico.placeHolderInput} 
                          className={`min-w-full rounded-md border ${dark ? 'text-slate-100 border-gray-400' : 'text-slate-800 border-black/60'} md:min-w-[60%] md:max-w-[60%] placeholder-neutral-400`} 
                          type={mostrarSenha ? subTopico.inputTipo : 'password'}
                          name={subTopico.inputId} 
                          id={subTopico.inputId}
                      />
                      <i 
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className={`fa-regular ${mostrarSenha ? 'fa-eye' : 'fa-eye-slash'} cursor-pointer absolute top-1/2 translate-x-[-150%]`}></i>
                    </div>
                    <p>
                      <span className={`${senha.length < 8 && 'opacity-40 text-red-500'} text-green-500 text-shadow-[1px_1px_1px_#2222222a]`}>Mínimo: 8 caracteres</span> <br />
                      <span className={`${senha.length > 22 && 'opacity-40 text-red-500'} text-green-500 text-shadow-[1px_1px_1px_#2222222a]`}>Máximo: 22 caracteres</span>
                    </p>
                    {forcaDaSenha && (
                      <div className="mt-2 min-w-full md:min-w-[60%] md:max-w-[60%]">
                        <div className={`h-2 rounded w-full bg-gray-300`}>
                          <div
                            className="h-2 rounded"
                            style={{
                              width: `${(forcaDaSenha.score / 5) * 100}%`,
                              backgroundColor: forcaDaSenha.cor
                            }}
                          ></div>
                        </div>

                        <p className="mt-1 text-lg">
                          
                          <span
                            className={
                              forcaDaSenha.nivel === "Forte"
                                ? "text-green-400"
                                : forcaDaSenha.nivel === "Média"
                                ? "text-amber-400"
                                : "text-red-400"
                            }
                          >
                            {forcaDaSenha.nivel}
                          </span>
                        </p>
                      </div>
                    )}
                </>
            ) : (
                <>
                    <button
                        style={{padding: 4}}
                        className='
                        absolute right-0 top-0 -translate-x-1/6 translate-y-1/3 rounded-md min-h-[30px] min-w-[50px] text-center text-shadow-[1px_1px_1px_0000005a] bg-amber-500 cursor-pointer text-slate-100'
                        >
                        Verificar email
                    </button>

                    <div
                        style={{padding: 6, marginTop: '14px'}} 
                        className={`rounded-md border ${dark ? 'text-slate-100 border-gray-400' : 'text-slate-800 border-black/60'} min-w-full md:min-w-[60%] md:max-w-[60%]`}  
                        id={subTopico.inputId}
                    >
                        {subTopico.placeHolderInput}
                    </div>
                </>
            )}


            </section>
          );
        })}
      </main>
    )
}