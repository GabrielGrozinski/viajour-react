import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import CartaoDeCredito from "../../components/usuario/cartao-de-credito";
import { supabase } from "../../auth/supabase-client";
import { motion, AnimatePresence } from "framer-motion";
import { userAuth } from "../../context/autenticacao";


interface plansType {
    id: number,
    name: string,
    idinput: string,
    description: string,
    features: string[],
    price: number,
    bgcolor: string,
    badgecolor: string,
    titlecolor: string,
    button: string,
    buttonhover: string,
}


export default function Assinaturas() {
  const { user, alterarAssinatura, setCondicaoInputs, setAvisoSucesso } = userAuth();
  const [ativandoCartao, setAtivandoCartao] = useState<boolean>(false);
  const { topicoEscolhido }: any = useOutletContext();
  const [plans, setPlans] = useState<plansType[] | null>(null);

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
    console.log('user', user);
  }, [user]);

  useEffect(() => {
    async function fetchPlans() {
      const { data, error } = await supabase
        .from('plans')
        .select('*');

      if (error) {
        console.error('Erro ao buscar planos', error);
        setPlans(null);
      }

        setPlans(data as any);
    }

    fetchPlans();
  }, []);

  const handleAssinatura = async (month: number, plan_id: number, provider: string) => {
    const result = await alterarAssinatura(month, plan_id, provider);
    if (result.success) {
      setCondicaoInputs(true);
      setAvisoSucesso('Parabéns! Seu plano de assinatura foi ativado!');
      setTimeout(() => {
        setCondicaoInputs(false);
        setAvisoSucesso('');
      }, 3000);
    }
  }

  // LISTA GLOBAL DE TODAS AS FEATURES (9 no total)
  const todasAsFeatures = [
    "Limited access",
    "Trip search",
    "Basic support",
    "Unlimited access",
    "No ads",
    "AI tools",
    "Unlimited users",
    "Exclusive trips",
    "Early access to tools"
  ];

return ( 
  <div
    id="escolher-plano"
    className="assinaturas-outlet flex justify-center items-center flex-col lg:flex-row lg:items-stretch gap-6"
  >
    {!ativandoCartao ? (
      plans?.map((plan: plansType) => (
        <main
          key={plan.id}
          id={plan.idinput}
          className="assinaturas-outlet shadow-[0_30px_30px_-25px_rgba(0,38,255,0.205)] bg-white text-[#697e91] max-w-[300px] rounded-2xl"
        >
          <div
            style={{ padding: 20, paddingTop: 40, background: plan.bgcolor }}
            className="assinaturas-outlet items-center relative rounded-xl"
          >
            {/* Pricing */}
            <span
              style={{ padding: 8, background: plan.badgecolor }}
              className="assinaturas-outlet absolute flex items-center text-xl font-semibold px-[0.75em] rounded-[99em_0_0_99em] right-0 top-0"
            >
              <span style={{ color: plan.titlecolor }} className="assinaturas-outlet">
                ${plan.price}
                <small className="assinaturas-outlet text-[#707a91] text-[0.75em]">/ m</small>
              </span>
            </span>

            {/* Title */}
            <p
              className="assinaturas-outlet font-semibold text-xl"
              style={{ color: plan.titlecolor }}
            >
              {plan.name}
            </p>

            {/* Description */}
            <p style={{ marginBottom: 8 }} className="assinaturas-outlet">
              {plan.description}
            </p>

            {/* Features */}
            <ul className="assinaturas-outlet flex flex-col gap-2">
              {todasAsFeatures.map((feat, idx) => {
                const desbloqueada = plan.features.includes(feat);
                return (
                  <li key={idx} className="assinaturas-outlet flex items-center gap-2">
                    
                    {/* Ícone */}
                    {desbloqueada ? (
                      <span className="assinaturas-outlet bg-[#1FCAC5] inline-flex items-center justify-center text-white w-5 h-5 rounded-full">
                        ✓
                      </span>
                    ) : (
                      <span className="assinaturas-outlet bg-red-200 inline-flex items-center justify-center text-red-600 w-5 h-5 rounded-full">
                        <span style={{marginTop: -2, marginRight: -0.4}}>✕</span>
                      </span>
                    )}

                    {/* Nome da feature */}
                    <span
                      className={`assinaturas-outlet ${desbloqueada ? "" : "opacity-50 line-through"}`}
                    >
                      {feat}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Button */}
            <div
              style={{ marginTop: 20 }}
              className="assinaturas-outlet w-full flex items-center justify-end"
            >
              <button
                onClick={() => {
                  
                  handleAssinatura(3, plan.id, 'Google')
                }}
                style={{ background: plan.button }}
                className="assinaturas-outlet text-white cursor-pointer font-medium text-lg text-center w-full no-underline px-[0.75em] rounded-md border-0 outline-0 hover:brightness-90"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = plan.buttonhover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = plan.button)
                }
              >
                Choose plan
              </button>
            </div>
          </div>
        </main>
      ))
    ) : (
      <AnimatePresence mode="wait">
        <motion.div
        key="creditCard"
        initial={{y: -40}}
        animate={{y: 0}}
        exit={{y: -40}}
        transition={{duration: 0.3}}
        >
          <CartaoDeCredito
            setAtivandoCartao={setAtivandoCartao}
          />
        </motion.div>
      </AnimatePresence>
    )}
  </div>
);
}
