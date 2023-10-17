import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import ShowResult from "./ShowResult";
import { useDispatch, useSelector } from "react-redux";
import { deleteQrCode, qrcodeResults } from "../Redux/Slice/QrcodeResult";
import { addUpdateNotes, deleteNotes } from "../Redux/Slice/Notes";
import { useIsFocused } from "@react-navigation/native";

const AllResults = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { data, isLoading, hasError } = useSelector((state) => state.qrCode);
  useEffect(() => {
    dispatch(qrcodeResults());
  }, [isFocused]);

  const addNotes = async (item, text) => {
    const newValue = await { title: item?.title, notes: text };
    dispatch(addUpdateNotes({ newValue, data, item })).then((res) => {
      dispatch(qrcodeResults());
    });
  };
  const deletenotes = async (item, index) => {
    const newValue = await { title: item.title };
    dispatch(deleteNotes({ newValue, data, item })).then(() => {
      dispatch(qrcodeResults());
    });
  };

  const deleteQrcode = (item) => {
    dispatch(deleteQrCode({ data, item })).then(() => [
      dispatch(qrcodeResults()),
    ]);
  };

  const deleteAllQRCode = () => {
    AsyncStorage.removeItem("QRCode").then(() => {
      dispatch(qrcodeResults());
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {!isLoading && data ? (
        <>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <View style={styles.itemScan} key={index}>
                <ShowResult
                  item={item}
                  index={index}
                  deleteQrcode={deleteQrcode}
                  deleteNotes={deletenotes}
                  addNotes={addNotes}
                />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteAllQRCode()}
          >
            <Text style={styles.buttonText}>Delete All QR Code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.QrCodeNotFound}>Data not found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#f2f3f4",
    // margin:5,
  },
  itemScan: {
    backgroundColor: "#f2f3f4",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    // marginVertical: 8,
    borderBottomColor: "#c0c0c0",
    borderBottomWidth: 1,
    // borderRadius:10,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: "#363636",
  },
  button: {
    backgroundColor: "#dc2031",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",

    marginHorizontal: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  QrCodeNotFound: {
    fontSize: 20,
    fontWeight: "bold",
    // color: 'red',
  },
});
