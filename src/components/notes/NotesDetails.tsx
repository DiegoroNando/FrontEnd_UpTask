import { deleteNote } from "@/api/NoteApi"
import { UseAuth } from "@/hooks/UseAuth"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import type { Note } from "types"

type NotesDetailsProps={
    note:Note
}

export default function NotesDetails({note}: NotesDetailsProps) {

    const {data, isLoading}= UseAuth()

    const params = useParams()
    const location= useLocation()
    const queryParams= new URLSearchParams(location.search)

    const taskId = queryParams.get('viewTask')!
    const projectId= params.projectId!

    const queryClient = useQueryClient()

    const {mutate}= useMutation({
        mutationFn:deleteNote,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        }
    })



    const canDelete=useMemo(() => data?._id === note.createdBy._id,[data?._id, note.createdBy._id])
    
    if(isLoading) return 'Cargando...'
  return (
    <div className="p-3 flex justify-between items-center ">
        <p>
          <span className=" font-bold"> {note.content} </span> por: <span className=" font-bold">{note.createdBy.name }</span>
        </p>
        <p className=" text-xs text-slate-500">
            {formatDate (note.createdAt)}
        </p>

        {canDelete && (
            <button
            type="button"
            className=" bg-red-500 hover:bg-red-600 text-xs p-2 text-white font-bold transition-colors cursor-pointer"
            onClick={()=> mutate({projectId, taskId, noteId: note._id})}
            >
                Eliminar
            </button>
        )}
    </div>
  )
}
