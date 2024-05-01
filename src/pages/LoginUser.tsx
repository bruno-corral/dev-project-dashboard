import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/Auth/AuthContext";

export const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                setEmail('');
                setPassword('');
                navigate('/home');
            } 
    
            if (!isLogged) {
                alert('Usuário e ou senha inválido.');
                return;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <div className="container mx-auto max-w-xl max-h-96 flex flex-col items-center justify-content border border-black rounded-md p-10 px-6">
            <h1 className='font-bold text-2xl text-black'>Login</h1>
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="email" 
                placeholder='Digite seu e-mail' 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="password" 
                placeholder='Digite sua senha' 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <button className="bg-yellow-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={handleLogin}>Login</button>
                <Link to='/signup'><button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90">Registrar</button></Link> 
            </div>
        </div>
    );
}