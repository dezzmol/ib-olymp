import { useParams } from "react-router-dom"
import { olympiadIdAPI } from "@/modules/OlympiadId/API/olympiadIdAPI.ts"

const OlympiadIdForm = () => {
    const { id } = useParams()
    const { data: olympiad } = olympiadIdAPI.useGetOlympiadByIdQuery(Number(id!))
    const [register, {error: registerError, isError}] = olympiadIdAPI.useRegisterOnOlympiadMutation()
    const handleSubmit = async () => {
        await register(Number(id!))
    }

    return (
        <section className="mt-2">
            {olympiad &&
                <div>
                    <h2 className="text-2xl">
                        {olympiad.name}
                    </h2>
                    <div>{olympiad.university}</div>
                    <p>
                        {olympiad.description}
                    </p>
                    <p>Дата начала: {new Date(olympiad.startDate).toDateString()}</p>
                    <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                    <button
                        className="rounded-[5px] bg-my-dark text-my-white p-2 mt-2 w-full"
                        onClick={handleSubmit}
                    >
                        Подать заявку на участие
                    </button>
                    {isError &&
                        <div>Ошибка при регистрации команды</div>
                    }
                </div>
            }
        </section>
    )
}

export default OlympiadIdForm