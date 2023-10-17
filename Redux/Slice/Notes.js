import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addUpdateNotes = createAsyncThunk(
  "addUpdateNotes/data",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await AsyncStorage.setItem(
        "QRCode",
        JSON.stringify([
          ...data.data.filter((ele) => ele.title !== data?.item?.title),
          { ...data?.newValue },
        ])
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteNotes = createAsyncThunk(
  "deleteNotes/data",
  async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await AsyncStorage.setItem(
        "QRCode",
        JSON.stringify([
          ...data?.data.filter((ele) => ele.title !== data?.item.title),
          { ...data?.newValue },
        ])
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const Notes = createSlice({
  name: "notes",
  initialState: {
    data: null,
    hasError: false,
    isLoading: false,
  },
  extraReducers: (buider) => {
    buider
      .addCase(addUpdateNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUpdateNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addUpdateNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default Notes.reducer;
