import { TeamForm } from "@/modules/Team"
import classes from "@/styles/page.module.css"

const TeamPage = () => {
    return (
        <main className={classes.page}>
            <TeamForm />
        </main>
    )
}

export default TeamPage