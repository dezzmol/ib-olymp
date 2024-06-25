import { Link, useNavigate } from "react-router-dom"
import { FC } from "react"
import { Menu } from "antd"

interface UserDropDownProps {
    userName: string
    logout: () => void
    role: string
}

const UserDropdown: FC<UserDropDownProps> = ({ userName, logout, role }) => {
    const navigate = useNavigate()

    return (
        <Menu.Item
            onClick={() => navigate("/profile")}
        >
            <Menu.Item>

            </Menu.Item>

        </Menu.Item>
    )
}

export default UserDropdown