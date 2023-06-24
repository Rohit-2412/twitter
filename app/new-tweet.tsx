import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTweetsApi } from "../lib/api/tweets";

const user = {
    id: "t0",
    user: {
        id: "u1",
        username: "VadimNotJustDev",
        name: "Vadim",
        image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
    },
    createdAt: "2020-08-27T12:00:00.000Z",
    content: "Can you please check if the Subscribe button on Youtube works?",
    image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/thumbnail.png",
    numberOfComments: 123,
    numberOfRetweets: 11,
    numberOfLikes: 10,
};
export default function newTweet() {
    const [text, setText] = useState("");
    const router = useRouter();

    const queryClient = useQueryClient();
    const { createTweet } = useTweetsApi();

    const { mutateAsync, isLoading, isError, error } = useMutation({
        mutationFn: createTweet,
        onSuccess: (data) => {
            queryClient.setQueriesData(["tweets"], (existingTweets: any) => [
                data,
                ...existingTweets,
            ]);
        },
    });

    // handle tweet button
    const handleTweet = async () => {
        try {
            await mutateAsync({ content: text });

            setText("");
            router.back();
        } catch (e) {
            console.log("Error creating tweet", e);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View className={"flex-1 bg-white pt-2"}>
                {/* button to cancel or send tweet */}
                <View
                    className={
                        "flex-row justify-between items-center px-3 pt-2"
                    }
                >
                    <Link href={"/"}>
                        <Text className={"text-xl font-bold"}>Cancel</Text>{" "}
                    </Link>
                    {isLoading && <ActivityIndicator />}
                    <Pressable
                        onPress={handleTweet}
                        className="bg-[#1c9bf0] px-5 py-2 rounded-3xl"
                    >
                        <Text className={"font-medium text-lg text-white"}>
                            Tweet
                        </Text>
                    </Pressable>
                </View>

                <View className={"flex-row p-2 mt-2"}>
                    <Image
                        src={user.user.image}
                        className={"h-12 w-12 rounded-full aspect-square mr-2"}
                    />
                    <TextInput
                        placeholder="What's happening?"
                        className={"flex-1"}
                        multiline
                        numberOfLines={3}
                        value={text}
                        onChangeText={(text) => setText(text)}
                    />
                </View>
            </View>
            {/* error */}
            {isError && <Text>Error:{error.message}</Text>}
        </SafeAreaView>
    );
}
