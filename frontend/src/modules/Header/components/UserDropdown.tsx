import { Link } from "react-router-dom"
import { FC } from "react"

interface UserDropDownProps {
    userName: string
    logout: () => void
}

const UserDropdown: FC<UserDropDownProps> = ({userName, logout}) => {
    return (
        <div
            aria-label="user-dropdown-menu"
            className="relative inline-block group"
        >
            <Link
                to="/profile"
                className="flex items-center justify-center w-40 h-20 transition-all duration-500 group-hover:bg-my-blue"
            >
                <b className="text-xl font-normal font-russo text-my-blue group-hover:text-my-dark">
                    {userName}
                </b>
            </Link>

            <button
                onClick={logout}
                type="button"
                className="absolute z-10 hidden w-40 bg-my-dark bg-my-gray rounded-xl origin-top-center group-hover:block group-hover:animate-append active:scale-99"
            >
                <b className="text-xl font-normal font-russo text-my-white hover:text-my-blue">
                    Выйти
                </b>
            </button>
        </div>
    )
}

export default UserDropdown