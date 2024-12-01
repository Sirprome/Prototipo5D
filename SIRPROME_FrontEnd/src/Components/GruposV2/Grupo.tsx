import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

interface Tarea {
  IdUsuario: string;
  IdTarea: string;
  Titulo: string;
  Descripcion: string;
  ValorMax: number;
  Calificacion?: number; 
  Evidencia?: string;    
}

interface Grupo {
  IdUsuario: string;
  Nombre: string;
  Imagen: string;
  Tareas: Tarea[];
  Rol: string;
  IdProfesor?: string;
  Miembros?: string[];
}

const Grupo = () => {
  const { idUsuario, idGrupo } = useParams<{ idUsuario: string; idGrupo: string }>();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrupoData = async () => {
      if (!idUsuario || !idGrupo) return;

      const url = `http://localhost:4100/Grupo/${idUsuario}/${idGrupo}`;
      try {
        const response = await fetch(url, { method: "GET" });

        if (response.ok) {
          const data = await response.json();
          setGrupo(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error al cargar la información del grupo.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error al conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    };

    fetchGrupoData();
  }, [idUsuario, idGrupo]);

  useEffect(() => {
    const menu = document.getElementById("menu");
    const barra = document.getElementById("barra");
    const main = document.getElementById("main");

    const toggleMenu = () => {
      barra?.classList.toggle('menu-contraer');
      menu?.classList.toggle('menu-toggle');
      main?.classList.toggle('menu-contraer');
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
            {grupo && grupo.Rol === "estudiante" && (
              <li>
                <a onClick={() => navigate(`/VerGrupos/${idUsuario}`)} className="Buscar">
                  <img src="/Iconos/Icono-Contenido.svg" alt="" />
                  <span>Ver Grupos</span>
                </a>
              </li>
            )}
            {grupo && grupo.Rol === "profesor" && (
              <li>
                <a onClick={() => navigate(`/MisGrupos/${idUsuario}`)} className="Buscar">
                  <img src="/Iconos/Icono-Contenido.svg" alt="" />
                  <span>Ver Grupos</span>
                </a>
              </li>
            )}
            <li>
              <a onClick={() => navigate(`/VerGrupos/${idUsuario}`)}>
                <img src="/Iconos/Icono-Volver.svg" alt="" />
                <span>Volver</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/SubirTarea/${idUsuario}/${idGrupo}`)}>
                <img src="/Iconos/Icono-CrearContenidos.svg" alt="" />
                <span>Subir Evidencia</span>
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
        <div className="info-grupo">
          <div className="centrado-tareas">
            <h4>Información del Grupo</h4>
          </div>
          
          {cargando && <p>Cargando...</p>}
          {error && <p className="error">{error}</p>}

          {grupo && (
            <>
              <div className="grupo-info">
                <h5>{grupo.Nombre}</h5>
                <img
                  src={grupo.Imagen}
                  alt={`Imagen del grupo ${grupo.Nombre}`}
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
              {grupo.Rol === "profesor" && (
                <button
                  className="Boton_Crear_Tarea"
                  onClick={() => navigate(`/InsertarTarea/${idUsuario}/${idGrupo}`)}
                >
                  <div className="Icono_Tarea">
                    <IoIosAddCircle style={{ fontSize: "20px" }} />
                  </div>
                  Crear Tarea
                </button>
              )}
              <h6 className="Sub-titulo">Tareas:</h6>

              <ul className="tareas">
                {grupo.Tareas.map((tarea) => (
                  <li key={tarea.IdTarea}>
                    <p><b>Título:</b> {tarea.Titulo}</p>
                    <p><b>Descripción:</b> {tarea.Descripcion}</p>
                    <p><b>Valor Máximo:</b> {tarea.ValorMax}</p>
                    {grupo.Rol === "estudiante" && (
                      <>
                        <p><b>Calificación:</b> {tarea.Calificacion ?? "Sin calificar"}</p>
                        <p><b>Evidencia:</b> {tarea.Evidencia ?? "No enviada"}</p>
                        <button
                          onClick={() => navigate(`/SubirTarea/${idUsuario}/${idGrupo}/${tarea.IdTarea}`)}
                          className="boton-subir"
                        >
                          Subir Evidencia
                          <img src="/Iconos/Icono-CrearContenido.svg" className="imagen-subir" />
                        </button>
                        
                      </>
                    )}
                    {grupo.Rol === "profesor" && (
                      <div className="acciones-tarea">
                        <button
                          onClick={() => navigate(`/ActualizarTarea/${idUsuario}/${idGrupo}/${tarea.IdTarea}`)}
                          className="boton-criterios boton-subir"
                        >
                          Actualizar Tarea
                          <img src="/Iconos/Icono-Insertar.svg" className="imagen-subir" />
                        </button>
                        <button
                          onClick={() => navigate(`/TareaAlumnos/${idUsuario}/${idGrupo}/${tarea.IdTarea}`)}
                          className="boton-criterios boton-subir"
                        >
                          Ver Tarea
                          <img src="/Iconos/Icono-Ver.svg" className="imagen-subir" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {!cargando && !grupo && <p>No se encontró información del grupo.</p>}
        </div>
      </main>
    </>
  );
};

export default Grupo;
