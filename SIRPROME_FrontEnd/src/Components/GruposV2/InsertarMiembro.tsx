import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

const InsertarMiembro: React.FC = () => {
  const navigate = useNavigate();
  const {idUsuario} = useParams();
  const [codigo, setCodigo] = useState("");
  const [carga, setCarga] = useState<boolean>(false);

  const onInsertarMiembro = async () => {
    setCarga(true);
    if (!idUsuario ) {
      alert("Faltan parámetros en la URL (idUsuario ).");
      setCarga(false);
      return;
    }

    if (!codigo.trim()) {
      alert("Ingrese el ID del alumno.");
      setCarga(false);
      return;
    }


    const url = `http://localhost:4100/InsertarMiembro/${idUsuario}`; 
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Codigo: codigo }),
      });

      if (response.ok) {
        alert("Miembro agregado con éxito.");
        navigate(`/VerGrupos/${idUsuario}`);
      } else {
        const error = await response.json();
        console.log("Error response:", error); 
        alert(error.message || "Error al agregar el miembro.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setCarga(false);
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
              <a onClick={() => navigate("/VerGrupos/"+idUsuario)} className="Buscar">
                <img src="/Iconos/Icono-Contenido.svg" alt="" />
                <span>Grupos del Estudiante</span>
              </a>
            </li>
            <li>
              <a  onClick={onInsertarMiembro}>
                <img src="/Iconos/Icono-CrearContenidos.svg" alt="" />
                <span>Agregar Miembro</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/VerGrupos/"+idUsuario)}>
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
    <div className="fondo-ver">
      <div className="contenedor-ver">
        <h4>Agregar Miembro al Grupo</h4>
        <div className="agregar-clase">
          <label>Codigo del grupo:</label>
          <input className="agregar-miembro"
            type="text"
            placeholder="Introduce el codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          
        </div>
        <div>
          <button onClick={onInsertarMiembro} disabled={carga} className="criterio-boton boton-subir">
            {carga ? "Agregando..." : "Agregar Miembro"}
            <img src="/Iconos/Icono-CrearContenido.svg" className="imagen-subir" />
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default InsertarMiembro;
