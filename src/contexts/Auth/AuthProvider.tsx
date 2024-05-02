import { useState, useEffect } from "react";

import { User } from "../../types/User";
import { api } from "../../utils/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const validadeToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);
                
                if (data.data) {
                    setUser(data.data);
                }
            }
        }
        validadeToken();
    }, [api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signIn(email, password);
        if (data.error === false && data.token) {
            setUser(data.data);
            setToken(data.token);
            return true;
        }
        return false;
    }

    const signout = async () => {
        await api.logout();
        setUser(null);
        setToken('');
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}