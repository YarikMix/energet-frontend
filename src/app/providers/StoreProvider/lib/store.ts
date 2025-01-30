import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { orderReducer } from "entities/Order";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "auth",
    storage,
};

export const store = configureStore({
    reducer: {
        userReducer: persistReducer(persistConfig, userReducer),
        orderReducer: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persister = persistStore(store);
