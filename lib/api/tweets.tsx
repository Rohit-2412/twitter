import { PropsWithChildren, createContext, useContext } from "react";

import { API_URL } from "./config";
import { useAuth } from "../../context/AuthContext";

const TweetsApiContext = createContext({});

const TweetsApiProvider = ({ children }: PropsWithChildren) => {
    // get auth token from auth context
    const { authToken } = useAuth();

    const listTweets = async () => {
        if (!authToken) return;

        const res = await fetch(`${API_URL}/tweet`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (res.status === 401) {
            throw new Error("Unauthorized Access");
        }

        if (res.status !== 200) {
            throw new Error("Failed to fetch tweets");
        }

        return await res.json();
    };

    const getTweet = async (id: string) => {
        if (!authToken) return;

        const res = await fetch(`${API_URL}/tweet/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (res.status === 401) {
            throw new Error("Unauthorized Access");
        }

        if (res.status !== 200) {
            throw new Error("Failed to fetch tweet");
        }

        return await res.json();
    };

    const createTweet = async (data: { content: string }) => {
        if (!authToken) return;

        const res = await fetch(`${API_URL}/tweet`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.status === 401) {
            throw new Error("Unauthorized Access");
        }

        if (res.status !== 200) {
            throw new Error("Failed to fetch tweets");
        }

        return await res.json();
    };

    return (
        <TweetsApiContext.Provider
            value={{
                listTweets,
                getTweet,
                createTweet,
            }}
        >
            {children}
        </TweetsApiContext.Provider>
    );
};

export default TweetsApiProvider;

export const useTweetsApi = () => useContext(TweetsApiContext);
