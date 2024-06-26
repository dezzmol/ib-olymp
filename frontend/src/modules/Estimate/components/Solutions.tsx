import { FC, useEffect, useState } from "react"
import { estimateAPI } from "@/modules/Estimate/API/estimateAPI.ts"
import { useParams } from "react-router-dom"
import { ITask } from "@/modules/Admin/types"
import { AnswerDTO } from "@/modules/Estimate/types"
import { Button, Card, Checkbox, Modal } from "antd"

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

    const handleSubmitSolution = async () => {
        if (chosenAnswer) {
            const solution_id = chosenAnswer.id
            await rateSolution({
                olympiad_id: Number(id!),
                solution_id: solution_id,
                rateSolutionDTO: {
                    isCreativeSolution: isCreativeSolution
                }
            })
            setModalVisible(false)
        }
    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <Card>
            <div className="mt-5">Ответы:</div>
            {answers && answers.map(answer => (
                <div key={answer.id}>
                    <h2>{answer.id} Ответ: {answer.ans}</h2>
                    <p onClick={() => handleFileDownload(answer.fileName)}>{answer.fileName}</p>
                    {!answer.isChecked &&
                        <Button
                            onClick={() => changeModalVisible(answer)}
                        >
                            Оценить решение
                        </Button>
                    }
                </div>
            ))}
            <Modal open={modalVisible} onCancel={handleCancel} onOk={handleSubmitSolution} cancelText={"Отменить"}>
                <div>
                    <h2 className="text-2xl">Оценка решения</h2>
                    <p>Ответ: {chosenAnswer?.ans}</p>
                    {task?.isDetailedAnswer &&
                        <div className="flex flex-col  gap-2">
                            <div className="flex-row flex gap-2">
                                Решение является креативным:
                                <Checkbox
                                    type={"checkbox"}
                                    checked={isCreativeSolution}
                                    onChange={() => setIsCreativeSolution(prevState => !prevState)}
                                />
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </Card>
    )
}

export default Solutions