import axios from 'axios';

export const store = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

let endpointUser = '/user';
let endpointCategory = '/category';
let endpointPost = '/post';
export const api = {
    signUp: async(name: string, email: string, password: string, is_admin: boolean) => {
        try {
            const response = await store.post(`${endpointUser}/create`, {
                name,
                email,
                password,
                is_admin
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    signIn: async(email: string, password: string) => {
        try {
            const response = await store.post(`${endpointUser}/signin`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    showUser: async (id: string | number | undefined) => {
        try {
            const response = await store.get(`${endpointUser}/show/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    validateToken: async (token: string) => {
        try {
            const response = await store.post(`${endpointUser}/validateToken`, {
                token
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    logout: () => {
        return { status: true };
    },
    updatePassword: async (id: number | undefined, newPassword: string, confirmPassword: string) => {
        try {   
            const response = await store.put(`${endpointUser}/update/password/${id}`, {
                newPassword,
                confirmPassword
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    allCategories: async () => {
        try {
            const response = await store.get(`${endpointCategory}/index`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    showCategory: async (id: string) => {
        try {
            const response = await store.get(`${endpointCategory}/show/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    allPosts: async () => {
        try {
            const response = await store.get(`${endpointPost}/index`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    showPost: async (id: string | undefined) => {
        try {
            const response = await store.get(`${endpointPost}/show/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createPost: async (title: string, image: string, content: string, publication_date: string, status: string, user_id: number | undefined, category_id: any) => {
        try {
            const response = await store.post(`${endpointPost}/create`, {
                title,
                image,
                content,
                publication_date,
                status,
                user_id,
                category_id
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updatePost: async (id: string | undefined, title: string, image: string, content: string, publication_date: string, status: string, user_id: number | undefined, category_id: any) => {
        try {
            const response = await store.put(`${endpointPost}/update/${id}`, {
                title,
                image,
                content,
                publication_date,
                status,
                user_id,
                category_id
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deletePost: async (id: number) => {
        try {
            const response = await store.delete(`${endpointPost}/remove/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getSearchPost: async (search: string | undefined) => {
        try {
            const response = await store.post(`${endpointPost}/search`, {
                search
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    downloadCsv: async (id: string | number | undefined) => {
        try {
            const response = await store.get(`${endpointPost}/downloadcsv/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}