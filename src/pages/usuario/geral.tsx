import { useState, useEffect, useContext } from "react"
import { TemaContext } from "../../context/TemaContext";
import { useOutletContext } from "react-router-dom"
import { supabase } from "../../auth/supabase-client";
import { userAuth } from "../../context/autenticacao";

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
  const { setCondicaoInputs, setAvisoErro, user, setAvisoSucesso } = userAuth();
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
      identificador: 'perfil-viagens',
      titulo: 'Perfil de Viagens',
      paragrafo: 'Escolha o seu tipo de viagens (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'perfil-viagem-Input',
      placeHolderInput: 'Trabalho  Lazer  Compras'
    },
    {
      id: 4,
      identificador: 'quantidade-de-pessoas',
      titulo: 'Número de Acompanhantes',
      paragrafo: 'Escolha com quantas pessoas você costuma viajar (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'quantidade-de-pessoas-Input',
      placeHolderInput: 'Sozinho  Eu e mais alguém  Viajo com muitas pessoas'
    },
    {
      id: 5,
      identificador: 'numero-de-viagens',
      titulo: 'Número de Viagens',
      paragrafo: 'Escolha quantas viagens você costuma fazer no ano (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'numero-de-viagens-Input',
      placeHolderInput: 'Nenhuma  Uma ou mais  Cinco ou mais  Dez ou mais'
    },
    {
      id: 6,
      identificador: 'tipo-viajante',
      titulo: 'Tipo de Viajante',
      paragrafo: 'Escolha qual tipo de viajante te representa melhor (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'tipo-viajante-Input',
      placeHolderInput: 'Mochileiro  Aventureiro  Família  Romântico  Gastador'
    },
    {
      id: 7,
      identificador: 'custo-viagens',
      titulo: 'Custo de Viagens',
      paragrafo: 'Escolha quanto você costuma gastar em suas viagens (você pode mudar a qualquer momento).',
      inputTipo: 'radio',
      inputId: 'custo-viagens-Input',
      placeHolderInput: 'O mínimo possível  Pouco  Moderadamente  Muito'
    },
    {
      id: 8,
      identificador: 'preferencia-viagens',
      titulo: 'Preferência de Viagens',
      paragrafo: 'Escolha até três preferências de viagens (você pode mudar a qualquer momento).',
      inputTipo: 'checkbox',
      inputId: 'preferencia-viagens-Input',
      placeHolderInput: 'Natureza  Museus  Vida Noturna  Shopping  Parques Temáticos  Cultura e História  Gastronomia  Praia  Neve'
    },
  ];
  const { dark } = useContext(TemaContext);
  
  const { topicoEscolhido, textoDigitado }: any = useOutletContext();
  useEffect(() => {
    if (!topicoEscolhido) return;
    const elemento = document.getElementById(topicoEscolhido);
    if (!elemento) return;
    const posicao = elemento?.getBoundingClientRect().top + window.pageYOffset - 300;
    window.scrollTo({
      top: posicao,
      behavior: 'smooth'
    });
  }, [topicoEscolhido]);

  const [nomeDigitado, setNomeDigitado] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [tipoPerfilViagem, setTipoPerfilViagem] = useState<string>('');
  const [quantPessoasViagem, setQuantPessoasViagem] = useState<string>('');
  const [quantViagens, setQuantViagens] = useState<string>('');
  const [tipoViajante, setTipoViajante] = useState<string>('');
  const [custoViagens, setCustoViagens] = useState<string>('');
  const [preferenciaViagens, setPreferenciaViagens] = useState<string[]>([]);


  function highlight(text: string, search: string) {
    if (!search || search.trim() === "") return text;

    const regex = new RegExp(`(${search})`, "gi");

    return text.replace(
      regex,
      `<span style="color:#3b82f6; font-weight:800">$1</span>`
    );
  }

  async function handleInfoUser(subTopico: number) {
    const resetStateByKey: Record<string, () => void> = {
      name: () => setNomeDigitado(''),
      avatar_url: () => setAvatar(''),
      travel_profile: () => setTipoPerfilViagem(''),
      number_of_companions: () => setQuantPessoasViagem(''),
      number_of_travels: () => setQuantViagens(''),
      type_of_traveler: () => setTipoViajante(''),
      travel_cost: () => setCustoViagens(''),
      travel_preferences: () => setPreferenciaViagens([]),
    };

    type Entry = [string, string | number | string[]] | undefined;

    let entry: Entry =
      subTopico === 1 ? ['name', nomeDigitado] :
      subTopico === 2 ? ['avatar_url', avatar] :
      subTopico === 3 ? ['travel_profile', tipoPerfilViagem] :
      subTopico === 4 ? ['number_of_companions', quantPessoasViagem] :
      subTopico === 5 ? ['number_of_travels', quantViagens] :
      subTopico === 6 ? ['type_of_traveler', tipoViajante] :
      subTopico === 7 ? ['travel_cost', custoViagens] :
      ['travel_preferences', preferenciaViagens];

    if (entry) {
      const [key, value] = entry;

      const { error } = await supabase
        .from('profiles')
        .update({
            [key]: value,
        })
        .eq('id', user?.id)
;

      if (error) {
        console.error('Houve um erro ao salvar a informação', error);
        setCondicaoInputs(true);
        setAvisoErro('Houve um erro ao salvar a informação. Por favor, tente de novo.');
        setTimeout(() => {
          setCondicaoInputs(false);
          setAvisoErro('');
        }, 3000);
      } else {
          setCondicaoInputs(true);
          setAvisoSucesso('Informação salva com sucesso!');
          setTimeout(() => {
            setCondicaoInputs(false);
            setAvisoSucesso('');
          }, 3000);
      }

      resetStateByKey[key]?.();
    }
  }


return (
  <main className="geral-outlet flex flex-col gap-6 min-h-full min-w-full">
    {subTopicos.map((subTopico: sub_topicos) => {
      const isCheckedButton = 
        subTopico.id === 1 ? nomeDigitado
        : subTopico.id === 2 ? avatar
        : subTopico.id === 3 ? tipoPerfilViagem
        : subTopico.id === 4 ? quantPessoasViagem
        : subTopico.id === 5 ? quantViagens
        : subTopico.id === 6 ? tipoViajante
        : subTopico.id === 7 ? custoViagens
        : subTopico.id === 8 ? preferenciaViagens.length !== 3 ? false : true
        : false;

      return(
        <section 
          style={{padding: 12, backgroundColor: dark ? '#1c19172a' : '#fefeff'}} 
          key={subTopico.id} 
          className="geral-outlet flex relative flex-col border-l-4 border-l-[#60a5fa] gap-2 min-w-full min-h-[100px] border border-[#a1a1aa] shadow-[0px_0px_3px_#2222221a] rounded-4xl rounded-l-xl" 
          id={subTopico.identificador}
        >

          <button
            onClick={() => handleInfoUser(subTopico.id)}
            disabled={!isCheckedButton}
            className={
              `geral-outlet absolute right-0 top-0 -translate-x-1/3 translate-y-1/3 rounded-md min-h-[30px] min-w-[50px] cursor-not-allowed text-center text-shadow-[1px_1px_1px_0000005a]
              ${isCheckedButton ? 'bg-blue-500 cursor-pointer text-slate-100 pointer-events-auto' : dark ? 'bg-neutral-600/40 text-black/60' : 'bg-neutral-100 text-black/20'
              }`}>
              Salvar
          </button>

          <h1
            style={{color: dark ? '#e7e5e4' : '#222222'}}
            className="geral-outlet text-xl text-shadow-[1px_1px_1px_#0000002a] font-medium"
            dangerouslySetInnerHTML={{
              __html: highlight(subTopico.titulo, textoDigitado)
            }}
          />

          <p className="geral-outlet font-normal text-sm text-neutral-500">{subTopico.paragrafo}</p>

          {subTopico.inputTipo === 'image' ? (
            <input
              id={subTopico.inputId}
              onClick={() => setAvatar('')} 
              className="geral-outlet max-h-12 max-w-12" 
              type="image"   
              src="https://cdn.pixabay.com/photo/2020/05/11/15/38/tom-5158824_1280.png" 
              alt="avatar" 
            />
          ) 
          : 
          subTopico.inputTipo === 'radio' ? (
            <div id={subTopico.inputId} style={{rowGap: 4}} className="geral-outlet gap-2 md:gap-10 grid grid-cols-[1fr_1fr_1fr] justify-items-center grid-rows-[auto] md:flex">
              {subTopico.placeHolderInput.split('  ').map((item: string, index: number) => {
              const isChecked =
                subTopico.id === 3 ? tipoPerfilViagem === item 
                : subTopico.id === 4 ? quantPessoasViagem === item
                : subTopico.id === 5 ? quantViagens === item
                : subTopico.id === 6 ? tipoViajante === item
                : subTopico.id === 7 ? custoViagens === item
                : false;

              return (
                <label id={item} key={index} htmlFor={item} className="geral-outlet">
                  <span className={`geral-outlet flex ${isChecked ? dark ? 'text-[#fefefe] font-medium' : 'text-[#222222] font-medium' : dark ? 'text-zinc-300/80' : 'text-slate-700'} flex-col whitespace-nowrap gap-1 text-sm md:text-lg`}>
                    {item}
                  <input
                    checked={isChecked} 
                    onChange={() => 
                      subTopico.id === 3 ? setTipoPerfilViagem(item) 
                      : subTopico.id === 4 ? setQuantPessoasViagem(item)
                      : subTopico.id === 5 ? setQuantViagens(item)
                      : subTopico.id === 6 ? setTipoViajante(item)
                      : subTopico.id === 7 ? setCustoViagens(item)
                      : false
                    } 
                    type={subTopico.inputTipo} 
                    name={item} 
                    id={item}
                    className="geral-outlet"
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
            <div id={subTopico.inputId} className="geral-outlet flex md:max-w-1/2 flex-wrap gap-4">
              {subTopico.placeHolderInput.split('  ').map((item: string, index: number) => (
                <button 
                  onClick={() => {
                    if (preferenciaViagens.includes(item)) {
                      const preferenciaViagemDesmarcada = preferenciaViagens.filter((preferencia: string) => preferencia !== item);
                      setPreferenciaViagens(preferenciaViagemDesmarcada);
                    } else {
                      if (preferenciaViagens.length === 3) return;
                      setPreferenciaViagens([...preferenciaViagens, item]);
                    }
                  }} 
                  style={{
                    padding: '4px 6px', 
                    backgroundColor: preferenciaViagens.includes(item) ? '#3b82f6' : '', 
                    color: preferenciaViagens.includes(item) ? '#f8fafc' : '#222222',
                    cursor: preferenciaViagens.includes(item) ? '' : preferenciaViagens.length === 3 ? 'not-allowed' : 'pointer'
                  }} 
                  className="geral-outlet cursor-pointer rounded-md shadow-[1px_1px_2px_#0000001a] bg-neutral-100" 
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
            </>
          )
          :
          (
          <input 
            onChange={(e) => setNomeDigitado(e.target.value)} 
            style={{padding: 6, marginTop: '14px'}} 
            placeholder={subTopico.placeHolderInput} 
            className={`geral-outlet min-w-full rounded-md border ${dark ? 'text-slate-100 border-gray-400' : 'text-slate-800 border-black/60'} md:min-w-[60%] md:max-w-[60%] placeholder-neutral-400 focus:outline-blue-400`} 
            type={subTopico.inputTipo} 
            name={subTopico.inputId} 
            id={subTopico.inputId}
          />
          )}
        </section>
      );
    })}
  </main>
)

}
