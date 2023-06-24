import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tweet from "../../../../components/Tweet";
// import tweets from "../../../../assets/data/tweets";
import { twitterBlue } from "../../../../assets/customColor";
import { useQuery } from "@tanstack/react-query";
import { useTweetsApi } from "../../../../lib/api/tweets";

export default function FeedScreen() {
    const { listTweets } = useTweetsApi();
    const { data, isLoading, error } = useQuery({
        queryKey: ["tweets"],
        queryFn: listTweets,
    });

    // const [tweets, setTweets] = useState([]);
    // useEffect(() => {
    //     const fetchTweets = async () => {
    //         // fetch tweets
    //         const data = await listTweets();
    //         setTweets(data);
    //     };

    //     fetchTweets();
    // }, []);

    if (isLoading)
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator shouldRasterizeIOS />
            </View>
        );

    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingHorizontal: 10,
                    }}
                >
                    Error fetching tweets. Please try again later.
                </Text>
            </View>
        );
    }

    return (
        <View className={"bg-white flex-1"}>
            <FlatList
                data={data}
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
