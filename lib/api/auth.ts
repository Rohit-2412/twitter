import { API_URL } from "./config";

export const login = async (data: { email: string }) => {
    // send a post req to /auth/login with the email

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error(await res.text());
    }
};

export const authenticate = async (data: {
    email: string;
    emailToken: string;
}) => {
    // send a post req to /auth/authenticate with the email

    const res = await fetch(`${API_URL}/auth/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (res.status === 200) {
        return res.json();
    } else {
        throw new Error(await res.text());
    }
};
