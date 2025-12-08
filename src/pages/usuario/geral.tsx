import { useState, useEffect } from "react"
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

export default function Geral() {
  const subTopicos: sub_topicos[] = [
    {
      id: 1,
      identificador: 'nome',
      titulo: 'Nome',
      paragrafo: 'Digite o seu nome de usuário.',
      inputTipo: 'Text',
      inputId: 'nomeInput',
      placeHolderInput: 'Ex: João e o Pé de Feijão'
    },
    {
      id: 2,
      identificador: 'avatar',
      titulo: 'Avatar',
      paragrafo: 'Defina o seu avatar.',
      inputTipo: 'image',
      inputId: 'imageInput',
      placeHolderInput: ''
    },
    {
      id: 3,
      identificador: 'celular',
      titulo: 'Celular',
      paragrafo: 'Insira seu número de telefone.',
      inputTipo: 'tel',
      inputId: 'telefoneInput',
      placeHolderInput: 'Ex: +55 (11) 94444-5511'
    },
    {
      id: 4,
      identificador: 'perfil-viagens',
      titulo: 'Perfil de Viagens',
      paragrafo: 'Escolha o seu tipo de viagens (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'perfil-viagem-Input',
      placeHolderInput: 'Trabalho  Lazer  Compras'
    },
    {
      id: 5,
      identificador: 'quantidade-de-pessoas',
      titulo: 'Número de Acompanhantes',
      paragrafo: 'Escolha com quantas pessoas você costuma viajar (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'quantidade-de-pessoas-Input',
      placeHolderInput: 'Sozinho  Eu e mais alguém  Viajo com muitas pessoas'
    },
    {
      id: 6,
      identificador: 'numero-de-viagens',
      titulo: 'Número de Viagens',
      paragrafo: 'Escolha quantas viagens você costuma fazer no ano (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'numero-de-viagens-Input',
      placeHolderInput: 'Nenhuma  1+  3+  5+'
    },
    {
      id: 7,
      identificador: 'tipo-viajante',
      titulo: 'Tipo de Viajante',
      paragrafo: 'Escolha qual tipo de viajante te representa melhor (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'tipo-viajante-Input',
      placeHolderInput: 'Mochileiro  Aventureiro  Família  Romântico  Gastador'
    },
    {
      id: 8,
      identificador: 'custo-viagens',
      titulo: 'Custo de Viagens',
      paragrafo: 'Escolha quanto você costuma gastar em suas viagens (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'custo-viagens-Input',
      placeHolderInput: 'O mínimo possível  Pouco  Moderadamente  Muito'
    },
    {
      id: 9,
      identificador: 'preferencia-viagens',
      titulo: 'Preferência de Viagens',
      paragrafo: 'Escolha até três preferências de viagens (você pode mudar a qualquer momento).',
      inputTipo: 'checkbox',
      inputId: 'preferencia-viagens-Input',
      placeHolderInput: 'Natureza  Museus  Vida Noturna  Shopping  Parques Temáticos  Cultura e História  Gastronomia  Praia  Neve'
    },
  ];
  
  const { topicoEscolhido }: any = useOutletContext();
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


  const [nomeDigitado, setNomeDigitado] = useState<string>('');
  const [avatar, setAvatar] = useState<boolean>(false);
  const [numeroTelefone, setNumeroTelefone] = useState<string>('');
  const [tipoPerfilViagem, setTipoPerfilViagem] = useState<string>('');
  const [quantPessoasViagem, setQuantPessoasViagem] = useState<string>('');
  const [quantViagens, setQuantViagens] = useState<string>('');
  const [tipoViajante, setTipoViajante] = useState<string>('');
  const [custoViagens, setCustoViagens] = useState<string>('');
  const [preferenciaViagens, setPreferenciaViagens] = useState<string[]>(['']);


    return (
      <main className="flex flex-col gap-6 min-h-full min-w-full">
        {subTopicos.map((subTopico: sub_topicos) => {
          const isCheckedButton = 
            subTopico.id === 1 ? nomeDigitado
            : subTopico.id === 2 ? avatar
            : subTopico.id === 3 ? numeroTelefone
            : subTopico.id === 4 ? tipoPerfilViagem
            : subTopico.id === 5 ? quantPessoasViagem
            : subTopico.id === 6 ? quantViagens
            : subTopico.id === 7 ? tipoViajante
            : subTopico.id === 8 ? custoViagens
            : subTopico.id === 9 ? preferenciaViagens.length !== 4 ? false : true
            : false;

          return(
            <section 
              style={{padding: 12}} key={subTopico.id} className="flex relative flex-col gap-2 min-w-full min-h-[100px] bg-[#fefeff] border border-neutral-300 shadow-[0px_0px_3px_#2222221a] rounded-2xl" id={subTopico.identificador}>

              <button 
                className={
                  `absolute right-0 top-0 -translate-x-1/3 translate-y-1/3 rounded-md  min-h-[30px] min-w-[50px] cursor-not-allowed text-center text-shadow-[1px_1px_1px_0000005a]
                  ${isCheckedButton ? 'bg-blue-500 cursor-pointer text-slate-100 pointer-events-auto' : 'bg-neutral-100 text-black/20'
                  }`}>
                  Salvar
              </button>

              <h1 className="text-[#222222] text-xl font-medium">{subTopico.titulo}</h1>

              <p className="font-normal text-sm text-neutral-600">{subTopico.paragrafo}</p>

              {subTopico.inputTipo === 'image' ? (
                <input
                  id={subTopico.inputId}
                  onClick={() => setAvatar(!avatar)} className="max-h-12 max-w-12" type="image"   src="https://cdn.pixabay.com/photo/2020/05/11/15/38/tom-5158824_1280.png" alt="avatar" 
                />
              ) 
              : 
              subTopico.inputTipo === 'radio' ? (
                <div id={subTopico.inputId} className="flex gap-10">
                  {subTopico.placeHolderInput.split('  ').map((item: string, index: number) => {
                  const isChecked =
                    subTopico.id === 4 ? tipoPerfilViagem === item 
                    : subTopico.id === 5 ? quantPessoasViagem === item
                    : subTopico.id === 6 ? quantViagens === item
                    : subTopico.id === 7 ? tipoViajante === item
                    : subTopico.id === 8 ? custoViagens === item
                    : false;

                  return (
                    <label id={item} key={index} htmlFor={item}>
                      <span className={`flex ${isChecked ? 'text-[#222222] font-medium' : 'text-slate-700'} flex-col gap-1`}>
                        {item}
                      <input checked={isChecked} 
                        onChange={() => 
                        subTopico.id === 4 ? setTipoPerfilViagem(item) 
                        : subTopico.id === 5 ? setQuantPessoasViagem(item) 
                        : subTopico.id === 6 ? setQuantViagens(item) 
                        : subTopico.id === 7 ? setTipoViajante(item)
                        : subTopico.id === 8 ? setCustoViagens(item)
                        : false
                        } type={subTopico.inputTipo} name={item} id={item}
                      />
                      </span>
                    </label>
                  );

                })}
                </div>
              ) 
              :
              subTopico.inputTipo === 'checkbox' ? (
                <>
                <div id={subTopico.inputId} className="flex max-w-1/2 flex-wrap gap-4">
                  {subTopico.placeHolderInput.split('  ').map((item: string, index: number) => (
                    <button onClick={() => {
                      if (preferenciaViagens.includes(item)) {
                        const preferenciaViagemDesmarcada = preferenciaViagens.filter((preferencia: string) => preferencia !== item);
                        setPreferenciaViagens(preferenciaViagemDesmarcada);
                      } else {
                        if (preferenciaViagens.length === 4) return;
                        setPreferenciaViagens([...preferenciaViagens, item]);
                      }
                    }} 
                    style={{padding: '4px 6px', 
                    backgroundColor: preferenciaViagens.includes(item) ? '#3b82f6' : '', 
                    color: preferenciaViagens.includes(item) ? '#f8fafc' : '#222222',
                    cursor: preferenciaViagens.includes(item) ? '' : preferenciaViagens.length === 4 ? 'not-allowed' : 'pointer'
                    }} 
                    className={`cursor-pointer rounded-md shadow-[1px_1px_2px_#0000001a] bg-neutral-100`} key={index}>
                      {item}
                    </button>
                  ))}
                </div>
                </>
              )
              :
              (
              <input onChange={(event) => {
                switch (subTopico.id) {
                  case 1: 
                    setNomeDigitado(event.target.value);
                    break;
                  case 3: 
                    setNumeroTelefone(event.target.value);
                    break;
                }
                }} style={{padding: 4, marginTop: '14px'}} placeholder={subTopico.placeHolderInput} className="rounded-md border text-slate-800 border-black/60 max-w-[60%]" type={subTopico.inputTipo} name={subTopico.inputId} id={subTopico.inputId}
              />
              )}
            </section>
          );
        })}
      </main>
    )
}