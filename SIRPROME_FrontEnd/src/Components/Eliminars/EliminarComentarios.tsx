import { useState } from "react";

const EliminarComentarios = () => {
  const [idProfesor, setIdProfesor] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [idComentario, setIdComentario] = useState("");
  const [carga, setCarga] = useState(false);

  const onEliminarComentarios = async () => {
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar la tarea con ID ${idComentario} del grupo ${idGrupo}?`);
    if (!confirmacion) {
      return;
    }

    setCarga(true);

    if (!idProfesor.trim() || !idGrupo.trim() || !idComentario.trim()) {
      alert("Ingrese el ID del profesor, el ID del grupo y el ID de la tarea.");
      setCarga(false);
      return;
    }

    const url = `http://localhost:4100/EliminarComentario/${idProfesor}/${idGrupo}/${idComentario}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdProfesor: idProfesor,
          IdGrupo: idGrupo,
          idComentario: idComentario,
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
          <div>ID del Profesor</div>
          <input
            type="text"
            placeholder="Ingresa el ID del profesor"
            value={idProfesor}
            onChange={(e) => setIdProfesor(e.target.value)}
          />

          <div>ID del Grupo</div>
          <input
            type="text"
            placeholder="Ingresa el ID del grupo"
            value={idGrupo}
            onChange={(e) => setIdGrupo(e.target.value)}
          />

          <div>ID de la Tarea</div>
          <input
            type="text"
            placeholder="Ingresa el ID de la tarea"
            value={idComentario}
            onChange={(e) => setIdComentario(e.target.value)}
          />

          <div>
            <button onClick={onEliminarComentarios} disabled={carga}>
              {carga ? "Eliminando..." : "Eliminar Tarea"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminarComentarios;
