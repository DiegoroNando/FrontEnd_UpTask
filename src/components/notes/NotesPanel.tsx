import type { Task } from "types";
import AddNotesForm from "./AddNotesForm";
import NotesDetails from "./NotesDetails";

type NotesPanelProps={
    notes: Task['notes']
}


export default function NotesPanel({notes=[]}: NotesPanelProps) {
  return (
    <>
        <AddNotesForm/>

        <div className="divide-y divide-gray-100 mt-10">
            {notes.length ? (
                <>
                    <p className=" font-bold text-2xl text-slate-600 my-5">Notas:</p>
                    {notes.map(note => <NotesDetails key={note._id} note={note}/>)}
                </>
            ): <p className="text-gray-500 text-center pt-3">No Hay Notas</p>}
        </div>
    </>
  )
}
