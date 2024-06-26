import { useNavigate, useParams } from "react-router-dom"
import { myOlympiadsAPI } from "@/modules/MyOlympiads/API/myOlympiadsAPI.ts"
import { Card, List } from "antd"
import { estimateAPI } from "@/modules/Estimate/API/estimateAPI.ts"

const EstimateOlympiadIdForm = () => {
    const { id } = useParams()
    const { data: tasks } = estimateAPI.useGetOlympiadTasksToEstimateQuery(Number(id!))
    const navigate = useNavigate()

    return (
        <Card title={<h1>Оценивание задач</h1>}>
            {tasks &&
                <List
                    bordered
                    dataSource={tasks}
                    renderItem={(task) => (
                        <List.Item onClick={() => navigate(`/estimate/olympiads/${id}/${task.id}`)}>
                            <List.Item.Meta
                                title={<h3>{task.title}</h3>}
                                description={"Сложность: " + task.complexity}
                            />
                        </List.Item>
                    )}
                />
            }
        </Card>
    )
}

export default EstimateOlympiadIdForm