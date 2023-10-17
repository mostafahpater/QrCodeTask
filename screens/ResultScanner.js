import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultScanner({ route }) {
  const { params } = route;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Result scanner</Text>
      {params?.result && (
        <Text
          onPress={() => Linking.openURL(params?.result)}
          style={styles.paragraph}
        >
          {params?.result}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    // flex:2,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    // flex:1,
    fontSize: 16,
    marginBottom: 40,
    backgroundColor: "#f2f3f4",
    // width:'100%',
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical:'auto'
  },
});
