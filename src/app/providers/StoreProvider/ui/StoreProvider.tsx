import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persister, store } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persister}>{children}</PersistGate>
        </Provider>
    );
};
