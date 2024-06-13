import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/modules/Profile"

interface IStudentSlice {
    user: User | null
    age: number | null
    phoneNumber: string | null
    university: string | null
    isCaptain: boolean | null
    otherContactsData: string | null
}

const initialState: IStudentSlice = {
    user: null,
    age: null,
    phoneNumber: null,
    university: null,
    isCaptain: null,
    otherContactsData: null
}

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        registerStudent: (state, action: PayloadAction<IStudentSlice>) => {
            state.user = action.payload.user
            state.age = action.payload.age
            state.phoneNumber = action.payload.phoneNumber
            state.university = action.payload.university
            state.isCaptain = action.payload.isCaptain
            state.otherContactsData = action.payload.otherContactsData
        },
        deleteStudent: (state) => {
            state.user = null
            state.age = null
            state.phoneNumber = null
            state.university = null
            state.isCaptain = null
            state.otherContactsData = null
        }
    }
})

export const { registerStudent, deleteStudent } = studentSlice.actions
export default studentSlice.reducer