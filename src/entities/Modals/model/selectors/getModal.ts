import { RootState } from "src/app/providers/StoreProvider";

export const getModal = (state: RootState): string => state.modalsReducer.modal;
