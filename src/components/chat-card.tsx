export default function ChatCard() {
    return (
        <main 
        className="min-h-2/3 max-h-2/3 w-3/4 rounded-xl shadow-[0px_0px_3px_#0000002a] bg-blue-300/80 overflow-y-auto flex flex-col gap-4">

            <section 
            style={{padding: '10px'}}
            className="min-h-10 bg-white border-b border-zinc-400">
                <h1
                style={{fontFamily: 'Majesty', marginTop: -6, marginBottom: 4}}
                className="font-medium text-xl text-center"
                >ViaJour</h1>
                <div 
                style={{rowGap: 6}}
                className="flex flex-wrap justify-between">
                    <article className="bg-white cursor-pointer shadow-[0px_0px_3px_#0000005a] rounded-lg h-6 min-w-[130px] flex items-center justify-center">
                        <h2>Português</h2>
                    </article>
                    
                    <article className="bg-white cursor-pointer shadow-[0px_0px_3px_#0000005a] rounded-lg h-6 min-w-[130px] flex items-center justify-center">
                        <h2>English</h2>
                    </article>

                    <article className="bg-white cursor-pointer shadow-[0px_0px_3px_#0000005a] rounded-lg h-6 min-w-[130px] flex items-center justify-center">
                        <h2>Español</h2>
                    </article>

                    <article className="bg-white cursor-pointer shadow-[0px_0px_3px_#0000005a] rounded-lg h-6 min-w-[130px] flex items-center justify-center">
                        <h2>Français</h2>
                    </article>

                    <article className="bg-white cursor-pointer shadow-[0px_0px_3px_#0000005a] rounded-lg h-6 min-w-[130px] flex items-center justify-center">
                        <h2>日本語</h2>
                    </article>

                    <article className="bg-white cursor-pointer shadow-[0px_0px_3px_#0000005a] rounded-lg h-6 min-w-[130px] flex items-center justify-center">
                        <h2>Italiano </h2>
                    </article>
                </div>
            </section>

            <section 
            style={{padding: '0px 4px'}}
            className="flex flex-col gap-4">
                <article
                style={{marginRight: '10%', padding: 10}}
                className="bg-white shadow-[0px_0px_3px_#0000002a] min-h-[20px] h-auto col-[1/3] rounded-xl flex items-center justify-center">
                    <span className="text-slate-900 text-sm text-shadow-[1px_1px_1px_#0000001a]">
                        Olá! Sou o assistente virtual do ViaJour e estou aqui para te ajudar!
                    </span>
                </article>

                <article
                style={{marginRight: '10%', padding: 10}}
                className="bg-white shadow-[0px_0px_3px_#0000002a] min-h-[20px] h-auto col-[1/3] rounded-xl flex items-center justify-center">
                    <span className="text-slate-900 text-sm text-shadow-[1px_1px_1px_#0000001a]">
                        Qual a sua dúvida?
                    </span>
                </article>

                <article
                style={{marginLeft: '10%', padding: 10}}
                className="bg-sky-400 shadow-[0px_0px_3px_#0000002a] min-h-[20px] h-auto col-[2/4] rounded-xl flex items-center justify-center">
                    <span className="text-white text-shadow-[1px_1px_1px_#2222221a] text-sm">
                        Quero descobrir um lugar ótimo para eu viajar e que tenha muitas praias.
                    </span>
                </article>
            </section>

            <section style={{padding: 12}} className="bg-red-400 flex-1 flex items-end flex-wrap">
                <article 
                style={{padding: 6}}
                className="bg-white/90 shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3">
                    Assinaturas do site
                </article>

                <article 
                style={{padding: '3px 6px'}}
                className="bg-white/90 shadow-[0px_0px_3px_#2222223a] text-center rounded-3xl max-w-2/3">
                    Confirmar minha reserva
                </article>
            </section>
        </main>
    )
}