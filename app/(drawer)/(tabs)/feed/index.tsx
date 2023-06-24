import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet } from "react-native";

import { Link } from "expo-router";
import Tweet from "../../../../components/Tweet";
import { View } from "../../../../components/Themed";
import tweets from "../../../../assets/data/tweets";
import { twitterBlue } from "../../../../assets/customColor";

export default function FeedScreen() {
    return (
        <View className={"bg-white flex-1"}>
            <FlatList
                data={tweets}
                renderItem={({ item }) => <Tweet tweet={item} />}
            />

            {/* floating action button to create a new tweet */}
            <Link href={"/new-tweet"} asChild>
                <Pressable
                    className={
                        "rounded-full justify-center items-center h-[50px] w-[50px] absolute right-5 bottom-4"
                    }
                    style={styles.fab}
                >
                    <MaterialCommunityIcons
                        name="feather"
                        size={25}
                        color="white"
                    />
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.5,
        elevation: 9,
        backgroundColor: twitterBlue,
    },
});
