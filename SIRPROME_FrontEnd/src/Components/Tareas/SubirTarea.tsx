import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

const SubirTarea = () => {
  const navigate = useNavigate();
  const { idUsuario, idGrupo, idTarea } = useParams<{ idUsuario: string; idGrupo: string; idTarea: string }>();
  const [evidencia, setEvidencia] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(false);
  
  const onSubirTarea = async () => {
    setCargando(true);

    if (!evidencia.trim()) {
      alert("Por favor, ingresa la evidencia de la tarea.");
      setCargando(false);
      return;
    }

    const url = `http://localhost:4100/SubirTarea/${idUsuario}/${idGrupo}/${idTarea}`; 

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Evidencia: evidencia }), 
      });

      if (response.ok) {
        alert("Tarea subida con éxito.");
        navigate(`/Grupos/${idUsuario}/${idGrupo}`);
      } else {
        const error = await response.json();
        console.error("Error de respuesta:", error);
        alert(error.message || "Hubo un error al subir la tarea.");
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
              <a href="#" className="Buscar">
                <img src="/Iconos/Icono-Contenedores.svg" alt="" />
                <span>Tareas de Estudiante</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/Grupos/${idUsuario}/${idGrupo}')}>
                <img src="/Iconos/Icono-Volver.svg" alt="" />
                <span>Volver</span>
              </a>
            </li>
            <li>
              <a onClick={onSubirTarea}>
                <img src="/Iconos/Icono-Contenedor.svg" alt="" />
                <span>Subir Evidencia</span>
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
      <main id="main">
    <div className="fondo-subir">
      <div className="contenedor-subir">
        <h4 className="titulo-subir">Subir Evidencia de Tarea</h4>
        <div className="acomodo-subir">
        <div className="arreglo-subir"> 
          <label htmlFor="evidencia">Evidencia:</label>
          
          </div>
          <textarea className="apartado-subir"
            id="evidencia"
            placeholder="Describe o pega la evidencia aquí"
            value={evidencia}
            onChange={(e) => setEvidencia(e.target.value)}
            rows={5}
          ></textarea>
          
      </div>
      <button onClick={onSubirTarea} className="boton-criterios boton-subir" disabled={cargando}>
            {cargando ? "Subiendo..." : "Subir Tarea"}
            <img src="/Iconos/Icono-Enviar.svg" className="imagen-subir" />
          </button>
      </div>
    </div>
    </main>
    </>
  );
};

export default SubirTarea;
