import { EstimateForm } from "@/modules/Estimate"
import classes from "@/styles/page.module.css"

const EstimatePage = () => {
    return (
        <main className={classes.page}>
            <EstimateForm />
        </main>
    )
}

export default EstimatePage