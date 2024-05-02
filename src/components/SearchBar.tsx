import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    getPost: (search: string) => void;
}

export const SearchBar = ({ getPost }: Props) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearchPost = async (search: string) => {
        if (search === '') {
            getPost(search);
            return;
        }
        navigate(`/home/results/${search}`);
    }

    return (
        <div>
            <input type="text" placeholder="Pesquise o post pelo título" className="px-3 py-2 w-96 rounded-md m-4 outline-none" value={search} onChange={e => setSearch(e.target.value)} />
            <button className="bg-black p-2 border border-white rounded-md font-bold hover:opacity-90" onClick={() => handleSearchPost(search)}>Pesquisar</button>
        </div>
    );
}