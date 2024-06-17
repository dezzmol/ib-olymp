import { useParams } from "react-router-dom"
import { olympIdAdminAPI } from "@/modules/OlympiadIDAdminPage/API/olympIdAdminAPI.ts"

const OlympiadIDAdminForm = () => {
    const { id } = useParams()
    const { data: olympiad } = olympIdAdminAPI.useGetOlympiadAndApplicationsQuery(Number(id!))

    return (
        <section className="flex flex-col mt-1">
            {olympiad &&
                <div>
                    <h2 className="text-2xl">{olympiad.olympiad.name}</h2>
                    <p>{olympiad.olympiad.description}</p>
                    <p>Дата начала: {new Date(olympiad.olympiad.startDate).toDateString()}</p>
                    <p>Дата конца: {new Date(olympiad.olympiad.endDate).toDateString()}</p>
                    <div>Заявления:</div>
                    <div>
                        {olympiad.teams && olympiad.teams.map(team =>
                            <div key={team.id}>
                                <h2>
                                    Команда: {team.name}
                                </h2>
                                <div>
                                    Участники:
                                    {team.students.map(student => (
                                        <div key={student.id}>
                                            {student.user.surname} {student.user.name} {student.isCaptain && "капитан"}
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </section>
    )
}

export default OlympiadIDAdminForm