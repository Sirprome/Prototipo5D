import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EliminarGrupo = () => {
  const { idProfesor, idGrupo } = useParams();  
  const [carga, setCarga] = useState(false);
  const navigate = useNavigate();

  const onEliminarGrupo = async () => {
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar el grupo con ID ${idGrupo}?`);
    if (!confirmacion) {
      return;
    }

    setCarga(true);

    const url = `http://localhost:4100/EliminarGrupo/${idProfesor}/${idGrupo}`;

    try {
      const response = await fetch(url, {
        method: "POST", 
      });

      if (response.ok) {
        alert("Grupo eliminado con éxito");
        navigate("/MisGrupos/"+idProfesor);
      } else {
        const error = await response.json();
        alert(error.message || "Error al eliminar el grupo");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Error al conectar con el servidor");
    } finally {
      setCarga(false);
    }
  };

  return (
    <div className="fondo">
      <div className="contenedor">
        <h3>Eliminar Grupo</h3>
        <button onClick={onEliminarGrupo} disabled={carga}>
          {carga ? "Eliminando..." : "Eliminar Grupo"}
        </button>
      </div>
    </div>
  );
};

export default EliminarGrupo;
