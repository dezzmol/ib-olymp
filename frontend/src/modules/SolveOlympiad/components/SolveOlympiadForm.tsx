import { useNavigate, useParams } from "react-router-dom"
import { solveOlympiadAPI } from "@/modules/SolveOlympiad/API/solveOlympiadAPI.ts"
import { olympiadIdAPI } from "@/modules/OlympiadId/API/olympiadIdAPI.ts"

const SolveOlympiadForm = () => {
    const { olympiad_id } = useParams()
    const {data: tasks, isError: taskError} = solveOlympiadAPI.useGetOlympiadTasksQuery(Number(olympiad_id!))
    const {data: olympiad, isError: olympiadError} = olympiadIdAPI.useGetOlympiadByIdQuery(Number(olympiad_id!))
    const navigate = useNavigate()

    if (taskError || olympiadError) {
        navigate("/")
    }

    return (
        <section>
            {olympiad &&
                <div>
                    <h2 className="text-2xl">{olympiad.name}</h2>
                    <p>Университет: {olympiad.university}</p>
                    <p>Описание: {olympiad.description}</p>
                </div>
            }
            {tasks && tasks.map(task => (
                <div key={task.id}>
                    <h2>{task.title}</h2>
                </div>
            ))}
        </section>
    )
}

export default SolveOlympiadForm