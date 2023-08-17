import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import HomeScreen, { screenOptions as HomeOptions} from "../screens/Home"
import Settings from "../screens/Settings"
import Actions from "../screens/Actions"
import News from "../screens/News"
import Portafolio from "../screens/Portafolio"
import Prices from "../screens/Prices"
import TabBar from "../components/TabBar"



export type RootStackParamList = {
    HomeScreen: undefined;
    News: undefined;
}

const TabBarNavigator = createBottomTabNavigator()
const HomeStackNavigator = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return(
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen name="HomeScreen" component={HomeScreen} options={HomeOptions} />
            <HomeStackNavigator.Screen name="News" component={News} />
        </HomeStackNavigator.Navigator>
    )

}



const TabNavigator = () => {
    return (
        <TabBarNavigator.Navigator
            tabBar={ (props) => <TabBar {...props} /> }
        >
            <TabBarNavigator.Screen name="Home" component={HomeNavigator} />
            <TabBarNavigator.Screen name="Portafolio" component={Portafolio} />
            <TabBarNavigator.Screen name="Actions" component={Actions} />
            <TabBarNavigator.Screen name="Prices" component={Prices} />
            <TabBarNavigator.Screen name="Settings" component={Settings} />
        </TabBarNavigator.Navigator>
    )
}



const AppNavigation = () => {
    return(
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    )
}

export default AppNavigation