import { myOlympiadsAPI } from "@/modules/MyOlympiads/API/myOlympiadsAPI.ts"
import { useNavigate } from "react-router-dom"

const MyOlympiadsForm = () => {
    const {data: olympiads} = myOlympiadsAPI.useGetMyOlympiadsQuery()
    const currentDate = new Date()
    const navigate = useNavigate()

    return (
        <section className="flex flex-col mt-1">
            {olympiads && olympiads.map(olympiad =>
                <div className="p-2 m-2 bg-gray-200 rounded" key={olympiad.id}>
                    <h2>{olympiad.name}</h2>
                    <p>{olympiad.university}</p>
                    <p>Дата начала: {new Date(olympiad.startDate).toDateString()} {new Date(olympiad.startDate).toLocaleTimeString("ru-RU")}</p>
                    <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                    {currentDate > new Date(olympiad.startDate) && currentDate < new Date(olympiad.endDate) &&
                        <button
                            className="rounded-[5px] bg-my-dark text-my-white p-2 mt-2 w-full"
                            onClick={() => navigate("/solve/olympiad/" + olympiad.id)}
                        >
                            Принять участие
                        </button>
                    }
                </div>
            )}
        </section>
    )
}

export default MyOlympiadsForm