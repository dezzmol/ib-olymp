import { useNavigate, useParams } from "react-router-dom"
import { myOlympiadsAPI } from "@/modules/MyOlympiads/API/myOlympiadsAPI.ts"

const EstimateOlympiadIdForm = () => {
    const { id } = useParams()
    const { data: tasks } = myOlympiadsAPI.useGetTasksByOlympiadQuery(Number(id!))
    const navigate = useNavigate()

    return (
        <section className="mt-2">
            {tasks && tasks.map(task => (
                <div key={task.id} className="bg-gray-200 p-2" onClick={() => navigate(`/estimate/olympiads/${id}/${task.id}`)}>
                    <div>{task.title} </div>
                    <p>{task.category.name}</p>
                    <p>Сложность: {task.complexity}</p>
                </div>
            ))}
        </section>
    )
}

export default EstimateOlympiadIdForm