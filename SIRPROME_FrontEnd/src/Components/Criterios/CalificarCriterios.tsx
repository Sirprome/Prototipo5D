import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

const CalificarAlumno = () => {
  const navigate = useNavigate();
  const { idProfesor, idGrupo, idCriterio, idAlumno } = useParams(); 
  const [criterio, setCriterio] = useState<string>(""); 
  const [evaluacion, setEvaluacion] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(false);

  const onCalificar = async () => {
    if (!criterio.trim()) {
      alert("Por favor, ingresa el criterio que vas a calificar.");
      return;
    }

    if (evaluacion <= 0) {
      alert("Por favor, ingresa una evaluación válida.");
      return;
    }

    setCargando(true);

    const url = `http://localhost:4100/CalificarCriterio/${idProfesor}/${idGrupo}/${idCriterio}/${idAlumno}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          criterio: criterio,
          evaluacion: evaluacion,
        }),
      });

      if (response.ok) {
        alert("Evaluación calificada con éxito.");
        navigate(`/InfoGrupo/${idProfesor}/${idGrupo}`); // Redirige al listado de criterios
      } else {
        const error = await response.json();
        console.error("Error de respuesta:", error);
        alert(error.message || "Hubo un error al calificar el criterio.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };
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
              <a onClick={() => navigate(`/InfoGrupo/${idProfesor}/${idGrupo}`)} className="Buscar">
                <img src="/Iconos/Icono-Contenedores.svg" alt="" />
                <span>Info Grupo</span>
              </a>
            </li>
            <li>
              <a onClick={onCalificar}>
                <img src="/Iconos/Icono-Usuario.svg" alt="" />
                <span>Calificar Alumno</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/InfoGrupo/${idProfesor}/${idGrupo}`)} >
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
    <div className="fondo1">
      <div className="contenedor1">
        <h4>Calificar Alumno</h4>
        <div>
          <label>Criterio a calificar:</label>
          <input className="input-criterio"
            id="criterio"
            type="text"
            placeholder="Introduce el nombre del criterio"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
          />
        </div>
        <div>
          <label>Evaluación:</label>
          <input className="input-criterio"
            id="evaluacion"
            type="number"
            placeholder="Introduce la evaluación"
            value={evaluacion}
            onChange={(e) => setEvaluacion(Number(e.target.value))}
            min="0"
          />
        </div>
        <div>
          <button onClick={onCalificar} disabled={cargando} className="boton-criterios boton-subir">
            {cargando ? "Calificando..." : "Calificar Alumno"} 
            <img src="/Iconos/Icono-Usuario.svg" className="imagen-subir"></img>
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default CalificarAlumno;
