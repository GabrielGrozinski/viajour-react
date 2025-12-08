import { useState, useEffect } from "react"

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
      paragrafo: 'Digite o seu nome de usuário',
      inputTipo: 'Text',
      inputId: 'nomeInput',
      placeHolderInput: 'Ex: João e o Pé de Feijão'
    },
    {
      id: 2,
      identificador: 'avatar',
      titulo: 'Avatar',
      paragrafo: 'Defina o seu avatar',
      inputTipo: 'image',
      inputId: 'imageInput',
      placeHolderInput: ''
    },
    {
      id: 3,
      identificador: 'celular',
      titulo: 'Celular',
      paragrafo: 'Insira seu número de telefone',
      inputTipo: 'tel',
      inputId: 'telefoneInput',
      placeHolderInput: 'Ex: +55 (11) 94444-5511'
    },
    {
      id: 4,
      identificador: 'perfil-viagens',
      titulo: 'Perfil de Viagens',
      paragrafo: 'Escolha o seu tipo de viagens (você pode mudar a qualquer momento)',
      inputTipo: 'radio',
      inputId: 'perfil-viagem-Input',
      placeHolderInput: 'Trabalho Lazer Compras'
    },
  ]
  const [nomeDigitado, setNomeDigitado] = useState<string>('');
  const [avatar, setAvatar] = useState<boolean>(false);
  const [numeroTelefone, setNumeroTelefone] = useState<string>('');
  const [tipoPerfilViagem, setTipoPerfilViagem] = useState<string>('');

    return (
      <main className="flex flex-col gap-10 min-h-full min-w-full">
        {subTopicos.map((subTopico: sub_topicos) => (
          <section 
            style={{padding: 12}} key={subTopico.id} className="flex relative flex-col gap-2 min-w-full min-h-[100px] bg-[#fefeff] border border-neutral-300 shadow-[0px_0px_3px_#2222221a] rounded-2xl" id={subTopico.identificador}>

            <button 
              className={
                `absolute right-0 top-0 -translate-x-1/3 translate-y-1/3 rounded-md  min-h-[30px] min-w-[50px] cursor-not-allowed text-center text-shadow-[1px_1px_1px_0000005a]
                ${subTopico.id === 1 ? nomeDigitado ? 'bg-sky-500 cursor-pointer text-slate-100 pointer-events-auto' : 'bg-neutral-100 text-black/20' 
                : subTopico.id === 2 ? avatar ? 'bg-sky-500 cursor-pointer text-slate-100 pointer-events-auto' : 'bg-neutral-100 text-black/20' 
                : subTopico.id === 3 ? numeroTelefone ? 'bg-sky-500 cursor-pointer text-slate-100 pointer-events-auto' 
                : 'bg-neutral-100 text-black/20' : subTopico.id === 4 ? tipoPerfilViagem ? 'bg-sky-500 cursor-pointer text-slate-100 pointer-events-auto' : 'bg-neutral-100 text-black/20' 
                : ''}
                `}>
                Salvar
            </button>

            <h1 className="text-[#222222] text-xl font-medium">{subTopico.titulo}</h1>

            <p className="font-normal text-sm text-neutral-600">{subTopico.paragrafo}</p>

            {subTopico.inputTipo === 'image' ? (
              <input 
                onClick={() => setAvatar(!avatar)} className="max-h-12 max-w-12" type="image"   src="https://cdn.pixabay.com/photo/2020/05/11/15/38/tom-5158824_1280.png" alt="avatar" 
              />
            ) 
            : 
            subTopico.inputTipo === 'radio' ? (
              <div id={subTopico.inputId} className="flex gap-10">
                {subTopico.placeHolderInput.split(' ').map((item: string, index: number) => (
                <label key={index} htmlFor={item}>
                  <span className="flex flex-col gap-1">
                    {item}
                  <input checked={tipoPerfilViagem === item} onChange={() => setTipoPerfilViagem(item)} type={subTopico.inputTipo} name={item} id={item} />
                  </span>
                </label>
                ))}
              </div>
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
        ))}
      </main>
    )
}