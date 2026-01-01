import { type ReactNode} from "react";
import { userAuth } from "../context/autenticacao";
import { Navigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

interface Props {
    children: ReactNode
}

export default function RotaPrivada({ children }: Props) {
    const { session, loading } = userAuth();

    return (
        <>
        {loading ?
        <>
            <ClipLoader className='self-center' color='#000' loading size={35} />
        </>
        :
        session ?
            <> 
                {children}
            </>
         : 
        <Navigate to="/login" />
        }
        </>
    )
}
