import { Stack } from "expo-router"

const SettingLayout = () => {
    return (
        <Stack initialRouteName="(tabs)/setting/index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}

export default SettingLayout