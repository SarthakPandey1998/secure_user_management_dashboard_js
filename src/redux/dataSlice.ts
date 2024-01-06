// src/redux/dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  userData: any; // Replace 'any' with the actual user data type
  // Add other data-related state here
}

const initialState: DataState = {
  userData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    // Add other data-related reducers here
  },
});

export const { setUserData } = dataSlice.actions;
export default dataSlice.reducer;
