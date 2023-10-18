import { Tabs } from 'expo-router/tabs';
import IonIcons from 'react-native-vector-icons/Ionicons'
export default function AppLayout() {
    return (
        <Tabs >
            <Tabs.Screen
                // Name of the route to hide.
                name="home"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: "/home",
                    tabBarIcon:()=><IonIcons size={25} name='home-outline' />,
                    tabBarLabel:"Home"
                }}
                
            />
            <Tabs.Screen
                // Name of the route to hide.
                name="search"
                options={{
                    // This tab will no longer show up in the tab bar.
                    href: "/search",
                    tabBarIcon:()=><IonIcons size={25} name='search' />,
                    tabBarLabel:"Search"
                }}
            />
        </Tabs>
    );
}