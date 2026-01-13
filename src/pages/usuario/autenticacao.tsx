import { useContext, useEffect, useState } from "react"
import { TemaContext } from "../../context/TemaContext";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../auth/supabase-client";
import { userAuth } from "../../context/autenticacao";


interface sub_topicos {
  id: number,
  identificador: string,
  titulo: string,
  paragrafo: string,
  inputTipo: string,
  inputId: string,
  placeHolderInput: string | undefined,
  value?: string | undefined
}

export default function Autenticacao() {
  const { setCondicaoInputs, setAvisoErro, setAvisoSucesso, user } = userAuth();
  const [largura, setLargura] = useState(window.innerWidth);
  useEffect(() => {
      const handleResize = () => setLargura(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { dark } = useContext(TemaContext);
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codeSuccess, setCodeSuccess] = useState<boolean>(false);

  const subTopicos: sub_topicos[] = [
    {
      id: 1,
      identificador: 'email',
      titulo: 'Email',
      paragrafo: 'O seu endereço de email padrão.',
      inputTipo: 'text',
      inputId: 'emailInput',
      placeHolderInput: user?.email ? undefined : 'Ex: viajour@gmail.com',
      value: user?.email ? user.email : undefined
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
    {
      id: 3,
      identificador: 'celular',
      titulo: 'Celular',
      paragrafo: 'Insira seu número de telefone.',
      inputTipo: 'tel',
      inputId: 'telefoneInput',
      placeHolderInput: user?.phone ? undefined : 'Ex: +55 (11) 94444-5511',
      value: user?.phone ? user.phone : undefined
    },
  ];
  
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

  async function handlePassword() {
    const { error } = await supabase.auth.resetPasswordForEmail(user?.email ?? '', {
      redirectTo: 'https://gabrielgrozinski.github.io/viajour-react/#/reset-password'
    });
    setCondicaoInputs(true);
      if (error) {
        console.error('Houve um erro ao enviar o email: ', error);
        setAvisoErro('Houve um erro ao enviar o email para redefinir sua senha. Por favor, tente de novo.');
      } else {
        setAvisoSucesso('Um link para redefir sua senha foi enviado ao seu email.');
      }

    setTimeout(() => {
      setCondicaoInputs(false);
      setAvisoErro('');
      setAvisoSucesso('');
    }, 3000);
  }

  const formatPhoneToE164 = (input: string) => {
    let digits = input.replace(/\D/g, '');

    if (digits.startsWith('55')) {
      return `+${digits}`;
    }

    if (digits.length === 10 || digits.length === 11) {
      return `+55${digits}`;
    }

    return `+${digits}`;
  };

  const updatePhone = async (phone: string) => {
    const newPhone = formatPhoneToE164(phone);

    const { error } = await supabase.auth.updateUser({
      phone: newPhone
    });

    if (error) {
      console.error('Erro ao solicitar troca de telefone:', error);
      setCondicaoInputs(true);
      setAvisoErro(newPhone ? 'Erro ao solicitar troca de telefone. Por favor, tente de novo.' : 'Digite um número válido.');
      setTimeout(() => {
        setCondicaoInputs(false);
        setAvisoErro('');
      }, 3000);
    }

  };

  const confirmPhoneChange = async () => {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: 'phone_change'
    });

    if (error) {
      console.error('Erro ao confirmar telefone:', error);
      setCondicaoInputs(true);
      setAvisoErro('Erro ao confirmar telefone. Por favor, tente de novo.');
      setTimeout(() => {
        setCondicaoInputs(false);
        setAvisoErro('');
      }, 3000);
    } else {
      setCondicaoInputs(true);
      setAvisoSucesso('telefone adicionado com sucesso!');
      setTimeout(() => {
        setCondicaoInputs(false);
        setAvisoErro('');
      }, 3000);
    }
  };

  const confirmEmail = async () => {
    // Lógica de confirmação de email.
  }

  useEffect(() => {
    if (code.length === 6) {
      setCodeSuccess(true);
    } else {
      setCodeSuccess(false);
    }
  }, [code]);

return ( 
  <main className="flex flex-col gap-6 min-h-full min-w-full autenticacao-outlet">
    {subTopicos.map((subTopico: sub_topicos) => {

      return(
        <section 
          style={{padding: 12, backgroundColor: dark ? '#1c19172a' : '#fefeff'}} 
          key={subTopico.id} 
          className="flex relative flex-col gap-2 min-w-full min-h-[100px] bg-[#fefeff] border-l-4 border-l-amber-400 border border-[#a1a1aa] shadow-[0px_0px_3px_#2222221a] rounded-4xl rounded-l-xl autenticacao-outlet" 
          id={subTopico.identificador}
        >

          <h1
            style={{color: dark ? '#e7e5e4' : '#222222'}}
            className="text-xl font-medium autenticacao-outlet"
            dangerouslySetInnerHTML={{
              __html: highlight(subTopico.titulo, textoDigitado)
            }}
          />

          <p className="font-normal text-sm text-neutral-500 autenticacao-outlet">{subTopico.paragrafo}</p>

        {subTopico.id === 2 ? (
                <div className="relative w-full autenticacao-outlet">
                    <button
                    onClick={() => handlePassword()}
                    style={{padding: '6px 8px'}}
                    className="bg-amber-500 rounded-md text-slate-100 text-shadow-[1px_1px_1px_#0000004a] cursor-pointer">
                      Clique aqui para receber um email e alterar sua senha.
                    </button>
                </div>
        ) : (
            <div>
                <button
                  onClick={() => subTopico.id === 3 ? confirmPhoneChange() : confirmEmail()}
                  disabled={subTopico.id === 3 ? codeSuccess : true}
                  style={{padding: 4}}
                  className={`
                    absolute right-0 top-0 -translate-x-1/6 translate-y-1/3 rounded-md min-h-[30px] min-w-[50px] text-center text-shadow-[1px_1px_1px_0000005a] bg-amber-500 text-slate-100 autenticacao-outlet ${subTopico.id === 3 ? codeSuccess ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
                  }
                  >
                  {subTopico.id === 1 ? 'Verificar email' : 'Salvar telefone'}
                </button>

                <input
                  type={subTopico.inputTipo}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  value={subTopico.value}
                  disabled={subTopico.value !== undefined}
                  placeholder={subTopico.placeHolderInput}
                  style={{padding: 6, marginTop: '14px'}} 
                  className={`rounded-md border ${dark ? 'text-slate-100 border-gray-400' : 'text-slate-800 border-black/60'} min-w-full md:min-w-[60%] md:max-w-[60%] autenticacao-outlet`}  
                  id={subTopico.inputId}
                />

                {subTopico.id === 3 && (
                  <>
                  <button
                  onClick={() => updatePhone(phone)}
                  style={{padding: '4px 6px', margin: largura < 768 ? '10px 0px 0px 0px' : '0px 0px 0px 10px'}}
                  className="inline min-h-9 min-w-12 bg-amber-700 cursor-pointer rounded-lg text-slate-100 text-shadow-[1px_0px_0px_#0000001a]"
                  >
                    Enviar código de segurança
                  </button>

                  <input
                    onChange={(e) => setCode(e.currentTarget.value)}
                    maxLength={6}
                    placeholder='Digite o código enviado para o seu celular aqui.'
                    style={{padding: 6, marginTop: '14px'}} 
                    className={`rounded-md border ${dark ? 'text-slate-100 border-gray-400' : 'text-slate-800 border-black/60'} min-w-full md:min-w-[60%] md:max-w-[60%] autenticacao-outlet`}  
                    id="code-phone-input"
                  />
                  </>
                )}

                
            </div>
        )}

        </section>
      );
    })}
  </main>
)

}
