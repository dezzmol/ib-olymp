import { useParams } from "react-router-dom"
import { taskAPI } from "@/modules/Task/API/taskAPI.ts"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Button, Card, Input, Modal } from "antd"

const TaskForm = () => {
    const { id } = useParams()
    const { data: task, refetch: taskRefetch } = taskAPI.useGetTaskByIdQuery(Number(id))
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)
    const [createTaskAttachment] = taskAPI.useCreateAttachmentMutation()
    const [fileName, setFileName] = useState<string>("")
    const [trigger, { data, isFetching, error }] = taskAPI.useLazyGetAttachmentQuery()
    const [fileToDownload, setFileToDownload] = useState<string | null>(null)

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    useEffect(() => {
        if (fileToDownload) {
            trigger({ taskId: Number(id!), fileName: fileToDownload })
        }
    }, [fileToDownload, id, trigger])

    useEffect(() => {
        if (data && fileToDownload) {
            const url = URL.createObjectURL(data.data)
            const a = document.createElement("a")
            a.href = url
            a.download = data.fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
            setFileToDownload(null)
        }
    }, [data, fileToDownload])

    const handleFileDownload = (fileName: string) => {
        setFileToDownload(fileName)
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

    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <Card title={<h1 style={{ fontSize: "36px" }}>Задача</h1>} bordered={false}>
            {task &&
                <div>
                    <h1>Название задачи: {task.title}</h1>
                    <b>Категория: {task.category.name}</b>
                    <p>Описание: {task.description}</p>
                    <div>
                        {task.attachments && task.attachments.map(attachment => (
                            <div key={attachment.id}>
                                <h2>{attachment.name}</h2>
                                <div onClick={() => handleFileDownload(attachment.name)}>{attachment.pathToFile}</div>
                            </div>
                        ))
                        }
                    </div>
                    <Button
                        onClick={changeModalVisible}
                    >
                        Добавить приложение к задаче
                    </Button>
                </div>
            }
            <Modal open={modalVisible} onCancel={handleCancel} onOk={handleSubmit} cancelText={"Отменить"}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <h2>Добавить приложение</h2>
                    <Input
                        type="text" placeholder="Название приложения"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    <Input type="file" onChange={handleFileChange} />
                </div>
            </Modal>
        </Card>
    )
}

export default TaskForm