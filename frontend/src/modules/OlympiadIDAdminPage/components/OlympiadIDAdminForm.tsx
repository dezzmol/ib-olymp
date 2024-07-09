import { useNavigate, useParams } from "react-router-dom"
import { olympIdAdminAPI } from "@/modules/OlympiadIDAdminPage/API/olympIdAdminAPI.ts"
import { useEffect, useState } from "react"
import { adminAPI } from "@/modules/Admin/API/adminAPI.ts"
import { Button, Card, Modal, Table, TableColumnsType } from "antd"
import { IAttachmentForTask, ITask } from "@/modules/Admin/types"

const columns: TableColumnsType<ITask> = [
    {
        title: "Номер",
        dataIndex: "id"
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Категория",
        dataIndex: "category",
        render: (value, record, index) => <div>{record.category.name}</div>
    },
    {
        title: "Задача на время",
        dataIndex: "isTaskForWhile",
        render: (value, record, index) => <div>{record.isTaskForWhile ? "Да" : "Нет"}</div>
    },
    {
        title: "Трудоемкость решения",
        dataIndex: "complexity"
    },
    {
        title: "Приложения",
        dataIndex: "attachments",
        render: (text: IAttachmentForTask[]) => <div>{
            text && text.map(attachment =>
                <div>{attachment.name}</div>
            )
        }</div>
    }
]

const OlympiadIDAdminForm = () => {
    const { id } = useParams()
    const { data: olympiad } = olympIdAdminAPI.useGetOlympiadAndApplicationsQuery(Number(id!))
    const [acceptTeam] = olympIdAdminAPI.useAcceptTeamMutation()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const { data: allTasks, refetch: taskRefetch } = adminAPI.useGetAllTasksQuery()
    const [addTask, { isError }] = olympIdAdminAPI.useAddTaskToOlympiadMutation()
    const [taskId, setTaskId] = useState<number | null>(null)
    const { data: olympAdmin } = olympIdAdminAPI.useGetAdminOlympiadQuery(Number(id!))
    const { data: members, refetch: membersRefetch } = olympIdAdminAPI.useGetMembersQuery(Number(id!))
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const { data: olympiadTasks } = olympIdAdminAPI.useGetOlympiadTasksQuery(Number(id!))
    const [summarizeResult] = olympIdAdminAPI.useSummarizeOlympiadResultMutation()
    const { data: result } = olympIdAdminAPI.useGetOlympiadResultQuery(Number(id!))
    const navigate = useNavigate()

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
        for (const number of selectedRowKeys) {
            console.log(number)
            if (olympiad) {
                await addTask({
                    olympiad_id: olympiad.olympiad.id,
                    task_id: number as number
                })
                setModalVisible(false)
            }
        }


    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ITask[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows)
            setSelectedRowKeys(selectedRowKeys)
        },
        getCheckboxProps: (record: ITask) => ({
            disabled: record.title === "Disabled User", // Column configuration not to be checked
            name: record.title
        })
    }

    useEffect(() => {
        if (olympiadTasks) {
            const keys: React.Key[] = []
            for (const task of olympiadTasks) {
                keys.push(task.id as React.Key)
            }
            setSelectedRowKeys(keys)
        }
    }, [olympiadTasks])

    const getResult = async () => {
        // if (result) {
        //     navigate(`/olympadmin/${id}/result`)
        // }
        const response = await summarizeResult(Number(id!))

        // if ("data" in response) {
            navigate(`/olympadmin/${id}/result`)
        // }
    }

    return (
        <Card title={<h1 style={{ fontSize: "36px" }}>Управление соревнованиями</h1>} bordered={false}>
            {olympiad &&
                <div>
                    <h2>{olympiad.olympiad.name}</h2>
                    <p>{olympiad.olympiad.description}</p>
                    <p>Дата начала: {new Date(olympiad.olympiad.startDate).toDateString()}</p>
                    <p>Дата конца: {new Date(olympiad.olympiad.endDate).toDateString()}</p>
                    <Button
                        onClick={getResult}
                    >
                        {result ?
                            "Просмотреть результат"
                            :
                            "Подвести итоги соревнования"
                        }
                    </Button>
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
                    <div>Заявления:</div>
                    <div>
                        {olympiad.teams && olympiad.teams.map(team =>
                            <div key={team.id} className="bg-gray-200 p-5 mt-2 rounded">
                                <h2>
                                    Команда: {team.name}
                                </h2>
                                <div>
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
            <Modal open={modalVisible} onCancel={handleCancel} onOk={addTaskToOlympiad} cancelText={"Отменить"}
                   width={1000}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <h2>Добавить задачу</h2>
                    {allTasks &&
                        <Table
                            rowSelection={{
                                defaultSelectedRowKeys: selectedRowKeys,
                                type: "checkbox",
                                ...rowSelection
                            }}
                            columns={columns}
                            dataSource={allTasks}
                            rowKey={(record) => record.id}
                        />
                    }
                </div>
            </Modal>
        </Card>
    )
}

export default OlympiadIDAdminForm