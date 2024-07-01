import { Button, Card, Table, TableColumnsType } from "antd"
import { olympIdAdminAPI } from "@/modules/OlympiadIDAdminPage/API/olympIdAdminAPI.ts"
import { useParams } from "react-router-dom"
import { Result } from "@/modules/OlympiadIDAdminPage/types"

const columns: TableColumnsType<Result> = [
    {
        title: "Место",
        dataIndex: "index",
        render: (item, record, index) => <div>{record.finalPlace}</div>
    },
    {
        title: "Название команды",
        dataIndex: "team",
        render: (text) => <div>{text.name}</div>
    },
    {
        title: "Состав команды",
        dataIndex: "team",
        render: (value, record, index) => <div>{record.team.students.map(student =>
            <div>{student.user.surname} {student.user.name} {student.isCaptain ? " - Капитан" : ""}</div>
        )}</div>
    },
    {
        title: "Финальный балл",
        dataIndex: "resultScore",
    }
]

const ResultIdAdminForm = () => {
    const { id } = useParams()
    const { data: results } = olympIdAdminAPI.useGetOlympiadResultQuery(Number(id!))
    
    return (
        <Card>
            {results &&
                <Table
                    columns={columns}
                    dataSource={results}
                    rowKey={(record) => record.id}
                />
            }
            <Button
                type={"primary"}
            >
                Выгрузить отчет о соревновании в Excel-файл
            </Button>
        </Card>
    )
}

export default ResultIdAdminForm