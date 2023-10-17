import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QrCodeScanner from "../screens/QrCodeScanner";
import ResultScanner from "../screens/ResultScanner";
import AllResults from "../screens/AllResults";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome5";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabBar = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  const { height } = useWindowDimensions();
  const tabBarStyle = {
    backgroundColor: "#5B37B7",
    elevation: 10,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    height: height < 450 ? 40 : "8%",
    backfaceVisibility: "visible",
  };
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: tabBarStyle,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "#0000",
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={{ backgroundColor: "#FFF" }}
    >
      <Screen
        name="QrCodeScanner"
        component={QrCodeScanner}
        options={{
          headerShown: false,
          title: "QR Code Scanner",
          tabBarVisible: false,
          tabBarLabelStyle: { color: "#fff", fontSize: 13 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              color={"#fff"}
              size={26}
            />
          ),
        }}
      />
      <Screen
        name="ResultScanner"
        component={ResultScanner}
        options={{
          headerShown: false,
          title: "Result Scanner",
          tabBarLabelStyle: { color: "#fff", fontSize: 13 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-remove"
              color={"#fff"}
              size={26}
            />
          ),
        }}
      />
      <Screen
        name="Results"
        component={AllResults}
        options={{
          headerShown: false,
          tabBarLabelStyle: { color: "#fff", fontSize: 13 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-sequential"
              color={"#fff"}
              size={26}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default TabBar;
