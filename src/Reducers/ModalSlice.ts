/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  modals: { [key: string]: boolean };
}
const initialState: ModalState = {
  modals: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    hiddenModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
  },
});

export const { showModal, hiddenModal } = modalSlice.actions;
export default modalSlice.reducer;
