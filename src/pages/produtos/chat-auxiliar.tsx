import { useContext } from "react";
import { TemaContext } from "../../context/TemaContext";
import ChatCard from "../../components/chat-card"
import fundo from '../../assets/imagens/fundo.png';
import fundoDark from '../../assets/imagens/fundo-dark.png';

export default function ChatAuxiliar() {
    const { dark } = useContext(TemaContext);

    return (
        <div style={{backgroundImage: dark ? `url(${fundoDark})` : `url(${fundo})`}} className="h-screen flex justify-center items-center">
            <ChatCard/>
        </div>
    )
}
