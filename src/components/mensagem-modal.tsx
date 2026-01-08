import { userAuth } from "../context/autenticacao"
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";


export default function MensagemModal() {
    const { avisoErro, avisoSucesso, condicaoInputs, setCondicaoInputs, setAvisoErro, setAvisoSucesso } = userAuth();

    useEffect(() => {
        if (condicaoInputs) {
            setTimeout(() => {
                setCondicaoInputs(false);
                setAvisoErro('');
                setAvisoSucesso('');
            }, 3000);
        }
    }, [condicaoInputs]);

    return (
            <AnimatePresence mode="wait">
                {(avisoSucesso || avisoErro) && condicaoInputs && (
                    <motion.div
                    key="aviso-inputs"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.3}}
                    style={{padding: '8px 10px'}}
                    className='
                        fixed top-[2%] right-[3%] min-h-15 h-auto min-w-30 max-w-[90%] xl:max-w-1/4 z-1 text-center flex justify-center items-center bg-gray-100 rounded-md shadow-[0px_0px_4px_#0000004a] text-slate-100 text-shadow-[1px_1px_1px_#0000001a]
                    '
                    >
                    {avisoSucesso ? (
                        <span style={{padding: '3px 3.2px 2px 2.8px'}} className="bg-green-500 rounded-full">
                            <Check size={20} />
                        </span>
                    ) : (
                        <span style={{padding: '2.4px 2.3px 2px 2px'}} className="bg-red-500 rounded-full">
                            <X size={20} />
                        </span>
                    )}
                    <h2 style={{margin: '2px 50px 2px 12px'}} className='text-slate-800 text-shadow-[1px_1px_1px_#0000001a]'>
                        {avisoSucesso ? avisoSucesso : avisoErro}
                    </h2>

                        <X onClick={() => setCondicaoInputs(false)} size={16} className="absolute cursor-pointer text-gray-600 top-[3.5%] right-[1%] hover:text-red-400" />

                    </motion.div>
                )}
            </AnimatePresence>
    );
}
