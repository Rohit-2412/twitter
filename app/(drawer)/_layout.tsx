import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";

// createDrawerNavigator is a function that returns a DrawerNavigator.
const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
    initialRouteName: "(tabs)",
};

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Text className={"text-xl font-semibold text-center mb-2"}>
                Rohit
            </Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}
export default function DrawerLayout() {
    return (
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: "Feed",
                    title: "Feed",
                    headerShown: false,
                }}
            />
        </Drawer>
    );
}
