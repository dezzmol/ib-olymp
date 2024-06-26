import { useNavigate, useParams } from "react-router-dom"
import { teamAPI } from "@/modules/Team/API/teamAPI.ts"

const JoinTeamForm = () => {
    const { token } = useParams()
    const { data } = teamAPI.useJoinTeamQuery(token!)
    const navigate = useNavigate()

    if (data) {
        navigate("/team")
    }

    return (
        <div>

        </div>
    )
}

export default JoinTeamForm