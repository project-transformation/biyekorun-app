import { Tabs } from 'expo-router/tabs';
import IonIcons from 'react-native-vector-icons/Ionicons'
import MainHeader from '../../components/MainHeader';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native'; // Import StyleSheet for styling
import Colors from '../../constants/Colors';
import { FontAwesome, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

export default function AppLayout() {
    return (
        <View style={styles.container}>
            {/* Set the status bar color */}
            <StatusBar style="light" backgroundColor={Colors.primaryBold} />

            <Tabs
                sceneContainerStyle={{
                    marginTop: Constants.statusBarHeight
                }}
                screenOptions={{
                    tabBarStyle: {
                        paddingVertical: 7,
                        height: 60
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{

                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="home"
                                size={24}
                                color={focused ? Colors.primary : '#696969'} // Change color based on focus
                            />
                        ),
                        tabBarLabel: ({ focused, color, size }) => (
                            <Text style={{ color: focused ? Colors.primary : '#696969', marginBottom: 8 }}>Home</Text>
                        ),

                        header: () => <MainHeader />
                    }}
                />
                <Tabs.Screen
                    name="search"
                    options={{
                        header: () => (
                            <View style={{ height: 55, backgroundColor: Colors.primaryBold, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                                <Text style={{ color: "white" }} variant='titleLarge'>Search</Text>
                            </View>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="search"
                                size={24}
                                color={focused ? Colors.primary : '#696969'} // Change color based on focus
                            />
                        ),
                        tabBarLabel: ({ focused, color, size }) => (
                            <Text style={{ color: focused ? Colors.primary : '#696969', marginBottom: 8 }}>Search</Text>
                        )
                    }}
                />




                <Tabs.Screen
                    name="inbox"
                    options={{
                        header: () => (
                            <View style={{ height: 55, backgroundColor: Colors.primaryBold, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                                <Text style={{ color: "white" }} variant='titleLarge'>Inbox</Text>
                            </View>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name="md-chatbox-ellipses"
                                size={24}
                                color={focused ? Colors.primary : '#696969'}


                            />
                        ),
                        tabBarLabel: ({ focused, color, size }) => (
                            <Text style={{ color: focused ? Colors.primary : '#696969', marginBottom: 8 }}>Inbox</Text>
                        )
                    }}
                />
                <Tabs.Screen
                    name="premium"
                    options={{
                        header: () => (
                            <View style={{ height: 55, backgroundColor: Colors.primaryBold, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                                <Text style={{ color: "white" }} variant='titleLarge'>Premium</Text>
                            </View>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome5
                                name="crown"
                                size={24}
                                color={focused ? Colors.primary : '#696969'}


                            />
                        ),
                        tabBarLabel: ({ focused, color, size }) => (
                            <Text style={{ color: focused ? Colors.primary : '#696969', marginBottom: 8 }}>Premium</Text>
                        )
                    }}
                />
                <Tabs.Screen
                    name="setting"

                    options={{
                        header: () => (
                            <View style={{ height: 55, backgroundColor: Colors.primaryBold, flexDirection: "row", alignItems: "center", paddingHorizontal: 10 }}>
                                <Text style={{ color: "white" }} variant='titleLarge'>Settings</Text>
                            </View>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="gear"
                                size={24}
                                color={focused ? Colors.primary : '#696969'}


                            />
                        ),
                        tabBarLabel: ({ focused, color, size }) => (
                            <Text style={{ color: focused ? Colors.primary : '#696969', marginBottom: 8 }}>Setting</Text>
                        )
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.primaryBold, // Set your background color here
    },
});
