import { useParams } from "react-router-dom"
import { olympIdAdminAPI } from "@/modules/OlympiadIDAdminPage/API/olympIdAdminAPI.ts"
import { useState } from "react"
import { adminAPI } from "@/modules/Admin/API/adminAPI.ts"
import { Button, Card, Modal, Select } from "antd"

const OlympiadIDAdminForm = () => {
    const { id } = useParams()
    const { data: olympiad } = olympIdAdminAPI.useGetOlympiadAndApplicationsQuery(Number(id!))
    const [acceptTeam] = olympIdAdminAPI.useAcceptTeamMutation()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { data: tasks, refetch: taskRefetch } = adminAPI.useGetAllTasksQuery()
    const [addTask, { isError }] = olympIdAdminAPI.useAddTaskToOlympiadMutation()
    const [taskId, setTaskId] = useState<number | null>(null)
    const { data: olympAdmin } = olympIdAdminAPI.useGetAdminOlympiadQuery(Number(id!))
    const { data: members, refetch: membersRefetch } = olympIdAdminAPI.useGetMembersQuery(Number(id!))

    const handleSubmit = async (team_id: number) => {
        await acceptTeam({
            olympiad_id: Number(id!),
            team_id: team_id
        })
        await membersRefetch()
    }

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskId(Number(event.target.value))
    }

    const addTaskToOlympiad = async () => {
        if (olympiad && taskId) {
            await addTask({
                olympiad_id: olympiad.olympiad.id,
                task_id: taskId
            })
            await taskRefetch()
            setModalVisible(false)

        }

    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <Card title={<h1 style={{ fontSize: "36px" }}>Управление олимпиадами</h1>} bordered={false}>
            {olympiad &&
                <div>
                    <h2>{olympiad.olympiad.name}</h2>
                    <p>{olympiad.olympiad.description}</p>
                    <p>Дата начала: {new Date(olympiad.olympiad.startDate).toDateString()}</p>
                    <p>Дата конца: {new Date(olympiad.olympiad.endDate).toDateString()}</p>
                    <div>
                        <h2>Участники:</h2>
                        <div>{
                            members && members.map(member =>
                                <div key={member.id} className="bg-gray-200 p-2 mt-2 mb-2">
                                    <h2>{member.name}</h2>
                                    <div>{member.students.map(student =>
                                        <div
                                            key={student.id}>{student.user.surname} {student.user.name} {student.isCaptain && "капитан"}</div>
                                    )}</div>
                                </div>
                            )
                        }</div>
                    </div>
                    <Button
                        onClick={changeModalVisible}
                    >
                        Добавить задачу
                    </Button>
                    <div>Задачи:</div>
                    <div className="bg-gray-200 p-2 mt-2 rounded">
                        {olympAdmin && olympAdmin.tasks.map(task =>
                            <div key={task.id}>
                                {task.title}
                            </div>
                        )}
                    </div>
                    <div>Заявления:</div>
                    <div>
                        {olympiad.teams && olympiad.teams.map(team =>
                            <div key={team.id} className="bg-gray-200 p-5 mt-2 rounded">
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
                                <Button
                                    onClick={() => handleSubmit(team.id)}
                                >
                                    Подтвердить участие
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            }
            <Modal open={modalVisible} onCancel={handleCancel} onOk={addTaskToOlympiad} cancelText={"Отменить"}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <h2>Добавить задачу</h2>
                    <Select onChange={handleChange}>
                        {tasks && tasks.map(task => (
                            <Select.Option key={task.id} value={task.id}>
                                {task.title}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal>
        </Card>
    )
}

export default OlympiadIDAdminForm