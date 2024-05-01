import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { LoginUser } from "../../pages/LoginUser";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <LoginUser />;
    }

    return children;
}