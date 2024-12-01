import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";


const InsertarComentario = () => {
  const navigate = useNavigate();
  const { idUsuario1, idGrupo, idUsuario2 } = useParams();
  const [comentario, setComentario] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(false);

  const onInsertarComentario = async () => {
    setCargando(true);

    if (!idUsuario1 || !idGrupo || !idUsuario2) {
      alert("Faltan parámetros en la URL (idUsuario1, idGrupo o idUsuario2).");
      setCargando(false);
      return;
    }

    if (!comentario.trim()) {
      alert("Por favor, introduce el comentario.");
      setCargando(false);
      return;
    }

    const url = `http://localhost:4100/InsertarComentario/${idUsuario1}/${idGrupo}/${idUsuario2}`; 

    const comments = {
      Comentario: comentario,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(comments),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data || "Comentario insertado con éxito.");//onClick={() => navigate(`/CriterioAlumno/${idUsuario2}/${idGrupo}`)}
        navigate(`/CriterioAlumno/${idUsuario2}/${idGrupo}`);
      } else {
        const error = await response.json();
        console.error("Error de respuesta:", error);
        alert(error.message || "Hubo un error al insertar el comentario.");
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
              <a onClick={() => navigate(`/CriterioAlumno/${idUsuario2}/${idGrupo}`)} className="Buscar">
                <img src="/Iconos/Icono-Contenedores.svg" alt="" />
                <span>Tareas de Estudiante</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/CriterioAlumno/${idUsuario2}/${idGrupo}`)}>
                <img src="/Iconos/Icono-Volver.svg" alt="" />
                <span>Volver</span>
              </a>
            </li>
            <li>
              <a onClick={onInsertarComentario}>
                <img src="/Iconos/Icono-Comentario.svg" alt="" />
                <span>Subir Comentario</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <main id="main">
    <div className="fondo-comentario">
      <div className="contenedor-comentario">
        <h4 className="titulo-comentario">Insertar Comentario</h4>
        <div className="contenedor-criteria">
          <label htmlFor="comentario" className="arreglo-subir">Comentario:</label>
          </div>
          <textarea className="introducir-comentario"
            id="comentario"
            placeholder="Introduce el comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            />
        
        <div>
          <button onClick={onInsertarComentario} disabled={cargando} className="criterio-boton boton-subir">
            
            {cargando ? "Insertando..." : "Insertar Comentario"}
            <img src="/Iconos/Icono-Comentario.svg" className="imagen-subir" />
          
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default InsertarComentario;
