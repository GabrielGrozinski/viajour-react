import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

type TemaContextType = {
    dark: boolean;
    setDark: (value: boolean) => void;
}

export const TemaContext = createContext<TemaContextType>({
    dark: false,
    setDark: () => {}
});

export default function TemaProvider({ children }: Props) {
    const [dark, setDark] = useState<boolean>(() => {
        return localStorage.getItem("tema") === 'dark'
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("tema", dark ? "dark" : "claro");
    }, [dark]);

    return (
        <TemaContext.Provider value={{ dark, setDark }}>
            {children}
        </TemaContext.Provider>
    )
}
