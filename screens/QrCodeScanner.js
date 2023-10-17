import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QrCodeScanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // AsyncStorage.removeItem('QRCode')
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const oldQRCodedata = await AsyncStorage.getItem("QRCode").then((value) => {
      return value;
    });
    const scanData = {
      title: data,
    };

    if (oldQRCodedata === null) {
      await AsyncStorage.setItem("QRCode", JSON.stringify([scanData]));
    } else {
      const localStorageArry = JSON.parse(oldQRCodedata);
      await AsyncStorage.setItem(
        "QRCode",
        JSON.stringify([...localStorageArry, scanData])
      );
    }
    navigation.navigate("ResultScanner", {
      result: data,
    });
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the QR code Scanner</Text>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.camera}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(!scanned)}
      >
        <Text style={styles.buttonText}>Scan QR to Start your job</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
