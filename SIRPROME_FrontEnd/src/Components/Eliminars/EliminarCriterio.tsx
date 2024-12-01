import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

const EliminarCriterio = () => {
  const { idProfesor, idGrupo, idCriterio } = useParams();
  const [criterio, setCriterio] = useState<string>(""); 
  const [cargando, setCargando] = useState<boolean>(false);
  const navigate = useNavigate();

  const onEliminarCriterio = async () => {
    if (!criterio.trim()) {
      alert("Debe especificar el nombre del criterio para eliminar.");
      return;
    }

    const confirmacion = window.confirm(
      `¿Está seguro de que desea eliminar el criterio "${criterio}" del grupo ${idGrupo}?`
    );
    if (!confirmacion) return;

    setCargando(true);

    const url = `http://localhost:4100/EliminarCriterio/${idProfesor}/${idGrupo}/${idCriterio}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Criterio: criterio }), 
      });

      if (response.ok) {
        alert("Criterio eliminado con éxito.");
        navigate(`/CriterioGrupo/${idProfesor}/${idGrupo}`);
      } else {
        const error = await response.json();
        alert(error.message || "Error al eliminar el criterio.");
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
          <a onClick={() => navigate(`/CriterioGrupo/${idProfesor}/${idGrupo}`)} >
            <img src="/Iconos/Icono-Ver.svg" alt="" />
            <span>Ver Criterio</span>
          </a>
        </li>
        <li>
          <a onClick={onEliminarCriterio} >
            <img src="/Iconos/Icono-Eliminar.svg" alt="" />
            <span>Eliminar Criterio</span>
          </a>
        </li>
       
        <li>
          <a onClick={() => navigate(`/CriterioGrupo/${idProfesor}/${idGrupo}`)} >
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
    <div className="fondo-criterios">
      <div className="contenedor-eliminar">
        <h4>Eliminar Criterio</h4>
        <input
          type="text"
          placeholder="Nombre del criterio"
          value={criterio}
          onChange={(e) => setCriterio(e.target.value)}
        />
        <div>
          <button onClick={onEliminarCriterio} disabled={cargando} className="criterio-boton boton-subir">
            {cargando ? "Eliminando..." : "Eliminar Criterio"}
            <img src="/Iconos/Icono-Eliminar.svg" className="imagen-subir" />
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default EliminarCriterio;
