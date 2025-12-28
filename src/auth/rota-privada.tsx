import { type ReactNode} from "react";
import { userAuth } from "../context/autenticacao";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

export default function RotaPrivada({ children }: Props) {
    const { session } = userAuth();

    return (
        <>
        {session ?
            <> 
                {children}
            </>
         : 
        <Navigate to="/login" />
        }
        </>
    )
}
