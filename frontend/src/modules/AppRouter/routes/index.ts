import { FunctionComponent } from "react"
import MainPage from "@/pages/MainPage.tsx"
import {
    ADMIN_PAGE_ROUTE, ESTIMATE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE, MY_OLYMPIADS, OLYMPIAD_ADMIN_ROUTE, OLYMPIAD_ROUTE,
    PROFILE_ROUTE, RESULT, SOLVE_OLYMPIAD, TEAM_ROUTE
} from "@/modules/AppRouter/utils/consts.ts"
import LoginPage from "@/pages/LoginPage.tsx"
import AdminPage from "@/pages/AdminPage.tsx"
import ProfilePage from "@/pages/ProfilePage.tsx"
import TeamPage from "@/pages/TeamPage.tsx"
import OlympiadAdminPage from "@/pages/OlympiadAdminPage.tsx"
import TaskPage from "@/pages/TaskPage.tsx"
import OlympiadIdAdminPage from "@/pages/OlympiadIDAdminPage.tsx"
import OlympiadsPage from "@/pages/OlympiadsPage.tsx"
import OlympiadIdPage from "@/pages/OlympiadIdPage.tsx"
import MyOlympiadsPage from "@/pages/MyOlympiadsPage.tsx"
import SolveOlympiadPage from "@/pages/SolveOlympiadPage.tsx"
import SolveTaskPage from "@/pages/SolveTaskPage.tsx"
import EstimatePage from "@/pages/EstimatePage.tsx"
import EstimateIdPage from "@/pages/EstimateIdPage.tsx"
import EstimateTaskIdPage from "@/pages/EstimateTaskIdPage.tsx"
import JoinTeamPage from "@/pages/JoinTeamPage.tsx"
import ResultAdminPage from "@/pages/ResultAdminPage.tsx"

interface IPages {
    path: string
    component: FunctionComponent
}

export const publicPages: IPages[] = [
    { path: MAIN_PAGE_ROUTE, component: MainPage },
    { path: LOGIN_ROUTE, component: LoginPage },
    { path: OLYMPIAD_ROUTE, component: OlympiadsPage },
    { path: OLYMPIAD_ROUTE + "/:id", component: OlympiadIdPage }
]

export const privatePages: IPages[] = [
    { path: ADMIN_PAGE_ROUTE, component: AdminPage },
    { path: PROFILE_ROUTE, component: ProfilePage },
    { path: TEAM_ROUTE, component: TeamPage },
    { path: OLYMPIAD_ADMIN_ROUTE, component: OlympiadAdminPage },
    { path: OLYMPIAD_ADMIN_ROUTE + "/olympiads/:id", component: OlympiadIdAdminPage },
    { path: ADMIN_PAGE_ROUTE + "/tasks/:id", component: TaskPage },
    { path: MY_OLYMPIADS, component: MyOlympiadsPage },
    { path: SOLVE_OLYMPIAD + "/:olympiad_id", component: SolveOlympiadPage },
    { path: SOLVE_OLYMPIAD + "/:olympiad_id/:task_id", component: SolveTaskPage },
    { path: ESTIMATE + OLYMPIAD_ROUTE, component: EstimatePage },
    { path: ESTIMATE + OLYMPIAD_ROUTE + "/:id", component: EstimateIdPage },
    { path: ESTIMATE + OLYMPIAD_ROUTE + "/:id" + "/:task_id", component: EstimateTaskIdPage },
    { path: TEAM_ROUTE + "/joinTeam/:token", component: JoinTeamPage },
    { path: OLYMPIAD_ADMIN_ROUTE + "/:id" + RESULT, component: ResultAdminPage }
]