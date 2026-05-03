import { Outlet,Link, Navigate } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo"
import NavMeu from "@/components/NavMenu"
import { UseAuth } from "@/hooks/UseAuth"

export default function AppLayout() {

    const {data, isError, isLoading}= UseAuth()

    if (isLoading) return 'cargando...'
    if (isError) {
        return <Navigate to={'/auth/login'}/>
    } 

if(data)return (

    <>
    <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-64">
                <Link to={'/'}>
                <Logo />
                </Link>
            </div>
            <NavMeu
                name={data.name}
            />
        </div>
    </header>
    <section className="max-w-screeen-2xl mx-auto mt-10 p-5">
    <Outlet/>
    </section>
    <footer className="py-5">
        <p className="text-center">Todos los Derechos Reservados {new Date().getFullYear()}</p>
    </footer>

    <ToastContainer
    pauseOnHover={false}
    pauseOnFocusLoss={false}
    />
    </>
)
}
