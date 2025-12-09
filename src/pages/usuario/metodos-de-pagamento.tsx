import { useState } from "react";
import CartaoDeCredito from "../../components/usuario/cartao-de-credito";
import CartaoSalvo from "../../components/usuario/cartao-salvo";

export default function MetodosDePagamento() {
  const [ativandoCartao, setAtivandoCartao] = useState<boolean>(false);
  const [cartaoSalvo, setCartaoSalvo] = useState<boolean>(true);


  return (
    <main style={{padding: '20px 10px'}} className="w-full flex justify-center gap-10 items-center">
      {!ativandoCartao ? (
        cartaoSalvo ? (
          <>
            <CartaoSalvo/>
            <div style={{padding: 16}} className="bg-white shadow-md rounded-2xl w-full max-w-md flex flex-col items-center text-center">
                <div style={{padding: 10}} className="bg-blue-100 text-blue-600 rounded-full mb-4">
                <i className="fa-solid fa-credit-card text-xl"></i>
                </div>

                <h2 className="text-xl font-semibold text-gray-800">
                Adicionar mais um cartão
                </h2>

                <p style={{marginTop: 2}} className="text-gray-500 text-sm">
                Para facilitar pagamentos e compras dentro do app, adicione um cartão de crédito.
                </p>

                <button
                onClick={() => setAtivandoCartao(true)}
                style={{marginTop: 6, padding: '6px 12px'}}
                className="bg-blue-600 cursor-pointer text-white rounded-xl shadow hover:bg-blue-700 transition-all"
                >
                Adicionar cartão
                </button>
            </div>
          </>
        ) : (
          <div style={{padding: 16}} className="bg-white shadow-md rounded-2xl w-full max-w-md flex flex-col items-center text-center">
              <div style={{padding: 10}} className="bg-blue-100 text-blue-600 rounded-full mb-4">
              <i className="fa-solid fa-credit-card text-xl"></i>
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
              Nenhum cartão cadastrado
              </h2>

              <p style={{marginTop: 2}} className="text-gray-500 text-sm">
              Para facilitar pagamentos e compras dentro do app, adicione um cartão de crédito.
              </p>

              <button
              onClick={() => setAtivandoCartao(true)}
              style={{marginTop: 6, padding: '6px 12px'}}
              className="bg-blue-600 cursor-pointer text-white rounded-xl shadow hover:bg-blue-700 transition-all"
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