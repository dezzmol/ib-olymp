import { Card } from "antd"

const MainForm = () => {
    return (
        <div>
            <Card>
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <h1>Добро пожаловать на платформу соревнований по информационной безопасности ФГБОУ ВО "АГТУ"!</h1>
                    <div>
                        В современном мире защита информации становится всё более важной задачей для любой организации.
                        Мы рады представить вам нашу уникальную платформу для проведения соревнований по информационной безопасности,
                        созданную для студентов и профессионалов, стремящихся углубить свои знания и навыки в этой критически важной области.
                    </div>
                    <h2>Что мы предлагаем?</h2>
                    <h3>На нашей платформе регулярно проводятся соревнования по различным аспектам информационной безопасности, включая:</h3>
                    <ul>
                        <li>Криптография</li>
                        <li>Социальная инженерия</li>
                        <li>Форензика</li>
                        <li>Web-безопасность</li>
                        <li>Стеганография</li>
                    </ul>
                    <h3>Почему выбирают нас?</h3>
                    <ul>
                        <li>Экспертность: Все наши мероприятия разработаны при участии ведущих специалистов в области информационной безопасности.</li>
                        <li>Актуальность: Мы следим за новейшими тенденциями и обновляем нашу программу, чтобы она соответствовала современным вызовам.</li>
                        <li>Доступность: Мы предлагаем удобный онлайн-доступ ко всем ресурсам, что позволяет учиться и соревноваться из любой точки мира.</li>
                    </ul>
                </div>
            </Card>
        </div>
    )
}

export default MainForm