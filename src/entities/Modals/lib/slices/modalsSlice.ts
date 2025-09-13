import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    modal: null,
};

const modalsSlice = createSlice({
    name: "modals",
    initialState: initialState,
    reducers: {
        setModal: (state, action: PayloadAction) => {
            state.modal = action.payload;
        },
        hideModal: (state) => {
            state.modal = null;
        },
    },
});

export const { setModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
