import { Button, Form, Input } from "antd"
import { FC } from "react"

interface Props {
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    signIn: () => Promise<void>
}

const Login: FC<Props> = ({ username, setUsername, password, setPassword, signIn }) => {

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, border: "none"}}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="Email"
                rules={[{ required: true, message: "Please input your email!" }]}
            >
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={() => signIn()}>
                    Подтвердить
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login