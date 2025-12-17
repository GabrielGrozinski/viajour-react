import ChatCard from "../../components/chat-card"
import fundo from '../../assets/imagens/fundo.png';

export default function ChatAuxiliar() {
    return (
        <div style={{backgroundImage: `url(${fundo})`}} className="h-screen flex justify-center items-center">
            <ChatCard/>
        </div>
    )
}
