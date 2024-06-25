import { FC } from "react"
import { Button, Form, Input } from "antd"

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    surname: string
    setSurname: React.Dispatch<React.SetStateAction<string>>
    patronymic: string
    setPatronymic: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    confirmPassword: string
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
    signUp: () => Promise<void>
}

const Registration: FC<Props> = ({
                                     email,
                                     setEmail,
                                     username,
                                     setUsername,
                                     name,
                                     setName,
                                     surname,
                                     setSurname,
                                     patronymic,
                                     setPatronymic,
                                     password,
                                     setPassword,
                                     confirmPassword,
                                     setConfirmPassword,
                                     signUp
                                 }) => {

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item
                label="Логин"
                name="username"
                rules={[{ required: true, message: "Пожалуйста введите ваш логин!" }]}
            >
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Почта"
                name="Email"
                rules={[{ required: true, message: "Пожалуйста введите вашу почту!" }]}
            >
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>


            <Form.Item
                label="Фамилия"
                name="surname"
                rules={[{ required: true, message: "Пожалуйста введите вашу фамилию!" }]}
            >
                <Input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Имя"
                name="name"
                rules={[{ required: true, message: "Пожалуйста введите ваше имя!" }]}
            >
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Отчество"
                name="patronymic"
                rules={[{ required: true, message: "Пожалуйста введите ваше отчество!" }]}
            >
                <Input
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: "Пожалуйста введите ваш пароль!" }]}
            >
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Подтвердить"
                name="confirmPassword"
                rules={[{ required: true, message: "Пожалуйста введите ваш пароль!" }]}
            >
                <Input.Password
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginLeft: "0" }}>
                <Button type="primary" htmlType="submit" onClick={() => signUp()}>
                    Подтвердить
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Registration