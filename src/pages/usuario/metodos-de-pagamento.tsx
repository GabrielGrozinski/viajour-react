import { useState, useEffect, useContext } from "react";
import { TemaContext } from "../../context/TemaContext";
import { useOutletContext } from "react-router-dom";
import CartaoDeCredito from "../../components/usuario/cartao-de-credito";
import CartaoSalvo from "../../components/usuario/cartao-salvo";

export default function MetodosDePagamento() {
  const [ativandoCartao, setAtivandoCartao] = useState<boolean>(false);
  const [cartaoSalvo, setCartaoSalvo] = useState<boolean>(true);
  const { topicoEscolhido }: any = useOutletContext();
  const { dark } = useContext(TemaContext);

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

  useEffect(() => {
    setTimeout(() => {
      setCartaoSalvo(!cartaoSalvo);
    }, 10000);
  }, [])

  return (
    <main id="adicionar-cartao" style={{padding: '20px 10px'}} className="metodos-de-pagamento-outlet w-full flex flex-col md:flex-row justify-center gap-10 items-center">
      {!ativandoCartao ? (
        cartaoSalvo ? (
          <>
            <CartaoSalvo/>
            <div style={{padding: 16, backgroundColor: dark ? '#27272a' : 'white'}} className='bg-white shadow-md rounded-2xl w-full max-w-md flex flex-col items-center text-center'>
                <div style={{padding: 10}} className="metodos-de-pagamento-outlet bg-blue-100 text-blue-600 rounded-full mb-4">
                <i className="metodos-de-pagamento-outlet fa-solid fa-credit-card text-xl"></i>
                </div>

                <h2 style={{color: dark ? '#f4f4f5' : '#1f2937'}} className="metodos-de-pagamento-outlet text-xl font-semibold">
                Adicionar mais um cartão
                </h2>

                <p style={{marginTop: 2}} className="metodos-de-pagamento-outlet text-gray-400 text-sm">
                Para facilitar pagamentos e compras dentro do app, adicione um cartão de crédito.
                </p>

                <button
                onClick={() => setAtivandoCartao(true)}
                style={{marginTop: 6, padding: '6px 12px'}}
                className="metodos-de-pagamento-outlet bg-blue-600 cursor-pointer text-white rounded-xl shadow hover:bg-blue-700 transition-all"
                >
                Adicionar cartão
                </button>
            </div>
          </>
        ) : (
          <div style={{padding: 16}} className="metodos-de-pagamento-outlet bg-white shadow-md rounded-2xl w-full max-w-md flex flex-col items-center text-center">
              <div style={{padding: 10}} className="metodos-de-pagamento-outlet bg-blue-100 text-blue-600 rounded-full mb-4">
              <i className="metodos-de-pagamento-outlet fa-solid fa-credit-card text-xl"></i>
              </div>

              <h2 className="metodos-de-pagamento-outlet text-xl font-semibold text-gray-800">
              Nenhum cartão cadastrado
              </h2>

              <p style={{marginTop: 2}} className="metodos-de-pagamento-outlet text-gray-500 text-sm">
              Para facilitar pagamentos e compras dentro do app, adicione um cartão de crédito.
              </p>

              <button
              onClick={() => setAtivandoCartao(true)}
              style={{marginTop: 6, padding: '6px 12px'}}
              className="metodos-de-pagamento-outlet bg-blue-600 cursor-pointer text-white rounded-xl shadow hover:bg-blue-700 transition-all"
              >
              Adicionar cartão
              </button>
          </div>
        )
      
      ) : (
        <CartaoDeCredito setAtivandoCartao={setAtivandoCartao}/>
      )}
    </main>
  );
}