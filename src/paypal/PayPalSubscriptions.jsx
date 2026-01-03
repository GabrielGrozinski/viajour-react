import React from 'react';

const CLIENT_ID = 'AcX7H02HDnv0pr3EnU5kUrRgIg6g_J1JMYsNlKnoOSQ8VwWWjngvJC1wNMA1ugRjp5uOYU5M58uGspE1'; // Sandbox Client ID

// IDs dos planos pagos no Sandbox
const PLAN_IDS = {
  adventurer: 'P-3722857185954731UNFMYO3A',
  traveler: 'P-5SG90583K44656738NFMYPNI',
};

const PayPalSubscriptions = ({ userId }) => {
  React.useEffect(() => {
    // Carrega o SDK do PayPal dinamicamente
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&vault=true&intent=subscription`;
    script.async = true;
    script.onload = () => {
      renderButtons();
    };
    document.body.appendChild(script);

    function renderButtons() {
      Object.entries(PLAN_IDS).forEach(([planName, planId]) => {
        const container = document.getElementById(`paypal-button-${planName}`);
        if (!container) return;

        window.paypal.Buttons({
          createSubscription: function (data, actions) {
            return actions.subscription.create({ plan_id: planId });
          },
          onApprove: function (data, actions) {
            alert(`Assinatura aprovada!\nPlano: ${planName}\nID da assinatura: ${data.subscriptionID}`);

            // Envia para o backend/Supabase para registrar
            fetch('/api/register-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: userId,
                plan: planName,
                paypal_subscription_id: data.subscriptionID,
              }),
            });
          },
          onError: function (err) {
            console.error('Erro no PayPal:', err);
            alert('Erro ao criar assinatura.');
          },
        }).render(container);
      });
    }
  }, [userId]);

  // Função para Free (não usa PayPal)
  const handleFreePlan = () => {
    alert('Versão gratuita ativada!');
    // Aqui você pode registrar no Supabase que o usuário está no plano Free, se quiser
    fetch('/api/register-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        plan: 'free',
        paypal_subscription_id: null,
      }),
    });
  };

  return (
    <div>
      <h2>Escolha seu plano</h2>

      <div>
        <h3>Free</h3>
        <button onClick={handleFreePlan}>Ativar Free</button>
      </div>

      <div>
        <h3>Adventurer</h3>
        <div id="paypal-button-adventurer"></div>
      </div>

      <div>
        <h3>Traveler</h3>
        <div id="paypal-button-traveler"></div>
      </div>
    </div>
  );
};

export default PayPalSubscriptions;
