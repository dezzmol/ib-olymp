import { olympiadsAPI } from "@/modules/Olympiads"
import { useNavigate } from "react-router-dom"
import { Card } from "antd"

const EstimateForm = () => {
    const { data: olympiads } = olympiadsAPI.useGetOlympiadsQuery()
    const navigate = useNavigate()

    return (
        <Card title={<h1>Оценивание</h1>}>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "5px"}}>
                {olympiads && olympiads.map(olympiad => (
                    <Card
                        key={olympiad.id}
                        hoverable={true}
                        onClick={() => navigate("/estimate/olympiads/" + olympiad.id)}
                        style={{width: "550px"}}
                    >
                        <h2>{olympiad.name}</h2>
                        <p>{olympiad.university}</p>
                        <p>Дата начала: {new Date(olympiad.startDate).toDateString()}</p>
                        <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                    </Card>
                ))}
            </div>
        </Card>
    )
}

export default EstimateForm