import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CriterioGrupo = () => {
  const { idProfesor, idGrupo } = useParams();
  const navigate = useNavigate();
  const [grupo, setGrupo] = useState<any | null>(null);
  const [criterios, setCriterios] = useState<any[]>([]);
  const [carga, setCarga] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCriteriosGrupo = async () => {
      if (!idProfesor || !idGrupo) return;

      const url = `http://localhost:4100/CriterioGrupo/${idProfesor}/${idGrupo}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGrupo({ Nombre: data.Grupo, Imagen: data.Imagen });
          setCriterios(data.Criterio || []); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error al cargar los criterios del grupo.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      } finally {
        setCarga(false);
      }
    };

    fetchCriteriosGrupo();
  }, [idProfesor, idGrupo]);
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

  const eliminarCriterio = async (criterio: string, idCriterio: string) => {
    if (!window.confirm(`¿Está seguro de eliminar el criterio "${criterio}"?`)) return;
    setCarga(true);
  
    try {
      const res = await fetch(
        `http://localhost:4100/EliminarCriterio/${idProfesor}/${idGrupo}/${idCriterio}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Criterio: criterio }),
        }
      );
  
      if (!res.ok) {
        throw new Error(await res.text());
      }
  

      setCriterios((prev) => prev.filter((c) => c.IdCriterio !== idCriterio));
      alert("Criterio eliminado con éxito.");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el criterio.");
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
              <a onClick={() => navigate(`/MisGrupos/${idProfesor}`)} className="Buscar">
                <img src="/Iconos/Icono-Contenedores.svg" alt="" />
                <span>Info Grupo</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/MisGrupos/${idProfesor}`)} >
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
    <div className="info-grupo">
      {carga && <p>Cargando información...</p>}
      {error && <p className="error">{error}</p>}

      {!carga && !error && grupo && (
        <div className="grupo-info">
          <h3>{grupo.Nombre}</h3>
          <img src={grupo.Imagen} alt={grupo.Nombre} width="300" height="300" />
        </div>
      )}

      <ul>
        <h4>Criterios del Grupo:</h4>
        {criterios.length > 0 ? (
          criterios.map((criterio) => (
            <li key={criterio.IdCriterio}>
              <p><b>{criterio.Criterio.join(", ")}</b></p>
              <p>{criterio.Valor.join(", ")}</p>
              <button
                className="boton-criterios boton-subir"
                onClick={() => navigate(`/ActualizarCriterio/${idProfesor}/${idGrupo}/${criterio.IdCriterio}`)}
              >
                Actualizar Criterio<img src="/Iconos/Icono-Insertar.svg" className="imagen-subir" />
              </button>
              <button
                className="boton-criterios boton-subir"
                onClick={() => navigate(`/EliminarCriterio/${idProfesor}/${idGrupo}/${criterio.IdCriterio}`)}
              >
                Eliminar Criterio<img src="/Iconos/Icono-Eliminar.svg" className="imagen-subir" />
              </button>
            </li>
          ))
        ) : (
          <p>No existen criterios en este grupo.</p>
        )}
      </ul>
    </div>
    </main>
    </>
  );
};

export default CriterioGrupo;
