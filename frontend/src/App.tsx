import { BrowserRouter } from "react-router-dom"
import AppRouter from "@/modules/AppRouter"
import Header from "@/modules/Header"
import { useEffect } from "react"
import { setUser } from "@/store/slice/userSlice.ts"
import { useGetUserMutation } from "@/modules/Profile/API/userAPI.ts"
import { useAppDispatch } from "@/hooks/useTypedStore.ts"
import { login, logout } from "@/store/slice/authSlice.ts"

const App = () => {
    const [getData] = useGetUserMutation()
    const dispatch = useAppDispatch()

    const getAcc = async () => {
        const token = localStorage.getItem("accessToken")

        if (token === "") {
            return
        }

        dispatch(login(token!))

        const result = await getData()

        if (result.error) {
            console.log(result.error)
            dispatch(logout())
            return
        }

        if ("data" in result) {
            dispatch(setUser(result.data!))
        }
    }

    useEffect(() => {
        getAcc()
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App