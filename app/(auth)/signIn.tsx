import { Button, Pressable, StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native";
import { twitterBlue } from "../../assets/customColor";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");

    const router = useRouter();

    const handleSignIn = () => {
        router.push({
            pathname: "/authenticate",
            params: { email },
        });
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
});
