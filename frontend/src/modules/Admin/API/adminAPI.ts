import { baseAPI } from "@/API/baseAPI.ts"
import { ICategory, ICreateCategory, ICreateTask, ITask } from "@/modules/Admin/types"

export const adminAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getAllTasks: build.query<ITask[], void>({
            query: () => ({
                url: "/olympadmin/tasks/",
                method: "GET"
            })
        }),
        createTask: build.mutation<ITask, ICreateTask>({
            query: (body) => ({
                url: "/olympadmin/tasks/",
                method: "POST",
                body
            })
        }),
        getAllCategories: build.query<ICategory[], void>({
            query: () => ({
                url: "/olympadmin/category/",
                method: "GET"
            })
        }),
        createCategory: build.mutation<ICategory, ICreateCategory>({
            query: (body) => ({
                url: "/olympadmin/category/",
                method: "POST",
                body
            })
        })
    })
})