import { Link } from "react-router-dom"
import logo from "@/assets/images/AGTU_zoloto1.png"

const Header = () => {
    return (
        <header className={"sticky top-0 z-10"}>
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

            </nav>
        </header>
    )
}

export default Header