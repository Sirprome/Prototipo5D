import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Tarea {
  Id: string;
  IdMiembro: string;
  Miembro: string;
  Titulo: string;
  Descripcion: string;
  ValorMaximo: number;
  Calificacion: number;
}

interface Grupo {
  Nombre: string;
  Imagen: string;
}

const TareaAlumnos = () => {
  const { idProfesor, idGrupo, idTarea } = useParams<{
    idProfesor: string;
    idGrupo: string;
    idTarea: string;
  }>();
  const navigate = useNavigate();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [carga, setCarga] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTareas = async () => {
      if (!idProfesor || !idGrupo || !idTarea) return;

      const url = `http://localhost:4100/TareaAlumnos/${idProfesor}/${idGrupo}/${idTarea}`;

      try {
        const response = await fetch(url, { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setGrupo({ Nombre: data[0]?.Grupo || "Grupo Desconocido", Imagen: "ruta/a/imagen" });
          setTareas(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error al cargar las tareas.");
        }
      } catch (err) {
        console.error(err);
        setError("Error al conectar con el servidor.");
      } finally {
        setCarga(false);
      }
    };

    fetchTareas();
  }, [idProfesor, idGrupo, idTarea]);
  useEffect(() => {
    const menu = document.getElementById("menu");
    const barra = document.getElementById("barra");
    const main = document.getElementById("main");

    const toggleMenu = () => {
      barra!.classList.toggle('menu-contraer');
      menu!.classList.toggle('menu-toggle');
      main!.classList.toggle('menu-contraer');
    };

    if (menu) {
      menu.addEventListener("click", toggleMenu);
    }

    return () => {
      if (menu) {
        menu.removeEventListener("click", toggleMenu);
      }
    };
  }, []);


  return (
    <>
    <header>
        <div className="izq">
          <div className="menu-conteiner">
            <div className="menu" id="menu">
            <img src="/Iconos/Icono-Menu.svg" alt="icon-udemy" className="logo" />
            </div>
          </div>
          <div className="brand">
            
            <span className="uno">Sirprome</span>
          </div>
        </div>
        
      </header>
      <div className="barra-lateral" id="barra">
        <nav>
          <ul>
          <li>
              <a onClick={() => navigate(`/Grupos/${idProfesor}/${idGrupo}`)} className="Buscar">
                <img src="/Iconos/Icono-Contenedores.svg" alt="" />
                <span>Tareas</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/Grupos/${idProfesor}/${idGrupo}`)} >
                <img src="/Iconos/Icono-Volver.svg" alt="" />
                <span>Volver</span>
              </a>
            </li>
            <li>
              <a href="/">
                <img src="/Iconos/Icono-EliminarUsuario.svg" alt="" />
                <span>Cerrar Sesion</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <main id="main">
    <div>
      {tareas.length > 0 ? (
        <div>
          <h4 className="Sub-titulo">Lista de Tareas</h4>
          <ul className="tareas listas">
            {tareas.map((tarea) => (
              <li key={tarea.Id} className="tarea-item">
                <h5>{tarea.Titulo}</h5>
                <p><b>Miembro:</b> {tarea.Miembro}</p>
                <p><b>Descripción:</b> {tarea.Descripcion}</p>
                <p><b>Valor Máximo:</b> {tarea.ValorMaximo}</p>
                <p><b>Calificación:</b> {tarea.Calificacion}</p>
                <button
                  onClick={() =>
                    navigate(`/CalificarTarea/${idProfesor}/${idGrupo}/${idTarea}/${tarea.IdMiembro}`)
                    
                  }
                  className="boton-criterios boton-subir"
                  >
                  Calificar<img src="/Iconos/Icono-Enviar.svg" className="imagen-subir"></img>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !carga && <p>No se encontraron tareas asignadas.</p>
      )}
    </div>
    </main>
    </>
  );
};

export default TareaAlumnos;
