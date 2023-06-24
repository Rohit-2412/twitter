import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native";
import { authenticate } from "../../lib/api/auth";
import { twitterBlue } from "../../assets/customColor";
import { useSearchParams } from "expo-router";
import { useState } from "react";

export default function Authenticate() {
    const [code, setCode] = useState("");
    const { email } = useSearchParams();

    const onConfirm = async () => {
        if (typeof email !== "string") return;

        // make api call to authenticate
        try {
            const res = await authenticate({ email, emailToken: code });
        } catch (e) {
            console.log(e.message);
            Alert.alert("Error", "Email code doesn't match.");
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
                Enter OTP
            </Text>
            <TextInput
                value={code}
                onChangeText={setCode}
                placeholder={"Enter OTP"}
                keyboardType="number-pad"
                autoCapitalize={"none"}
                autoCorrect={false}
                onSubmitEditing={onConfirm}
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
                onPress={onConfirm}
            >
                <Text
                    style={{ color: "white", textAlign: "center", padding: 10 }}
                >
                    Confirm
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
