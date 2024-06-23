import { adminAPI } from "@/modules/Admin/API/adminAPI.ts"
import { Modal } from "@/components/Modal"
import { useState } from "react"

const CategoryForm = () => {
    const [createCategory] = adminAPI.useCreateCategoryMutation()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [categoryName, setCategoryName] = useState<string>("")
    const [categoryDesc, setCategoryDesc] = useState<string>("")
    const [categoryMark, setCategoryMark] = useState<number>(0)
    const [categoryExtraPoints, setCategoryExtraPoints] = useState<number>(0)
    const [categoryTime, setCategoryTime] = useState<number>(0)

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const upload = async () => {
        await createCategory({
            name: categoryName,
            description: categoryDesc,
            mark: categoryMark
        })
        setModalVisible(false)
    }

    return (
        <div>
            <button
                className="rounded-[5px] bg-my-dark text-my-white p-2 w-full mb-2"
                onClick={changeModalVisible}
            >
                Создать категорию
            </button>
            <Modal
                visible={modalVisible}
                setVisible={setModalVisible}
            >
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl">Создание категории</h2>
                    <input
                        placeholder="Название категории"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="border-2 rounded"
                    />
                    <textarea
                        placeholder="Описание категории"
                        value={categoryDesc}
                        onChange={(e) => setCategoryDesc(e.target.value)}
                        className="border-2 rounded h-20"
                    />
                    <div>
                        Балл за раздел
                    </div>
                    <input
                        value={categoryMark}
                        type="number"
                        onChange={(e) => setCategoryMark(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                    <div>
                        Время выполнения задачи из этого раздела
                    </div>
                    <input
                        value={categoryTime}
                        type="number"
                        onChange={(e) => setCategoryTime(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                    <div>
                        Доп баллы за выполнения задачи за определенное время
                    </div>
                    <input
                        value={categoryExtraPoints}
                        type="number"
                        onChange={(e) => setCategoryExtraPoints(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                    <button
                        className="rounded-[5px] bg-my-dark text-my-white p-2 w-full mb-2"
                        onClick={upload}
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default CategoryForm