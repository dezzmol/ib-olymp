import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { adminAPI } from "@/modules/Admin/API/adminAPI.ts"
import CategoryForm from "@/modules/Admin/components/CategoryForm.tsx"
import { complexity } from "@/modules/Admin/types"
import { Button, Card, Checkbox, Input, Modal, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { taskAPI } from "@/modules/Task/API/taskAPI.ts"

const AdminForm = () => {
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [taskDescription, setTaskDescription] = useState<string>("")
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [isDetailedAnswer, setIsDetailedAnswer] = useState<boolean>(false)
    const [isTaskForWhile, setIsTaskForWhile] = useState<boolean>(false)
    const [rightAnswer, setRightAnswer] = useState<string>("")
    const [complexity, setComplexity] = useState<complexity | null>("Низкая")
    const [mark, setMark] = useState<number>(0)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {role} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()
    const {data: tasks, refetch: tasksRefetch} = adminAPI.useGetAllTasksQuery()
    const {data: categories} = adminAPI.useGetAllCategoriesQuery()
    const [createTaskMut, {}] = adminAPI.useCreateTaskMutation()
    const [isNeedFile, setIsNeedFile] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)
    const [createTaskAttachment] = taskAPI.useCreateAttachmentMutation()

    useEffect(() => {
        if (role === "ROLE_ADMIN") {
            return
        } else {
            navigate("/")
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event)
        setSelectedCategoryId(Number(event));
    };

    const handleChangeComplexity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setComplexity(event.target.value as complexity);
    };


    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const createTask = async () => {
        console.log({
            title: taskTitle,
            description: taskDescription,
            category_id: selectedCategoryId!,
            isDetailedAnswer: isDetailedAnswer,
            mark: mark,
            rightAnswer: rightAnswer,
            complexity: complexity
        })
        if (selectedCategoryId && mark !== 0 && complexity) {
            const result = await createTaskMut({
                title: taskTitle,
                description: taskDescription,
                category_id: selectedCategoryId!,
                isTaskForWhile: isTaskForWhile,
                isDetailedAnswer: isDetailedAnswer,
                mark: mark,
                rightAnswer: rightAnswer,
                complexity: complexity
            })
            if (file && result && "data" in result && !result.error) {
                await createTaskAttachment({ file, taskId: Number(result.data.id) })
            }
        }
        await tasksRefetch()
        setModalVisible(false)
    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    return (
        <Card title={<h1 style={{ fontSize: "36px" }}>Админ-панель</h1>} bordered={false}>
            <CategoryForm />
            <div>
                <Button
                    onClick={changeModalVisible}
                >
                    Загрузка задачи
                </Button>
            </div>
            <div>
                <h2>Банк задач:</h2>
                <div>
                    {tasks && tasks.map(task => (
                        <div key={task.id} onClick={() => navigate("/admin/tasks/" + task.id)}>{task.id} {task.title}</div>
                    ))}
                </div>
            </div>
            <Modal
                open={modalVisible} onCancel={handleCancel} onOk={createTask} cancelText={"Отменить"}
            >
                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                    <h2>
                        Добавить новую задачу
                    </h2>
                    <Input
                        placeholder={"Название задачи"}
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="border-2 rounded"
                    />
                    <TextArea
                        placeholder={"Описание задачи"}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="border-2 rounded h-20"
                    />
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "5px"}} >
                        Требуется развернутый ответ:
                        <Checkbox
                            type="checkbox"
                            checked={isDetailedAnswer}
                            onChange={() => setIsDetailedAnswer(prev => !prev)}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "5px"}}>
                        Задача на время:
                        <Checkbox
                            type="checkbox"
                            checked={isTaskForWhile}
                            onChange={() => setIsTaskForWhile(prev => !prev)}
                        />
                    </div>
                    <Input
                        placeholder="Правильный ответ"
                        value={rightAnswer}
                        onChange={(e) => setRightAnswer(e.target.value)}
                        className="border-2 rounded"
                    />
                    <div>
                        Количество баллов за задание
                    </div>
                    <Input
                        value={mark}
                        onChange={(e) => setMark(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                    <div>
                        Трудоемкость решения
                    </div>
                    <Select onChange={handleChangeComplexity}>
                        <Select.Option value="Низкая">Низкая</Select.Option>
                        <Select.Option value="Средняя">Средняя</Select.Option>
                        <Select.Option value="Высокая">Высокая</Select.Option>
                    </Select>
                    <div>
                        Выберите категорию
                    </div>
                    <Select onChange={handleChange} className="border-2 rounded">
                        {categories && categories.map(category => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "5px"}}>
                        Нужен ли дополнительные файлы для загрузки?
                        <Checkbox
                            checked={isNeedFile}
                            onChange={() => setIsNeedFile(prevState => !prevState)}
                        />
                    </div>
                    {isNeedFile &&
                        <Input type="file" onChange={handleFileChange} />
                    }
                </div>
            </Modal>
        </Card>
    )
}

export default AdminForm