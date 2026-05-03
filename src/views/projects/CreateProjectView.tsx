import { Link, useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import{toast} from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import type { ProjectFormData } from "types"
import { createProject } from "@/api/ProjectApi"




export default function CreateProjectView() {

    const navigate= useNavigate()

    const initialValues: ProjectFormData ={
        projectName: "",
        clientName:"",
        description:""
    }


const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:initialValues})

const {mutate} = useMutation({
    mutationFn:createProject,
    onError:(error)=>{
        toast.error(error.message)
    },
    onSuccess:(data)=>{
    toast.success(data)
    navigate('/')   
    }
})

const handleForm =  (Formdata : ProjectFormData) => mutate(Formdata)

return (
    <>
    <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear proyectos</p>

        <nav className="my-5">
            <Link 
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
            to={'/'}
            > Volver a Proyectos</Link>
        </nav>

            <form
            className=" mt-10 bg-white shadow-lg p-10 rounden-lg"
            onSubmit={handleSubmit(handleForm)}
            noValidate
            >

            <ProjectForm
            register={register}
            errors={errors}
            />

            <input 
            type="submit"
            value='Crear Proyecto'
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white text-center uppercase font-bold rounded-lg cursor-pointer transition-colors"
            />
            </form>
    </div>
    </>
)
}
