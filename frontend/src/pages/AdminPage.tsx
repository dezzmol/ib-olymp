import AdminForm from "@/modules/Admin/components/AdminForm.tsx"
import classes from "@/styles/page.module.css"

const AdminPage = () => {
    return (
        <main className={classes.page}>
            <AdminForm />
        </main>
    )
}

export default AdminPage