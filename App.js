import { Settings, StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import color from "./src/constants/colors";

import Navigation from "./src/components/StartingScreenNavigator";
import axios from "axios";
axios.defaults.baseURL =
  "https://mind-care-backend-7dd9b4794b38.herokuapp.com/api/v1/client";
// axios.defaults.baseURL = "http://192.168.100.147:8080/api/v1/client";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
if (module.hot) {
  module.hot.accept();
}
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider>
      {/* <NavigationContainer>
        <TabNavigator />  
      </NavigationContainer> */}
      {/* <MainScreen /> */}
      <Navigation />
      {/* <ForgotPassword /> */}
      {/* <Profile /> */}
      {/* <Signin /> */}
      {/* <Profile /> */}
      {/* <Settings /> */}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent(appName, () => Main);
