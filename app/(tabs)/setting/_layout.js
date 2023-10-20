import { Ionicons } from "@expo/vector-icons"
import { router, Stack } from "expo-router"
import { View } from "react-native"
import { Text } from "react-native-paper"
import Colors from "../../../constants/Colors"

const SettingLayout = () => {
    return (
        <Stack initialRouteName="(tabs)/setting/index">
            <Stack.Screen name="index"
                options={{
                    header: () => (
                        <View style={{ height: 55, backgroundColor: Colors.primaryBold, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                            <Text style={{ color: "white" }} variant='titleLarge'>Settings</Text>
                        </View>
                    )
                }}
            />


            <Stack.Screen name="profile" options={{
                header: () => (
                    <View style={{ height: 55, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color={Colors.primary} />
                            <Text style={{ color: Colors.primary, fontWeight: "bold" }} variant='titleLarge'>Profile</Text>
                        </View>
                    </View>
                )
            }} />


          
        </Stack>
    )
}

export default SettingLayout