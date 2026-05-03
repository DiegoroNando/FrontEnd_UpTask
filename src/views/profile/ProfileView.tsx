import ProfileForm from "@/components/profile/ProfileForm"
import { UseAuth } from "@/hooks/UseAuth"

export default function ProfileView() {

    const {data, isLoading}= UseAuth()

    if(isLoading) return 'Cargando...'

if(data)return (
    <ProfileForm data={data}/>
  )
}
