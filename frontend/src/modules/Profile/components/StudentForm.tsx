import { useAppDispatch, useAppSelector } from "@/hooks/useTypedStore.ts"
import { useEffect, useState } from "react"
import { useGetStudentQuery, useRegistrationMutation } from "@/modules/Profile/API/studentAPI.ts"
import { registerStudent } from "@/store/slice/studentSlice.ts"
import { Modal } from "@/components/Modal"

const StudentForm = () => {
    const [ageValue, setAgeValue] = useState<number>(18)
    const [phoneNumberValue, setPhoneNumberValue] = useState<string>("")
    const [universityValue, setUniversityValue] = useState<string>("")
    const [otherContactsDataValue, setOtherContactsDataValue] = useState<string>("")
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [registration] = useRegistrationMutation()
    const {data: student, refetch: refetchStudent, isError} = useGetStudentQuery()
    const dispatch = useAppDispatch()

    const {
        age,
        phoneNumber,
        university,
        isCaptain,
        otherContactsData
    } = useAppSelector((state) => state.studentReducer)

    const register = async () => {
        await registration({
            age: ageValue,
            phoneNumber: phoneNumberValue,
            university: universityValue,
            otherContactsData: otherContactsDataValue,
        })

        const st = await refetchStudent()

        if ("data" in st) {
            dispatch(registerStudent({
                user: st.data!.user,
                age: st.data!.age,
                phoneNumber: st.data!.phoneNumber,
                university: st.data!.university,
                isCaptain: st.data!.isCaptain,
                otherContactsData: st.data!.otherContactsData
            }))
        }

    }

    useEffect(() => {
        refetchStudent()
    }, [])

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    return (
        <section className="flex gap-0.5 max-w-1150 flex-col">
            {student ?
                <div>
                    <div>
                        Возраст: {student.age}
                    </div>
                    <div>
                        Номер телефона: {student.phoneNumber}
                    </div>
                    <div>
                        Учебное заведение: {student.university}
                    </div>
                    <div>
                        Другие контактные данные: {student.otherContactsData}
                    </div>
                </div>
                :
                <div>
                    <button
                        onClick={changeModalVisible}
                    >
                        Зарегистрировать студента
                    </button>
                </div>
            }
            <Modal visible={modalVisible} setVisible={setModalVisible} >
                <h2>Зарегистрировать студента</h2>
                <div>
                    <input
                        value={ageValue}
                        onChange={(e) => setAgeValue(Number(e.target.value))}
                        min={18}
                        placeholder={"Возраст"}
                        type={"number"}
                    />
                </div>
                <div>
                    <input
                        value={phoneNumberValue}
                        type="text"
                        onChange={(e) => setPhoneNumberValue(e.target.value)}
                        placeholder={"Номер телефона"}
                    />
                </div>
                <div>
                    <input
                        value={universityValue}
                        onChange={(e) => setUniversityValue(e.target.value)}
                        type="text"
                        placeholder={"Учебное заведение"}
                    />
                </div>
                <div>
                    <input
                        value={otherContactsDataValue}
                        onChange={(e) => setOtherContactsDataValue(e.target.value)}
                        type="text"
                        placeholder={"Другие контактные данные"}
                    />
                </div>
                <button
                    onClick={register}
                >
                    Подтвердить
                </button>
            </Modal>
        </section>
    )
}

export default StudentForm