import { Navigate, Route, Routes } from "react-router-dom"
import { privatePages, publicPages } from "@/modules/AppRouter/routes"
import { useAppSelector } from "@/hooks/useTypedStore.ts"

const AppRouter = () => {
    const { isAuth } = useAppSelector((state) => state.authReducer)

    return (
        <Routes>
            {isAuth &&
                privatePages.map((route) => (
                    <Route
                        path={route.path}
                        element={<route.component />}
                        key={route.path}
                    />
                ))
            }

            {publicPages.map((route) => (
                <Route
                    path={route.path}
                    element={<route.component />}
                    key={route.path}
                />
            ))}
            <Route path={"*"} element={<Navigate to={"/"} replace={true} />} />
        </Routes>
    )
}

export default AppRouter