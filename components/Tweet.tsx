import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";
import { Link } from "expo-router";
import { TweetType } from "../types";
import { whiteColor } from "../assets/customColor";

type TweetProps = {
    tweet: TweetType;
};
function formatDate(date: string) {
    // calculate the number of days between date parameter and now
    const diff = Number(new Date()) - Number(new Date(date));
    // convert the number of days to number of days ago
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    // if the number of days is greater than 365, return
    // the date in the format of "Jan 1, 2020"
    if (days > 365) {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    // if the number of days is greater than 7, return
    // the date in the format of "Jan 1"
    if (days > 7) {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    }

    // if the number of days is greater than 0, return
    // the date in the format of "1d"
    if (days > 0) {
        return days + "d";
    }

    // calculate the number of hours between date parameter and now
    const hours = Math.floor(diff / (1000 * 60 * 60));
    // if the number of hours is greater than 0, return
    // the date in the format of "1h"
    if (hours > 0) {
        return hours + "h";
    }

    // calculate the number of minutes between date parameter and now
    const minutes = Math.floor(diff / (1000 * 60));
    // if the number of minutes is greater than 0, return
    // the date in the format of "1m"
    if (minutes > 0) {
        return minutes + "m";
    }

    // calculate the number of seconds between date parameter and now
    const seconds = Math.floor(diff / 1000);
    // if the number of seconds is greater than 0, return
    // the date in the format of "1s"
    if (seconds > 0) {
        return seconds + "s";
    }

    // if the number of seconds is less than 0, return
    // the date in the format of "now"
    return "now";
}

export default function Tweet({ tweet }: TweetProps) {
    return (
        <Link href={`/feed/tweet/${tweet.id}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    src={tweet.user.image}
                    className={"h-12 w-12 rounded-full"}
                />

                {/* name username time of post */}
                <View className={"ml-2 flex-1"}>
                    <View className={"flex flex-row"}>
                        <Text className={"font-semibold"}>
                            {tweet.user.name}
                        </Text>
                        <Text className={"font-light text-gray-600 ml-2"}>
                            {tweet.user.username} ·{formatDate(tweet.createdAt)}
                        </Text>
                        <Entypo
                            name={"dots-three-horizontal"}
                            size={16}
                            color={"gray"}
                            style={{
                                marginLeft: "auto",
                                marginRight: 10,
                            }}
                        />
                    </View>

                    {/* tweet */}
                    <Text className={"leading-5 mt-2 pr-2"}>
                        {tweet.content}
                    </Text>

                    {/* tweet image */}
                    {tweet.image && (
                        <Image
                            src={tweet.image}
                            className={"aspect-video rounded-xl mt-2 w-full"}
                        />
                    )}
                    {/* footer having icons */}
                    <View
                        className={
                            "mt-5 mb-2  flex-row items-center justify-between"
                        }
                    >
                        <IconButton
                            name={"comment"}
                            text={tweet.numberOfComments || 0}
                        />
                        <IconButton
                            name={"retweet"}
                            text={tweet.numberOfRetweets || 0}
                        />
                        <IconButton
                            name={"heart"}
                            text={tweet.numberOfLikes || 0}
                        />
                        <IconButton
                            name={"chart"}
                            text={tweet.impressions || 0}
                        />
                        <IconButton name={"share-apple"} />
                    </View>
                </View>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgrey",
        backgroundColor: whiteColor,
    },
});
