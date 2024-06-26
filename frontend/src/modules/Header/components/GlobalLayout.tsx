import { useNavigate } from "react-router-dom"
import logo from "@/assets/images/images.png"
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedStore.ts"
import { deleteUser } from "@/store/slice/userSlice.ts"
import { logout } from "@/store/slice/authSlice.ts"
import { authAPI } from "@/modules/Login/API/authAPI.ts"
import { Layout, Menu } from "antd"
import { Content, Header } from "antd/es/layout/layout"

import { FC } from "react"

interface IProps {
    children: React.ReactNode
}

const GlobalLayout: FC<IProps> = ({ children }) => {
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
        <Layout>
            <Header
                style={{ background: "#ffffff" }}
            >
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectable={true}
                    style={{}}
                >
                    <Menu.Item
                        onClick={() => navigate("/")}
                    >
                        <img
                            src={logo}
                            alt="ASTU logo"
                            style={{ height: "40px" }}
                        />
                    </Menu.Item>

                    <Menu.Item
                        onClick={() => navigate("/olympiads")}
                    >
                        Соревнования
                    </Menu.Item>

                    {role === "ROLE_ADMIN" && (
                        <Menu.Item
                            onClick={() => navigate("/admin")}
                        >
                            Админ-панель

                        </Menu.Item>
                    )}

                    {role && (role === "ROLE_ADMIN" || role === "ROLE_OLYMPIAD_ADMIN") && (
                        <Menu.Item
                            onClick={() => navigate("/olympadmin")}
                        >
                            Управление соревнованиями

                        </Menu.Item>
                    )}

                    {(role == "ROLE_ADMIN" || role == "ROLE_INSPECTOR") &&
                        <Menu.Item
                            onClick={() => navigate("/estimate/olympiads")}
                        >

                            Оценивание

                        </Menu.Item>
                    }

                    {isAuth &&
                        <Menu.Item
                            onClick={() => navigate("/team")}
                        >
                            Моя команда
                        </Menu.Item>
                    }

                    {isAuth &&
                        <Menu.Item
                            onClick={() => navigate("/myolympiads")}
                        >
                            Мои соревнования
                        </Menu.Item>
                    }

                    {isAuth ? (
                        <Menu.Item
                            onClick={() => navigate("/profile")}
                        >
                            Профиль
                        </Menu.Item>
                    ) : (
                        <Menu.Item
                            onClick={() => navigate("/login")}
                        >
                            Войти
                        </Menu.Item>
                    )}

                    {isAuth &&
                        <Menu.Item
                            onClick={userLogout}
                        >
                            Выйти
                        </Menu.Item>
                    }
                </Menu>
            </Header>
            <Content>
                <div className="site-layout-content" style={{ minHeight: "100vh", padding: "50px 0px" }}>
                    {children}
                </div>
            </Content>
        </Layout>
    )
}

export default GlobalLayout