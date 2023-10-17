import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import QrcodeResultSlice from "./Slice/QrcodeResult";
import Notes from "./Slice/Notes";

export const store = configureStore({
  reducer: {
    qrCode: QrcodeResultSlice,
    notes: Notes,
  },
});
