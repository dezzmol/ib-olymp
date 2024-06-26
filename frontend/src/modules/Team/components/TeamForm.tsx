import {
    teamAPI,
    useGenerateLinkMutation,
    useGetTeamByStudentQuery,
    useRegisterMutation
} from "@/modules/Team/API/teamAPI.ts"
import { useState } from "react"
import { Button, Card, Input, Modal, Select } from "antd"
import { useAppSelector } from "@/hooks/useTypedStore.ts"

const TeamForm = () => {
    const [teamName, setTeamName] = useState<string>("")
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [inviteModalVisible, setInviteModalVisible] = useState<boolean>(false)
    const [deleteMemberModalVisible, setDeleteMemberModalVisible] = useState<boolean>(false)
    const { data: team, refetch: teamRefetch } = useGetTeamByStudentQuery()
    const [register] = useRegisterMutation()
    const [inviteLink, setInviteLink] = useState<string>("")
    const [generateLinkToInvite] = useGenerateLinkMutation()
    const [deleteMember] = teamAPI.useRemoveStudentFromTheTeamMutation()

    const teamRegister = async () => {
        await register({ name: teamName })
        await teamRefetch()
    }

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const changeInviteModalVisible = async () => {
        setInviteModalVisible((prev) => !prev)
        await generateLink()
    }

    const changeDeleteMemberModalVisible = () => {
        setDeleteMemberModalVisible((prev) => !prev)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    const handleCancelInvite = () => {
        setInviteModalVisible(false)
    }

    const handleCancelDeleteModal = () => {
        setDeleteMemberModalVisible(false)
    }

    const generateLink = async () => {
        const result = await generateLinkToInvite()

        if ("data" in result) {
            if (result.data) {
                setInviteLink(result.data.link)
            }
        }
    }

    const handleSelectChange = (value: string) => {
        console.log(`selected ${value}`)
    }

    const removeMember = async () => {
        await deleteMember()
    }

    return (
        <div>
            {team ?
                <Card title={<h2>{team.name}</h2>}>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                        Участники:
                        {team.students.map(student => (
                            <div key={student.id}>
                                {student.user.surname} {student.user.name} {student.isCaptain && "капитан"}
                            </div>
                        ))
                        }
                        <Button
                            onClick={changeInviteModalVisible}
                            style={{width: "200px"}}
                        >
                            Пригласить участника
                        </Button>
                        <Button
                            onClick={changeDeleteMemberModalVisible}
                            style={{width: "200px"}}
                        >
                            Удалить участника
                        </Button>

                    </div>
                </Card>
                :
                <Card title={<h2>У вас нет команды</h2>}>
                    <div>
                        <Button onClick={changeModalVisible}>Зарегистрировать команду</Button>
                    </div>
                </Card>
            }
            <Modal open={modalVisible} onCancel={handleCancel} onOk={handleCancelInvite} cancelText={"Отменить"}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2>Регистрация команды</h2>
                    <Input
                        placeholder={"Название команды"}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <Button
                        onClick={teamRegister}
                    >
                        Подтвердить
                    </Button>
                </div>
            </Modal>
            <Modal
                open={inviteModalVisible} onCancel={handleCancelInvite} onOk={generateLink}
            >
                <div>
                    <h2>Сгенерировать ссылку</h2>
                    <Input
                        value={inviteLink}
                    />
                </div>
            </Modal>
            <Modal
                open={deleteMemberModalVisible} onCancel={handleCancelDeleteModal} onOk={removeMember}
            >
                <div>
                    <h2>Выберите участника, которого вы хотите удалить</h2>
                    <Select
                        onChange={handleSelectChange}
                        style={{ width: "450px" }}
                    >
                        {team && team.students.map(student => (
                            <Select.Option key={student.id} value={student.id}>
                                {student.user.surname} {student.user.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Modal>
        </div>
    )
}

export default TeamForm