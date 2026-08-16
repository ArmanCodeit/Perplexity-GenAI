import { useDispatch } from "react-redux";
import {registerUser,loginUser,getMe} from "../service/auth.api";
import {setUser,setLoading,setError} from "../auth.slice";



export function useAuth() {

    const dispatch = useDispatch();


    // =========================
    // REGISTER
    // =========================
    async function handleRegister({ username, email, password }) {

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const data = await registerUser({
                username,
                email,
                password
            });

            dispatch(setUser(data));

            return data;

        } catch (error) {

            dispatch(setError(error.message));

            // 🔥 Important
            throw error;

        } finally {
            dispatch(setLoading(false));
        }
    }


    // =========================
    // LOGIN
    // =========================
    async function handleLogin({ email, password }) {

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const data = await loginUser({
                email,
                password
            });

            // Only successful login reaches here
            dispatch(setUser(data));

            return data;

        } catch (error) {

            dispatch(setError(error.message));

            // 🔥 MOST IMPORTANT LINE
            throw error;

        } finally {
            dispatch(setLoading(false));
        }
    }


    // =========================
    // GET ME
    // =========================
    async function handleGetMe() {

        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const data = await getMe();

            dispatch(setUser(data));

            return data;

        } catch (error) {

            dispatch(setError(error.message));

            throw error;

        } finally {
            dispatch(setLoading(false));
        }
    }


    return {
        handleRegister,
        handleLogin,
        handleGetMe
    };
}