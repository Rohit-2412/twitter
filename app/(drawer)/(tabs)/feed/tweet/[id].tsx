import { ActivityIndicator, Text } from "react-native";

import Tweet from "../../../../../components/Tweet";
import { getTweet } from "../../../../../lib/api/tweets";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "expo-router";

export default function TweetScreen() {
    const { id } = useSearchParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ["tweet", id],
        queryFn: () => getTweet(id as string),
    });

    if (isLoading)
        return (
            <>
                <ActivityIndicator />
                <Text>Loading...</Text>
            </>
        );

    if (error) return <Text>Could not find the tweet with id {id}</Text>;

    return <Tweet tweet={data} />;
}
