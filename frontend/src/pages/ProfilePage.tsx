import ProfileForm from "@/modules/Profile/components/ProfileForm.tsx"
import classes from "@/styles/page.module.css"

const ProfilePage = () => {
    return (
        <main className={classes.page}>
            <ProfileForm />
        </main>
    )
}

export default ProfilePage