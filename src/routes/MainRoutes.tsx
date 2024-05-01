import { useRoutes } from 'react-router-dom';

import { RequireAuth } from '../contexts/Auth/RequireAuth';

import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { CreatePost } from '../pages/CreatePost';
import { LoginUser } from '../pages/LoginUser';
import { SignupUser } from '../pages/SignupUser';
import { UpdatePost } from '../pages/UpdatePost';
import { ResetPassword } from '../pages/ResetPassword';
import { SearchResult } from '../pages/SearchResult';

export const MainRoutes = () => {
    return useRoutes([
        {path: '*', element: <NotFound />},
        {path: '/', element: <LoginUser />},
        {path: '/login', element: <LoginUser />},
        {path: '/signup', element: <SignupUser />},
        {path: '/home', element: <RequireAuth><Home /></RequireAuth> },
        {path: '/update/password/:id', element: <RequireAuth><ResetPassword /></RequireAuth> },
        {path: '/home/results/:slug', element: <RequireAuth><SearchResult /></RequireAuth> },
        {path: '/post/create', element:  <RequireAuth><CreatePost /></RequireAuth> },
        {path: '/post/update/:id', element:  <RequireAuth><UpdatePost /></RequireAuth> },
    ]);
}