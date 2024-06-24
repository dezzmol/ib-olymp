import React, { FC, useEffect, useState } from "react"
import { estimateAPI } from "@/modules/Estimate/API/estimateAPI.ts"
import { useParams } from "react-router-dom"
import { ITask } from "@/modules/Admin/types"
import { Modal } from "@/components/Modal"
import { AnswerDTO } from "@/modules/Estimate/types"

interface Props {
    task: ITask | undefined
}

const Solutions: FC<Props> = ({ task }) => {
    const { task_id, id } = useParams()
    const { data: answers } = estimateAPI.useGetTaskAnswersQuery({
        olympiad_id: Number(id!),
        task_id: Number(task_id!)
    })
    const [downloadSolution, { data: solutionResponse, isFetching, error }] = estimateAPI.useLazyGetSolutionQuery()
    const [fileToDownload, setFileToDownload] = useState<string | null>(null)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [chosenAnswer, setChosenAnswer] = useState<AnswerDTO | null>()
    const [isCreativeSolution, setIsCreativeSolution] = useState<boolean>(false)
    const [rateSolution] = estimateAPI.useRateSolutionMutation()

    useEffect(() => {
        if (fileToDownload) {
            downloadSolution({ olympId: Number(id!), taskId: Number(task_id!), fileName: fileToDownload })
        }
    }, [fileToDownload, id, task_id, downloadSolution])

    useEffect(() => {
        if (solutionResponse && fileToDownload) {
            const url = URL.createObjectURL(solutionResponse.data)
            const a = document.createElement("a")
            a.href = url
            a.download = solutionResponse.fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
            setFileToDownload(null)
        }
    }, [solutionResponse, fileToDownload])

    const handleFileDownload = (fileName: string) => {
        setFileToDownload(fileName)
    }

    const changeModalVisible = (answer: AnswerDTO) => {
        setModalVisible((prev) => !prev)
        setChosenAnswer(answer)
    }

    const handleSubmitSolution = async (solution_id: number) => {
        await rateSolution({
            olympiad_id: Number(id!),
            solution_id: solution_id,
            rateSolutionDTO: {
                isCreativeSolution: isCreativeSolution
            }
        })
    }

    return (
        <div>
            <div className="mt-5">Ответы:</div>
            {answers && answers.map(answer => (
                <div className="bg-gray-200 p-2 mt-2" key={answer.id}>
                    <h2>{answer.id} Ответ: {answer.ans}</h2>
                    <p onClick={() => handleFileDownload(answer.fileName)}>{answer.fileName}</p>
                    {!answer.isChecked &&
                        <button
                            className="rounded-[5px] bg-my-dark text-my-white p-2 w-full"
                            onClick={() => changeModalVisible(answer)}
                        >
                            Оценить решение
                        </button>
                    }
                </div>
            ))}
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <div>
                    <h2 className="text-2xl">Оценка решения</h2>
                    <p>Ответ: {chosenAnswer?.ans}</p>
                    {task?.isDetailedAnswer &&
                        <div className="flex flex-col  gap-2">
                            <div className="flex-row flex gap-2">
                                Решение является креативным:
                                <input
                                    type={"checkbox"}
                                    checked={isCreativeSolution}
                                    onChange={() => setIsCreativeSolution(prevState => !prevState)}
                                />
                            </div>
                            <button
                                className="rounded-[5px] bg-my-dark text-my-white p-2 w-full"
                                onClick={() => handleSubmitSolution(chosenAnswer!.id)}
                            >
                                Подтвердить
                            </button>
                        </div>
                    }

                </div>
            </Modal>
        </div>
    )
}

export default Solutions