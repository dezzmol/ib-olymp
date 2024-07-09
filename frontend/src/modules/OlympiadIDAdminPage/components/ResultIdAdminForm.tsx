import { Button, Card, Table, TableColumnsType } from "antd"
import { olympIdAdminAPI } from "@/modules/OlympiadIDAdminPage/API/olympIdAdminAPI.ts"
import { useParams } from "react-router-dom"
import { Result } from "@/modules/OlympiadIDAdminPage/types"
import { ChangeEvent, useEffect, useState } from "react"

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
        dataIndex: "resultScore"
    }
]

const ResultIdAdminForm = () => {
    const { id } = useParams()
    const { data: results } = olympIdAdminAPI.useGetOlympiadResultQuery(Number(id!))
    const [trigger, { data }] = olympIdAdminAPI.useLazyGetExcelSummarizeQuery()
    const [fileToDownload, setFileToDownload] = useState<string | null>(null)

    useEffect(() => {
        if (fileToDownload) {
            trigger({ olympiadId: Number(id!), fileName: fileToDownload })
        }
    }, [fileToDownload, id, trigger])

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

    const handleFileDownload = (fileName: string) => {
        setFileToDownload(fileName)
    }

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
                onClick={() => handleFileDownload(`competition_${id}.xlsx`)}
            >
                Выгрузить отчет о соревновании в Excel-файл
            </Button>
        </Card>
    )
}

export default ResultIdAdminForm