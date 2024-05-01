import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../contexts/Auth/AuthContext';

export const NotFound = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleBackButton = () => {
        auth.signout();
        navigate('/');
    }

    return (
        <div className="container flex flex-col items-center">
            <h1 className="text-2xl font-bold p-3 text-black">Página não encontrada!!!</h1>
            <button className="border border-black bg-black text-white p-3 m-3 rounded-md font-bold hover:opacity-60" onClick={handleBackButton}>Voltar para Login</button> 
        </div>
    );
}