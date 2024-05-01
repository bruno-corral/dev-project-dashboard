import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";
import { api } from "../utils/api";
import { Category } from "../types/Category";

export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectCategory, setSelectCategory] = useState('');
    const [publication_date, setPublicationDate] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');

    const options = [
        {id: 1, label: "Ativo"},
        {id: 0, label: "Inativo"},
    ];

    const auth = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate();

    const getCategories = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await api.allCategories();
            setCategories(response.data);

            setLoading(false);
        } catch (error) {
            setError(true);
            console.error(error);
            throw error;
        }
    }

    const handleCreatePost = async () => {
        try {
            let category_id = parseInt(selectCategory);
            let user_id = auth?.user?.id;

            if (!publication_date) {
                alert('A data de publicação obrigatória.');
                return;
            }

            if (!category_id) {
                alert('A categoria é obrigatória.');
                return;
            }

            if (!status) {
                alert('O status é obrigatório.');
                return;
            }

            const response = await api.createPost(title, image, content, publication_date, status, user_id, category_id); 
            alert(response.message);
            if (response.data) {
                navigate(-1);
            }
        } catch (error) {
            setError(true);
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="container mx-auto max-w-2xl flex flex-col items-center justify-content border border-black rounded-md p-10 px-6 mb-4">
            <h1 className='font-bold text-2xl text-black'>Novo Post</h1>
            {loading && error === false &&
                <p className="font-bond text-2xl text-black text-center">Loading...</p>
            }
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="text" 
                placeholder="Título" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
            />
            <div className="w-full flex justify-between flex-row">
                <input 
                    className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                    type="date" 
                    placeholder="Data"
                    value={publication_date}
                    onChange={e => setPublicationDate(e.target.value)}
                />
                <select value={selectCategory} onChange={e => setSelectCategory(e.target.value)} className="px-3 py-2 w-full rounded-md m-4 outline-none">
                    <>
                        <option defaultValue={selectCategory} selected>Categoria</option>
                        {categories.map(item =>
                            <option key={item.id} value={item.id}>{item.title}</option>
                        )}
                    </>
                </select>
                <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2 w-full rounded-md m-4 outline-none">
                    <>
                        <option defaultValue={status} selected>Status</option>
                        {options.map(item =>
                            <option key={item.id} value={item.id}>{item.label}</option>
                        )}
                    </>
                </select>
            </div>
            <textarea 
                name="" 
                id="" 
                cols="30" 
                rows="5" 
                className="px-3 py-2 w-full rounded-md m-4 outline-none resize-none" 
                placeholder="Escreva o seu post..."
                value={content}
                onChange={e => setContent(e.target.value)}>
            </textarea>
            <input type="file" name="file" className="text-black" value={image} onChange={e => setImage(e.target.value)}/>
            <div>
                <button className="bg-yellow-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-black" onClick={handleCreatePost}>Postar</button>
                <Link to='/home'><button className="border border-black bg-black p-3 rounded-md font-bold hover:opacity-90 m-4">Voltar</button></Link>
            </div>
        </div>
    );
}