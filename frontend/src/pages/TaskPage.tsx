import { TaskForm } from "@/modules/Task"
import classes from "@/styles/page.module.css"

const TaskPage = () => {
    return (
        <main className={classes.page}>
            <TaskForm />
        </main>
    )
}

export default TaskPage