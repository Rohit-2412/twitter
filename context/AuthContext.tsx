import * as SecureStore from "expo-secure-store";

import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useRouter, useSegments } from "expo-router";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    // console.log("Auth Token: ", authToken);

    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // check if user is authenticated
        const isAuthGroup = segments[0] === "(auth)";

        if (!isAuthGroup && !authToken) {
            // redirect to sign in page
            router.replace("/signIn");
        }
        if (isAuthGroup && authToken) {
            // redirect to home page
            router.replace("/");
        }
    }, [segments, authToken]);

    // reading from secure storage
    useEffect(() => {
        const getAuthToken = async () => {
            const token = await SecureStore.getItemAsync("authToken");
            setAuthToken(token);
        };

        getAuthToken();
    }, []);

    const updateAuthToken = async (token: string) => {
        // update in secure storage
        await SecureStore.setItemAsync("authToken", token);

        // update authToken
        setAuthToken(token);
    };

    return (
        <AuthContext.Provider value={{ authToken, updateAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
