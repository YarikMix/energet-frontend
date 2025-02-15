import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { orderReducer } from "entities/Order";
import { configuratorReducer } from "entities/Configurator";
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
        orderReducer,
        configuratorReducer,
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
