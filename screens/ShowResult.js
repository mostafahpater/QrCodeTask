import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { deleteQrCode } from "../Redux/Slice/QrcodeResult";
import { useDispatch } from "react-redux";

const ShowResult = ({ item, deleteNotes, index, addNotes, deleteQrcode }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleshowUpdateInput = () => {
    setShowUpdateInput(!showUpdateInput);

    setTextValue(item?.notes);
  };

  const onChangeText = (inputText) => {
    setTextValue(inputText);
    if (inputText === "" || inputText === undefined) {
      setError("Please enter a value");
    } else {
      setError("");
    }
  };

  const onSubmit = () => {
    if (textValue === "" || textValue === undefined) {
      setError("Please enter a value");
    } else {
      setError("");
      setModalVisible(false);
      setShowUpdateInput(!showUpdateInput);
      addNotes(item, textValue, index);
      // setTextValue(inputText);
    }
  };

  // useEffect(()=>{
  //     deleteNotes(item)
  // },[])
  return (
    <View>
      <TouchableOpacity style={styles.modalOpen} onPress={handleOpenModal}>
        <Text style={styles.openText}>show QR Code</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTextHeader}>Result scan</Text>
            <Text style={styles.modalText}>{item?.title}</Text>
            {item?.notes && (
              <>
                <Text style={styles.modalTextHeader}>Notes scan</Text>
                <Text style={styles.modalText}>{item?.notes}</Text>
              </>
            )}
            <View style={styles.addDeleteScan}>
              <TouchableOpacity
                style={styles.addNotes}
                onPress={() => handleshowUpdateInput()}
              >
                <Text style={styles.openText}>Add Notes</Text>
              </TouchableOpacity>
              {item?.notes && (
                <>
                  <TouchableOpacity
                    style={styles.addNotes}
                    onPress={() => handleshowUpdateInput()}
                  >
                    <Text style={styles.openText}>Update Notes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteScan}
                    onPress={() => deleteNotes(item, index)}
                  >
                    <Text style={styles.openText}>Delete Notes</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            {showUpdateInput && (
              <View style={{ marginBottom: 6 }}>
                <TextInput
                  style={styles.input}
                  //   placeholder={placeholder}
                  onChangeText={onChangeText}
                  value={textValue}
                />
                {error !== "" && <Text style={styles.errorText}>{error}</Text>}
                <TouchableOpacity
                  style={[styles.addNotes, { width: 60 }]}
                  onPress={() => onSubmit()}
                >
                  <Text style={styles.openText}>submit</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.addDeleteScan}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={handleCloseModal}
              >
                <Text style={styles.openText}>Close Modal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteScan}
                onPress={() => deleteQrcode(item)}
              >
                <Text style={styles.openText}>Delete QRCode</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShowResult;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalTextHeader: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  modalOpen: {
    backgroundColor: "blue",
    padding: 6,
    borderRadius: 5,
  },
  openText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  modalClose: {
    backgroundColor: "blue",
    padding: 6,
    borderRadius: 5,
    marginRight: 4,
    width: 93,
  },
  addDeleteScan: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    // alignContent:'space-between'
  },
  addNotes: {
    backgroundColor: "blue",
    padding: 6,
    borderRadius: 5,
    marginRight: 4,
  },
  deleteScan: {
    backgroundColor: "#dc2031",
    padding: 6,
    borderRadius: 5,
    marginRight: 4,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});
