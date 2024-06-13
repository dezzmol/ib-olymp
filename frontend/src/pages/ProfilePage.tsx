import ProfileForm from "@/modules/Profile/components/ProfileForm.tsx"
import StudentForm from "@/modules/Profile/components/StudentForm.tsx"

const ProfilePage = () => {
    return (
        <main className="flex flex-col items-center bg-my-white min-h-[91vh]">
            <ProfileForm />
            <StudentForm />
        </main>
    )
}

export default ProfilePage