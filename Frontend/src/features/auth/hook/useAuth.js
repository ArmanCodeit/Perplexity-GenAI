import { useDispatch } from "react-redux";
import { registerUser, loginUser, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice"; 


export function useAuth() {

    const dispatch = useDispatch();

    async function handleRegister({username, email, password}) {
        try {
        dispatch(setLoading(true));
            const data = await registerUser({username, email, password});
            dispatch(setUser(data));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({email, password}) {
        try {
            dispatch(setLoading(true));
            const data = await loginUser({email, password});
            dispatch(setUser(data));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }


    return {
        handleRegister,
        handleLogin,
        handleGetMe,
    }
}