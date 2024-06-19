import { useParams } from "react-router-dom"
import { taskAPI } from "@/modules/Task/API/taskAPI.ts"
import { Modal } from "@/components/Modal"
import { ChangeEvent, FormEvent, useState } from "react"

const TaskForm = () => {
    const { id } = useParams()
    const { data: task, refetch: taskRefetch } = taskAPI.useGetTaskByIdQuery(Number(id))
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)
    const [createTaskAttachment] = taskAPI.useCreateAttachmentMutation()
    const [fileName, setFileName] = useState<string>("")

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (file) {
            await createTaskAttachment({ file, taskId: Number(id!) })
            await taskRefetch()
        }
    }

    return (
        <section>
            {task &&
                <div>
                    <h2 className="text-2xl">Название задачи: {task.title}</h2>
                    <b>Категория: {task.category.name}</b>
                    <p>Описание: {task.description}</p>
                    <div>
                        {task.attachments && task.attachments.map(attachment => (
                            <div key={attachment.id}>
                                <h2>{attachment.name}</h2>
                                <div>{attachment.pathToFile}</div>
                            </div>
                        ))
                        }
                    </div>
                    <button
                        onClick={changeModalVisible}
                        className="rounded-[5px] bg-my-dark text-my-white p-2"
                    >
                        Добавить приложение к задаче
                    </button>
                </div>
            }
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <div className="flex flex-col gap-5">
                    <h2>Добавить приложение</h2>
                    <input
                        type="text" placeholder="Название приложения"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    <input type="file" onChange={handleFileChange} />
                    <button
                        onClick={handleSubmit}
                        className="rounded-[5px] bg-my-dark text-my-white p-2"
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>
        </section>
    )
}

export default TaskForm