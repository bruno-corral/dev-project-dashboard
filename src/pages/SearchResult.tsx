import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../types/Post";
import { api } from "../utils/api";

export const SearchResult = () => {
    const params = useParams();

    const [infosPost, setInfosPost] = useState<Post[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getSearchPost = async () => {
        try {
            setError(false);
            setLoading(true);

            const response = await api.getSearchPost(params.slug);
            setInfosPost(response);

            setLoading(false);
            
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // useEffect(() => {
    //     getSearchPost();
    // }, []);

    return (
        <div>
            <p className="text-black">Teste</p>
        </div>
    );
}