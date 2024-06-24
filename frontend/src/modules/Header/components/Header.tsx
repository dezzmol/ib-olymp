import { Link, useNavigate } from "react-router-dom"
import logo from "@/assets/images/AGTU_zoloto1.png"
import UserDropdown from "@/modules/Header/components/UserDropdown.tsx"
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedStore.ts"
import { deleteUser } from "@/store/slice/userSlice.ts"
import { logout } from "@/store/slice/authSlice.ts"
import { authAPI } from "@/modules/Login/API/authAPI.ts"

const Header = () => {
    const { username, role } = useAppSelector((state) => state.userReducer)
    const { isAuth } = useAppSelector((state) => state.authReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [logoutReq] = authAPI.useLogoutMutation()
    const userLogout = async () => {
        await logoutReq()
        dispatch(deleteUser())
        dispatch(logout())
        navigate("/")
    }

    return (
        <header className={"sticky top-0 z-10 flex justify-center h-20 bg-my-dark"}>
            <nav
                aria-label="primary-navigation"
                className="flex items-center justify-between w-1150"
            >
                <div className="flex items-center">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="ASTU logo"
                            className="p-3 w-28"
                        />
                    </Link>
                </div>

                <Link to={"/olympiads"}>
                    <b className="text-xl font-normal font-russo text-my-blue">
                        Олимпиады
                    </b>
                </Link>

                {role === "ROLE_ADMIN" && (
                    <Link to="/admin" className="">
                        <b className="text-xl font-normal font-russo text-my-blue">
                            Админ-панель
                        </b>
                    </Link>
                )}

                {role && (role === "ROLE_ADMIN" || role === "ROLE_OLYMPIAD_ADMIN") && (
                    <Link to="/olympadmin" className="">
                        <b className="text-xl font-normal font-russo text-my-blue">
                            Управление олимпиадами
                        </b>
                    </Link>
                )}

                {isAuth ? (
                    <UserDropdown
                        userName={username!}
                        logout={userLogout}
                        role={role!}
                    />
                ) : (
                    <Link to="/login">
                        <b className="text-xl font-normal font-russo text-my-white">
                            Войти
                        </b>
                    </Link>
                )}
            </nav>
        </header>
    )
}

export default Header