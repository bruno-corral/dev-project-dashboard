import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";

export const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [item, setItem] = useState({} as any);

    const auth = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate();

    const handleUpdatePassword = async () => {
        try {
            if (newPassword != confirmPassword) {
                alert('As senhas devem ser as mesmas.');
                return;
            }

            const response = await api.updatePassword(auth?.user?.id, newPassword, confirmPassword);
            alert(response.message);
            setNewPassword('');
            setConfirmPassword('');

            navigate(-1);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <div className="container mx-auto max-w-xl max-h-96 flex flex-col items-center justify-content border border-black rounded-md p-10 px-6">
            <h1 className='font-bold text-2xl text-black'>Nova Senha</h1>
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="password" 
                placeholder='Digite a nova senha' 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="password" 
                placeholder='Repita a nova senha' 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <div>
                <button className="bg-yellow-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={handleUpdatePassword}>Confirmar</button>
                <Link to='/home'><button className="border border-black bg-black p-3 rounded-md font-bold hover:opacity-90 m-4">Voltar</button></Link> 
            </div>
        </div>
    );
}