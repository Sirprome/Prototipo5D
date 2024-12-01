import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import "../../assets/Barra_Lateral.css";

interface Grupo {
  IdGrupo: string;
  Grupo: string;
  Imagen: string;
  Miembros: number;
}

const VerMisGrupos = () => {
  const { idProfesor } = useParams<{ idProfesor: string }>();
  const navigate = useNavigate();
  const [grupos, setGrupos] = useState<Grupo[]>([]); 
  const [carga, setCarga] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchGrupos = async () => {
      if (!idProfesor) return;

      const url = `http://localhost:4100/MisGrupos/${idProfesor}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json(); 
          setGrupos(data); 
        } else {
          const errorData = await response.json().catch(() => null);
          setError(errorData?.message || "Error al cargar los grupos");
        }
      } catch (err) {
        setError("Error al conectar con el servidor"); 
      } finally {
        setCarga(false); 
      }
    };

    fetchGrupos();
  }, [idProfesor]);

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
  const onEliminarGrupo = async (idGrupo: string) => {
    const confirmacion = window.confirm(
      `¿Está seguro de que desea eliminar el grupo con ID ${idGrupo}?`
    );
    if (!confirmacion) return;

    setCarga(true);

    const url = `http://localhost:4100/EliminarGrupo/${idProfesor}/${idGrupo}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Grupo eliminado con éxito");
        setGrupos(grupos.filter((grupo) => grupo.IdGrupo !== idGrupo));
      } else {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message || "Error al eliminar el grupo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setCarga(false);
    }
  };

  const onEliminarUsuario = async () => {
    const confirmacion = window.confirm(
      `¿Está seguro de que desea eliminar el usuario con ID ${idProfesor}?`
    );
    if (!confirmacion) return;

    setCarga(true);

    const url = `http://localhost:4100/EliminarUsuario/${idProfesor}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Usuario eliminado con éxito");
        navigate("/");
      } else {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message || "Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setCarga(false);
    }
  };

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
              <a href="#" className="Buscar">
                <img src="/Iconos/Icono-Contenido.svg" alt="" />
                <span>Mis Grupos</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/CrearGrupo/${idProfesor}`)}>
                <img src="/Iconos/Icono-CrearContenidos.svg" alt="" />
                <span>Crear un grupo</span>
              </a>
            </li>
            <li>
              <a href="/">
                <img src="/Iconos/Icono-Volver.svg" alt="" />
                <span>Cerrar Sesion</span>
              </a>
            </li>
            <li>
              <a onClick={onEliminarUsuario} >
                <img src="/Iconos/Icono-EliminarCuenta.svg" alt="" />
                <span>Eliminar Cuenta</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <main id="main">
      <div className="Contenedor_MisGrupos">
        <h4 className="Titulo_Grupo_Profesores">Grupos del Profesor</h4>

        {carga && <p>Cargando grupos...</p>}
        {error && <p className="error">{error}</p>}
        {grupos.length > 0 ? (
          <ul className="Contenedor_Imagen_MisGrupos">
            {grupos.map((grupo) => (
              <li className="Contenedor_Grupos_IdGrupo" key={grupo.IdGrupo}>
                <h5 className="Titulo_Grupo">{grupo.Grupo}</h5>
                <img
                  className="Imagen_MisGrupos"
                  src={grupo.Imagen}
                  alt={grupo.Grupo}
                  style={{ width: "160px", height: "150px" }}/>
                <p>
                  <button
                    className="Boton_Ver_Detalle"
                    onClick={() => navigate(`/InfoGrupo/${idProfesor}/${grupo.IdGrupo}`)
                    }>
                    <div className="Icono_Detalle">
                      <GoChecklist style={{ fontSize: "20px" }} />
                    </div>
                    Ver Detalles
                  </button>

                  <button
                    className="Boton_Eliminar_Mis_Grupos"
                    onClick={() => onEliminarGrupo(grupo.IdGrupo)}
                  >
                    <div className="Icono_Borrar">
                      <MdDelete style={{ fontSize: "20px" }} />
                    </div>
                    Borrar Grupo
                  </button>

                  <div className="Union_Criterio_Miembros">
                    <p className="Miembros_MisGrupos">
                      <div className="Icono_Miembro_Grupos">
                        <IoPeopleSharp style={{ fontSize: "20px" }} />
                        Miembros: {grupo.Miembros}
                      </div>
                    </p>
                  </div>
                  <button
                    className="Ver_Tareas_MisGrupos"
                    onClick={() => navigate("/Grupos/"+idProfesor+"/"+grupo.IdGrupo)}>
                    <div className="Icono_Info">
                      <IoIosInformationCircleOutline style={{ fontSize: "20px" }} />
                    </div>
                    Info Grupo
                  </button>
                  
                  <div className="Union_Criterio_Miembros">
                    <button
                      className="Boton_Criterio_Grupo"
                      onClick={() =>
                        navigate(`/CriterioGrupo/${idProfesor}/${grupo.IdGrupo}`)
                      }
                    >
                      <div className="Icono_Criterio_Grupos">
                        <FaEdit style={{ fontSize: "20px" }} />
                      </div>
                      Criterio Grupo
                    </button>
                  </div>

                  
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay grupos disponibles.</p>
        )}
      </div>
      </main>
    </>
  );
};

export default VerMisGrupos;
