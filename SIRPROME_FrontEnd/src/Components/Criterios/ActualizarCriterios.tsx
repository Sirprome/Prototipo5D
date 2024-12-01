import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

const ActualizarCriterio = () => {
  const navigate = useNavigate();
  const { idProfesor, idGrupo, idCriterio } = useParams();
  const [aCriterio, setACriterio] = useState<string>(""); 
  const [nuevoCriterio, setNuevoCriterio] = useState<string>(""); 
  const [valor, setValor] = useState<number>(0);
  const [cargando, setCargando] = useState<boolean>(false); 

  const onActualizarCriterio = async () => {
    if (!aCriterio.trim() || !nuevoCriterio.trim()) {
      alert("Por favor, ingresa los nombres del criterio a actualizar y el nuevo criterio.");
      return;
    }

    if (valor <= 0) {
      alert("Por favor, ingresa un valor válido para el criterio.");
      return;
    }

    setCargando(true);

    const url = `http://localhost:4100/ActualizarCriterio/${idProfesor}/${idGrupo}/${idCriterio}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ACriterio: aCriterio,
          Criterio: nuevoCriterio,
          Valor: valor,
        }),
      });

      if (response.ok) {
        alert("Criterio actualizado con éxito.");
        navigate(`/InfoGrupo/${idProfesor}/${idGrupo}`); 
      } else {
        const error = await response.json();
        console.error("Error de respuesta:", error);
        alert(error.message || "Hubo un error al actualizar el criterio.");
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
          <a onClick={() => navigate(`/CriterioGrupo/${idProfesor}/${idGrupo}`)} >
            <img src="/Iconos/Icono-Insertar.svg" alt="" />
            <span>Actualizar Criterio</span>
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
      <div className="contenedor-over">
        <h4 className="titulo-criterios">Actualizar Criterio</h4>
        <div className="contenedor-criterio">
          <label htmlFor="aCriterio">Nombre del criterio a actualizar:</label>
          <input className="input-criterio"
            id="aCriterio"
            type="text"
            placeholder="Nombre actual del criterio"
            value={aCriterio}
            onChange={(e) => setACriterio(e.target.value)}
          />
        </div>
        <div className="contenedor-criterio">
          <label htmlFor="nuevoCriterio">Nuevo nombre del criterio:</label>
          <input className="input-criterio"
            id="nuevoCriterio"
            type="text"
            placeholder="Nuevo nombre del criterio"
            value={nuevoCriterio}
            onChange={(e) => setNuevoCriterio(e.target.value)}
          />
        </div>
        <div className="contenedor-criterio">
          <label htmlFor="valor">Nuevo valor del criterio:</label>
          <input className="input-criterio"
            id="valor"
            type="number"
            placeholder="Valor del criterio"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            min="0"
          />
        </div>
        <div>
          <button onClick={onActualizarCriterio} disabled={cargando} className="criterio-boton boton-subir">
            {cargando ? "Actualizando..." : "Actualizar Criterio"}
            <img src="/Iconos/Icono-Enviar.svg" className="imagen-subir" />
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default ActualizarCriterio;
