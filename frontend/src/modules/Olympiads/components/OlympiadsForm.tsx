import { olympiadsAPI } from "@/modules/Olympiads/API/olympiadsAPI.ts"
import { useNavigate } from "react-router-dom"

const OlympiadsForm = () => {
    const {data: olympiads} = olympiadsAPI.useGetOlympiadsQuery()
    const navigate = useNavigate()

    return (
        <section>
            {olympiads && olympiads.map(olympiad => (
                <div key={olympiad.id} className="flex flex-col m-2 p-5 bg-gray-200" onClick={() => navigate("/olympiads/" + olympiad.id)}>
                    <h2>{olympiad.name}</h2>
                    <p>{olympiad.university}</p>
                    <p>Дата начала: {new Date(olympiad.startDate).toDateString()}</p>
                    <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                </div>
            ))}
        </section>
    )
}

export default OlympiadsForm