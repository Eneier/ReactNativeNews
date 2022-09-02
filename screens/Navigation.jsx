import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {FullPostScreen} from "./FullPost";
import {HomeScreen} from "./Home";

const Stack = createNativeStackNavigator()

export const Navigation = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Main News'}}/>
            <Stack.Screen name="FullPost" component={FullPostScreen} options={{ title: 'Details'}}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;