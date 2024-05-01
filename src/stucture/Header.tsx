import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    const auth = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signout();
        navigate('/');
    }

    return (
        <div className="bg-yellow-500 h-20 flex justify-center items-center mb-10">

            {!auth.user &&
                <div className="container mx-auto flex justify-center items-center">
                    <Link to={'/'}><h1 className="text-black font-bold text-2xl p-3">Dev Blog</h1></Link>
                </div> 
            }
            {auth.user && 
                <div className="container mx-auto flex justify-between">
                    <div className="flex justify-between">
                        <p className="font-bold text-xl p-3 text-white">Olá {auth.user.name}, bem vindo!</p>
                    </div>
                    <h1 className="text-white font-bold text-2xl p-3">Dev Blog</h1>
                    <div>
                        <Link to={`/update/password/${auth?.user?.id}`}>
                            <button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90 mx-4">Resetar Senha</button>
                        </Link> 
                        <button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90 mx-4" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            }
        </div>
    );
} 