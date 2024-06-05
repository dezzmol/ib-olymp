import { BrowserRouter } from "react-router-dom"
import AppRouter from "@/modules/AppRouter"
import Header from "@/modules/Header"

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App