import { Link } from "react-router-dom"
import logo from "@/assets/images/AGTU_zoloto1.png"
import UserDropdown from "@/modules/Header/components/UserDropdown.tsx"
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedStore.ts"
import { deleteUser } from "@/store/slice/userSlice.ts"

const Header = () => {
    const { isAuth, username, role } = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()

    const userLogout = () => {
        dispatch(deleteUser())
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

                {role === "ADMIN" && (
                    <Link to="/admin" className="">
                        <b className="text-xl font-normal font-russo text-my-blue">
                            Админ-панель
                        </b>
                    </Link>
                )}

                {isAuth ? (
                    <UserDropdown
                        userName={username!}
                        logout={userLogout}
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