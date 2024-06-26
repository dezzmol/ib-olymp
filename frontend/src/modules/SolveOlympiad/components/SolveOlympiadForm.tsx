import { useNavigate, useParams } from "react-router-dom"
import { solveOlympiadAPI } from "@/modules/SolveOlympiad/API/solveOlympiadAPI.ts"
import { olympiadIdAPI } from "@/modules/OlympiadId/API/olympiadIdAPI.ts"
import { myOlympiadsAPI } from "@/modules/MyOlympiads/API/myOlympiadsAPI.ts"
import { Card, List, Typography } from "antd"

const SolveOlympiadForm = () => {
    const { olympiad_id } = useParams()
    const { data: tasks, isError: taskError } = myOlympiadsAPI.useGetTasksByOlympiadQuery(Number(olympiad_id!))
    const { data: olympiad, isError: olympiadError } = olympiadIdAPI.useGetOlympiadByIdQuery(Number(olympiad_id!))
    const navigate = useNavigate()

    if (taskError || olympiadError) {
        navigate("/")
    }

    return (
        <section>
            {olympiad &&
                <Card title={<h2>{olympiad.name}</h2>}>
                    <div>
                        <p>Университет: {olympiad.university}</p>
                        <p>Описание: {olympiad.description}</p>
                    </div>
                    {tasks &&
                        <List
                            header={<div>Задачи</div>}
                            bordered
                            dataSource={tasks}
                            renderItem={(item) => (
                                <List.Item onClick={() => navigate(`/solve/olympiad/${olympiad_id}/${item.id}`)}>
                                    {item.title}
                                </List.Item>
                            )}
                        />
                    }
                </Card>

            }

        </section>
    )
}

export default SolveOlympiadForm