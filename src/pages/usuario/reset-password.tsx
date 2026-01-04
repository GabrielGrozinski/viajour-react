import { useState, useEffect } from "react";
import { supabase } from "../../auth/supabase-client";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [canReset, setCanReset] = useState(false);

  useEffect(() => {
    const initRecovery = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setErrorMsg("Link inválido ou expirado.");
        return;
      }

      setCanReset(true);
    };

    initRecovery();
  }, []);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      setErrorMsg("Preencha ambos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // ✅ Atualiza a senha do usuário logado temporariamente
    const { data, error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      console.error("Erro ao redefinir senha:", error);
      setErrorMsg("Não foi possível redefinir a senha. Tente novamente.");
    } else {
      console.log("Senha redefinida com sucesso:", data);
      setSuccessMsg(
        "Senha redefinida com sucesso! Redirecionando para login..."
      );
      setPassword("");
      setConfirmPassword("");

      // Redireciona após 3 segundos
      setTimeout(async () => {
        await supabase.auth.signOut();
        await supabase.auth.signInWithPassword({
          email: 'codetimot@gmail.com',
          password
        })
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div 
    style={{padding: '0px 12px'}}
    className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div style={{padding: 30}} className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h1 style={{marginBottom: 18}} className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Redefinir Senha
        </h1>

        {successMsg && (
          <div style={{marginBottom: 12, padding: 12}} className="flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
            <CheckCircle size={20} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{marginBottom: 12, padding: 12}} className="flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            <XCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        <label style={{marginBottom: 6}} className="block text-gray-700 dark:text-gray-300 font-medium">
          Nova senha
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          style={{marginBottom: 12, padding: 12}}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
          Confirme a senha
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repita a senha"
          style={{marginBottom: 18, padding: 12}}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading && canReset}
          style={{padding: '10px 0px'}}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Atualizando..." : "Redefinir senha"}
        </button>

        <p style={{marginTop: 18}} className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          Lembrou sua senha?{" "}
          <a
            onClick={() => navigate('/login')}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Voltar ao login
          </a>
        </p>
      </div>
    </div>
  );
}
