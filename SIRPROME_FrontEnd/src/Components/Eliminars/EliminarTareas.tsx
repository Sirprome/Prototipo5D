import { useState } from "react";
import { useParams } from "react-router-dom";

const EliminarTarea = () => {
  const {idProfesor,idGrupo,idTarea} = useParams();
  const [carga, setCarga] = useState(false);

  const onEliminarTarea = async () => {
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la tarea con ID ${idTarea} del grupo ${idGrupo}?`);
    if (!confirmacion) {
      return;
    }
    setCarga(true);
    const url = `http://localhost:4100/EliminarTarea/${idProfesor}/${idGrupo}/${idTarea}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdProfesor: idProfesor,
          IdGrupo: idGrupo,
          IdTarea: idTarea,
        }),
      });

      if (response.ok) {
        alert("Tarea eliminada con éxito");
      } else {
        const error = await response.json();
        alert(error.message || "Error al eliminar la tarea");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Error al conectar con el servidor");
    } finally {
      setCarga(false);
    }
  };

  return (
    <>
      <div className="fondo">
        <div className="contenedor">
          <div>
            <button onClick={onEliminarTarea} disabled={carga}>
              {carga ? "Eliminando..." : "Eliminar Tarea"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminarTarea;
