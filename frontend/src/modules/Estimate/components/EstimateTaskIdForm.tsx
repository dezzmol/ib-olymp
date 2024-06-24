import { useParams } from "react-router-dom"
import { taskAPI } from "@/modules/Task/API/taskAPI.ts"
import { useEffect, useState } from "react"
import { solveTaskAPI } from "@/modules/SolveTask/API/solveTaskAPI.ts"
import Solutions from "./Solutions.tsx"

const EstimateTaskIdForm = () => {
    const { task_id, id } = useParams()
    const { data: task } = taskAPI.useGetTaskByIdQuery(Number(task_id!))
    const [trigger, { data, isFetching, error }] = solveTaskAPI.useLazyGetAttachmentQuery()
    const [fileToDownload, setFileToDownload] = useState<string | null>(null)

    useEffect(() => {
        if (fileToDownload) {
            trigger({ olympId: Number(id!), taskId: Number(task_id!), fileName: fileToDownload })
        }
    }, [fileToDownload, id, task_id, trigger])

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

    return (
        <section className="max-w-[600px]">
            {task &&
                <div>
                    <h2 className="text-2xl">{task.title}</h2>
                    <b>Категория: {task.category.name}</b>
                    <p>Описание: {task.description}</p>
                    <p>Сложность: {task.complexity}</p>
                    <div>
                        {task.attachments && task.attachments.map(attachment => (
                            <div key={attachment.id}>
                                <h2>{attachment.name}</h2>
                                <div
                                    onClick={() => handleFileDownload(attachment.name)}>{attachment.pathToFile}</div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            }
            <Solutions task={task} />
        </section>
    )
}

export default EstimateTaskIdForm