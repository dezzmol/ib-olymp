import { adminAPI } from "@/modules/Admin/API/adminAPI.ts"
import { useState } from "react"
import { Button, Input, Modal } from "antd"
import TextArea from "antd/es/input/TextArea"

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
            mark: categoryMark,
            time: categoryTime,
            extraPoints: categoryExtraPoints
        })
        setModalVisible(false)
    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <Button
                onClick={changeModalVisible}
            >
                Создать категорию
            </Button>
            <Modal
                open={modalVisible} onCancel={handleCancel} onOk={upload} cancelText={"Отменить"}
            >
                <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                    <h2>Создание категории</h2>
                    <Input
                        placeholder="Название категории"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="border-2 rounded"
                    />
                    <TextArea
                        placeholder="Описание категории"
                        value={categoryDesc}
                        onChange={(e) => setCategoryDesc(e.target.value)}
                        className="border-2 rounded h-20"
                    />
                    <div>
                        Балл за раздел
                    </div>
                    <Input
                        value={categoryMark}
                        type="number"
                        onChange={(e) => setCategoryMark(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                    <div>
                        Время выполнения задачи из этого раздела
                    </div>
                    <Input
                        value={categoryTime}
                        type="number"
                        onChange={(e) => setCategoryTime(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                    <div>
                        Доп баллы за выполнения задачи за определенное время
                    </div>
                    <Input
                        value={categoryExtraPoints}
                        type="number"
                        onChange={(e) => setCategoryExtraPoints(Number(e.target.value))}
                        className="border-2 rounded"
                    />
                </div>
            </Modal>
        </div>
    )
}

export default CategoryForm