import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native";
import { login } from "../../lib/api/auth";
import { twitterBlue } from "../../assets/customColor";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const router = useRouter();

    // function to handle sign in and redirect to authenticate page
    const handleSignIn = async () => {
        try {
            await login({ email });
            router.push({
                pathname: "/authenticate",
                params: { email },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Sign in or create an account
            </Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={"Enter your Email Address"}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                autoCorrect={false}
                onSubmitEditing={handleSignIn}
                style={{
                    height: 50,
                    width: "95%",
                    borderWidth: 1,
                    borderColor: "lightgrey",
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                }}
            />

            <Pressable
                style={{
                    backgroundColor: twitterBlue,
                    width: "45%",
                    borderRadius: 5,
                    marginBottom: 10,
                }}
                onPress={handleSignIn}
            >
                <Text
                    style={{ color: "white", textAlign: "center", padding: 10 }}
                >
                    Sign in
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
});

export default SignIn;
