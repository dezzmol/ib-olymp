import { LoginForm } from "@/modules/Login"
import classes from "@/styles/page.module.css"

const LoginPage = () => {
    return (
        <main className={classes.page} style={{maxWidth: "700px"}}>
            <LoginForm />
        </main>
    )
}

export default LoginPage