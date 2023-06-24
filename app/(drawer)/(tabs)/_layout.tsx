import { Image, Pressable, Text, View, useColorScheme } from "react-native";
import { Link, Tabs, useNavigation } from "expo-router";

import Colors from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

function AvatarHeader({ img }: { img?: string }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.openDrawer()}>
            <Image
                src="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg"
                className={"h-8 w-8 rounded-full ml-4"}
            />
        </Pressable>
    );
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
        >
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarLabel: "Home",
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={24} color={color} />
                    ),
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <Feather
                                        name="settings"
                                        size={25}
                                        color={
                                            Colors[colorScheme ?? "light"].text
                                        }
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),

                    headerLeft: () => (
                        <Link href="/(drawer)" asChild>
                            <Pressable>{() => <AvatarHeader />}</Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="trending"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="search" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="bell-o" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="messages"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="envelope-o" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
