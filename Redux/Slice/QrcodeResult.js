import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const qrcodeResults = createAsyncThunk(
  "qrcodeResult/data",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await AsyncStorage.getItem("QRCode");
      return JSON.parse(res);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteQrCode = createAsyncThunk(
  "deleteQrCode/data",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const res = await AsyncStorage.setItem(
        "QRCode",
        JSON.stringify([
          ...data?.data.filter((ele) => ele.title !== data?.item.title),
        ])
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const QrcodeResultSlice = createSlice({
  name: "QrcodeResults",
  initialState: {
    data: null,
    hasError: false,
    isLoading: false,
  },
  extraReducers: (buider) => {
    buider
      .addCase(qrcodeResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(qrcodeResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(qrcodeResults.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteQrCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQrCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteQrCode.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default QrcodeResultSlice.reducer;
