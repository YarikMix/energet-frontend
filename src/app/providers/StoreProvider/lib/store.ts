import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "auth",
    storage,
};

export const store = configureStore({
    reducer: {
        userReducer: persistReducer(persistConfig, userReducer),
    },
});

export const persister = persistStore(store);
