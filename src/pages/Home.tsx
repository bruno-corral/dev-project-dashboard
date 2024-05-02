import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Title } from "../components/Title";

import { api } from "../utils/api";
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";
import { Post } from "../types/Post";
import { SearchBar } from "../components/SearchBar";

export const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const auth = useContext<AuthContextType>(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getPostByUser = async () => {
        try {
            setLoading(true);
            setError(false);

            if (auth.user?.is_admin === 1) {
                const response = await api.allPosts();
                setPosts(response.data);
                setLoading(false);
                return;
            }

            const response = await api.showUser(auth.user?.id);
            setPosts(response.posts);

            setLoading(false);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const handleDeletePost = async (id: number) => {
        try {
            if (!window.confirm('Tem certeza que quer deletar?')) return false;

            const response = await api.deletePost(id);

            if (response.error === true) {
                setError(true);
                alert(response.message);
                return;
            }

            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // const handleDownloadCsv = async () => {
    //     try {
    //         const response = await api.downloadCsv(auth.user?.id);
    //         alert(response.message);
    //         console.log(response.message);
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }

    useEffect(() => {
        getPostByUser();
    }, []);

    return (
        <div className="py-2 container mx-auto">
            <div className="flex flex-1 justify-between">
                <Title />
                <SearchBar getPost={getPostByUser} />
                <div>
                    {/* <button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90 mr-3" onClick={() => handleDownloadCsv()}>Baixar Relatório</button> */}
                    <Link to={'/post/create'}>
                        <button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90">Novo Post</button>
                    </Link>
                </div>
            </div>

            {loading &&
                <p className="font-bond text-2xl text-black text-center">Carregando...</p>
            }

            {error === true &&  
                <h1 className="my-4 text-2xl font-bold text-black">Há um erro, estamos consertando!</h1>
            }

            {posts.length > 0 ? (
                posts.map(item => 
                    <div key={item.id} className="inline-block">
                        <div className="border border-black py-4 rounded-md px-3 m-4">
                            <h1 className="text-black font-bold text-3xl p-3">{item.title}</h1>
                            <p className="text-black font-bold p-3">Publicado - {item.publication_date.split('-').reverse().join('/')}</p>
                            <div>
                                <Link to={`/post/update/${item.id}`}><button className="bg-blue-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white">Editar</button></Link>
                                <button className="bg-red-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={() => handleDeletePost(item.id)}>Deletar</button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <p className="text-2xl text-black text-center font-bold">Não existem posts cadastrados!</p>
            )}
        </div>
    );
}