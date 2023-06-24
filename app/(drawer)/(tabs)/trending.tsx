import { StyleSheet, Text } from "react-native";
import {
    backgroundColor,
    secondaryTextColor,
    whiteColor,
} from "../../../assets/customColor";

import { View } from "../../../components/Themed";

export default function TrendingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trends for you</Text>
            <View style={styles.separator}></View>
            <View className={" items-center justify-center px-3 pb-5"}>
                <Text
                    style={{
                        fontWeight: "700",
                        fontSize: 32,
                        marginTop: 20,
                    }}
                >
                    No new trends for you
                </Text>
                <Text
                    style={{
                        color: secondaryTextColor,
                        fontSize: 22,
                    }}
                    className={"text-center mt-3"}
                >
                    It seems like there's not a lot to show you right now, but
                    you can see trends for other areas
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: whiteColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    separator: {
        height: 1,
        width: "100%",
        backgroundColor: backgroundColor,
        marginVertical: 5,
    },
});
