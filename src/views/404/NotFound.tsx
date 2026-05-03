import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
        <h1 className="text-4xl text-white font-black text-center">Pagina no encontrada</h1>
        <p className="mt-10 text-center text-white">
            Tal vez quieras volver a {' '}
            <Link className="text-fuchsia-500" to={'/'}>Proyectos</Link>
        </p>
    </>    
)
}
