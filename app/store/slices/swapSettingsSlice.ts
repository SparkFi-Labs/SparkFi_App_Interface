import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SwapSettingsState {
  slippage: number;
}

const initialState: SwapSettingsState = {
  slippage: 0.1
};

export const createSettingsSlice = createSlice({
  name: "Swap Settings",
  initialState,
  reducers: {
    updateSlippage: (state, action: PayloadAction<number>) => {
      state.slippage = action.payload;
    }
  }
});

export const { updateSlippage } = createSettingsSlice.actions;
export default createSettingsSlice.reducer;
