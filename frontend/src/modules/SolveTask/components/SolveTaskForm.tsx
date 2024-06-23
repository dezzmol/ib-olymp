import { solveTaskAPI } from "@/modules/SolveTask/API/solveTaskAPI.ts"
import { useParams } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import { Modal } from "@/components/Modal"
import { SolutionDTO } from "@/modules/Task/types"

const SolveTaskForm = () => {
    const [trigger, { data, isFetching, error }] = solveTaskAPI.useLazyGetAttachmentQuery()
    const [fileToDownload, setFileToDownload] = useState<string | null>(null)
    const { olympiad_id, task_id } = useParams()
    const { data: isOpened, refetch: isOpenedRefetch } = solveTaskAPI.useCheckIsTaskOpenedQuery({
        olympiad_id: Number(olympiad_id!),
        task_id: Number(task_id!)
    })
    const [openTask] = solveTaskAPI.useOpenTaskMutation()
    const [getTask, { data: task }] = solveTaskAPI.useGetTaskMutation()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [answer, setAnswer] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [uploadMutation] = solveTaskAPI.useUploadSolutionMutation()
    const [uploadWithFileMutation] = solveTaskAPI.useUploadSolutionWithFileMutation()

    const handleSubmitButton = async () => {
        await openTask({ olympiad_id: Number(olympiad_id!), task_id: Number(task_id!) })
        await isOpenedRefetch()
        await getTask({ olympiad_id: Number(olympiad_id!), task_id: Number(task_id!) })
    }

    useEffect(() => {
        if (fileToDownload) {
            trigger({ olympId: Number(olympiad_id!), taskId: Number(task_id!), fileName: fileToDownload })
        }
    }, [fileToDownload, olympiad_id, task_id, trigger])

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

    useEffect(() => {
        getTask({ olympiad_id: Number(olympiad_id!), task_id: Number(task_id!) })
    }, [isOpened])

    const handleFileDownload = (fileName: string) => {
        setFileToDownload(fileName)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleUploadSolution = async () => {
        if (task && task.isDetailedAnswer && file) {
            await uploadWithFileMutation({ task_id: Number(task_id!), olympiad_id: Number(olympiad_id!), file: file })
        }

        await uploadMutation({
            task_id: Number(task_id!),
            olympiad_id: Number(olympiad_id!),
            solutionDTO: { answer: answer } as SolutionDTO
        })
        setModalVisible(false)
        await isOpenedRefetch()
    }

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    return (
        <section>
            {isOpened && !isOpened.isTaskOpen ?
                <div>
                    <h2 className="text-2xl">Данная задача является задачей на время</h2>
                    <p>Для того, чтобы приступить к выполнению данной задачи нажмите кнопку внизу. </p>
                    <p>После нажатия кнопки будет зафиксировано время начала выполнения задачи. </p>
                    <p>Оно будет учитываться при подсчете итогового балла</p>
                    <button
                        className="rounded-[5px] bg-my-dark text-my-white p-2"
                        onClick={handleSubmitButton}
                    >
                        Приступить к выполнению
                    </button>
                </div>
                :
                <div>
                    {task &&
                        <div className="max-w-[600px]">
                            <h2 className="text-2xl">Название задачи: {task.title}</h2>
                            <b>Категория: {task.category.name}</b>
                            <p>Описание: {task.description}</p>
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
                            {isOpened && isOpened.isAnswerUploaded ?
                                <p className="p-2 rounded border-2 text-center">
                                    Решение загружено
                                </p>
                                :
                                <button
                                    onClick={changeModalVisible}
                                    className="rounded-[5px] bg-my-dark text-my-white p-2 w-full"
                                >
                                    Внести решение
                                </button>
                            }

                        </div>
                    }
                </div>
            }
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl">Ваше решение</h2>
                    {task && task.isDetailedAnswer &&
                        <input type="file" onChange={handleFileChange} />
                    }
                    <input
                        placeholder="Ответ"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border-2 rounded"
                    />
                    <p>
                        После загрузки ответа нельзя его поменять
                    </p>
                    <button
                        className="rounded-[5px] bg-my-dark text-my-white p-2"
                        onClick={handleUploadSolution}
                    >
                        Загрузить решение
                    </button>
                </div>
            </Modal>
        </section>
    )
}

export default SolveTaskForm