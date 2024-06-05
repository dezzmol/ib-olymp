import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/modules/Profile"

interface IUserSlice {
    id: number | null
    email: string | null
    username: string | null
    name: string | null
    surname: string | null
    patronymic: string | null
    role: string | null
    isAuth: boolean
}

const initialState: IUserSlice = {
    id: null,
    email: null,
    username: null,
    name: null,
    surname: null,
    patronymic: null,
    role: null,
    isAuth: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.surname = action.payload.surname;
            state.patronymic = action.payload.patronymic;
            state.role = action.payload.role;
            state.isAuth = true;
        },
        deleteUser: (state) => {
            state.id = null
            state.email = null
            state.name = null
            state.username = null
            state.surname = null
            state.patronymic = null
            state.role = null
            state.isAuth = false;
            localStorage.setItem("accessToken", "")
        }
    }
})

export const { setUser, deleteUser } = userSlice.actions
export default userSlice.reducer