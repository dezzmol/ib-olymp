import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { adminAPI } from "@/modules/Admin/API/adminAPI.ts"
import { Modal } from "@/components/Modal"

const AdminForm = () => {
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [taskDescription, setTaskDescription] = useState<string>("")
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {role} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()
    const {data: tasks, refetch: tasksRefetch} = adminAPI.useGetAllTasksQuery()
    const {data: categories} = adminAPI.useGetAllCategoriesQuery()
    const [createTaskMut, {}] = adminAPI.useCreateTaskMutation()

    useEffect(() => {
        if (role === "ROLE_ADMIN") {
            return
        } else {
            navigate("/")
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(Number(event.target.value));
    };

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const createTask = async () => {
        if (selectedCategoryId) {
            await createTaskMut({
                title: taskTitle,
                description: taskDescription,
                category_id: selectedCategoryId!
            })
        }
        await tasksRefetch()
    }

    return (
        <section className="flex flex-col mt-1">
            <div>
                <button className="rounded-[5px] bg-my-dark text-my-white p-2" onClick={changeModalVisible}>Загрузка задачи</button>
            </div>
            <div>
                <h2>Банк задач:</h2>
                <div>
                    {tasks && tasks.map(task => (
                        <div onClick={() => navigate("/admin/tasks/" + task.id)}>{task.id} {task.title}</div>
                    ))}
                </div>
            </div>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <div className="flex flex-col gap-2">
                    <h2>
                        Добавить новую задачу
                    </h2>
                    <input
                        placeholder={"Название задачи"}
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <input
                        placeholder={"Описание задачи"}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <select onChange={handleChange}>
                        <option value="">Выберите категорию</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button className="rounded-[5px] bg-my-dark text-my-white p-2" onClick={createTask}>Подтвердить</button>
                </div>
            </Modal>
        </section>
    )
}

export default AdminForm