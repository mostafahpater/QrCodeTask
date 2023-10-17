import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import QrCodeScanner from "./screens/QrCodeScanner";
import NavigateScreen from "./Navigation/NavigateScreen";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import TabBar from "./Navigation/TabBar";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <StatusBar translucent={true} animated={true} />
        <TabBar />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
