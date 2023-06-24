import { Text, View } from "react-native";

import { EvilIcons } from "@expo/vector-icons";

type IconButtonProps = {
    name: React.ComponentProps<typeof EvilIcons>["name"];
    text?: string | number;
};
const IconButton = ({ name, text }: IconButtonProps) => (
    <View className={"flex-row"}>
        <EvilIcons name={name} size={20} color="gray" />
        <Text className={"text-gray-500 ml-1"}>{text}</Text>
    </View>
);

export default IconButton;
