import { useGetTeamByStudentQuery, useGetTeamQuery, useRegisterMutation } from "@/modules/Team/API/teamAPI.ts"
import { useState } from "react"
import { Modal } from "@/components/Modal"

const TeamForm = () => {
    const [teamName, setTeamName] = useState<string>("")
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { data: team, refetch: teamRefetch } = useGetTeamByStudentQuery()
    const [register] = useRegisterMutation()
    const teamRegister = async () => {
        await register({name: teamName})
        await teamRefetch()
    }

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    return (
        <div>
            {team ?
                <div>
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
                :
                <div>
                    <h2>
                        У вас нет команды
                    </h2>
                    <div>
                        <button onClick={changeModalVisible}>Зарегистрировать команду</button>
                    </div>
                </div>
            }
            <Modal setVisible={setModalVisible} visible={modalVisible}>
                <div className="flex flex-col">
                    <h2>Регистрация команды</h2>
                    <input
                        placeholder={"Название команды"}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <button
                        onClick={teamRegister}
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default TeamForm