import { MyOlympiadsForm } from "@/modules/MyOlympiads"
import classes from "@/styles/page.module.css"

const MyOlympiadsPage = () => {
    return (
        <main className={classes.page}>
            <MyOlympiadsForm />
        </main>
    )
}

export default MyOlympiadsPage