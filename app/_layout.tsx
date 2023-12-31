import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";

import AuthContextProvider from "../context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TweetsApiProvider from "../lib/api/tweets";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";

const client = new QueryClient();

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    return (
        <>
            {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
            {!loaded && <SplashScreen />}
            {loaded && <RootLayoutNav />}
        </>
    );
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <>
            <AuthContextProvider>
                <TweetsApiProvider>
                    <QueryClientProvider client={client}>
                        <ThemeProvider
                            value={
                                colorScheme === "dark"
                                    ? DarkTheme
                                    : DefaultTheme
                            }
                        >
                            <Stack>
                                <Stack.Screen
                                    name="(drawer)"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="modal"
                                    options={{ presentation: "modal" }}
                                />
                                <Stack.Screen
                                    name="new-tweet"
                                    options={{
                                        headerShown: false,
                                    }}
                                />

                                <Stack.Screen
                                    name="(auth)/signIn"
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <Stack.Screen
                                    name="(auth)/authenticate"
                                    options={{
                                        title: "Confirm OTP",
                                    }}
                                />
                            </Stack>
                        </ThemeProvider>
                    </QueryClientProvider>
                </TweetsApiProvider>
            </AuthContextProvider>
        </>
    );
}
