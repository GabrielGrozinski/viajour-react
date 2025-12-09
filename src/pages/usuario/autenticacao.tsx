import { useState, useRef, useEffect } from "react"
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
      inputTipo: 'password',
      inputId: 'senhaInput',
      placeHolderInput: 'Não deixe os piratas roubarem sua senha!'
    },
  ];

  const [senha, setSenha] = useState<string>('');
  
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

    return (
      <main className="flex flex-col gap-6 min-h-full min-w-full">
        {subTopicos.map((subTopico: sub_topicos) => {
          const isCheckedButton = 
          subTopico.id === 2 ? senha : false;

          return(
            <section 
              style={{padding: 12}} key={subTopico.id} className="flex relative flex-col gap-2 min-w-full min-h-[100px] bg-[#fefeff] border-l-4 border-l-amber-400 border border-neutral-300 shadow-[0px_0px_3px_#2222221a] rounded-4xl rounded-l-xl" id={subTopico.identificador}>

              <h1
                className="text-[#222222] text-xl font-medium"
                dangerouslySetInnerHTML={{
                  __html: highlight(subTopico.titulo, textoDigitado)
                }}
              />

              <p className="font-normal text-sm text-neutral-600">{subTopico.paragrafo}</p>

            {subTopico.id === 2 ? (
                <>
                    <button 
                        className={
                        `absolute right-0 top-0 -translate-x-1/3 translate-y-1/3 rounded-md  min-h-[30px] min-w-[50px] cursor-not-allowed text-center text-shadow-[1px_1px_1px_0000005a]
                        ${isCheckedButton ? 'bg-amber-500 cursor-pointer text-slate-100 pointer-events-auto' : 'bg-neutral-100 text-black/20'
                        }`}>
                        Salvar
                    </button>

                    <input 
                        onChange={(event) => setSenha(event.target.value)}
                        style={{padding: 6, marginTop: '14px'}} 
                        placeholder={subTopico.placeHolderInput} 
                        className="rounded-md border text-slate-800 border-black/60 max-w-[60%]" 
                        type={subTopico.inputTipo} 
                        name={subTopico.inputId} 
                        id={subTopico.inputId}
                    />
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
                        className="rounded-md border text-slate-800 border-black/60 max-w-[60%]"  
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