import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from "@/store/slice/userSlice.ts"

const rootReducer = combineReducers({
    userReducer: userSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch