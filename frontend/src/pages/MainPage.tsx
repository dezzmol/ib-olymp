import classes from "@/styles/page.module.css"
import { MainForm } from "@/modules/MainModule"

const MainPage = () => {
    return (
        <main className={classes.page}>
            <MainForm />
        </main>
    );
};

export default MainPage;