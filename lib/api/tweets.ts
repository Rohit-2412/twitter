import { API_URL, AUTH_TOKEN } from "./config";

export const listTweets = async () => {
    const token = AUTH_TOKEN;
    const res = await fetch(`${API_URL}/tweet`, {
        headers: {
            Authorization: `Bearer ${token}`,
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

export const getTweet = async (id: string) => {
    const token = AUTH_TOKEN;
    const res = await fetch(`${API_URL}/tweet/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
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

export const createTweet = async (data: { content: string }) => {
    const token = AUTH_TOKEN;
    const res = await fetch(`${API_URL}/tweet`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
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
