import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

const InsertarCriterios = () => {
  const navigate = useNavigate();
  const { idProfesor, idGrupo, idCriterio } = useParams(); 
  const [criterio, setCriterio] = useState<string>("");
  const [valor, setValor] = useState<number>(0); 
  const [cargando, setCargando] = useState<boolean>(false);

  const onInsertarCriterios = async () => {
    setCargando(true);

    
    if (!idProfesor || !idGrupo || !idCriterio) {
      alert("Faltan parámetros en la URL (idProfesor, idGrupo o idCriterio).");
      setCargando(false);
      return;
    }

    if (!criterio.trim()) {
      alert("Por favor, introduce el nombre del criterio.");
      setCargando(false);
      return;
    }

    if (valor <= 0) {
      alert("El valor del criterio debe ser mayor a 0.");
      setCargando(false);
      return;
    }

    
    const url = `http://localhost:4100/InsertarCriterio/${idProfesor}/${idGrupo}/${idCriterio}`; 

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ criterio, valor }),
      });

      if (response.ok) {
        alert("Criterio insertado con éxito.");
        navigate(`/InfoGrupo/${idProfesor}/${idGrupo}`); 
      } else {
        const error = await response.json();
        console.error("Error de respuesta:", error);
        alert(error.message || "Hubo un error al insertar el criterio.");
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
              <a onClick={onInsertarCriterios} >
                <img src="/Iconos/Icono-Insertar.svg" alt="" />
                <span>Insertar Criterio</span>
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
    <div className="fondo-criterios">
      <div className="contenedor-criterios">
        <h4 className="titulo-criterios">Insertar Criterios</h4>
        <div className="contenedor-criterio">
          <label htmlFor="criterio" className="criterio-texto">Nombre del Criterio:</label>
          <input className="input-criterio"
            id="criterio"
            type="text"
            placeholder="Introduce el nombre del criterio"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value)}
          />
        </div>
        <div className="contenedor-criterio">
          <label htmlFor="valor" className="criterio-texto">Valor:</label>
          <input className="input-criterio"
            id="valor"
            type="number"
            placeholder="Introduce el valor del criterio"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </div>
        <div>
          <button onClick={onInsertarCriterios} disabled={cargando} className="criterio-boton boton-subir">
            {cargando ? "Insertando..." : "Insertar Criterio"}
            <img src="/Iconos/Icono-Insertar.svg" className="imagen-subir" />
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default InsertarCriterios;
