import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { adminAPI } from "@/modules/Admin/API/adminAPI.ts"
import { Modal } from "@/components/Modal"
import CategoryForm from "@/modules/Admin/components/CategoryForm.tsx"
import { complexity } from "@/modules/Admin/types"

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
            await createTaskMut({
                title: taskTitle,
                description: taskDescription,
                category_id: selectedCategoryId!,
                isTaskForWhile: isTaskForWhile,
                isDetailedAnswer: isDetailedAnswer,
                mark: mark,
                rightAnswer: rightAnswer,
                complexity: complexity
            })
        }
        await tasksRefetch()
        setModalVisible(false)
    }

    return (
        <section className="flex flex-col mt-1">
            <CategoryForm />
            <div>
                <button className="rounded-[5px] bg-my-dark text-my-white p-2 w-full" onClick={changeModalVisible}>Загрузка задачи</button>
            </div>
            <div>
                <h2>Банк задач:</h2>
                <div>
                    {tasks && tasks.map(task => (
                        <div key={task.id} onClick={() => navigate("/admin/tasks/" + task.id)}>{task.id} {task.title}</div>
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
                        className="border-2 rounded"
                    />
                    <textarea
                        placeholder={"Описание задачи"}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className="border-2 rounded h-20"
                    />
                    <div className="flex flex-row items-center gap-2">
                        Требуется развернутый ответ:
                        <input
                            type="checkbox"
                            checked={isDetailedAnswer}
                            onChange={() => setIsDetailedAnswer(prev => !prev)}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        Задача на время:
                        <input
                            type="checkbox"
                            checked={isTaskForWhile}
                            onChange={() => setIsTaskForWhile(prev => !prev)}
                        />
                    </div>
                    <input
                        placeholder="Правильный ответ"
                        value={rightAnswer}
                        onChange={(e) => setRightAnswer(e.target.value)}
                        className="border-2 rounded"
                    />
                    <div>
                        Количество баллов за задание
                    </div>
                    <input
                        value={mark}
                        onChange={(e) => setMark(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                    <select onChange={handleChangeComplexity} className="border-2 rounded">
                        <option value="Низкая">Низкая</option>
                        <option value="Средняя">Средняя</option>
                        <option value="Высокая">Высокая</option>
                    </select>
                    <select onChange={handleChange} className="border-2 rounded">
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