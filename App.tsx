import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import NewUser from "./screens/NewUser";
import MyProfile from "./screens/home/MyProfile";
import Chat from "./screens/Chat";
import { firebase } from "./config";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Profile"
          component={MyProfile}
          options={{ headerShown: true }}
          initialParams={{
            currentId: firebase.auth().currentUser?.uid,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
