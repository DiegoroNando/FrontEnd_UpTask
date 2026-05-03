import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { NoteFormData } from "types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

const initialValues: NoteFormData={
    content: ''
}


export default function AddNotesForm() {

    const params= useParams()
    const location= useLocation()

    const queryParams = new URLSearchParams(location.search)
    const queryClient = useQueryClient() 

    const projectId=params.projectId!
    const taskId = queryParams.get('viewTask')!

    const {register, handleSubmit,reset,formState:{errors}}=useForm({defaultValues: initialValues})    

    const {mutate}= useMutation({
        mutationFn: createNote,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        }
    })

    const handleNote=(formData: NoteFormData)=>{

        mutate({formData,projectId,taskId})
    }


return (
    <>
        <form
        onClick={handleSubmit(handleNote)}
        className=" space-y-3"
        noValidate
        >
            <div className="flex flex-col gap-2">
                <label className=" font-bold" htmlFor="content">Crear Nota</label>
                <input 
                id="content"
                type="text" 
                placeholder="Contenido de tu Nota"
                className=" w-full p-3 border border-gray-300"
                {...register('content',{
                    required:'El Contenido es Obligatorio'
                })}
                />
                {errors.content&&(
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input
            value={'Crear Nota'}
            type="submit"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700  w-full p-2 text-white font-bold cursor-pointer"
            />
        </form>
    </>
  )
}
