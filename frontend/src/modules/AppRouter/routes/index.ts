import { FunctionComponent } from "react"
import MainPage from "@/pages/MainPage.tsx"
import {
    ADMIN_PAGE_ROUTE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE, OLYMPIAD_ADMIN_ROUTE, OLYMPIAD_ROUTE,
    PROFILE_ROUTE, TEAM_ROUTE
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
    { path: ADMIN_PAGE_ROUTE + "/tasks/:id", component: TaskPage }
]