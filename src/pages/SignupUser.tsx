import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from '../utils/api';

export const SignupUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState({
        is_admin: false
    });

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            const response = await api.signUp(name, email, password, isAdmin.is_admin);
            alert(response.message);
            if (response.data) {
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const handleGetIsAdmin = (event: any) => {
        const { name, checked } = event.target;

        setIsAdmin({
            is_admin: name === 'is_admin' ? checked : isAdmin.is_admin
        });
    }

    return (
        <div className="container mx-auto max-w-2xl flex flex-col items-center justify-content border border-black rounded-md p-10 px-6 mb-4">
            <h1 className='font-bold text-2xl text-black'>Registrar Usuário</h1>
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="text" 
                placeholder="Digite seu nome" 
                value={name} 
                onChange={e => setName(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="email" 
                placeholder="Digite seu e-mail" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="password" 
                placeholder="Digite sua senha" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <div>
                <input 
                    type="checkbox" 
                    name="is_admin" 
                    checked={isAdmin.is_admin}
                    onChange={handleGetIsAdmin}
                />
                <label className="text-black mx-3">
                    Usuário Administrador
                </label>
            </div>
            <div>
                <button 
                    className="bg-yellow-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" 
                    onClick={handleSignUp}
                >
                    Registrar-se
                </button>
                <Link to='/login'>
                    <button className="border border-black bg-black p-3 rounded-md font-bold hover:opacity-90 m-4">
                        Voltar
                    </button>
                </Link>
            </div>
        </div>
    );
}